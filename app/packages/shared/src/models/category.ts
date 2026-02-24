// Category hierarchy for the sidebar tree

export interface CategoryTree {
  documents: DocumentCategory[];
}

export interface DocumentCategory {
  id: number;
  doc_number: number;
  title: string;
  filename: string;
  repo_count: number;
  sections: SectionCategory[];
}

export interface SectionCategory {
  id: number;
  name: string;
  repo_count: number;
  subsections: SubsectionCategory[];
}

export interface SubsectionCategory {
  id: number;
  name: string;
  repo_count: number;
}
