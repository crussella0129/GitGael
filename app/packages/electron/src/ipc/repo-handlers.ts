import { ipcMain } from 'electron';
import type Database from 'better-sqlite3';
import { IPC } from '@gitgael/shared';
import type { RepoListRequest, RepoSearchRequest, RepoCreateRequest, RepoUpdateRequest } from '@gitgael/shared';

export function registerRepoHandlers(db: Database.Database) {
  // List repos with optional filtering
  ipcMain.handle(IPC.REPO_LIST, (_event, filter?: RepoListRequest) => {
    let query = 'SELECT * FROM repos WHERE 1=1';
    const params: unknown[] = [];

    if (filter?.document_id) {
      query += ' AND document_id = ?';
      params.push(filter.document_id);
    }
    if (filter?.section_id) {
      query += ' AND section_id = ?';
      params.push(filter.section_id);
    }
    if (filter?.subsection_id) {
      query += ' AND subsection_id = ?';
      params.push(filter.subsection_id);
    }

    // Count total
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const { count } = db.prepare(countQuery).get(...params) as { count: number };

    // Apply pagination
    query += ' ORDER BY sort_order, display_name';
    if (filter?.limit) {
      query += ' LIMIT ?';
      params.push(filter.limit);
    }
    if (filter?.offset) {
      query += ' OFFSET ?';
      params.push(filter.offset);
    }

    const repos = db.prepare(query).all(...params);
    return { repos: repos.map(parseRepoRow), total: count };
  });

  // Get single repo
  ipcMain.handle(IPC.REPO_GET, (_event, id: number) => {
    const repo = db.prepare('SELECT * FROM repos WHERE id = ?').get(id);
    return repo ? parseRepoRow(repo) : null;
  });

  // FTS5 search
  ipcMain.handle(IPC.REPO_SEARCH, (_event, req: RepoSearchRequest) => {
    let query = `
      SELECT repos.*, repos_fts.rank
      FROM repos_fts
      JOIN repos ON repos.id = repos_fts.rowid
      WHERE repos_fts MATCH ?
    `;
    const params: unknown[] = [req.query];

    if (req.document_id) {
      query += ' AND repos.document_id = ?';
      params.push(req.document_id);
    }

    query += ' ORDER BY rank LIMIT ?';
    params.push(req.limit ?? 50);

    const rows = db.prepare(query).all(...params) as Array<Record<string, unknown>>;
    return rows.map((row) => ({
      repo: parseRepoRow(row),
      rank: row.rank as number,
      snippet: (row.description as string) || '',
    }));
  });

  // Create repo
  ipcMain.handle(IPC.REPO_CREATE, (_event, req: RepoCreateRequest) => {
    const stmt = db.prepare(`
      INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
        document_id, section_id, subsection_id, description, build_cmd,
        usage_cmd, install_cmd, docs_url, note, source_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      req.fork_name,
      req.display_name,
      req.upstream_url ?? null,
      req.github_url ?? null,
      req.document_id ?? null,
      req.section_id ?? null,
      req.subsection_id ?? null,
      req.description ?? null,
      req.build_cmd ?? null,
      req.usage_cmd ?? null,
      req.install_cmd ?? null,
      req.docs_url ?? null,
      req.note ?? null,
      req.source_type ?? 'user_added'
    );

    return { id: result.lastInsertRowid };
  });

  // Update repo
  ipcMain.handle(IPC.REPO_UPDATE, (_event, req: RepoUpdateRequest) => {
    const fields: string[] = [];
    const params: unknown[] = [];

    for (const [key, value] of Object.entries(req)) {
      if (key === 'id') continue;
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (fields.length === 0) return { changes: 0 };

    params.push(req.id);
    const stmt = db.prepare(`UPDATE repos SET ${fields.join(', ')} WHERE id = ?`);
    const result = stmt.run(...params);
    return { changes: result.changes };
  });

  // Delete repo
  ipcMain.handle(IPC.REPO_DELETE, (_event, id: number) => {
    const result = db.prepare('DELETE FROM repos WHERE id = ?').run(id);
    return { changes: result.changes };
  });
}

function parseRepoRow(row: unknown): Record<string, unknown> {
  const r = row as Record<string, unknown>;
  return {
    ...r,
    is_private: Boolean(r.is_private),
    is_mirror: Boolean(r.is_mirror),
    extra_metadata: r.extra_metadata ? JSON.parse(r.extra_metadata as string) : {},
  };
}
