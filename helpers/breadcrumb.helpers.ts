import { BREADCRUMB_LABELS } from "@/constants/breadcrumb.constants";

/**
 * Convierte un segmento de URL en label legible para el breadcrumb.
 * Usa BREADCRUMB_LABELS si existe, sino capitaliza la primera letra.
 */
export function formatBreadcrumbLabel(segment: string): string {
  return (
    BREADCRUMB_LABELS[segment] ??
    segment.charAt(0).toUpperCase() + segment.slice(1)
  );
}
