import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Read the schema SQL file */
export function getSchema(): string {
  return readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
}

export const SCHEMA_PATH = join(__dirname, 'schema.sql');
