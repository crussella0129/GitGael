/**
 * Export catalog as JSON for public consumption.
 * Includes upstream_url so anyone can rebuild the collection.
 */

import type { Repo, Document, Section, CategoryNode } from '../ipc/types';

export interface CatalogEntry {
  name: string;
  fork_name: string;
  upstream_url: string | null;
  description: string | null;
  category: string;
  section: string;
  docs_url: string | null;
  build_cmd: string | null;
  source_type: string;
}

export interface CatalogExport {
  version: string;
  generated_at: string;
  total_repos: number;
  categories: Array<{
    name: string;
    doc_number: number;
    repos: CatalogEntry[];
  }>;
}

export function buildCatalog(
  repos: Repo[],
  documents: Document[],
  sections: Section[]
): CatalogExport {
  const docMap = new Map(documents.map((d) => [d.id, d]));
  const secMap = new Map(sections.map((s) => [s.id, s]));

  const byDoc = new Map<number, CatalogEntry[]>();

  for (const repo of repos) {
    const docId = repo.document_id ?? 0;
    const doc = docMap.get(docId);
    const sec = repo.section_id ? secMap.get(repo.section_id) : null;

    const entry: CatalogEntry = {
      name: repo.display_name,
      fork_name: repo.fork_name,
      upstream_url: repo.upstream_url,
      description: repo.description,
      category: doc?.title ?? 'Uncategorized',
      section: sec?.name ?? '',
      docs_url: repo.docs_url,
      build_cmd: repo.build_cmd,
      source_type: repo.source_type,
    };

    if (!byDoc.has(docId)) {
      byDoc.set(docId, []);
    }
    byDoc.get(docId)!.push(entry);
  }

  const categories = Array.from(byDoc.entries())
    .sort(([a], [b]) => a - b)
    .map(([docId, entries]) => {
      const doc = docMap.get(docId);
      return {
        name: doc?.title ?? 'Uncategorized',
        doc_number: doc?.doc_number ?? 0,
        repos: entries,
      };
    });

  return {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    total_repos: repos.length,
    categories,
  };
}
