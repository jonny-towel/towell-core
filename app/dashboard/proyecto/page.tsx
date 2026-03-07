import { ProjectsListClient } from "@/components/projects/projects-list-client";
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
