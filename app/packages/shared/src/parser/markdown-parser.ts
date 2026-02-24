/**
 * GitGael Markdown Parser
 *
 * Parses the docs/*.md files into structured repo data.
 * Handles:
 *   - Standard ### Name → `fork` entries with bullet fields
 *   - Table-based entries (COSMIC, Smithay crates, Voron, Rust CLI tools)
 *   - Bullet-list groupings (TheAlgorithms, Language-Specific learning)
 *   - Cross-reference entries ("See [file.md]")
 *   - Code blocks in Build fields
 *   - Entries with no Build/Usage fields (collections, hardware)
 */

import type {
  ParsedDocument,
  ParsedSection,
  ParsedSubsection,
  ParsedRepo,
  ParsedTableRepo,
} from '../models/repo';

// --- Regex patterns ---

/** Matches `# 01 — Section Title` */
const RE_DOC_HEADER = /^#\s+(\d+)\s*[—–-]\s*(.+)$/;

/** Matches `## Section Name` */
const RE_SECTION = /^##\s+(.+)$/;

/** Matches `### Project Name → \`fork-name\`` or `### Project Name → \`owner/repo\`` */
const RE_REPO_HEADER = /^###\s+(.+?)\s*→\s*`([^`]+)`/;

/** Matches `### **Name** → \`fork\`` (bold variant in Rust CLI section) */
const RE_REPO_HEADER_BOLD = /^###?\s*\*\*(.+?)\*\*\s*→\s*`([^`]+)`/;

/** Matches `### Name — extra → \`fork\`` (like "Circuit Simulation — qucs_s") */
const RE_REPO_HEADER_DASH = /^###\s+(.+?)\s*→\s*`([^`]+)`/;

/** Matches `(fork of \`owner/repo\`)` in description */
const RE_FORK_OF = /\(fork of\s+`([^`]+)`\)/;

/** Matches `- **Field**: content` or `- **Field**:` (empty, content on next lines) */
const RE_FIELD = /^-\s+\*\*(\w[\w\s]*?)\*\*:\s*(.*)$/;

/** Matches a markdown table row `| cell | cell | ... |` */
const RE_TABLE_ROW = /^\|(.+)\|$/;

/** Matches table separator `|---|---|` */
const RE_TABLE_SEP = /^\|[\s-:|]+\|$/;

/** Matches "See [file.md](...)" cross-reference entries */
const RE_CROSS_REF = /^See\s+\[/;

/** Matches backtick-wrapped fork names in table cells */
const RE_BACKTICK = /`([^`]+)`/;

/** Matches code block start */
const RE_CODE_BLOCK_START = /^```/;

// --- Known field mappings ---

const FIELD_MAP: Record<string, keyof ParsedRepo> = {
  build: 'build_cmd',
  usage: 'usage_cmd',
  install: 'install_cmd',
  docs: 'docs_url',
  note: 'note',
  config: 'config_info',
  deps: 'deps',
  features: 'features',
  'use case': 'use_case',
  'use cases': 'use_case',
  applications: 'use_case',
  hardware: 'hardware',
  warning: 'warning',
  learn: 'learn',
  'key feature': 'features',
  'key features': 'features',
  'key configs': 'config_info',
  'supported fpgas': 'hardware',
  'build hardware': 'build_cmd',
  contains: 'features',
  models: 'note',
  requires: 'deps',
};

// --- Parser ---

export function parseDocument(content: string, filename: string): ParsedDocument {
  const lines = content.split('\n');
  let lineIdx = 0;

  // Parse document header
  let doc_number = 0;
  let title = '';
  let description = '';

  // Find the H1 header
  while (lineIdx < lines.length) {
    const match = lines[lineIdx].match(RE_DOC_HEADER);
    if (match) {
      doc_number = parseInt(match[1], 10);
      title = match[2].trim();
      lineIdx++;
      break;
    }
    lineIdx++;
  }

  // Collect description (lines between H1 and first H2)
  const descLines: string[] = [];
  while (lineIdx < lines.length && !RE_SECTION.test(lines[lineIdx])) {
    if (lines[lineIdx].trim()) {
      descLines.push(lines[lineIdx].trim());
    }
    lineIdx++;
  }
  description = descLines.join(' ');

  // Parse sections
  const sections: ParsedSection[] = [];
  while (lineIdx < lines.length) {
    const sectionMatch = lines[lineIdx].match(RE_SECTION);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();
      lineIdx++;
      const { section, nextLine } = parseSection(lines, lineIdx, sectionName);
      sections.push(section);
      lineIdx = nextLine;
    } else {
      lineIdx++;
    }
  }

  return { doc_number, filename, title, description, sections };
}

function parseSection(
  lines: string[],
  startLine: number,
  name: string
): { section: ParsedSection; nextLine: number } {
  const repos: ParsedRepo[] = [];
  const subsections: ParsedSubsection[] = [];
  let lineIdx = startLine;

  while (lineIdx < lines.length) {
    const line = lines[lineIdx];

    // Stop at next ## section
    if (RE_SECTION.test(line)) {
      break;
    }

    // Check for ### repo header (standard or bold variant)
    const repoMatch = line.match(RE_REPO_HEADER_BOLD) || line.match(RE_REPO_HEADER);
    if (repoMatch) {
      const { repo, nextLine } = parseRepoEntry(lines, lineIdx, repoMatch[1], repoMatch[2]);
      if (repo) {
        repos.push(repo);
      }
      lineIdx = nextLine;
      continue;
    }

    // Check for ### header without → (grouping header or subsection)
    if (/^###\s+/.test(line) && !line.includes('→')) {
      const subName = line.replace(/^###\s+/, '').trim();

      // Check if this is a grouping header with repos inside
      lineIdx++;
      const { subsection, nextLine } = parseSubsection(lines, lineIdx, subName);
      if (subsection.repos.length > 0) {
        subsections.push(subsection);
      }
      lineIdx = nextLine;
      continue;
    }

    // Check for table-based repo entries
    if (RE_TABLE_ROW.test(line) && !RE_TABLE_SEP.test(line)) {
      const { tableRepos, nextLine } = parseTable(lines, lineIdx);
      for (const tr of tableRepos) {
        repos.push(tableRepoToParsed(tr));
      }
      lineIdx = nextLine;
      continue;
    }

    // Check for bullet-list repo references (TheAlgorithms style)
    if (/^-\s+`[^`]+`/.test(line) && !RE_FIELD.test(line)) {
      const bulletRepo = parseBulletRepo(line);
      if (bulletRepo) {
        repos.push(bulletRepo);
      }
      lineIdx++;
      continue;
    }

    // Check for bold-name bullet entries: `- **Name** → \`fork\``
    const boldBulletMatch = line.match(/^-\s+\*\*(.+?)\*\*\s*→\s*`([^`]+)`/);
    if (boldBulletMatch) {
      // Peek at next line for description
      const nextLine = lineIdx + 1 < lines.length ? lines[lineIdx + 1] : '';
      const repo: ParsedRepo = {
        display_name: boldBulletMatch[1].trim(),
        fork_name: boldBulletMatch[2].trim(),
        upstream_url: null,
        description: nextLine.startsWith('  ') ? nextLine.trim() : '',
        build_cmd: null,
        usage_cmd: null,
        install_cmd: null,
        docs_url: null,
        note: null,
        config_info: null,
        deps: null,
        features: null,
        use_case: null,
        hardware: null,
        warning: null,
        learn: null,
        extra_fields: {},
      };
      lineIdx++;
      continue;
    }

    lineIdx++;
  }

  return { section: { name, repos, subsections }, nextLine: lineIdx };
}

function parseSubsection(
  lines: string[],
  startLine: number,
  name: string
): { subsection: ParsedSubsection; nextLine: number } {
  const repos: ParsedRepo[] = [];
  let lineIdx = startLine;

  while (lineIdx < lines.length) {
    const line = lines[lineIdx];

    // Stop at next ## or ###
    if (RE_SECTION.test(line) || /^###\s+/.test(line)) {
      break;
    }

    // Check for bold-name entries (like Helix, Starship, Nushell in 05)
    const boldMatch = line.match(RE_REPO_HEADER_BOLD);
    if (boldMatch) {
      const { repo, nextLine } = parseRepoEntry(lines, lineIdx, boldMatch[1], boldMatch[2]);
      if (repo) {
        repos.push(repo);
      }
      lineIdx = nextLine;
      continue;
    }

    // Table entries
    if (RE_TABLE_ROW.test(line) && !RE_TABLE_SEP.test(line)) {
      const { tableRepos, nextLine } = parseTable(lines, lineIdx);
      for (const tr of tableRepos) {
        repos.push(tableRepoToParsed(tr));
      }
      lineIdx = nextLine;
      continue;
    }

    // Bullet repos
    if (/^-\s+`[^`]+`/.test(line) && !RE_FIELD.test(line)) {
      const bulletRepo = parseBulletRepo(line);
      if (bulletRepo) {
        repos.push(bulletRepo);
      }
      lineIdx++;
      continue;
    }

    lineIdx++;
  }

  return { subsection: { name, repos }, nextLine: lineIdx };
}

function parseRepoEntry(
  lines: string[],
  startLine: number,
  displayName: string,
  forkName: string
): { repo: ParsedRepo | null; nextLine: number } {
  let lineIdx = startLine + 1;

  // Check if this is a cross-reference (single-line "See [file.md]")
  const firstContentLine = lineIdx < lines.length ? lines[lineIdx].trim() : '';
  if (RE_CROSS_REF.test(firstContentLine)) {
    // Cross-reference entry — still record it but with minimal info
    const repo: ParsedRepo = {
      display_name: displayName.trim(),
      fork_name: forkName.trim(),
      upstream_url: null,
      description: firstContentLine,
      build_cmd: null,
      usage_cmd: null,
      install_cmd: null,
      docs_url: null,
      note: `Cross-reference: ${firstContentLine}`,
      config_info: null,
      deps: null,
      features: null,
      use_case: null,
      hardware: null,
      warning: null,
      learn: null,
      extra_fields: {},
    };
    return { repo, nextLine: lineIdx + 1 };
  }

  // Collect description lines (non-field, non-header lines)
  const descLines: string[] = [];
  let inCodeBlock = false;

  while (lineIdx < lines.length) {
    const line = lines[lineIdx];

    // Stop at next header
    if (!inCodeBlock && (RE_SECTION.test(line) || /^###?\s+/.test(line))) {
      break;
    }

    // Handle code blocks
    if (RE_CODE_BLOCK_START.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        lineIdx++;
        continue;
      }
    }

    // Once we hit a field, stop collecting description
    if (!inCodeBlock && RE_FIELD.test(line)) {
      break;
    }

    // Stop at table
    if (!inCodeBlock && RE_TABLE_ROW.test(line)) {
      break;
    }

    if (line.trim()) {
      descLines.push(line.trim());
    }
    lineIdx++;
  }

  const description = descLines.join(' ');

  // Check for (fork of `owner/repo`) in header line or description
  const headerLine = lines[startLine];
  const forkOfMatch = headerLine.match(RE_FORK_OF) || description.match(RE_FORK_OF);
  const upstream_url = forkOfMatch ? forkOfMatch[1] : null;

  // Parse fields
  const fields: Record<string, string> = {};
  inCodeBlock = false;
  let currentField: string | null = null;
  let codeBlockContent: string[] = [];

  while (lineIdx < lines.length) {
    const line = lines[lineIdx];

    // Stop at next header
    if (!inCodeBlock && (RE_SECTION.test(line) || /^###?\s+/.test(line))) {
      break;
    }

    // Stop at blank line followed by non-field content (paragraph break)
    if (!inCodeBlock && !line.trim() && lineIdx + 1 < lines.length) {
      const nextNonEmpty = lines.slice(lineIdx + 1).find((l) => l.trim());
      if (nextNonEmpty && !RE_FIELD.test(nextNonEmpty) && !nextNonEmpty.startsWith('  ')) {
        break;
      }
    }

    // Handle code blocks within fields
    if (RE_CODE_BLOCK_START.test(line.trim())) {
      if (inCodeBlock) {
        // End of code block
        if (currentField) {
          fields[currentField] = (fields[currentField] || '') + '\n' + codeBlockContent.join('\n');
        }
        codeBlockContent = [];
        inCodeBlock = false;
        lineIdx++;
        continue;
      } else {
        inCodeBlock = true;
        lineIdx++;
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockContent.push(line.trimEnd());
      lineIdx++;
      continue;
    }

    // Parse field line
    const fieldMatch = line.match(RE_FIELD);
    if (fieldMatch) {
      const fieldName = fieldMatch[1].toLowerCase().trim();
      const fieldValue = fieldMatch[2].trim();
      currentField = fieldName;
      fields[fieldName] = fieldValue;
      lineIdx++;
      continue;
    }

    // Continuation lines (indented, part of current field like Learn lists)
    if (currentField && /^\s{2,}/.test(line) && line.trim()) {
      fields[currentField] = (fields[currentField] || '') + '\n' + line.trim();
      lineIdx++;
      continue;
    }

    // Non-field non-empty line — might be a note or paragraph
    if (line.trim() && !line.startsWith('|') && !line.startsWith('-')) {
      // Standalone text line after fields (like "Together: Yosys + nextpnr = ...")
      break;
    }

    lineIdx++;
  }

  // Map fields to repo structure
  const repo: ParsedRepo = {
    display_name: displayName.trim(),
    fork_name: forkName.trim(),
    upstream_url,
    description: cleanDescription(description),
    build_cmd: null,
    usage_cmd: null,
    install_cmd: null,
    docs_url: null,
    note: null,
    config_info: null,
    deps: null,
    features: null,
    use_case: null,
    hardware: null,
    warning: null,
    learn: null,
    extra_fields: {},
  };

  for (const [key, value] of Object.entries(fields)) {
    const mappedField = FIELD_MAP[key];
    if (mappedField) {
      (repo[mappedField] as string | null) = value;
    } else {
      repo.extra_fields[key] = value;
    }
  }

  return { repo, nextLine: lineIdx };
}

function parseTable(
  lines: string[],
  startLine: number
): { tableRepos: ParsedTableRepo[]; nextLine: number } {
  const result: ParsedTableRepo[] = [];
  let lineIdx = startLine;

  // Parse header row
  if (!RE_TABLE_ROW.test(lines[lineIdx])) {
    return { tableRepos: result, nextLine: lineIdx };
  }

  const headers = lines[lineIdx]
    .split('|')
    .filter((c) => c.trim())
    .map((c) => c.trim().toLowerCase());
  lineIdx++;

  // Skip separator
  if (lineIdx < lines.length && RE_TABLE_SEP.test(lines[lineIdx])) {
    lineIdx++;
  }

  // Parse data rows
  while (lineIdx < lines.length && RE_TABLE_ROW.test(lines[lineIdx])) {
    if (RE_TABLE_SEP.test(lines[lineIdx])) {
      lineIdx++;
      continue;
    }

    const cells = lines[lineIdx]
      .split('|')
      .filter((c) => c.trim() !== '')
      .map((c) => c.trim());

    if (cells.length >= 2) {
      // Extract fork name from first column (usually in backticks)
      const forkCell = cells[0];
      const backtickMatch = forkCell.match(RE_BACKTICK);
      const fork_name = backtickMatch ? backtickMatch[1] : forkCell.replace(/[`*]/g, '').trim();

      // Build columns map
      const columns: Record<string, string> = {};
      for (let i = 0; i < headers.length && i < cells.length; i++) {
        columns[headers[i]] = cells[i];
      }

      // Try to extract upstream from fork name or description
      let upstream_url: string | null = null;
      const upstreamCol =
        columns['upstream'] || columns['upstream url'] || columns['repo'];
      if (upstreamCol) {
        const upMatch = upstreamCol.match(RE_BACKTICK);
        upstream_url = upMatch ? upMatch[1] : upstreamCol.replace(/[`*]/g, '').trim();
      }

      result.push({
        fork_name,
        display_name: fork_name.split('/').pop() || fork_name,
        upstream_url,
        columns,
      });
    }
    lineIdx++;
  }

  return { tableRepos: result, nextLine: lineIdx };
}

function parseBulletRepo(line: string): ParsedRepo | null {
  // Matches: - `fork-name` — Description
  // Or: - `fork-name` → Description
  // Or: - `Python` — Python implementations
  const match = line.match(/^-\s+`([^`]+)`\s*[—→–-]\s*(.+)$/);
  if (!match) {
    // Try simpler format: - `fork-name` Description
    const simpleMatch = line.match(/^-\s+`([^`]+)`\s+(.+)$/);
    if (!simpleMatch) return null;
    return {
      display_name: simpleMatch[1],
      fork_name: simpleMatch[1],
      upstream_url: null,
      description: simpleMatch[2].trim(),
      build_cmd: null,
      usage_cmd: null,
      install_cmd: null,
      docs_url: null,
      note: null,
      config_info: null,
      deps: null,
      features: null,
      use_case: null,
      hardware: null,
      warning: null,
      learn: null,
      extra_fields: {},
    };
  }

  return {
    display_name: match[1],
    fork_name: match[1],
    upstream_url: null,
    description: match[2].trim(),
    build_cmd: null,
    usage_cmd: null,
    install_cmd: null,
    docs_url: null,
    note: null,
    config_info: null,
    deps: null,
    features: null,
    use_case: null,
    hardware: null,
    warning: null,
    learn: null,
    extra_fields: {},
  };
}

function tableRepoToParsed(tr: ParsedTableRepo): ParsedRepo {
  const description =
    tr.columns['what it does'] ||
    tr.columns['purpose'] ||
    tr.columns['description'] ||
    tr.columns['what'] ||
    tr.columns['what it is'] ||
    tr.columns['design'] ||
    tr.columns['printer'] ||
    '';

  return {
    display_name: tr.display_name,
    fork_name: tr.fork_name,
    upstream_url: tr.upstream_url,
    description: cleanDescription(description),
    build_cmd: tr.columns['build'] || null,
    usage_cmd: tr.columns['usage'] || null,
    install_cmd: null,
    docs_url: null,
    note: null,
    config_info: null,
    deps: null,
    features: null,
    use_case: null,
    hardware: null,
    warning: null,
    learn: null,
    extra_fields: {},
  };
}

function cleanDescription(desc: string): string {
  // Remove (fork of `...`) since we extract it separately
  return desc.replace(/\(fork of\s+`[^`]+`\)\s*/g, '').trim();
}

// --- Public API ---

export function parseAllDocuments(
  files: Array<{ filename: string; content: string }>
): ParsedDocument[] {
  return files
    .map(({ filename, content }) => parseDocument(content, filename))
    .sort((a, b) => a.doc_number - b.doc_number);
}

/** Count total repos across all parsed documents */
export function countRepos(docs: ParsedDocument[]): number {
  let count = 0;
  for (const doc of docs) {
    for (const section of doc.sections) {
      count += section.repos.length;
      for (const sub of section.subsections) {
        count += sub.repos.length;
      }
    }
  }
  return count;
}
