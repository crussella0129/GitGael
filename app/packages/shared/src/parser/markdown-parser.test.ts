import { describe, it, expect } from 'vitest';
import { parseDocument, countRepos, parseAllDocuments } from './markdown-parser';

describe('parseDocument', () => {
  it('parses document header', () => {
    const content = `# 01 — System Foundation

Everything needed to boot a machine.

## Boot Chain

### coreboot → \`coreboot/coreboot\`
Open-source firmware replacing proprietary BIOS/UEFI.
- **Build**: \`make crossgcc-i386 CPUS=$(nproc) && make\`
- **Docs**: https://doc.coreboot.org/
`;

    const doc = parseDocument(content, '01-system-foundation.md');
    expect(doc.doc_number).toBe(1);
    expect(doc.title).toBe('System Foundation');
    expect(doc.description).toBe('Everything needed to boot a machine.');
    expect(doc.sections).toHaveLength(1);
    expect(doc.sections[0].name).toBe('Boot Chain');
    expect(doc.sections[0].repos).toHaveLength(1);
  });

  it('parses standard repo entry with all fields', () => {
    const content = `# 01 — Test

Desc.

## Section

### Linux → \`torvalds/linux\`
The mainline Linux kernel.
- **Build**: \`make defconfig && make -j$(nproc)\`
- **Usage**: \`make modules_install && make install\`
- **Docs**: https://docs.kernel.org/
- **Note**: The most important project here
- **Key configs**: Enable drivers for your hardware
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];

    expect(repo.display_name).toBe('Linux');
    expect(repo.fork_name).toBe('torvalds/linux');
    expect(repo.description).toBe('The mainline Linux kernel.');
    expect(repo.build_cmd).toBe('`make defconfig && make -j$(nproc)`');
    expect(repo.usage_cmd).toBe('`make modules_install && make install`');
    expect(repo.docs_url).toBe('https://docs.kernel.org/');
    expect(repo.note).toBe('The most important project here');
    expect(repo.config_info).toBe('Enable drivers for your hardware');
  });

  it('parses fork-of notation', () => {
    const content = `# 07 — Mfg

Desc.

## CNC

### grblHAL → \`core-1\` (fork of \`grblHAL/core\`)
CNC controller firmware.
- **Build**: Platform-specific
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];

    expect(repo.fork_name).toBe('core-1');
    expect(repo.upstream_url).toBe('grblHAL/core');
    expect(repo.display_name).toBe('grblHAL');
    expect(repo.description).toBe('CNC controller firmware.');
  });

  it('parses table-based repo entries', () => {
    const content = `# 05 — Rust Desktop

Desc.

## Smithay

### Supporting Crates
| Fork | Upstream | Purpose |
|------|----------|---------|
| \`wayland-rs\` | Smithay/wayland-rs | Rust Wayland protocol |
| \`calloop\` | Smithay/calloop | Event loop |
`;

    const doc = parseDocument(content, 'test.md');
    // Table repos get parsed under the "Supporting Crates" subsection
    const sub = doc.sections[0].subsections[0];
    expect(sub.name).toBe('Supporting Crates');
    expect(sub.repos).toHaveLength(2);
    expect(sub.repos[0].fork_name).toBe('wayland-rs');
    expect(sub.repos[0].upstream_url).toBe('Smithay/wayland-rs');
    expect(sub.repos[1].fork_name).toBe('calloop');
  });

  it('parses COSMIC-style table entries', () => {
    const content = `# 05 — Rust

Desc.

## Compositors

### COSMIC Desktop → System76's All-Rust Desktop Environment
A complete desktop.

| Fork | What It Does | Build |
|------|-------------|-------|
| \`cosmic-epoch\` | Meta-repo / build coordination | \`just sysext\` |
| \`cosmic-comp\` | Wayland compositor | \`cargo build --release\` |
`;

    const doc = parseDocument(content, 'test.md');
    // COSMIC repos are in the section after the header
    const repos = doc.sections[0].repos;
    expect(repos.length).toBeGreaterThanOrEqual(2);
    expect(repos.find((r) => r.fork_name === 'cosmic-epoch')).toBeTruthy();
    expect(repos.find((r) => r.fork_name === 'cosmic-comp')).toBeTruthy();
  });

  it('parses bullet-list repos (TheAlgorithms style)', () => {
    const content = `# 02 — Languages

Desc.

## Learning

### TheAlgorithms
Algorithm implementations:
- \`Python\` — Python implementations
- \`C\` — C implementations
- \`Rust-1\` — Rust implementations
`;

    const doc = parseDocument(content, 'test.md');
    const sub = doc.sections[0].subsections[0];
    expect(sub.name).toBe('TheAlgorithms');
    expect(sub.repos).toHaveLength(3);
    expect(sub.repos[0].fork_name).toBe('Python');
    expect(sub.repos[0].description).toBe('Python implementations');
  });

  it('parses cross-reference entries', () => {
    const content = `# 16 — Silicon

Desc.

## EDA

### nextpnr → \`YosysHQ/nextpnr\`
See [07-manufacturing.md](07-manufacturing.md#nextpnr) — FPGA place-and-route.
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.fork_name).toBe('YosysHQ/nextpnr');
    expect(repo.note).toContain('Cross-reference');
  });

  it('parses code block build commands', () => {
    const content = `# 01 — System

Desc.

## Kernel

### Linux → \`torvalds/linux\`
The kernel.
- **Build**:
  \`\`\`bash
  make defconfig
  make -j$(nproc)
  make modules_install
  make install
  \`\`\`
- **Docs**: https://docs.kernel.org/
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.build_cmd).toContain('make defconfig');
    expect(repo.build_cmd).toContain('make install');
    expect(repo.docs_url).toBe('https://docs.kernel.org/');
  });

  it('parses multiple sections', () => {
    const content = `# 01 — Test

Desc.

## Section A

### Repo1 → \`repo1\`
Desc1.
- **Build**: \`make\`

## Section B

### Repo2 → \`repo2\`
Desc2.
- **Build**: \`cmake\`

### Repo3 → \`repo3\`
Desc3.
`;

    const doc = parseDocument(content, 'test.md');
    expect(doc.sections).toHaveLength(2);
    expect(doc.sections[0].repos).toHaveLength(1);
    expect(doc.sections[1].repos).toHaveLength(2);
  });

  it('handles repos with Install instead of Build', () => {
    const content = `# 08 — Energy

Desc.

## Solar

### emoncms → \`emoncms/emoncms\`
Energy monitoring.
- **Install**: \`sudo apt install emoncms\`
- **Docs**: https://emoncms.org/
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.install_cmd).toBe('`sudo apt install emoncms`');
  });

  it('handles repos with no Build/Usage fields', () => {
    const content = `# 02 — Languages

Desc.

## Learning

### free-programming-books → \`EbookFoundation/free-programming-books\`
Massive curated list of free programming books.
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.display_name).toBe('free-programming-books');
    expect(repo.build_cmd).toBeNull();
    expect(repo.description).toContain('Massive curated list');
  });

  it('handles Learn field with sub-items', () => {
    const content = `# 02 — Languages

Desc.

## Systems Languages

### Rust → \`rust-lang/rust\`
Memory-safe systems language.
- **Build**: \`./x.py build\`
- **Learn**:
  - \`book-1\` → The Rust Programming Language
  - \`rustlings\` → Small exercises
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.learn).toContain('book-1');
    expect(repo.learn).toContain('rustlings');
  });

  it('handles Warning field', () => {
    const content = `# 01 — System

Desc.

## Libs

### glibc → \`bminor/glibc\`
The GNU C Library.
- **Build**: \`./configure --prefix=/usr && make\`
- **Warning**: Replacing system glibc can brick your system
`;

    const doc = parseDocument(content, 'test.md');
    const repo = doc.sections[0].repos[0];
    expect(repo.warning).toBe('Replacing system glibc can brick your system');
  });
});

describe('countRepos', () => {
  it('counts repos across sections and subsections', () => {
    const docs = [
      {
        doc_number: 1,
        filename: 'test.md',
        title: 'Test',
        description: '',
        sections: [
          {
            name: 'S1',
            repos: [{ display_name: 'R1' } as any, { display_name: 'R2' } as any],
            subsections: [
              { name: 'Sub1', repos: [{ display_name: 'R3' } as any] },
            ],
          },
        ],
      },
    ];

    expect(countRepos(docs)).toBe(3);
  });
});

describe('parseAllDocuments', () => {
  it('sorts by doc_number', () => {
    const files = [
      { filename: '03-core.md', content: '# 03 — Core\n\nDesc.\n' },
      { filename: '01-system.md', content: '# 01 — System\n\nDesc.\n' },
    ];

    const docs = parseAllDocuments(files);
    expect(docs[0].doc_number).toBe(1);
    expect(docs[1].doc_number).toBe(3);
  });
});
