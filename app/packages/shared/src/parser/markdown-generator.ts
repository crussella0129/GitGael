/**
 * GitGael Markdown Generator
 *
 * Generates docs/*.md files from database records.
 * Round-trip: parse markdown → DB → generate markdown should preserve semantics.
 */

import type { Repo, Document, Section, Subsection } from '../ipc/types';

interface DocData {
  document: Document;
  sections: Array<{
    section: Section;
    repos: Repo[];
    subsections: Array<{
      subsection: Subsection;
      repos: Repo[];
    }>;
  }>;
}

export function generateDocument(data: DocData): string {
  const lines: string[] = [];

  // Document header
  const num = String(data.document.doc_number).padStart(2, '0');
  lines.push(`# ${num} — ${data.document.title}`);
  lines.push('');
  if (data.document.description) {
    lines.push(data.document.description);
    lines.push('');
  }

  // Sections
  for (const { section, repos, subsections } of data.sections) {
    lines.push(`## ${section.name}`);
    lines.push('');

    // Section-level repos
    for (const repo of repos) {
      lines.push(...generateRepoEntry(repo));
      lines.push('');
    }

    // Subsections
    for (const { subsection, repos: subRepos } of subsections) {
      lines.push(`### ${subsection.name}`);
      lines.push('');
      for (const repo of subRepos) {
        lines.push(...generateRepoEntry(repo));
        lines.push('');
      }
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function generateRepoEntry(repo: Repo): string[] {
  const lines: string[] = [];

  // Header line
  let header = `### ${repo.display_name} → \`${repo.fork_name}\``;
  if (repo.upstream_url && repo.upstream_url !== repo.fork_name) {
    header += ` (fork of \`${repo.upstream_url}\`)`;
  }
  lines.push(header);

  // Description
  if (repo.description) {
    lines.push(repo.description);
  }

  // Fields
  if (repo.build_cmd) lines.push(`- **Build**: ${formatField(repo.build_cmd)}`);
  if (repo.install_cmd) lines.push(`- **Install**: ${formatField(repo.install_cmd)}`);
  if (repo.usage_cmd) lines.push(`- **Usage**: ${formatField(repo.usage_cmd)}`);
  if (repo.config_info) lines.push(`- **Config**: ${repo.config_info}`);
  if (repo.docs_url) lines.push(`- **Docs**: ${repo.docs_url}`);
  if (repo.deps) lines.push(`- **Deps**: ${repo.deps}`);
  if (repo.use_case) lines.push(`- **Use case**: ${repo.use_case}`);
  if (repo.hardware) lines.push(`- **Hardware**: ${repo.hardware}`);
  if (repo.warning) lines.push(`- **Warning**: ${repo.warning}`);
  if (repo.note) lines.push(`- **Note**: ${repo.note}`);
  if (repo.learn) {
    lines.push(`- **Learn**:`);
    for (const learnLine of repo.learn.split('\n')) {
      lines.push(`  ${learnLine.trim()}`);
    }
  }

  // Extra metadata fields
  if (repo.extra_metadata && typeof repo.extra_metadata === 'object') {
    for (const [key, value] of Object.entries(repo.extra_metadata)) {
      if (value && key !== '{}') {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        lines.push(`- **${label}**: ${value}`);
      }
    }
  }

  return lines;
}

function formatField(value: string): string {
  // If the field contains newlines (multi-line build commands), use code block
  if (value.includes('\n')) {
    return `\n  \`\`\`bash\n  ${value.split('\n').join('\n  ')}\n  \`\`\``;
  }
  // Wrap single-line commands in backticks if not already
  if (!value.startsWith('`') && !value.startsWith('http')) {
    return `\`${value}\``;
  }
  return value;
}

export function generateAllDocuments(
  documents: DocData[]
): Array<{ filename: string; content: string }> {
  return documents
    .sort((a, b) => a.document.doc_number - b.document.doc_number)
    .map((doc) => ({
      filename: doc.document.filename,
      content: generateDocument(doc),
    }));
}
