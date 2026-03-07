import type { Project, SortOption } from "@/interfaces/project.interface";

/**
 * Helpers para el módulo de proyectos.
 */

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
    const q = search.toLowerCase();
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
 * Formatea los días desde el último mensaje de un thread.
 * @param days - Cantidad de días
 * @returns "Último mensaje hace 1 día" o "Último mensaje hace N días"
 */
export function formatThreadLastMessage(days: number): string {
  if (days === 1) return "Último mensaje hace 1 día";
  return `Último mensaje hace ${days} días`;
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
