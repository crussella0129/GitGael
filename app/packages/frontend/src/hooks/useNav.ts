import { create } from 'zustand';

type View =
  | { type: 'home' }
  | { type: 'document'; docId: number; sectionSlug?: string; scrollKey?: number }
  | { type: 'search' };

interface NavStore {
  view: View;
  forkDialogOpen: boolean;

  goHome: () => void;
  goToDocument: (docId: number, sectionSlug?: string) => void;
  goToSearch: () => void;
  openForkDialog: () => void;
  closeForkDialog: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  view: { type: 'home' },
  forkDialogOpen: false,

  goHome: () => set({ view: { type: 'home' } }),
  goToDocument: (docId, sectionSlug) => set({ view: { type: 'document', docId, sectionSlug, scrollKey: Date.now() } }),
  goToSearch: () => set({ view: { type: 'search' } }),
  openForkDialog: () => set({ forkDialogOpen: true }),
  closeForkDialog: () => set({ forkDialogOpen: false }),
}));
