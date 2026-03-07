import { describe, it, expect } from "vitest";
import {
  formatProjectUpdatedAt,
  filterAndSortProjects,
  getProjectById,
} from "@/helpers/projects.helpers";
import type { Project } from "@/interfaces/project.interface";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  { id: "1", name: "Alpha", description: "Proyecto alpha de analytics", updatedAt: "3", badge: "Beta" },
  { id: "2", name: "Beta",  description: "Proyecto beta de desarrollo",  updatedAt: "1" },
  { id: "3", name: "Gamma", description: "Proyecto gamma de escritura",  updatedAt: "10" },
];

// ─── formatProjectUpdatedAt ───────────────────────────────────────────────────

describe("formatProjectUpdatedAt", () => {
  it('retorna "Actualizado hace 1 día" cuando days es 1', () => {
    expect(formatProjectUpdatedAt(1)).toBe("Actualizado hace 1 día");
  });

  it('retorna "Actualizado hace 1 día" cuando days es "1" (string)', () => {
    expect(formatProjectUpdatedAt("1")).toBe("Actualizado hace 1 día");
  });

  it("retorna plural para N días", () => {
    expect(formatProjectUpdatedAt(3)).toBe("Actualizado hace 3 días");
    expect(formatProjectUpdatedAt("10")).toBe("Actualizado hace 10 días");
  });

  it("maneja 0 días", () => {
    expect(formatProjectUpdatedAt(0)).toBe("Actualizado hace 0 días");
  });
});

// ─── filterAndSortProjects ────────────────────────────────────────────────────

describe("filterAndSortProjects", () => {
  describe("filtrado por búsqueda", () => {
    it("retorna todos los proyectos si search está vacío", () => {
      const result = filterAndSortProjects(PROJECTS, "", "activity");
      expect(result).toHaveLength(3);
    });

    it("filtra por nombre (case insensitive)", () => {
      const result = filterAndSortProjects(PROJECTS, "alpha", "activity");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alpha");
    });

    it("filtra por descripción", () => {
      const result = filterAndSortProjects(PROJECTS, "analytics", "activity");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alpha");
    });

    it("retorna vacío si no hay coincidencias", () => {
      const result = filterAndSortProjects(PROJECTS, "zzz", "activity");
      expect(result).toHaveLength(0);
    });

    it("ignora espacios al inicio/fin del search", () => {
      const result = filterAndSortProjects(PROJECTS, "  beta  ", "activity");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Beta");
    });
  });

  describe("ordenamiento", () => {
    it('ordena por nombre A-Z cuando sort es "name"', () => {
      const result = filterAndSortProjects(PROJECTS, "", "name");
      expect(result.map((p) => p.name)).toEqual(["Alpha", "Beta", "Gamma"]);
    });

    it('ordena por ID descendente cuando sort es "created"', () => {
      const result = filterAndSortProjects(PROJECTS, "", "created");
      expect(result.map((p) => p.id)).toEqual(["3", "2", "1"]);
    });

    it('mantiene el orden original cuando sort es "activity"', () => {
      const result = filterAndSortProjects(PROJECTS, "", "activity");
      expect(result.map((p) => p.id)).toEqual(["1", "2", "3"]);
    });
  });

  it("no muta el array original", () => {
    const original = [...PROJECTS];
    filterAndSortProjects(PROJECTS, "", "name");
    expect(PROJECTS).toEqual(original);
  });
});

// ─── getProjectById ───────────────────────────────────────────────────────────

describe("getProjectById", () => {
  it("retorna el proyecto cuando el ID existe", () => {
    const result = getProjectById(PROJECTS, "2");
    expect(result).toEqual(PROJECTS[1]);
  });

  it("retorna undefined cuando el ID no existe", () => {
    const result = getProjectById(PROJECTS, "999");
    expect(result).toBeUndefined();
  });

  it("retorna undefined para lista vacía", () => {
    const result = getProjectById([], "1");
    expect(result).toBeUndefined();
  });
});

// ─── Verificar que formatThreadLastMessage NO existe en projects.helpers ───────

describe("ausencia de formatThreadLastMessage en projects.helpers", () => {
  it("no exporta formatThreadLastMessage (está solo en thread.helpers)", async () => {
    const mod = await import("@/helpers/projects.helpers");
    expect((mod as Record<string, unknown>).formatThreadLastMessage).toBeUndefined();
  });
});
