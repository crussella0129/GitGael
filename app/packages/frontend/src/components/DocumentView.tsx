import { useEffect, useState, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { invoke } from '../lib/ipc-bridge';
import { useRepoStore } from '../hooks/useRepos';
import { useNavStore } from '../hooks/useNav';
import { RepoDetail } from './RepoDetail';
import type { Repo, CategoryNode } from '@gitgael/shared';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

interface Props {
  docId: number;
}

export function DocumentView({ docId }: Props) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [docInfo, setDocInfo] = useState<{ title: string; filename: string; description: string } | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [tab, setTab] = useState<'guide' | 'repos'>('guide');
  const { repos, total, fetchRepos, categoryTree } = useRepoStore();
  const { view, goHome } = useNavStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionSlug = view.type === 'document' ? view.sectionSlug : undefined;
  const scrollKey = view.type === 'document' ? view.scrollKey : undefined;

  // Scroll to section when sectionSlug changes, offset for sticky header
  const scrollToSection = useCallback((slug: string) => {
    const scrollContainer = contentRef.current?.closest('.overflow-y-auto');
    if (!scrollContainer) return;
    setTimeout(() => {
      const el = contentRef.current?.querySelector(`[id="${slug}"]`);
      if (el) {
        const headerHeight = 72; // sticky header height
        const elTop = el.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top + scrollContainer.scrollTop;
        scrollContainer.scrollTo({ top: elTop - headerHeight, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  useEffect(() => {
    // Find the document info from category tree
    const node = categoryTree.find((n: CategoryNode) => n.document.id === docId);
    if (node) {
      setDocInfo({
        title: node.document.title,
        filename: node.document.filename,
        description: node.document.description || '',
      });

      // Load the markdown content
      invoke<string | null>('docs:content' as any, node.document.filename).then((content) => {
        setMarkdown(content);
      });
    }

    // Load repos for this document
    fetchRepos({ document_id: docId });
    // Switch to guide tab when navigating to a section
    if (sectionSlug) setTab('guide');
  }, [docId, categoryTree, fetchRepos, sectionSlug]);

  // Scroll to anchor after markdown loads or when section changes
  useEffect(() => {
    if (sectionSlug && markdown) {
      scrollToSection(sectionSlug);
    }
  }, [sectionSlug, scrollKey, markdown, scrollToSection]);

  if (!docInfo) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Breadcrumb + Header */}
        <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800/40 px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <button onClick={goHome} className="hover:text-emerald-400 transition-colors">Home</button>
            <span>/</span>
            <span className="text-gray-300">{docInfo.title}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-100">{docInfo.title}</h1>
            <div className="flex items-center gap-1 bg-gray-900 rounded-md p-0.5">
              <TabButton active={tab === 'guide'} onClick={() => setTab('guide')}>
                Guide
              </TabButton>
              <TabButton active={tab === 'repos'} onClick={() => setTab('repos')}>
                Repos ({total})
              </TabButton>
            </div>
          </div>
        </div>

        {tab === 'guide' ? (
          /* Markdown content */
          <div className="px-6 py-6 max-w-4xl" ref={contentRef}>
            {markdown ? (
              <article className="prose prose-invert prose-sm max-w-none
                prose-headings:text-gray-200 prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-800 prose-h1:pb-3
                prose-h2:text-lg prose-h2:text-emerald-400 prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-base prose-h3:text-gray-200 prose-h3:mt-6
                prose-p:text-gray-400 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                prose-code:text-emerald-300 prose-code:bg-gray-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-normal
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                prose-strong:text-gray-200
                prose-li:text-gray-400
                prose-table:text-sm prose-th:text-gray-300 prose-th:bg-gray-900 prose-td:text-gray-400 prose-td:border-gray-800 prose-th:border-gray-800
                prose-hr:border-gray-800
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children, ...props }) => {
                      const text = String(children);
                      return <h1 id={slugify(text)} {...props}>{children}</h1>;
                    },
                    h2: ({ children, ...props }) => {
                      const text = String(children);
                      return <h2 id={slugify(text)} {...props}>{children}</h2>;
                    },
                    h3: ({ children, ...props }) => {
                      const text = String(children);
                      return <h3 id={slugify(text)} {...props}>{children}</h3>;
                    },
                  }}
                >{markdown}</ReactMarkdown>
              </article>
            ) : (
              <div className="text-gray-500 text-sm">Loading document...</div>
            )}
          </div>
        ) : (
          /* Repo list */
          <div className="px-6 py-4">
            <div className="space-y-2">
              {repos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedRepo?.id === repo.id
                      ? 'bg-gray-900 border-emerald-800/50'
                      : 'bg-gray-900/40 border-gray-800/40 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-medium text-gray-200">{repo.display_name}</h3>
                    {repo.docs_url && (
                      <span className="text-[10px] text-blue-400/60 bg-blue-400/10 px-1.5 py-0.5 rounded">docs</span>
                    )}
                  </div>
                  <code className="text-xs text-emerald-500/80">{repo.fork_name}</code>
                  {repo.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{repo.description}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedRepo && (
        <div className="w-[380px] border-l border-gray-800/60 overflow-y-auto bg-gray-950">
          <RepoDetail repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded transition-colors ${
        active
          ? 'bg-gray-800 text-gray-200'
          : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {children}
    </button>
  );
}
