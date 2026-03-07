import type { Thread } from "@/interfaces/thread.interface";

/** Mock de threads para demostrar la lista (reemplazar por datos de Supabase) */
export const MOCK_THREADS: readonly Thread[] = [
  {
    id: "1",
    title: "Diseño de esquemas de base de datos para orquestación de modelos IA",
    lastMessageDaysAgo: 2,
  },
  {
    id: "2",
    title: "Estructura y validación de MVP con análisis de mercado",
    lastMessageDaysAgo: 3,
  },
  {
    id: "3",
    title: "Diseño UX/UI de aplicación desktop en Figma",
    lastMessageDaysAgo: 4,
  },
] as const;
