import { useEffect, useState } from 'react';
import { invoke } from '../lib/ipc-bridge';
import { useNavStore } from '../hooks/useNav';

interface Stats {
  totalRepos: number;
  totalDocs: number;
  totalCollisions: number;
  byDoc: Array<{
    doc_number: number;
    title: string;
    filename: string;
    repo_count: number;
  }>;
}

const SECTION_ICONS: Record<number, string> = {
  1: '\u2699',   // gear - System Foundation
  2: '\u{1F4BB}', // laptop - Languages
  3: '\u{1F6E0}', // wrench - Core Userland
  4: '\u{1F5A5}', // desktop - Desktop & GUI
  5: '\u{1F3A8}', // artist palette - GUI Enhancement & Ricing
  6: '\u{1F980}', // crab - Rust Desktop
  7: '\u{1FA7A}', // stethoscope - Medical & Health
  8: '\u{1F4A7}', // droplet - Water & Sanitation
  9: '\u{1F33F}', // herb - Survival & Agriculture
  10: '\u26A1',   // lightning - Energy & Power
  11: '\u{1F4E1}', // satellite - Communications
  12: '\u{1F6E1}', // shield - Security & Governance
  13: '\u{1F50D}', // magnifying glass - OSINT & Intelligence
  14: '\u{1F3ED}', // factory - Manufacturing
  15: '\u{1F4E6}', // package - 3D Printing
  16: '\u{1F4A0}', // diamond - Silicon Fabrication
  17: '\u{1F4DA}', // books - Offline Knowledge
  18: '\u{1F9E0}', // brain - AI/ML
  19: '\u{1F52C}', // microscope - Simulation
  20: '\u{1F3AE}', // game controller - Morale & Entertainment
};

const BUILD_ORDER = [
  'Hardware \u2192 Firmware (coreboot/u-boot) \u2192 Kernel (linux) \u2192 Init (systemd)',
  '\u2192 Toolchain (gcc/glibc/binutils) \u2192 Shell (bash/fish/nushell)',
  '\u2192 Build Systems (cmake/meson) \u2192 Core Utils (busybox/util-linux)',
  '\u2192 Networking (openssh/NetworkManager) \u2192 Display (wayland/xorg)',
  '\u2192 Desktop (Hyprland/COSMIC/sway) \u2192 Applications',
];

export function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { goToDocument } = useNavStore();

  useEffect(() => {
    invoke<Stats>('docs:stats' as any).then(setStats).catch(() => {});
  }, []);

  if (!stats) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          GitGael
          <span className="text-emerald-500 ml-2 text-lg font-normal">Survival Computing Archive</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          A curated archive of <span className="text-gray-200 font-semibold">{stats.totalRepos}+ private forks</span> containing
          everything needed to rebuild a complete computing stack from scratch — no internet required.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-6 mb-10">
        <StatCard label="Total Forks" value={stats.totalRepos} />
        <StatCard label="Sections" value={stats.totalDocs} />
        <StatCard label="Name Collisions" value={stats.totalCollisions} />
      </div>

      {/* Build Order */}
      <div className="mb-10 p-5 bg-gray-900/60 border border-gray-800/60 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Build Order</h2>
        <div className="font-mono text-sm text-emerald-400/90 leading-relaxed">
          {BUILD_ORDER.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-10 p-5 bg-gray-900/60 border border-gray-800/60 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">How to Use This Archive</h2>
        <ol className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-500 font-bold shrink-0">1.</span>
            <span><strong className="text-gray-200">Before collapse</strong>: <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">git clone --mirror</code> every fork to local storage (NAS, external drives)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-bold shrink-0">2.</span>
            <span><strong className="text-gray-200">After collapse</strong>: Use this guide to find, build, and install what you need</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-bold shrink-0">3.</span>
            <span><strong className="text-gray-200">Build order matters</strong>: Start with System Foundation, then work up the stack</span>
          </li>
        </ol>
      </div>

      {/* Section Grid */}
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Sections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {stats.byDoc.map((doc) => (
          <button
            key={doc.doc_number}
            onClick={() => {
              // Look up the document ID from the category tree
              const tree = useNavStore.getState();
              // We need the actual document id, but we only have doc_number here.
              // Query from the repo store's category tree
              invoke<any>('category:tree' as any).then((nodes: any[]) => {
                const node = nodes.find((n: any) => n.document.doc_number === doc.doc_number);
                if (node) goToDocument(node.document.id);
              });
            }}
            className="text-left p-4 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-emerald-800/50 hover:bg-gray-900 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5" role="img">
                {SECTION_ICONS[doc.doc_number] || '\u{1F4C4}'}
              </span>
              <div className="min-w-0">
                <div className="text-xs text-gray-600 font-mono mb-0.5">
                  {String(doc.doc_number).padStart(2, '0')}
                </div>
                <h3 className="text-sm font-medium text-gray-200 group-hover:text-emerald-400 transition-colors truncate">
                  {doc.title}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  {doc.repo_count} {doc.repo_count === 1 ? 'repo' : 'repos'}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-5 py-3 bg-gray-900/60 border border-gray-800/60 rounded-lg">
      <div className="text-2xl font-bold text-gray-100">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
