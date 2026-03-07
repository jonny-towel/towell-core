import { BarChart2, Code2, FileText, Palette } from "lucide-react";
import type { ChatSuggestion } from "../interfaces/chat-suggestion.interface";

export const PROJECT_SUGGESTIONS: readonly ChatSuggestion[] = [
  {
    id: "analytics",
    label: "Análisis de datos",
    description: "Procesa y visualiza información",
    icon: BarChart2,
  },
  {
    id: "development",
    label: "Desarrollo",
    description: "Construye software o aplicaciones",
    icon: Code2,
  },
  {
    id: "writing",
    label: "Redacción",
    description: "Documenta o crea contenido",
    icon: FileText,
  },
  {
    id: "design",
    label: "Diseño",
    description: "Crea interfaces o visuales",
    icon: Palette,
  },
] as const;
