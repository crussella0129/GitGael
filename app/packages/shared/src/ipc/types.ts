// IPC request/response types shared between frontend and all backends

// --- Database Models ---

export interface Document {
  id: number;
  doc_number: number;
  filename: string;
  title: string;
  description: string | null;
  sort_order: number;
}

export interface Section {
  id: number;
  document_id: number;
  name: string;
  sort_order: number;
}

export interface Subsection {
  id: number;
  section_id: number;
  name: string;
  sort_order: number;
}

export interface Repo {
  id: number;
  fork_name: string;
  display_name: string;
  upstream_url: string | null;
  github_url: string | null;
  document_id: number | null;
  section_id: number | null;
  subsection_id: number | null;
  description: string | null;
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
  extra_metadata: Record<string, unknown>;
  source_type: 'github_fork' | 'mirror' | 'user_added';
  is_private: boolean;
  is_mirror: boolean;
  fork_status: 'existing' | 'pending' | 'forked' | 'failed';
  added_at: string;
  updated_at: string;
  sort_order: number;
}

export interface NamingCollision {
  id: number;
  fork_name: string;
  upstream: string;
  description: string | null;
}

export interface Mirror {
  id: number;
  project_name: string;
  upstream_source: string;
  github_mirror: string | null;
  description: string | null;
}

export interface ForkLogEntry {
  id: number;
  repo_id: number;
  action: string;
  status: string;
  details: string | null;
  created_at: string;
}

// --- Category Tree ---

export interface CategoryNode {
  document: Document;
  sections: SectionNode[];
  repo_count: number;
}

export interface SectionNode {
  section: Section;
  subsections: SubsectionNode[];
  repo_count: number;
}

export interface SubsectionNode {
  subsection: Subsection;
  repo_count: number;
}

// --- IPC Requests ---

export interface RepoListRequest {
  document_id?: number;
  section_id?: number;
  subsection_id?: number;
  limit?: number;
  offset?: number;
}

export interface RepoSearchRequest {
  query: string;
  document_id?: number;
  limit?: number;
}

export interface RepoCreateRequest {
  fork_name: string;
  display_name: string;
  upstream_url?: string;
  github_url?: string;
  document_id?: number;
  section_id?: number;
  subsection_id?: number;
  description?: string;
  build_cmd?: string;
  usage_cmd?: string;
  install_cmd?: string;
  docs_url?: string;
  note?: string;
  source_type?: 'github_fork' | 'mirror' | 'user_added';
}

export interface RepoUpdateRequest {
  id: number;
  fork_name?: string;
  display_name?: string;
  upstream_url?: string;
  github_url?: string;
  document_id?: number;
  section_id?: number;
  subsection_id?: number;
  description?: string;
  build_cmd?: string;
  usage_cmd?: string;
  install_cmd?: string;
  docs_url?: string;
  note?: string;
}

export interface ForkRequest {
  url: string;
  document_id: number;
  section_id?: number;
  display_name?: string;
  description?: string;
  docs_url?: string;
  install_cmd?: string;
  build_cmd?: string;
}

export interface CategoryCreateRequest {
  title: string;
  description?: string;
}

export interface SectionCreateRequest {
  document_id: number;
  name: string;
}

export interface AuthStatus {
  authenticated: boolean;
  username: string | null;
  scopes: string[] | null;
}

// --- IPC Responses ---

export interface RepoListResponse {
  repos: Repo[];
  total: number;
}

export interface SearchResult {
  repo: Repo;
  rank: number;
  snippet: string;
}

export interface ForkResult {
  success: boolean;
  repo_id?: number;
  error?: string;
  fork_url?: string;
}

export interface ExportResult {
  success: boolean;
  path?: string;
  error?: string;
}
