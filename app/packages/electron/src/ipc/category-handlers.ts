import { ipcMain } from 'electron';
import type Database from 'better-sqlite3';
import { IPC } from '@gitgael/shared';
import type { CategoryNode, SectionNode, SubsectionNode, CategoryCreateRequest, SectionCreateRequest } from '@gitgael/shared';

export function registerCategoryHandlers(db: Database.Database) {
  // Create a new category (document)
  ipcMain.handle(IPC.CATEGORY_CREATE, (_event, req: CategoryCreateRequest) => {
    // Find the next available doc_number
    const maxRow = db.prepare('SELECT MAX(doc_number) as max_num FROM documents').get() as { max_num: number | null };
    const nextNum = (maxRow.max_num ?? 0) + 1;
    const paddedNum = String(nextNum).padStart(2, '0');
    const filename = `${paddedNum}-${req.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}.md`;

    const result = db.prepare(`
      INSERT INTO documents (doc_number, filename, title, description, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `).run(nextNum, filename, req.title, req.description ?? null, nextNum);

    return { id: Number(result.lastInsertRowid), doc_number: nextNum, filename };
  });

  // Create a new section within a document
  ipcMain.handle(IPC.SECTION_CREATE, (_event, req: SectionCreateRequest) => {
    const maxRow = db.prepare('SELECT MAX(sort_order) as max_sort FROM sections WHERE document_id = ?').get(req.document_id) as { max_sort: number | null };
    const nextSort = (maxRow.max_sort ?? 0) + 1;

    const result = db.prepare(`
      INSERT INTO sections (document_id, name, sort_order)
      VALUES (?, ?, ?)
    `).run(req.document_id, req.name, nextSort);

    return { id: Number(result.lastInsertRowid) };
  });

  ipcMain.handle(IPC.CATEGORY_TREE, () => {
    const documents = db
      .prepare('SELECT * FROM documents ORDER BY sort_order, doc_number')
      .all() as Array<Record<string, unknown>>;

    const tree: CategoryNode[] = documents.map((doc) => {
      const sections = db
        .prepare('SELECT * FROM sections WHERE document_id = ? ORDER BY sort_order')
        .all(doc.id) as Array<Record<string, unknown>>;

      const sectionNodes: SectionNode[] = sections.map((sec) => {
        const subsections = db
          .prepare('SELECT * FROM subsections WHERE section_id = ? ORDER BY sort_order')
          .all(sec.id) as Array<Record<string, unknown>>;

        const subNodes: SubsectionNode[] = subsections.map((sub) => {
          const { count } = db
            .prepare('SELECT COUNT(*) as count FROM repos WHERE subsection_id = ?')
            .get(sub.id) as { count: number };
          return {
            subsection: sub as unknown as SubsectionNode['subsection'],
            repo_count: count,
          };
        });

        const { count: secCount } = db
          .prepare('SELECT COUNT(*) as count FROM repos WHERE section_id = ?')
          .get(sec.id) as { count: number };

        return {
          section: sec as unknown as SectionNode['section'],
          subsections: subNodes,
          repo_count: secCount,
        };
      });

      const { count: docCount } = db
        .prepare('SELECT COUNT(*) as count FROM repos WHERE document_id = ?')
        .get(doc.id) as { count: number };

      return {
        document: doc as unknown as CategoryNode['document'],
        sections: sectionNodes,
        repo_count: docCount,
      };
    });

    return tree;
  });
}
