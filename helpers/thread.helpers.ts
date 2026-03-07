/**
 * Helpers para threads de conversación.
 */

/**
 * Formatea los días desde el último mensaje.
 * @param days - Cantidad de días
 * @returns "Último mensaje hace 1 día" o "Último mensaje hace N días"
 */
export function formatThreadLastMessage(days: number): string {
  if (days === 1) return "Último mensaje hace 1 día";
  return `Último mensaje hace ${days} días`;
}

/**
 * Ordena threads de recents según el criterio.
 */
export function sortRecentsThreads<T extends { title: string; lastMessageDaysAgo: number }>(
  threads: T[],
  sort: "recent" | "title"
): T[] {
  const list = [...threads];
  if (sort === "title") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    list.sort((a, b) => a.lastMessageDaysAgo - b.lastMessageDaysAgo);
  }
  return list;
}

/**
 * Formatea el subtítulo de un thread en Recents (días + modelo opcional).
 * @param days - Cantidad de días
 * @param modelName - Nombre del modelo (opcional)
 */
export function formatRecentsThreadSubtitle(
  days: number,
  modelName?: string
): string {
  const base = formatThreadLastMessage(days);
  if (modelName) return `${base} en ${modelName}`;
  return base;
}
