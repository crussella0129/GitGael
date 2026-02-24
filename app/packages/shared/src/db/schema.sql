-- GitGael database schema
-- SQLite with FTS5 for full-text search

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Document sections (01-system-foundation, 02-languages, etc.)
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doc_number INTEGER NOT NULL UNIQUE,
  filename TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Sections within documents (## headers)
CREATE TABLE IF NOT EXISTS sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(document_id, name)
);

-- Subsections within sections (### grouping headers that aren't repos)
CREATE TABLE IF NOT EXISTS subsections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(section_id, name)
);

-- Core repo table
CREATE TABLE IF NOT EXISTS repos (
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
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(fork_name, document_id)
);

-- Naming collisions from README
CREATE TABLE IF NOT EXISTS naming_collisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fork_name TEXT NOT NULL,
  upstream TEXT NOT NULL,
  description TEXT
);

-- Non-GitHub mirrors
CREATE TABLE IF NOT EXISTS mirrors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_name TEXT NOT NULL,
  upstream_source TEXT NOT NULL,
  github_mirror TEXT,
  description TEXT
);

-- OAuth token references (actual tokens stored in OS keychain)
CREATE TABLE IF NOT EXISTS auth_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL DEFAULT 'github',
  username TEXT NOT NULL,
  token_ref TEXT NOT NULL,
  scopes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Fork operation log
CREATE TABLE IF NOT EXISTS fork_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repo_id INTEGER REFERENCES repos(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Full-text search index for repos
CREATE VIRTUAL TABLE IF NOT EXISTS repos_fts USING fts5(
  fork_name,
  display_name,
  upstream_url,
  description,
  build_cmd,
  use_case,
  note,
  content=repos,
  content_rowid=id
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS repos_ai AFTER INSERT ON repos BEGIN
  INSERT INTO repos_fts(rowid, fork_name, display_name, upstream_url, description, build_cmd, use_case, note)
  VALUES (new.id, new.fork_name, new.display_name, new.upstream_url, new.description, new.build_cmd, new.use_case, new.note);
END;

CREATE TRIGGER IF NOT EXISTS repos_ad AFTER DELETE ON repos BEGIN
  INSERT INTO repos_fts(repos_fts, rowid, fork_name, display_name, upstream_url, description, build_cmd, use_case, note)
  VALUES ('delete', old.id, old.fork_name, old.display_name, old.upstream_url, old.description, old.build_cmd, old.use_case, old.note);
END;

CREATE TRIGGER IF NOT EXISTS repos_au AFTER UPDATE ON repos BEGIN
  INSERT INTO repos_fts(repos_fts, rowid, fork_name, display_name, upstream_url, description, build_cmd, use_case, note)
  VALUES ('delete', old.id, old.fork_name, old.display_name, old.upstream_url, old.description, old.build_cmd, old.use_case, old.note);
  INSERT INTO repos_fts(rowid, fork_name, display_name, upstream_url, description, build_cmd, use_case, note)
  VALUES (new.id, new.fork_name, new.display_name, new.upstream_url, new.description, new.build_cmd, new.use_case, new.note);
END;

-- Updated-at trigger
CREATE TRIGGER IF NOT EXISTS repos_updated AFTER UPDATE ON repos BEGIN
  UPDATE repos SET updated_at = datetime('now') WHERE id = new.id;
END;
