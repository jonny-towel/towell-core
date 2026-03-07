export type SortOption = "activity" | "name" | "created";

export interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  badge?: string;
}

export interface ProjectDetailClientProps {
  project: Project;
}

export interface ProjectDetailHeaderProps {
  project: Project;
}
