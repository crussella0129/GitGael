import { create } from 'zustand';
import { invoke } from '../lib/ipc-bridge';
import { IPC } from '@gitgael/shared';
import type {
  Repo,
  RepoListResponse,
  SearchResult,
  CategoryNode,
  RepoListRequest,
  RepoSearchRequest,
} from '@gitgael/shared';

interface RepoStore {
  repos: Repo[];
  total: number;
  searchResults: SearchResult[];
  categoryTree: CategoryNode[];
  selectedDocId: number | null;
  selectedSectionId: number | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchRepos: (filter?: RepoListRequest) => Promise<void>;
  searchRepos: (query: string, documentId?: number) => Promise<void>;
  fetchCategoryTree: () => Promise<void>;
  selectDocument: (docId: number | null) => void;
  selectSection: (sectionId: number | null) => void;
  clearSearch: () => void;
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  repos: [],
  total: 0,
  searchResults: [],
  categoryTree: [],
  selectedDocId: null,
  selectedSectionId: null,
  loading: false,
  error: null,

  fetchRepos: async (filter?: RepoListRequest) => {
    set({ loading: true, error: null });
    try {
      const result = await invoke<RepoListResponse>(IPC.REPO_LIST, filter);
      set({ repos: result.repos, total: result.total, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  searchRepos: async (query: string, documentId?: number) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    set({ loading: true, error: null });
    try {
      const payload: RepoSearchRequest = { query, document_id: documentId };
      const results = await invoke<SearchResult[]>(IPC.REPO_SEARCH, payload);
      set({ searchResults: results, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false });
    }
  },

  fetchCategoryTree: async () => {
    try {
      const tree = await invoke<CategoryNode[]>(IPC.CATEGORY_TREE);
      set({ categoryTree: tree });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  selectDocument: (docId: number | null) => {
    set({ selectedDocId: docId, selectedSectionId: null });
    get().fetchRepos(docId ? { document_id: docId } : undefined);
  },

  selectSection: (sectionId: number | null) => {
    set({ selectedSectionId: sectionId });
    const { selectedDocId } = get();
    get().fetchRepos({
      document_id: selectedDocId ?? undefined,
      section_id: sectionId ?? undefined,
    });
  },

  clearSearch: () => set({ searchResults: [] }),
}));
