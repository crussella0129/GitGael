/**
 * Generate markdown docs from database.
 *
 * Usage: npx tsx scripts/generate-docs.ts [--db-path ./gitgael.db] [--output-dir ../docs]
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import Database from 'better-sqlite3';
import { generateAllDocuments } from '@gitgael/shared';
import type { Document, Section, Subsection, Repo } from '@gitgael/shared';

const args = process.argv.slice(2);
const dbPath = getArg('--db-path') ?? './gitgael.db';
const outputDir = getArg('--output-dir') ?? resolve(__dirname, '../../docs');

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const db = new Database(dbPath, { readonly: true });

const documents = db
  .prepare('SELECT * FROM documents ORDER BY sort_order, doc_number')
  .all() as Document[];

const docData = documents.map((doc) => {
  const sections = db
    .prepare('SELECT * FROM sections WHERE document_id = ? ORDER BY sort_order')
    .all(doc.id) as Section[];

  return {
    document: doc,
    sections: sections.map((sec) => {
      const repos = db
        .prepare('SELECT * FROM repos WHERE section_id = ? AND subsection_id IS NULL ORDER BY sort_order')
        .all(sec.id) as Repo[];

      const subsections = db
        .prepare('SELECT * FROM subsections WHERE section_id = ? ORDER BY sort_order')
        .all(sec.id) as Subsection[];

      return {
        section: sec,
        repos: repos.map(parseRow),
        subsections: subsections.map((sub) => {
          const subRepos = db
            .prepare('SELECT * FROM repos WHERE subsection_id = ? ORDER BY sort_order')
            .all(sub.id) as Repo[];
          return {
            subsection: sub,
            repos: subRepos.map(parseRow),
          };
        }),
      };
    }),
  };
});

const files = generateAllDocuments(docData);

mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  const outPath = join(outputDir, file.filename);
  writeFileSync(outPath, file.content, 'utf-8');
  console.log(`Written: ${outPath}`);
}

console.log(`\nGenerated ${files.length} markdown files in ${outputDir}`);
db.close();

function parseRow(row: Record<string, unknown>): Repo {
  return {
    ...row,
    is_private: Boolean(row.is_private),
    is_mirror: Boolean(row.is_mirror),
    extra_metadata: row.extra_metadata ? JSON.parse(row.extra_metadata as string) : {},
  } as Repo;
}
