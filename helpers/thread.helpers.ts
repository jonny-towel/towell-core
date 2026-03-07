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
