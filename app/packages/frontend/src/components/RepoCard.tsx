import type { Repo } from '@gitgael/shared';

interface RepoCardProps {
  repo: Repo;
  onClick: () => void;
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 bg-gray-900 border border-gray-800 rounded hover:border-gray-700 transition-colors"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-gray-200">{repo.display_name}</h3>
        <span className="text-xs text-gray-600">{repo.source_type}</span>
      </div>
      <code className="text-xs text-gitgael-500">{repo.fork_name}</code>
      {repo.description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{repo.description}</p>
      )}
      {repo.upstream_url && (
        <div className="text-xs text-gray-600 mt-1">upstream: {repo.upstream_url}</div>
      )}
    </button>
  );
}
