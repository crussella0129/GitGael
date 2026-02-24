import { useState, useEffect } from 'react';
import { useRepoStore } from '../hooks/useRepos';
import { useAuthStore } from '../hooks/useAuth';
import { useNavStore } from '../hooks/useNav';
import type { CategoryNode, SectionNode } from '@gitgael/shared';

export function Sidebar() {
  const { categoryTree } = useRepoStore();
  const { status, startAuth, logout, loading: authLoading } = useAuthStore();
  const { view, goHome, goToDocument } = useNavStore();
  const [expandedDocs, setExpandedDocs] = useState<Set<number>>(new Set());

  const activeDocId = view.type === 'document' ? view.docId : null;

  // Auto-expand the active document's section (e.g. when navigating from Home)
  useEffect(() => {
    if (activeDocId !== null) {
      setExpandedDocs((prev) => {
        if (prev.has(activeDocId)) return prev;
        const next = new Set(prev);
        next.add(activeDocId);
        return next;
      });
    }
  }, [activeDocId]);

  const toggleDoc = (docId: number) => {
    setExpandedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) next.delete(docId);
      else next.add(docId);
      return next;
    });
  };

  return (
    <aside className="w-60 bg-gray-900/50 border-r border-gray-800/50 flex flex-col overflow-hidden">
      {/* Logo */}
      <button
        onClick={goHome}
        className="p-4 border-b border-gray-800/50 text-left hover:bg-gray-800/30 transition-colors"
      >
        <h1 className="text-base font-bold text-emerald-500 tracking-tight">GitGael</h1>
        <p className="text-[10px] text-gray-600 mt-0.5 tracking-wide uppercase">Survival Computing Archive</p>
      </button>

      {/* Nav tree */}
      <nav className="flex-1 overflow-y-auto py-1.5">
        {/* Home link */}
        <button
          onClick={goHome}
          className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
            view.type === 'home'
              ? 'text-emerald-400 bg-emerald-400/5'
              : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
          }`}
        >
          Overview
        </button>

        <div className="h-px bg-gray-800/40 my-1.5" />

        {categoryTree.map((cat: CategoryNode) => {
          const isActive = activeDocId === cat.document.id;
          const isExpanded = expandedDocs.has(cat.document.id);

          return (
            <div key={cat.document.id}>
              <button
                onClick={() => {
                  toggleDoc(cat.document.id);
                  goToDocument(cat.document.id);
                }}
                className={`w-full text-left px-4 py-1.5 text-[13px] flex items-center justify-between transition-colors ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-400/5'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                }`}
              >
                <span className="truncate">
                  <span className="text-gray-600 text-xs font-mono mr-1.5">
                    {String(cat.document.doc_number).padStart(2, '0')}
                  </span>
                  {cat.document.title}
                </span>
                <span className="text-[10px] text-gray-600 ml-1 tabular-nums">{cat.repo_count}</span>
              </button>

              {isExpanded && cat.sections.length > 0 && (
                <div className="pb-1">
                  {cat.sections.map((sec: SectionNode) => {
                    const slug = sec.section.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
                    return (
                      <button
                        key={sec.section.id}
                        onClick={() => goToDocument(cat.document.id, slug)}
                        className="w-full text-left pl-10 pr-4 py-1 text-xs text-gray-600 hover:text-gray-400 transition-colors truncate"
                      >
                        {sec.section.name}
                        <span className="text-gray-700 ml-1">({sec.repo_count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Auth */}
      <div className="p-3 border-t border-gray-800/50">
        {status.authenticated ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 truncate">{status.username}</span>
            <button
              onClick={logout}
              className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={startAuth}
            disabled={authLoading}
            className="w-full px-3 py-1.5 bg-gray-800/60 hover:bg-gray-800 rounded text-xs text-gray-400 transition-colors disabled:opacity-50"
          >
            {authLoading ? 'Connecting...' : 'Connect GitHub'}
          </button>
        )}
      </div>
    </aside>
  );
}
