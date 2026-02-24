import { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { DocumentView } from './components/DocumentView';
import { SearchResults } from './components/SearchResults';
import { SearchBar } from './components/SearchBar';
import { ForkDialog } from './components/ForkDialog';
import { useRepoStore } from './hooks/useRepos';
import { useAuthStore } from './hooks/useAuth';
import { useNavStore } from './hooks/useNav';

export function App() {
  const { fetchCategoryTree } = useRepoStore();
  const { checkAuth } = useAuthStore();
  const { view, forkDialogOpen, closeForkDialog } = useNavStore();

  useEffect(() => {
    fetchCategoryTree();
    checkAuth();
  }, [fetchCategoryTree, checkAuth]);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-5 py-3 border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-sm">
          <SearchBar />
          <button
            onClick={() => useNavStore.getState().openForkDialog()}
            className="shrink-0 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-md text-sm font-medium transition-colors"
          >
            + Add Repo
          </button>
        </header>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {view.type === 'home' && <Home />}
          {view.type === 'document' && <DocumentView docId={view.docId} />}
          {view.type === 'search' && <SearchResults />}
        </div>
      </main>

      {forkDialogOpen && <ForkDialog onClose={closeForkDialog} />}
    </div>
  );
}
