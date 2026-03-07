import type { Metadata } from "next";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Gestiona y crea proyectos de trabajo colaborativo con asistencia de IA.",
};

// ─── Layout ────────────────────────────────────────────────────────────────────

/**
 * ProyectoLayout
 *
 * Layout para la sección de proyectos (/dashboard/proyecto y /dashboard/proyecto/nuevo).
 * La metadata aplica a todas las rutas hijas.
 */
export default function ProyectoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
