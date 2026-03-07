import type { LucideIcon } from "lucide-react";

export interface ChatSuggestion {
  id: string;
  label: string;
  description: string;
  /** Ícono de Lucide React que representa visualmente la categoría. */
  icon: LucideIcon;
}

export interface ChatSuggestionsProps {
  /** Lista de categorías. Por defecto usa PROJECT_SUGGESTIONS. */
  suggestions?: ChatSuggestion[];
  /** ID de la categoría actualmente seleccionada. */
  selectedId?: string | null;
  /** Callback al seleccionar/deseleccionar una categoría. */
  onSelect: (id: string) => void;
  /** Clases CSS adicionales. */
  className?: string;
}
