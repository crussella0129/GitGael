/**
 * Migration script: Parse all docs/*.md files → seed SQLite database.
 *
 * Usage: npx tsx scripts/migrate.ts [--db-path ./gitgael.db] [--docs-dir ../docs]
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import Database from 'better-sqlite3';
import { parseAllDocuments, countRepos } from '@gitgael/shared';
import type { ParsedDocument, ParsedSection, ParsedSubsection, ParsedRepo } from '@gitgael/shared';

// --- CLI args ---
const args = process.argv.slice(2);
const dbPath = getArg('--db-path') ?? './gitgael.db';
const docsDir = getArg('--docs-dir') ?? resolve(__dirname, '../../docs');

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

// --- Main ---
console.log(`Migrating docs from: ${docsDir}`);
console.log(`Database path: ${dbPath}`);

// Read all markdown files
const mdFiles = readdirSync(docsDir)
  .filter((f) => f.endsWith('.md') && /^\d{2}-/.test(f))
  .sort()
  .map((filename) => ({
    filename,
    content: readFileSync(join(docsDir, filename), 'utf-8'),
  }));

console.log(`Found ${mdFiles.length} document files`);

// Parse all documents
const parsed = parseAllDocuments(mdFiles);
const totalRepos = countRepos(parsed);
console.log(`Parsed ${parsed.length} documents with ${totalRepos} total repos`);

// Initialize database
const schemaPath = resolve(__dirname, '../packages/shared/src/db/schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Execute schema
const statements = schema
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith('--'));

for (const stmt of statements) {
  try {
    db.exec(stmt + ';');
  } catch {
    // Already exists — fine
  }
}

// Clear existing data (for re-migration)
db.exec('DELETE FROM repos');
db.exec('DELETE FROM subsections');
db.exec('DELETE FROM sections');
db.exec('DELETE FROM documents');

// Insert documents
const insertDoc = db.prepare(
  'INSERT INTO documents (doc_number, filename, title, description, sort_order) VALUES (?, ?, ?, ?, ?)'
);
const insertSection = db.prepare(
  'INSERT INTO sections (document_id, name, sort_order) VALUES (?, ?, ?)'
);
const insertSubsection = db.prepare(
  'INSERT INTO subsections (section_id, name, sort_order) VALUES (?, ?, ?)'
);
const insertRepo = db.prepare(`
  INSERT INTO repos (
    fork_name, display_name, upstream_url, github_url,
    document_id, section_id, subsection_id,
    description, build_cmd, usage_cmd, install_cmd, docs_url,
    note, config_info, deps, features, use_case, hardware, warning, learn,
    extra_metadata, source_type, sort_order
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let repoCount = 0;

const migrate = db.transaction(() => {
  for (const doc of parsed) {
    const docResult = insertDoc.run(
      doc.doc_number,
      doc.filename,
      doc.title,
      doc.description,
      doc.doc_number * 10
    );
    const docId = docResult.lastInsertRowid;

    let sectionOrder = 0;
    for (const section of doc.sections) {
      const secResult = insertSection.run(docId, section.name, sectionOrder++);
      const secId = secResult.lastInsertRowid;

      // Insert section-level repos
      let repoOrder = 0;
      for (const repo of section.repos) {
        insertRepoRow(repo, docId, secId, null, repoOrder++);
        repoCount++;
      }

      // Insert subsections and their repos
      let subOrder = 0;
      for (const sub of section.subsections) {
        const subResult = insertSubsection.run(secId, sub.name, subOrder++);
        const subId = subResult.lastInsertRowid;

        for (const repo of sub.repos) {
          insertRepoRow(repo, docId, secId, subId, repoOrder++);
          repoCount++;
        }
      }
    }
  }
});

function insertRepoRow(
  repo: ParsedRepo,
  docId: number | bigint,
  secId: number | bigint,
  subId: number | bigint | null,
  sortOrder: number
) {
  const githubUrl = repo.fork_name.includes('/')
    ? `https://github.com/${repo.fork_name}`
    : null;

  insertRepo.run(
    repo.fork_name,
    repo.display_name,
    repo.upstream_url,
    githubUrl,
    docId,
    secId,
    subId,
    repo.description || null,
    repo.build_cmd,
    repo.usage_cmd,
    repo.install_cmd,
    repo.docs_url,
    repo.note,
    repo.config_info,
    repo.deps,
    repo.features,
    repo.use_case,
    repo.hardware,
    repo.warning,
    repo.learn,
    JSON.stringify(repo.extra_fields),
    'github_fork',
    sortOrder
  );
}

migrate();

console.log(`\nMigration complete!`);
console.log(`  Documents: ${parsed.length}`);
console.log(`  Repos inserted: ${repoCount}`);

// Also migrate naming collisions from README
const readmePath = join(docsDir, '..', 'README.md');
if (existsSync(readmePath)) {
  const readmeContent = readFileSync(readmePath, 'utf-8');
  migrateCollisions(db, readmeContent);
  migrateMirrors(db, readmeContent);
}

db.close();
console.log('Database closed.');

function migrateCollisions(db: Database.Database, readme: string) {
  const insertCollision = db.prepare(
    'INSERT INTO naming_collisions (fork_name, upstream, description) VALUES (?, ?, ?)'
  );
  db.exec('DELETE FROM naming_collisions');

  // Parse the naming collisions table
  const lines = readme.split('\n');
  let inTable = false;
  let count = 0;

  for (const line of lines) {
    if (line.includes('Fork Name') && line.includes('Upstream')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('|---')) continue;
    if (inTable && line.startsWith('|')) {
      const cells = line
        .split('|')
        .filter((c) => c.trim())
        .map((c) => c.trim().replace(/`/g, ''));
      if (cells.length >= 3) {
        insertCollision.run(cells[0], cells[1], cells[2]);
        count++;
      }
    } else if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }

  console.log(`  Naming collisions: ${count}`);
}

function migrateMirrors(db: Database.Database, readme: string) {
  const insertMirror = db.prepare(
    'INSERT INTO mirrors (project_name, upstream_source, description) VALUES (?, ?, ?)'
  );
  db.exec('DELETE FROM mirrors');

  const lines = readme.split('\n');
  let inTable = false;
  let count = 0;

  for (const line of lines) {
    if (line.includes('Project') && line.includes('Source') && line.includes('Why You Need It')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('|---')) continue;
    if (inTable && line.startsWith('|')) {
      const cells = line
        .split('|')
        .filter((c) => c.trim())
        .map((c) => c.replace(/\*\*/g, '').trim());
      if (cells.length >= 3) {
        insertMirror.run(cells[0], cells[1], cells[2]);
        count++;
      }
    } else if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }

  console.log(`  Mirrors: ${count}`);
}
