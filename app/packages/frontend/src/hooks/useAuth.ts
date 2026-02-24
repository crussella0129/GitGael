import { create } from 'zustand';
import { invoke } from '../lib/ipc-bridge';
import { IPC } from '@gitgael/shared';
import type { AuthStatus } from '@gitgael/shared';

interface AuthStore {
  status: AuthStatus;
  loading: boolean;

  checkAuth: () => Promise<void>;
  startAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: { authenticated: false, username: null, scopes: null },
  loading: false,

  checkAuth: async () => {
    try {
      const status = await invoke<AuthStatus>(IPC.AUTH_STATUS);
      set({ status });
    } catch {
      // Auth not available — stay unauthenticated
    }
  },

  startAuth: async () => {
    set({ loading: true });
    try {
      await invoke(IPC.AUTH_START);
      const status = await invoke<AuthStatus>(IPC.AUTH_STATUS);
      set({ status, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await invoke(IPC.AUTH_LOGOUT);
      set({ status: { authenticated: false, username: null, scopes: null } });
    } catch {
      // ignore
    }
  },
}));
