import { useRepoStore } from '../hooks/useRepos';
import { RepoCard } from './RepoCard';
import type { Repo } from '@gitgael/shared';

interface RepoListProps {
  onSelect: (repo: Repo) => void;
}

export function RepoList({ onSelect }: RepoListProps) {
  const { repos, searchResults, loading, total } = useRepoStore();

  const displayRepos = searchResults.length > 0 ? searchResults.map((r) => r.repo) : repos;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  if (displayRepos.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        No repos found
      </div>
    );
  }

  return (
    <div>
      <div className="text-xs text-gray-500 mb-3">
        {searchResults.length > 0
          ? `${searchResults.length} search results`
          : `${total} repos`}
      </div>
      <div className="grid gap-2">
        {displayRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} onClick={() => onSelect(repo)} />
        ))}
      </div>
    </div>
  );
}
