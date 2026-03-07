import { RecentsClient } from "@/components/projects/recents-client";
/**
 * RecentsPage
 *
 * Sección de chats recientes. Accesible desde "Nuevo chat" en el sidebar.
 */
export default function RecentsPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <RecentsClient />
    </main>
  );
}
