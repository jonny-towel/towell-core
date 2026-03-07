import { create } from "zustand";
import type { RecentsSortOption } from "@/interfaces/recents-thread.interface";

interface RecentsState {
  searchQuery: string;
  sort: RecentsSortOption;
}

interface RecentsActions {
  setSearchQuery: (query: string) => void;
  setSort: (sort: RecentsSortOption) => void;
  reset: () => void;
}

type RecentsStore = RecentsState & RecentsActions;

const INITIAL_STATE: RecentsState = {
  searchQuery: "",
  sort: "recent",
};

export const useRecentsStore = create<RecentsStore>((set) => ({
  ...INITIAL_STATE,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSort: (sort) => set({ sort }),
  reset: () => set(INITIAL_STATE),
}));
