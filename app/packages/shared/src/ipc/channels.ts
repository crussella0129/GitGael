// IPC channel names — identical for Electron and Tauri

export const IPC = {
  // Repo CRUD
  REPO_LIST: 'repo:list',
  REPO_GET: 'repo:get',
  REPO_SEARCH: 'repo:search',
  REPO_CREATE: 'repo:create',
  REPO_UPDATE: 'repo:update',
  REPO_DELETE: 'repo:delete',

  // Category tree
  CATEGORY_TREE: 'category:tree',
  CATEGORY_CREATE: 'category:create',
  SECTION_CREATE: 'category:section:create',

  // GitHub auth
  AUTH_START: 'github:auth:start',
  AUTH_STATUS: 'github:auth:status',
  AUTH_LOGOUT: 'github:auth:logout',

  // Fork workflow
  GITHUB_FORK: 'github:fork',

  // Export
  EXPORT_CATALOG: 'export:catalog',
  EXPORT_MARKDOWN: 'export:markdown',
} as const;

export type IpcChannel = (typeof IPC)[keyof typeof IPC];
