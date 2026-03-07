import type { Metadata } from "next";
import { NewProjectClient } from "./_components/new-project-client";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Nuevo Proyecto",
  description:
    "Crea un nuevo proyecto de trabajo colaborativo con asistencia de IA.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

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
