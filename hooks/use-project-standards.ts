"use client";

import { PROJECT_STANDARDS } from "@/config/project-standards";

/**
 * Hook que expone la configuración de estándares del proyecto.
 * Útil para validar o mostrar límites al desarrollar.
 */
export function useProjectStandards() {
  return PROJECT_STANDARDS;
}
