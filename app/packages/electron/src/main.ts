import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { initDatabase } from './db/connection';
import { registerRepoHandlers } from './ipc/repo-handlers';
import { registerCategoryHandlers } from './ipc/category-handlers';
import { registerAuthHandlers } from './ipc/auth-handlers';
import { registerForkHandlers } from './ipc/fork-handlers';
import { registerExportHandlers } from './ipc/export-handlers';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'GitGael',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // In development, load from Vite dev server
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

// Vite dev server URL is injected by electron-forge
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

app.on('ready', () => {
  // Initialize database
  const dbPath = path.join(app.getPath('userData'), 'gitgael.db');
  const db = initDatabase(dbPath);

  // Register all IPC handlers
  registerRepoHandlers(db);
  registerCategoryHandlers(db);
  registerAuthHandlers();
  registerForkHandlers(db);
  registerExportHandlers(db);

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
