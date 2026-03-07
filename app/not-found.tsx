import Link from "next/link";

/**
 * Página 404 global.
 * Se muestra cuando la ruta no existe o se llama a notFound().
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <p className="text-9xl font-display text-muted-foreground/50">404</p>
      <p className="text-sm text-muted-foreground">Página no encontrada</p>
      <Link
        href="/dashboard"
        className="text-md text-foreground font-display hover:text-muted-foreground"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
