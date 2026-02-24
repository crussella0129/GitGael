import { useState, useCallback } from 'react';
import { useRepoStore } from '../hooks/useRepos';
import { useNavStore } from '../hooks/useNav';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { searchRepos, clearSearch } = useRepoStore();
  const { goToSearch, goHome } = useNavStore();

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.trim()) {
        searchRepos(value);
        goToSearch();
      } else {
        clearSearch();
      }
    },
    [searchRepos, clearSearch, goToSearch]
  );

  const handleClear = () => {
    setQuery('');
    clearSearch();
    goHome();
  };

  return (
    <div className="flex-1 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search all repos..."
        className="w-full px-3.5 py-1.5 bg-gray-900/60 border border-gray-800/60 rounded-md text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-800/60 transition-colors"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 text-xs"
        >
          \u2715
        </button>
      )}
    </div>
  );
}
