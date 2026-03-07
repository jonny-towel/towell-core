import type { Project, SortOption } from "@/interfaces/project.interface";

/**
 * Formatea la cantidad de días en texto legible.
 * @param days - Cantidad de días (string o número)
 * @returns "Actualizado hace 1 día" o "Actualizado hace N días"
 */
export function formatProjectUpdatedAt(days: string | number): string {
  const n = Number(days);
  if (n === 1) return "Actualizado hace 1 día";
  return `Actualizado hace ${n} días`;
}

/**
 * Filtra y ordena proyectos según búsqueda y criterio de orden.
 */
export function filterAndSortProjects(
  projects: readonly Project[],
  search: string,
  sort: SortOption
): Project[] {
  let list = [...projects];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "created") {
    list.sort((a, b) => Number(b.id) - Number(a.id));
  }

  return list;
}

/**
 * Obtiene un proyecto por ID desde la lista.
 * @returns El proyecto o undefined si no existe
 */
export function getProjectById(
  projects: readonly Project[],
  id: string
): Project | undefined {
  return projects.find((p) => p.id === id);
}
