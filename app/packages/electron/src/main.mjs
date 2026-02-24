import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import initSqlJs from 'sql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;
let mainWindow = null;

// ─── Database ────────────────────────────────────────────────────────────────

async function initDatabase() {
  const SQL = await initSqlJs();

  const dbPath = path.join(app.getPath('userData'), 'gitgael.db');
  let dbData = null;

  if (fs.existsSync(dbPath)) {
    dbData = fs.readFileSync(dbPath);
  }

  db = dbData ? new SQL.Database(dbData) : new SQL.Database();

  // Execute schema inline (sql.js doesn't handle FTS5 virtual tables well,
  // so we use basic tables and do search via LIKE)
  const tableStatements = [
    `CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_number INTEGER NOT NULL UNIQUE,
      filename TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS subsections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS repos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fork_name TEXT NOT NULL,
      display_name TEXT NOT NULL,
      upstream_url TEXT,
      github_url TEXT,
      document_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
      section_id INTEGER REFERENCES sections(id) ON DELETE SET NULL,
      subsection_id INTEGER REFERENCES subsections(id) ON DELETE SET NULL,
      description TEXT,
      build_cmd TEXT,
      usage_cmd TEXT,
      install_cmd TEXT,
      docs_url TEXT,
      note TEXT,
      config_info TEXT,
      deps TEXT,
      features TEXT,
      use_case TEXT,
      hardware TEXT,
      warning TEXT,
      learn TEXT,
      extra_metadata TEXT DEFAULT '{}',
      source_type TEXT NOT NULL DEFAULT 'github_fork',
      is_private INTEGER NOT NULL DEFAULT 1,
      is_mirror INTEGER NOT NULL DEFAULT 0,
      fork_status TEXT NOT NULL DEFAULT 'existing',
      added_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS naming_collisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fork_name TEXT NOT NULL,
      upstream TEXT NOT NULL,
      description TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS mirrors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_name TEXT NOT NULL,
      upstream_source TEXT NOT NULL,
      github_mirror TEXT,
      description TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS auth_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL DEFAULT 'github',
      username TEXT NOT NULL,
      token_ref TEXT NOT NULL,
      scopes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS fork_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repo_id INTEGER REFERENCES repos(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      status TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
  ];

  for (const stmt of tableStatements) {
    try {
      db.run(stmt);
    } catch (e) {
      // Already exists
    }
  }

  return db;
}

function saveDb() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dbPath = path.join(app.getPath('userData'), 'gitgael.db');
  fs.writeFileSync(dbPath, buffer);
}

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

function runSql(sql, params = []) {
  db.run(sql, params);
  return { lastId: db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0] ?? 0 };
}

// ─── Seed from Markdown ──────────────────────────────────────────────────────

function seedIfEmpty() {
  const count = queryOne("SELECT COUNT(*) as c FROM documents");
  if (count && count.c > 0) return; // Already seeded

  console.log('Seeding database from markdown docs...');
  const docsDir = path.join(__dirname, '..', '..', '..', '..', 'docs');

  if (!fs.existsSync(docsDir)) {
    console.log('No docs directory found, skipping seed');
    return;
  }

  const allFiles = fs.readdirSync(docsDir);
  console.log('All files in docs:', allFiles);

  const files = allFiles
    .filter(f => f.endsWith('.md') && /^\d{2}-/.test(f))
    .sort();
  console.log('Matched doc files:', files);

  for (const filename of files) {
    try {
      const content = fs.readFileSync(path.join(docsDir, filename), 'utf-8');
      seedDocument(filename, content);
    } catch (err) {
      console.error(`Error seeding ${filename}:`, err.message);
    }
  }

  const docCount = queryOne("SELECT COUNT(*) as c FROM documents")?.c ?? 0;
  const repoCount = queryOne("SELECT COUNT(*) as c FROM repos")?.c ?? 0;
  console.log(`Seeded: ${docCount} documents, ${repoCount} repos`);

  // Seed naming collisions from README
  const readmePath = path.join(docsDir, '..', 'README.md');
  if (fs.existsSync(readmePath)) {
    seedCollisions(fs.readFileSync(readmePath, 'utf-8'));
  }

  saveDb();
  console.log('Seed complete');
}

function seedDocument(filename, content) {
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // Parse H1 header
  const h1Match = lines[0]?.match(/^#\s+(\d+)\s*[—–-]\s*(.+)$/);
  if (!h1Match) return;

  const docNum = parseInt(h1Match[1], 10);
  const title = h1Match[2].trim();

  // Get description (lines between H1 and first H2)
  let desc = '';
  for (let i = 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) break;
    if (lines[i].trim()) desc += lines[i].trim() + ' ';
  }

  runSql(
    'INSERT INTO documents (doc_number, filename, title, description, sort_order) VALUES (?, ?, ?, ?, ?)',
    [docNum, filename, title, desc.trim(), docNum * 10]
  );
  const docId = queryOne("SELECT last_insert_rowid() as id").id;

  // Parse sections and repos
  let currentSectionId = null;
  let currentSectionName = '';
  let sectionOrder = 0;
  let repoOrder = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ## Section header
    const secMatch = line.match(/^##\s+(.+)$/);
    if (secMatch) {
      currentSectionName = secMatch[1].trim();
      runSql(
        'INSERT INTO sections (document_id, name, sort_order) VALUES (?, ?, ?)',
        [docId, currentSectionName, sectionOrder++]
      );
      currentSectionId = queryOne("SELECT last_insert_rowid() as id").id;
      repoOrder = 0;
      i++;
      continue;
    }

    // ### Repo → `fork`
    const repoMatch = line.match(/^###\s+(.+?)\s*→\s*`([^`]+)`/);
    if (repoMatch && currentSectionId) {
      const displayName = repoMatch[1].replace(/\*\*/g, '').trim();
      const forkName = repoMatch[2].trim();

      // Collect description + fields
      let description = '';
      let buildCmd = null, usageCmd = null, installCmd = null, docsUrl = null;
      let note = null, configInfo = null, deps = null, useCase = null;
      let warning = null, learn = null, features = null;

      i++;
      // First non-field lines = description
      while (i < lines.length && !lines[i].startsWith('- **') && !lines[i].startsWith('##') && !lines[i].startsWith('###')) {
        if (lines[i].trim() && !lines[i].startsWith('```') && !lines[i].startsWith('|')) {
          description += lines[i].trim() + ' ';
        }
        if (!lines[i].trim() && description) break;
        i++;
      }

      // Parse fields
      while (i < lines.length && lines[i].startsWith('- **')) {
        const fieldMatch = lines[i].match(/^-\s+\*\*(\w[\w\s]*?)\*\*:\s*(.+)$/);
        if (fieldMatch) {
          const key = fieldMatch[1].toLowerCase().trim();
          const val = fieldMatch[2].trim();
          switch (key) {
            case 'build': buildCmd = val; break;
            case 'usage': usageCmd = val; break;
            case 'install': installCmd = val; break;
            case 'docs': docsUrl = val; break;
            case 'note': note = val; break;
            case 'config': configInfo = val; break;
            case 'deps': deps = val; break;
            case 'use case': case 'use cases': case 'applications': useCase = val; break;
            case 'warning': warning = val; break;
            case 'learn': learn = val; break;
            case 'key feature': case 'key features': case 'features': features = val; break;
            case 'key configs': configInfo = val; break;
            case 'supported fpgas': features = val; break;
            case 'contains': features = val; break;
            case 'requires': deps = val; break;
          }
        }
        i++;
        // Continuation lines (indented)
        while (i < lines.length && /^\s{2,}/.test(lines[i]) && lines[i].trim()) {
          const lastKey = fieldMatch?.[1]?.toLowerCase()?.trim();
          if (lastKey === 'learn') learn = (learn || '') + '\n' + lines[i].trim();
          i++;
        }
      }

      // Check for (fork of `...`)
      const forkOfMatch = description.match(/\(fork of\s+`([^`]+)`\)/);
      const upstreamUrl = forkOfMatch ? forkOfMatch[1] : null;
      description = description.replace(/\(fork of\s+`[^`]+`\)\s*/g, '').trim();

      const githubUrl = forkName.includes('/') ? `https://github.com/${forkName}` : null;

      try {
        runSql(
          `INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
            document_id, section_id, description, build_cmd, usage_cmd, install_cmd,
            docs_url, note, config_info, deps, features, use_case, warning, learn,
            source_type, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'github_fork', ?)`,
          [forkName, displayName, upstreamUrl, githubUrl, docId, currentSectionId,
           description || null, buildCmd, usageCmd, installCmd, docsUrl, note,
           configInfo, deps, features, useCase, warning, learn, repoOrder++]
        );
      } catch (e) {
        // Duplicate or constraint error — skip
        console.log(`  Skip: ${forkName} (${e.message})`);
      }
      continue;
    }

    // Table rows — parse repos from tables (COSMIC, Smithay crates, Voron, etc.)
    if (line.startsWith('|') && !line.match(/^\|[\s-:|]+\|$/) && currentSectionId) {
      // Check if this is a header row
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      if (nextLine.match(/^\|[\s-:|]+\|$/)) {
        // This is a table header — parse the table
        const headers = line.split('|').filter(c => c.trim()).map(c => c.trim().toLowerCase());
        i += 2; // skip header + separator

        while (i < lines.length && lines[i].startsWith('|') && !lines[i].match(/^\|[\s-:|]+\|$/)) {
          const cells = lines[i].split('|').filter(c => c.trim() !== '').map(c => c.trim());
          if (cells.length >= 2) {
            const forkCell = cells[0];
            const backtickMatch = forkCell.match(/`([^`]+)`/);
            const forkName = backtickMatch ? backtickMatch[1] : forkCell.replace(/[`*]/g, '').trim();
            const displayName = forkName.split('/').pop() || forkName;

            // Get description from appropriate column
            let desc = '';
            let buildVal = null;
            for (let ci = 0; ci < headers.length && ci < cells.length; ci++) {
              const h = headers[ci];
              if (h.includes('what') || h.includes('purpose') || h.includes('description') || h === 'printer' || h === 'design') {
                desc = cells[ci].replace(/`/g, '');
              }
              if (h === 'build') {
                buildVal = cells[ci];
              }
              if (h === 'upstream') {
                // upstream column
              }
            }

            try {
              runSql(
                `INSERT INTO repos (fork_name, display_name, document_id, section_id,
                  description, build_cmd, source_type, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, 'github_fork', ?)`,
                [forkName, displayName, docId, currentSectionId, desc || null, buildVal, repoOrder++]
              );
            } catch (e) {
              // skip duplicates
            }
          }
          i++;
        }
        continue;
      }
    }

    i++;
  }
}

function seedCollisions(readme) {
  const lines = readme.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('Fork Name') && line.includes('Upstream')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('|---')) continue;
    if (inTable && line.startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim().replace(/`/g, ''));
      if (cells.length >= 3) {
        try {
          runSql('INSERT INTO naming_collisions (fork_name, upstream, description) VALUES (?, ?, ?)',
            [cells[0], cells[1], cells[2]]);
        } catch (e) {}
      }
    } else if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }
}

// ─── IPC Handlers ────────────────────────────────────────────────────────────

function registerIpcHandlers() {
  // repo:list
  ipcMain.handle('repo:list', (_event, filter) => {
    let sql = 'SELECT * FROM repos WHERE 1=1';
    const params = [];

    if (filter?.document_id) {
      sql += ' AND document_id = ?';
      params.push(filter.document_id);
    }
    if (filter?.section_id) {
      sql += ' AND section_id = ?';
      params.push(filter.section_id);
    }

    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as count');
    const count = queryOne(countSql, params)?.count ?? 0;

    sql += ' ORDER BY sort_order, display_name';
    if (filter?.limit) {
      sql += ` LIMIT ${Number(filter.limit)}`;
    }
    if (filter?.offset) {
      sql += ` OFFSET ${Number(filter.offset)}`;
    }

    const repos = queryAll(sql, params).map(parseRow);
    return { repos, total: count };
  });

  // repo:get
  ipcMain.handle('repo:get', (_event, id) => {
    const row = queryOne('SELECT * FROM repos WHERE id = ?', [id]);
    return row ? parseRow(row) : null;
  });

  // repo:search
  ipcMain.handle('repo:search', (_event, req) => {
    const query = req.query || req;
    const limit = req.limit || 50;

    // Use LIKE as fallback since FTS5 virtual tables can be tricky with sql.js
    const sql = `SELECT * FROM repos WHERE
      fork_name LIKE ? OR display_name LIKE ? OR description LIKE ?
      OR build_cmd LIKE ? OR note LIKE ? OR use_case LIKE ?
      ORDER BY display_name LIMIT ?`;
    const pattern = `%${query}%`;
    const rows = queryAll(sql, [pattern, pattern, pattern, pattern, pattern, pattern, limit]);
    return rows.map((row, i) => ({
      repo: parseRow(row),
      rank: i,
      snippet: row.description || '',
    }));
  });

  // repo:create
  ipcMain.handle('repo:create', (_event, req) => {
    runSql(
      `INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
        document_id, section_id, description, build_cmd, usage_cmd, docs_url, note, source_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.fork_name, req.display_name, req.upstream_url ?? null, req.github_url ?? null,
       req.document_id ?? null, req.section_id ?? null, req.description ?? null,
       req.build_cmd ?? null, req.usage_cmd ?? null, req.docs_url ?? null,
       req.note ?? null, req.source_type ?? 'user_added']
    );
    saveDb();
    return { id: queryOne("SELECT last_insert_rowid() as id").id };
  });

  // repo:update
  ipcMain.handle('repo:update', (_event, req) => {
    const fields = [];
    const params = [];
    for (const [key, value] of Object.entries(req)) {
      if (key === 'id') continue;
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }
    if (fields.length === 0) return { changes: 0 };
    params.push(req.id);
    db.run(`UPDATE repos SET ${fields.join(', ')} WHERE id = ?`, params);
    saveDb();
    return { changes: 1 };
  });

  // repo:delete
  ipcMain.handle('repo:delete', (_event, id) => {
    db.run('DELETE FROM repos WHERE id = ?', [id]);
    saveDb();
    return { changes: 1 };
  });

  // category:tree
  ipcMain.handle('category:tree', () => {
    const docs = queryAll('SELECT * FROM documents ORDER BY sort_order, doc_number');

    return docs.map(doc => {
      const docCount = queryOne('SELECT COUNT(*) as c FROM repos WHERE document_id = ?', [doc.id])?.c ?? 0;
      const sections = queryAll('SELECT * FROM sections WHERE document_id = ? ORDER BY sort_order', [doc.id]);

      return {
        document: doc,
        sections: sections.map(sec => {
          const secCount = queryOne('SELECT COUNT(*) as c FROM repos WHERE section_id = ?', [sec.id])?.c ?? 0;
          return {
            section: sec,
            subsections: [],
            repo_count: secCount,
          };
        }),
        repo_count: docCount,
      };
    });
  });

  // category:create — create a new document/category
  ipcMain.handle('category:create', (_event, req) => {
    const maxRow = queryOne('SELECT MAX(doc_number) as max_num FROM documents');
    const nextNum = (maxRow?.max_num ?? 0) + 1;
    const paddedNum = String(nextNum).padStart(2, '0');
    const slug = req.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const filename = `${paddedNum}-${slug}.md`;

    runSql(
      `INSERT INTO documents (doc_number, filename, title, description, sort_order) VALUES (?, ?, ?, ?, ?)`,
      [nextNum, filename, req.title, req.description ?? null, nextNum]
    );
    saveDb();
    const row = queryOne('SELECT * FROM documents WHERE doc_number = ?', [nextNum]);
    return { id: row.id, doc_number: nextNum, filename };
  });

  // category:section:create — create a new section within a document
  ipcMain.handle('category:section:create', (_event, req) => {
    const maxRow = queryOne('SELECT MAX(sort_order) as max_sort FROM sections WHERE document_id = ?', [req.document_id]);
    const nextSort = (maxRow?.max_sort ?? 0) + 1;

    runSql(
      `INSERT INTO sections (document_id, name, sort_order) VALUES (?, ?, ?)`,
      [req.document_id, req.name, nextSort]
    );
    saveDb();
    const row = queryOne('SELECT * FROM sections WHERE document_id = ? AND name = ?', [req.document_id, req.name]);
    return { id: row.id };
  });

  // docs:content — serve raw markdown for a document
  ipcMain.handle('docs:content', (_event, filename) => {
    const docsDir = path.join(__dirname, '..', '..', '..', '..', 'docs');
    const filePath = path.join(docsDir, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
  });

  // docs:readme — serve the README
  ipcMain.handle('docs:readme', () => {
    const readmePath = path.join(__dirname, '..', '..', '..', '..', 'README.md');
    if (fs.existsSync(readmePath)) {
      return fs.readFileSync(readmePath, 'utf-8');
    }
    return null;
  });

  // docs:stats — aggregate stats for the home page
  ipcMain.handle('docs:stats', () => {
    const totalRepos = queryOne('SELECT COUNT(*) as c FROM repos')?.c ?? 0;
    const totalDocs = queryOne('SELECT COUNT(*) as c FROM documents')?.c ?? 0;
    const totalCollisions = queryOne('SELECT COUNT(*) as c FROM naming_collisions')?.c ?? 0;

    const byDoc = queryAll(`
      SELECT d.doc_number, d.title, d.filename, COUNT(r.id) as repo_count
      FROM documents d
      LEFT JOIN repos r ON r.document_id = d.id
      GROUP BY d.id
      ORDER BY d.sort_order, d.doc_number
    `);

    return { totalRepos, totalDocs, totalCollisions, byDoc };
  });

  // Auth stubs
  ipcMain.handle('github:auth:status', () => ({
    authenticated: false, username: null, scopes: null,
  }));
  ipcMain.handle('github:auth:start', () => ({
    authenticated: false, username: null, scopes: null,
  }));
  ipcMain.handle('github:auth:logout', () => {});

  // Fork / Add to catalog
  ipcMain.handle('github:fork', (_event, req) => {
    try {
      // Parse org/repo from URL
      let owner = '', repo = '';
      try {
        const url = new URL(req.url);
        const parts = url.pathname.split('/').filter(Boolean);
        owner = parts[0] ?? '';
        repo = (parts[1] ?? '').replace(/\.git$/, '');
      } catch {
        // Shorthand org/repo
        const m = req.url.match(/^([^/]+)\/([^/]+?)(?:\.git)?$/);
        if (m) { owner = m[1]; repo = m[2]; }
      }

      const forkName = repo || req.url;
      const displayName = req.display_name || repo || req.url;
      const upstreamUrl = owner && repo ? `${owner}/${repo}` : req.url;

      runSql(
        `INSERT INTO repos (fork_name, display_name, upstream_url, github_url,
          document_id, section_id, description, docs_url, install_cmd, build_cmd,
          source_type, fork_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user_added', 'pending')`,
        [forkName, displayName, upstreamUrl, req.url,
         req.document_id, req.section_id ?? null,
         req.description ?? null, req.docs_url ?? null,
         req.install_cmd ?? null, req.build_cmd ?? null]
      );
      saveDb();
      const lastId = queryOne("SELECT last_insert_rowid() as id")?.id ?? 0;
      return { success: true, repo_id: lastId };
    } catch (err) {
      return { success: false, error: String(err.message || err) };
    }
  });

  // Export stubs
  ipcMain.handle('export:catalog', () => ({ success: false, error: 'Not yet implemented' }));
  ipcMain.handle('export:markdown', () => ({ success: false, error: 'Not yet implemented' }));
}

function parseRow(row) {
  return {
    ...row,
    is_private: Boolean(row.is_private),
    is_mirror: Boolean(row.is_mirror),
    extra_metadata: row.extra_metadata ? JSON.parse(row.extra_metadata) : {},
  };
}

// ─── Window ──────────────────────────────────────────────────────────────────

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'GitGael — Survival Computing Archive',
    backgroundColor: '#030712',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load Vite dev server
  const devUrl = 'http://localhost:5173';
  mainWindow.loadURL(devUrl).catch(() => {
    // If dev server not running, show fallback
    mainWindow.loadURL(`data:text/html,
      <html><body style="background:#030712;color:#9ca3af;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <div style="text-align:center">
          <h1 style="color:#22c55e">GitGael</h1>
          <p>Start the frontend dev server first:</p>
          <code style="color:#60a5fa">cd app/packages/frontend && npm run dev</code>
        </div>
      </body></html>
    `);
  });
}

// ─── App Lifecycle ───────────────────────────────────────────────────────────

app.on('ready', async () => {
  await initDatabase();
  seedIfEmpty();
  registerIpcHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  saveDb();
  app.quit();
});
