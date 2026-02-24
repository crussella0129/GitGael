/**
 * IPC Bridge — auto-detects Tauri vs Electron runtime and dispatches calls accordingly.
 *
 * Tauri: uses window.__TAURI__.invoke()
 * Electron: uses window.electronAPI (exposed via contextBridge)
 */

import type { IpcChannel } from '@gitgael/shared';

declare global {
  interface Window {
    __TAURI__?: {
      invoke: <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;
    };
    electronAPI?: {
      invoke: <T>(channel: string, ...args: unknown[]) => Promise<T>;
    };
  }
}

type Runtime = 'tauri' | 'electron' | 'web';

function detectRuntime(): Runtime {
  if (typeof window !== 'undefined' && window.__TAURI__) return 'tauri';
  if (typeof window !== 'undefined' && window.electronAPI) return 'electron';
  return 'web';
}

const runtime = detectRuntime();

export async function invoke<T>(channel: IpcChannel, payload?: unknown): Promise<T> {
  switch (runtime) {
    case 'tauri': {
      // Tauri expects command name without colons
      const cmd = channel.replace(/:/g, '_');
      return window.__TAURI__!.invoke<T>(cmd, payload as Record<string, unknown>);
    }
    case 'electron': {
      return window.electronAPI!.invoke<T>(channel, payload);
    }
    case 'web': {
      throw new Error(`IPC not available in web mode. Channel: ${channel}`);
    }
  }
}

export function getRuntime(): Runtime {
  return runtime;
}
