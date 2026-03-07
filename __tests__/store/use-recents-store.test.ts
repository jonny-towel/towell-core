import { describe, it, expect, beforeEach } from "vitest";
import { useRecentsStore } from "@/store/use-recents-store";

describe("useRecentsStore", () => {
  beforeEach(() => {
    useRecentsStore.getState().reset();
  });

  describe("estado inicial", () => {
    it('tiene search vacío por defecto', () => {
      expect(useRecentsStore.getState().search).toBe("");
    });

    it('tiene sort "recent" por defecto', () => {
      expect(useRecentsStore.getState().sort).toBe("recent");
    });
  });

  describe("acciones", () => {
    it("setSearch actualiza el campo search", () => {
      useRecentsStore.getState().setSearch("ETFs");
      expect(useRecentsStore.getState().search).toBe("ETFs");
    });

    it("setSort actualiza el criterio de orden", () => {
      useRecentsStore.getState().setSort("title");
      expect(useRecentsStore.getState().sort).toBe("title");
    });

    it("reset restaura el estado inicial", () => {
      useRecentsStore.getState().setSearch("algo");
      useRecentsStore.getState().setSort("title");
      useRecentsStore.getState().reset();
      expect(useRecentsStore.getState().search).toBe("");
      expect(useRecentsStore.getState().sort).toBe("recent");
    });
  });

  describe("naming consistente con useProjectsListStore", () => {
    it("expone search (no searchQuery)", () => {
      const state = useRecentsStore.getState();
      expect("search" in state).toBe(true);
      expect("searchQuery" in state).toBe(false);
    });

    it("expone setSearch (no setSearchQuery)", () => {
      const state = useRecentsStore.getState();
      expect("setSearch" in state).toBe(true);
      expect("setSearchQuery" in state).toBe(false);
    });
  });
});
