import type { Metadata } from "next";
import { ProjectsListClient } from "./_components/projects-list-client";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Gestiona tus proyectos de trabajo colaborativo con asistencia de IA.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * ProyectosPage
 *
 * Listado de proyectos estilo Claude: búsqueda, ordenamiento y cards.
 * El botón "Nuevo proyecto" redirige a /dashboard/proyecto/nuevo.
 */
export default function ProyectosPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <ProjectsListClient />
    </main>
  );
}
