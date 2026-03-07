/**
 * Configuración de estándares del proyecto.
 * Usado por useProjectStandards y como referencia para convenciones.
 */

export const PROJECT_STANDARDS = {
  /** Límite máximo de líneas por archivo */
  MAX_FILE_LINES: 250,

  /** Rutas de carpetas (alias @/) */
  PATHS: {
    interfaces: "interfaces",
    helpers: "helpers",
    constants: "constants",
    hooks: "hooks",
    store: "store",
  } as const,
} as const;

export type ProjectStandards = typeof PROJECT_STANDARDS;
