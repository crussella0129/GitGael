import type { Repo } from '@gitgael/shared';

interface RepoDetailProps {
  repo: Repo;
  onClose: () => void;
}

export function RepoDetail({ repo, onClose }: RepoDetailProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-200">{repo.display_name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          x
        </button>
      </div>

      <code className="block text-sm text-gitgael-500 mb-3">{repo.fork_name}</code>

      {repo.upstream_url && (
        <div className="mb-3">
          <span className="text-xs text-gray-500">Upstream: </span>
          <span className="text-xs text-gray-300">{repo.upstream_url}</span>
        </div>
      )}

      {repo.description && <p className="text-sm text-gray-400 mb-4">{repo.description}</p>}

      <div className="space-y-3">
        <DetailField label="Build" value={repo.build_cmd} mono />
        <DetailField label="Install" value={repo.install_cmd} mono />
        <DetailField label="Usage" value={repo.usage_cmd} mono />
        <DetailField label="Config" value={repo.config_info} mono />
        <DetailField label="Docs" value={repo.docs_url} link />
        <DetailField label="Dependencies" value={repo.deps} />
        <DetailField label="Use Case" value={repo.use_case} />
        <DetailField label="Hardware" value={repo.hardware} />
        <DetailField label="Warning" value={repo.warning} />
        <DetailField label="Note" value={repo.note} />
        <DetailField label="Learn" value={repo.learn} />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Status: {repo.fork_status}</span>
          <span>|</span>
          <span>{repo.is_private ? 'Private' : 'Public'}</span>
          <span>|</span>
          <span>Added: {new Date(repo.added_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
  mono,
  link,
}: {
  label: string;
  value: string | null;
  mono?: boolean;
  link?: boolean;
}) {
  if (!value) return null;

  return (
    <div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      {link ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 break-all"
        >
          {value}
        </a>
      ) : mono ? (
        <code className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded block whitespace-pre-wrap">
          {value}
        </code>
      ) : (
        <p className="text-sm text-gray-300">{value}</p>
      )}
    </div>
  );
}
