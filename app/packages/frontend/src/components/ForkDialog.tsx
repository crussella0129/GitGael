import { useState, useMemo } from 'react';
import { invoke } from '../lib/ipc-bridge';
import { IPC } from '@gitgael/shared';
import { useRepoStore } from '../hooks/useRepos';
import { useAuthStore } from '../hooks/useAuth';
import type { ForkRequest, ForkResult, CategoryNode, SectionNode } from '@gitgael/shared';

interface ForkDialogProps {
  onClose: () => void;
}

/** Extract org/repo from various URL formats (GitHub, GitLab, Codeberg, .git, etc.) */
function parseRepoUrl(raw: string): { org: string; repo: string; normalized: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Handle org/repo shorthand (no protocol)
  const shorthand = trimmed.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?$/);
  if (shorthand) {
    return { org: shorthand[1], repo: shorthand[2], normalized: `https://github.com/${shorthand[1]}/${shorthand[2]}` };
  }

  try {
    const url = new URL(trimmed);
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const org = parts[0];
      const repo = parts[1].replace(/\.git$/, '');
      return { org, repo, normalized: `${url.origin}/${org}/${repo}` };
    }
  } catch {
    // Not a valid URL
  }

  return null;
}

export function ForkDialog({ onClose }: ForkDialogProps) {
  // Form fields
  const [repoUrl, setRepoUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [docsUrl, setDocsUrl] = useState('');
  const [installCmd, setInstallCmd] = useState('');
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [forkToGithub, setForkToGithub] = useState(true);

  // New category / section inline creation
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showNewSection, setShowNewSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  // Status
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { categoryTree, fetchRepos, fetchCategoryTree } = useRepoStore();
  const { status: authStatus } = useAuthStore();

  // Auto-populate display name from URL
  const parsed = useMemo(() => parseRepoUrl(repoUrl), [repoUrl]);

  const handleUrlBlur = () => {
    if (parsed && !displayName) {
      setDisplayName(parsed.repo);
    }
  };

  // Sections for the selected document
  const selectedCategory = categoryTree.find((c: CategoryNode) => c.document.id === documentId);
  const sections = selectedCategory?.sections ?? [];

  // Validation
  const urlValid = repoUrl.trim().length > 0 && parsed !== null;
  const nameValid = displayName.trim().length > 0;
  const categoryValid = documentId !== null;
  const descriptionValid = description.trim().length > 0;
  const canSubmit = urlValid && nameValid && categoryValid && descriptionValid && status !== 'saving';

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const result = await invoke<{ id: number; doc_number: number }>(IPC.CATEGORY_CREATE as any, {
        title: newCategoryName.trim(),
      });
      await fetchCategoryTree();
      setDocumentId(result.id);
      setShowNewCategory(false);
      setNewCategoryName('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  const handleCreateSection = async () => {
    if (!newSectionName.trim() || !documentId) return;
    try {
      const result = await invoke<{ id: number }>(IPC.SECTION_CREATE as any, {
        document_id: documentId,
        name: newSectionName.trim(),
      });
      await fetchCategoryTree();
      setSectionId(result.id);
      setShowNewSection(false);
      setNewSectionName('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit || !parsed) return;

    setStatus('saving');
    setErrorMsg('');

    try {
      const request: ForkRequest = {
        url: parsed.normalized,
        document_id: documentId!,
        section_id: sectionId ?? undefined,
        display_name: displayName.trim(),
        description: description.trim(),
        docs_url: docsUrl.trim() || undefined,
        install_cmd: installCmd.trim() || undefined,
      };

      if (forkToGithub && authStatus.authenticated) {
        // Fork to GitHub + save to catalog
        const result = await invoke<ForkResult>(IPC.GITHUB_FORK, request);
        if (result.success) {
          setStatus('success');
          fetchRepos();
          setTimeout(onClose, 1500);
        } else {
          setStatus('error');
          setErrorMsg(result.error ?? 'Fork failed');
        }
      } else {
        // Save to catalog only (no fork)
        const result = await invoke<ForkResult>(IPC.GITHUB_FORK, request);
        if (result.success) {
          setStatus('success');
          fetchRepos();
          setTimeout(onClose, 1500);
        } else {
          setStatus('error');
          setErrorMsg(result.error ?? 'Save failed');
        }
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg w-[560px] max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-200 mb-1">Add Repository</h2>
        <p className="text-xs text-gray-500 mb-4">All entries follow the GitGael catalog format.</p>

        {!authStatus.authenticated && (
          <div className="mb-4 px-3 py-2 bg-yellow-900/30 border border-yellow-800 rounded text-xs text-yellow-400">
            Connect GitHub to fork repos. Without auth, repos are saved to the catalog only.
          </div>
        )}

        {/* Repository URL */}
        <label className="block mb-3">
          <span className="text-xs text-gray-500">
            Repository URL <span className="text-red-400">*</span>
          </span>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="https://github.com/owner/repo  or  owner/repo  or  .git URL"
            className={`mt-1 w-full px-3 py-2 bg-gray-800 border rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none ${
              repoUrl && !urlValid ? 'border-red-600' : 'border-gray-700 focus:border-blue-600'
            }`}
          />
          {parsed && (
            <span className="text-xs text-gray-500 mt-1 block">
              Detected: <code className="text-blue-400">{parsed.org}/{parsed.repo}</code>
            </span>
          )}
          {repoUrl && !urlValid && (
            <span className="text-xs text-red-400 mt-1 block">
              Enter a valid URL (https://github.com/org/repo) or shorthand (org/repo)
            </span>
          )}
        </label>

        {/* Display Name */}
        <label className="block mb-3">
          <span className="text-xs text-gray-500">
            Display Name <span className="text-red-400">*</span>
          </span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Klipper, OpenMRS, GNU Radio"
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600"
          />
        </label>

        {/* Category */}
        <label className="block mb-1">
          <span className="text-xs text-gray-500">
            Category <span className="text-red-400">*</span>
          </span>
        </label>
        <div className="flex gap-2 mb-3">
          <select
            value={documentId ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '__new__') {
                setShowNewCategory(true);
                return;
              }
              setDocumentId(val ? Number(val) : null);
              setSectionId(null);
              setShowNewCategory(false);
            }}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 focus:outline-none focus:border-blue-600"
          >
            <option value="">Select category...</option>
            {categoryTree.map((cat: CategoryNode) => (
              <option key={cat.document.id} value={cat.document.id}>
                {String(cat.document.doc_number).padStart(2, '0')} — {cat.document.title}
              </option>
            ))}
            <option value="__new__">+ New Category...</option>
          </select>
        </div>

        {/* Inline new category creation */}
        {showNewCategory && (
          <div className="mb-3 p-3 bg-gray-800/60 border border-gray-700 rounded">
            <span className="text-xs text-gray-400 block mb-1">New Category Name</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Robotics"
                className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
              />
              <button
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded text-xs font-medium disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => { setShowNewCategory(false); setNewCategoryName(''); }}
                className="px-2 py-1.5 text-xs text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Section (within category) */}
        {documentId && sections.length > 0 && (
          <>
            <label className="block mb-1">
              <span className="text-xs text-gray-500">Section (optional)</span>
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={sectionId ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '__new__') {
                    setShowNewSection(true);
                    return;
                  }
                  setSectionId(val ? Number(val) : null);
                  setShowNewSection(false);
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 focus:outline-none focus:border-blue-600"
              >
                <option value="">No specific section</option>
                {sections.map((sec: SectionNode) => (
                  <option key={sec.section.id} value={sec.section.id}>
                    {sec.section.name}
                  </option>
                ))}
                <option value="__new__">+ New Section...</option>
              </select>
            </div>
          </>
        )}

        {/* Inline new section creation */}
        {showNewSection && documentId && (
          <div className="mb-3 p-3 bg-gray-800/60 border border-gray-700 rounded">
            <span className="text-xs text-gray-400 block mb-1">New Section Name</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g. Sensors, Motor Control"
                className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateSection()}
              />
              <button
                onClick={handleCreateSection}
                disabled={!newSectionName.trim()}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded text-xs font-medium disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => { setShowNewSection(false); setNewSectionName(''); }}
                className="px-2 py-1.5 text-xs text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Description */}
        <label className="block mb-3">
          <span className="text-xs text-gray-500">
            Description <span className="text-red-400">*</span>
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What does this tool do? One sentence is fine."
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600 resize-none"
          />
        </label>

        {/* Docs URL */}
        <label className="block mb-3">
          <span className="text-xs text-gray-500">Documentation URL</span>
          <input
            type="text"
            value={docsUrl}
            onChange={(e) => setDocsUrl(e.target.value)}
            placeholder="https://docs.example.org/"
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600"
          />
        </label>

        {/* Install Command */}
        <label className="block mb-4">
          <span className="text-xs text-gray-500">Install / Build Command</span>
          <input
            type="text"
            value={installCmd}
            onChange={(e) => setInstallCmd(e.target.value)}
            placeholder="e.g. pip install package  or  cmake -B build && make"
            className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-600 font-mono text-xs"
          />
        </label>

        {/* Preview of catalog entry */}
        {parsed && displayName && description && (
          <div className="mb-4 p-3 bg-gray-800/40 border border-gray-700 rounded">
            <span className="text-xs text-gray-500 block mb-2">Catalog entry preview:</span>
            <code className="text-xs text-gray-300 block whitespace-pre-wrap font-mono leading-relaxed">
              {`### ${displayName} → \`${parsed.org}/${parsed.repo}\`\n${description}`}
              {docsUrl ? `\n- **Docs**: ${docsUrl}` : ''}
              {installCmd ? `\n- **Install**: \`${installCmd}\`` : ''}
            </code>
          </div>
        )}

        {/* Fork toggle */}
        {authStatus.authenticated && (
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={forkToGithub}
              onChange={(e) => setForkToGithub(e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-blue-600"
            />
            <span className="text-xs text-gray-400">Fork to GitHub (set as private)</span>
          </label>
        )}

        {/* Status messages */}
        {status === 'success' && (
          <div className="mb-3 px-3 py-2 bg-green-900/30 border border-green-800 rounded text-xs text-green-400">
            Repository added to catalog!
          </div>
        )}
        {status === 'error' && (
          <div className="mb-3 px-3 py-2 bg-red-900/30 border border-red-800 rounded text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-600">
            <span className="text-red-400">*</span> Required fields
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'saving'
                ? 'Saving...'
                : forkToGithub && authStatus.authenticated
                  ? 'Fork & Add'
                  : 'Add to Catalog'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
