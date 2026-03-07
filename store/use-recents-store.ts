import { create } from "zustand";
import type { RecentsSortOption } from "@/interfaces/recents-thread.interface";

interface RecentsState {
  search: string;
  sort: RecentsSortOption;
}

interface RecentsActions {
  setSearch: (query: string) => void;
  setSort: (sort: RecentsSortOption) => void;
  reset: () => void;
}

type RecentsStore = RecentsState & RecentsActions;

const INITIAL_STATE: RecentsState = {
  search: "",
  sort: "recent",
};

export const useRecentsStore = create<RecentsStore>((set) => ({
  ...INITIAL_STATE,
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  reset: () => set(INITIAL_STATE),
}));
