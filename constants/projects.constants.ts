import type { Project, SortOption } from "@/interfaces/project.interface";

/** Textos de la página de listado de proyectos */
export const PROJECTS_PAGE = {
  title: "Proyectos",
  newProject: "Nuevo proyecto",
  searchPlaceholder: "Buscar proyectos...",
  searchAriaLabel: "Buscar proyectos",
  emptySearch: "No se encontraron proyectos con ese criterio.",
  emptyDefault: "Aún no tienes proyectos. Crea uno para empezar.",
} as const;

/** Opciones de ordenamiento para el listado de proyectos */
export const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: "activity", label: "Actividad" },
  { value: "name", label: "Nombre" },
  { value: "created", label: "Recientes" },
] as const;

/** Mock de proyectos (reemplazar por datos de Supabase) */
export const MOCK_PROJECTS: readonly Project[] = [
  {
    id: "1",
    name: "Orquest Models",
    description:
      "Creation multiples agents, skills, hooks, subagents of Marketing, Development, Agriculture, Lawler, Accounting, and others",
    updatedAt: "4",
  },
  {
    id: "2",
    name: "How to use Claude",
    description:
      "An example project that also doubles as a how-to guide for using Claude. Chat with it to learn more about how to get the most out of chatting with Claude!",
    updatedAt: "7",
    badge: "Proyecto de ejemplo",
  },
] as const;
