/** Opción de ordenamiento para la lista de chats */
export type RecentsSortOption = "recent" | "title";

/** Thread mostrado en la sección Recents (incluye proyecto y modelo) */
export interface RecentsThread {
  id: string;
  title: string;
  lastMessageDaysAgo: number;
  projectId: string;
  modelName?: string;
}
