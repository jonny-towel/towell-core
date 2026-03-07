import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/projects/project-detail-client";
import { getProjectById } from "@/helpers/projects.helpers";
import { MOCK_PROJECTS } from "@/constants/projects.constants";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * ProyectoDetailPage
 *
 * Vista de detalle de un proyecto con chat, contexto y archivos.
 * Ruta dinámica: /dashboard/proyecto/[id]
 */
export default async function ProyectoDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(MOCK_PROJECTS, id);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <ProjectDetailClient project={project} />
    </main>
  );
}
