export type SortOption = "activity" | "name" | "created";

export interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  badge?: string;
}
