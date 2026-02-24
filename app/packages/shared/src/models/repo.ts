// Intermediate parsed representation of a repo entry from markdown

export interface ParsedRepo {
  display_name: string;
  fork_name: string;
  upstream_url: string | null; // "owner/repo" from (fork of `owner/repo`)
  description: string;
  build_cmd: string | null;
  usage_cmd: string | null;
  install_cmd: string | null;
  docs_url: string | null;
  note: string | null;
  config_info: string | null;
  deps: string | null;
  features: string | null;
  use_case: string | null;
  hardware: string | null;
  warning: string | null;
  learn: string | null;
  extra_fields: Record<string, string>;
}

export interface ParsedSection {
  name: string;
  repos: ParsedRepo[];
  subsections: ParsedSubsection[];
}

export interface ParsedSubsection {
  name: string;
  repos: ParsedRepo[];
}

export interface ParsedDocument {
  doc_number: number;
  filename: string;
  title: string;
  description: string;
  sections: ParsedSection[];
}

// Table-based repo entries (e.g., COSMIC, Smithay crates, Voron)
export interface ParsedTableRepo {
  fork_name: string;
  display_name: string;
  upstream_url: string | null;
  columns: Record<string, string>;
}
