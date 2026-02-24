import { ipcMain } from 'electron';
import type Database from 'better-sqlite3';
import { IPC } from '@gitgael/shared';
import type { ForkRequest, ForkResult } from '@gitgael/shared';
import { getToken, getUsername } from './auth-handlers';

const GITHUB_API = 'https://api.github.com';

export function registerForkHandlers(db: Database.Database) {
  ipcMain.handle(IPC.GITHUB_FORK, async (_event, req: ForkRequest): Promise<ForkResult> => {
    const token = getToken();
    const username = getUsername();

    // Parse the URL to detect source
    const source = detectSource(req.url);

    if (source.type === 'github') {
      if (!token || !username) {
        // Save to DB without forking
        return saveWithoutFork(db, req, source);
      }
      return forkGitHubRepo(db, req, source, token, username);
    } else {
      // Non-GitHub: would need git clone --mirror + create private repo
      // For now, save to DB with pending status
      return saveWithoutFork(db, req, source);
    }
  });
}

interface SourceInfo {
  type: 'github' | 'gitlab' | 'codeberg' | 'other';
  owner: string;
  repo: string;
  fullUrl: string;
}

function detectSource(url: string): SourceInfo {
  try {
    const parsed = new URL(url);

    const pathParts = parsed.pathname.split('/').filter(Boolean);
    const owner = pathParts[0] ?? '';
    const repo = (pathParts[1] ?? '').replace(/\.git$/, '');

    if (parsed.hostname === 'github.com') {
      return { type: 'github', owner, repo, fullUrl: url };
    } else if (parsed.hostname.includes('gitlab')) {
      return { type: 'gitlab', owner, repo, fullUrl: url };
    } else if (parsed.hostname === 'codeberg.org') {
      return { type: 'codeberg', owner, repo, fullUrl: url };
    }

    return { type: 'other', owner, repo, fullUrl: url };
  } catch {
    return { type: 'other', owner: '', repo: '', fullUrl: url };
  }
}

async function forkGitHubRepo(
  db: Database.Database,
  req: ForkRequest,
  source: SourceInfo,
  token: string,
  username: string
): Promise<ForkResult> {
  try {
    // Fork the repo
    const forkResp = await fetch(`${GITHUB_API}/repos/${source.owner}/${source.repo}/forks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'GitGael',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        default_branch_only: true,
      }),
    });

    if (!forkResp.ok) {
      const err = (await forkResp.json()) as { message?: string };
      return { success: false, error: err.message ?? `Fork failed: ${forkResp.status}` };
    }

    const fork = (await forkResp.json()) as { full_name: string; html_url: string; name: string };

    // Set to private
    await fetch(`${GITHUB_API}/repos/${fork.full_name}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'GitGael',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ private: true }),
    });

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
        document_id, section_id, description, docs_url, install_cmd, build_cmd,
        source_type, fork_status, is_private)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'github_fork', 'forked', 1)
    `);

    const result = stmt.run(
      fork.name,
      req.display_name || source.repo,
      `${source.owner}/${source.repo}`,
      fork.html_url,
      req.document_id,
      req.section_id ?? null,
      req.description ?? null,
      req.docs_url ?? null,
      req.install_cmd ?? null,
      req.build_cmd ?? null
    );

    // Log the fork
    db.prepare(`
      INSERT INTO fork_log (repo_id, action, status, details)
      VALUES (?, 'fork', 'success', ?)
    `).run(result.lastInsertRowid, JSON.stringify({ source: req.url, fork: fork.full_name }));

    return {
      success: true,
      repo_id: Number(result.lastInsertRowid),
      fork_url: fork.html_url,
    };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function saveWithoutFork(
  db: Database.Database,
  req: ForkRequest,
  source: SourceInfo
): ForkResult {
  const stmt = db.prepare(`
    INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
      document_id, section_id, description, docs_url, install_cmd, build_cmd,
      source_type, fork_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `);

  const result = stmt.run(
    source.repo || req.url,
    req.display_name || source.repo || req.url,
    `${source.owner}/${source.repo}`,
    source.type === 'github' ? req.url : null,
    req.document_id,
    req.section_id ?? null,
    req.description ?? null,
    req.docs_url ?? null,
    req.install_cmd ?? null,
    req.build_cmd ?? null,
    source.type === 'github' ? 'github_fork' : 'mirror'
  );

  return {
    success: true,
    repo_id: Number(result.lastInsertRowid),
  };
}
