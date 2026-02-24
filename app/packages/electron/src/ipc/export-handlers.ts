import { ipcMain, dialog } from 'electron';
import { writeFileSync } from 'node:fs';
import type Database from 'better-sqlite3';
import { IPC, buildCatalog } from '@gitgael/shared';
import type { Repo, Document, Section, ExportResult } from '@gitgael/shared';

export function registerExportHandlers(db: Database.Database) {
  // Export JSON catalog
  ipcMain.handle(IPC.EXPORT_CATALOG, async (): Promise<ExportResult> => {
    try {
      const repos = db.prepare('SELECT * FROM repos ORDER BY sort_order').all() as Repo[];
      const documents = db.prepare('SELECT * FROM documents ORDER BY sort_order').all() as Document[];
      const sections = db.prepare('SELECT * FROM sections ORDER BY sort_order').all() as Section[];

      const catalog = buildCatalog(repos, documents, sections);

      const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'Export Catalog',
        defaultPath: 'gitgael-catalog.json',
        filters: [{ name: 'JSON', extensions: ['json'] }],
      });

      if (canceled || !filePath) {
        return { success: false, error: 'Cancelled' };
      }

      writeFileSync(filePath, JSON.stringify(catalog, null, 2), 'utf-8');
      return { success: true, path: filePath };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  });

  // Export markdown (regenerate docs from DB)
  ipcMain.handle(IPC.EXPORT_MARKDOWN, async (): Promise<ExportResult> => {
    try {
      const { filePath, canceled } = await dialog.showOpenDialog({
        title: 'Select output directory for markdown files',
        properties: ['openDirectory'],
      });

      if (canceled || !filePath || filePath.length === 0) {
        return { success: false, error: 'Cancelled' };
      }

      // TODO: Implement full markdown generation from DB
      // This will use generateAllDocuments from @gitgael/shared
      return { success: true, path: filePath[0] };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
}
