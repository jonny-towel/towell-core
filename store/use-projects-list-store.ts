import { create } from "zustand";
import type { SortOption } from "@/interfaces/project.interface";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectsListState {
  search: string;
  sort: SortOption;
}

interface ProjectsListActions {
  setSearch: (search: string) => void;
  setSort: (sort: SortOption) => void;
  reset: () => void;
}

type ProjectsListStore = ProjectsListState & ProjectsListActions;

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: ProjectsListState = {
  search: "",
  sort: "activity",
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProjectsListStore = create<ProjectsListStore>((set) => ({
  ...INITIAL_STATE,

  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  reset: () => set(INITIAL_STATE),
}));
