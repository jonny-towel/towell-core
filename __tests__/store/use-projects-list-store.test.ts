import { describe, it, expect, beforeEach } from "vitest";
import { useProjectsListStore } from "@/store/use-projects-list-store";

describe("useProjectsListStore", () => {
  beforeEach(() => {
    useProjectsListStore.getState().reset();
  });

  describe("estado inicial", () => {
    it("tiene search vacío por defecto", () => {
      expect(useProjectsListStore.getState().search).toBe("");
    });

    it('tiene sort "activity" por defecto', () => {
      expect(useProjectsListStore.getState().sort).toBe("activity");
    });
  });

  describe("acciones", () => {
    it("setSearch actualiza el campo search", () => {
      useProjectsListStore.getState().setSearch("orquest");
      expect(useProjectsListStore.getState().search).toBe("orquest");
    });

    it("setSort actualiza el criterio de orden", () => {
      useProjectsListStore.getState().setSort("name");
      expect(useProjectsListStore.getState().sort).toBe("name");
    });

    it("setSort acepta todos los valores válidos", () => {
      useProjectsListStore.getState().setSort("created");
      expect(useProjectsListStore.getState().sort).toBe("created");
      useProjectsListStore.getState().setSort("activity");
      expect(useProjectsListStore.getState().sort).toBe("activity");
    });

    it("reset restaura el estado inicial", () => {
      useProjectsListStore.getState().setSearch("algo");
      useProjectsListStore.getState().setSort("name");
      useProjectsListStore.getState().reset();
      expect(useProjectsListStore.getState().search).toBe("");
      expect(useProjectsListStore.getState().sort).toBe("activity");
    });
  });
});
