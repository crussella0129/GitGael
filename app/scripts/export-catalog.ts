/**
 * Export public JSON catalog from database.
 *
 * Usage: npx tsx scripts/export-catalog.ts [--db-path ./gitgael.db] [--output ./catalog.json]
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Database from 'better-sqlite3';
import { buildCatalog } from '@gitgael/shared';
import type { Repo, Document, Section } from '@gitgael/shared';

const args = process.argv.slice(2);
const dbPath = getArg('--db-path') ?? './gitgael.db';
const outputPath = getArg('--output') ?? './gitgael-catalog.json';

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const db = new Database(dbPath, { readonly: true });

const repos = db.prepare('SELECT * FROM repos ORDER BY sort_order').all() as Repo[];
const documents = db.prepare('SELECT * FROM documents ORDER BY sort_order').all() as Document[];
const sections = db.prepare('SELECT * FROM sections ORDER BY sort_order').all() as Section[];

const catalog = buildCatalog(
  repos.map((r) => ({
    ...r,
    is_private: Boolean(r.is_private),
    is_mirror: Boolean(r.is_mirror),
    extra_metadata: r.extra_metadata ? JSON.parse(r.extra_metadata as string) : {},
  })) as Repo[],
  documents,
  sections
);

writeFileSync(outputPath, JSON.stringify(catalog, null, 2), 'utf-8');
console.log(`Exported catalog: ${catalog.total_repos} repos → ${outputPath}`);

db.close();
