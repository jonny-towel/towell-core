import type {
  RecentsThread,
  RecentsSortOption,
} from "@/interfaces/recents-thread.interface";

/** Opciones de ordenamiento para la lista de chats */
export const RECENTS_SORT_OPTIONS: readonly {
  value: RecentsSortOption;
  label: string;
}[] = [
  { value: "recent", label: "Más recientes" },
  { value: "title", label: "Título A-Z" },
] as const;

/** Textos de la página Recents / Chats */
export const RECENTS_PAGE = {
  title: "Chats",
  newChat: "Nuevo chat",
  searchPlaceholder: "Buscar en sus chats...",
  emptyMessage: "No hay conversaciones recientes.",
} as const;

/** Mock de threads recientes (reemplazar por datos de Supabase) */
export const MOCK_RECENTS_THREADS: readonly RecentsThread[] = [
  {
    id: "1",
    title: "Diseño de esquemas de base de datos para orquestación de modelos IA",
    lastMessageDaysAgo: 2,
    projectId: "p1",
    modelName: "Orquest Models",
  },
  {
    id: "2",
    title: "Estructura y validación de MVP con análisis de mercado",
    lastMessageDaysAgo: 3,
    projectId: "p1",
    modelName: "Orquest Models",
  },
  {
    id: "3",
    title: "Diseño UX/UI de aplicación desktop en Figma",
    lastMessageDaysAgo: 4,
    projectId: "p1",
    modelName: "Orquest Models",
  },
  {
    id: "4",
    title: "Mejores ETFs de renta fija para 2026",
    lastMessageDaysAgo: 7,
    projectId: "p2",
  },
] as const;
