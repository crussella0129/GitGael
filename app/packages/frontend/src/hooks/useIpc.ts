import { useState, useCallback } from 'react';
import { invoke } from '../lib/ipc-bridge';
import type { IpcChannel } from '@gitgael/shared';

interface UseIpcState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useIpc<T>(channel: IpcChannel) {
  const [state, setState] = useState<UseIpcState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const call = useCallback(
    async (payload?: unknown): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await invoke<T>(channel, payload);
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        setState((prev) => ({ ...prev, loading: false, error }));
        return null;
      }
    },
    [channel]
  );

  return { ...state, call };
}
