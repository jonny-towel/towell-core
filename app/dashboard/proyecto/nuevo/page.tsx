import { NewProjectClient } from "@/components/projects/new-project-client";
/**
 * NuevoProyectoPage
 *
 * Server Component: exporta metadata para SEO y delega la UI interactiva
 * a NewProjectClient para minimizar el bundle del cliente.
 */
export default function NuevoProyectoPage() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-4 py-12"
    >
      <NewProjectClient />
    </main>
  );
}
