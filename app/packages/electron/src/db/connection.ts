import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

let db: Database.Database | null = null;

export function initDatabase(dbPath: string): Database.Database {
  db = new Database(dbPath);

  // Enable WAL mode and foreign keys
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Run schema
  const schemaPath = join(dirname(require.resolve('@gitgael/shared')), 'db', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  // Split and execute schema statements (SQLite doesn't support multi-statement exec easily)
  const statements = schema
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('PRAGMA'));

  for (const stmt of statements) {
    try {
      db.exec(stmt + ';');
    } catch {
      // Table/trigger might already exist — that's fine
    }
  }

  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error('Database not initialized');
  return db;
}
