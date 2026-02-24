import { useState } from 'react';
import { useRepoStore } from '../hooks/useRepos';
import { useNavStore } from '../hooks/useNav';
import { RepoDetail } from './RepoDetail';
import type { Repo } from '@gitgael/shared';

export function SearchResults() {
  const { searchResults } = useRepoStore();
  const { goHome } = useNavStore();
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <button onClick={goHome} className="hover:text-emerald-400 transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-300">Search Results</span>
        </div>

        <div className="text-sm text-gray-400 mb-4">
          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
        </div>

        {searchResults.length === 0 ? (
          <div className="text-gray-600 text-sm mt-8 text-center">No results found</div>
        ) : (
          <div className="space-y-2">
            {searchResults.map((result) => (
              <button
                key={result.repo.id}
                onClick={() => setSelectedRepo(result.repo)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedRepo?.id === result.repo.id
                    ? 'bg-gray-900 border-emerald-800/50'
                    : 'bg-gray-900/40 border-gray-800/40 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-medium text-gray-200">{result.repo.display_name}</h3>
                </div>
                <code className="text-xs text-emerald-500/80">{result.repo.fork_name}</code>
                {result.repo.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{result.repo.description}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedRepo && (
        <div className="w-[380px] border-l border-gray-800/60 overflow-y-auto bg-gray-950">
          <RepoDetail repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </div>
      )}
    </div>
  );
}
