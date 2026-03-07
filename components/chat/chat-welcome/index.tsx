import { cn } from "@/lib/utils";
import type { ChatWelcomeProps } from "./interfaces/chat-welcome.interface";

// Icono estático hoistado fuera del componente (rendering-hoist-jsx)
const WelcomeIcon = (
  <div
    aria-hidden="true"
    className={cn(
      "flex h-14 w-14 items-center justify-center rounded-2xl",
      "bg-linear-to-br from-blue-500 to-violet-600 shadow-lg"
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path d="M12 3l1.88 5.76a2 2 0 0 0 1.9 1.38h6.06l-4.9 3.56a2 2 0 0 0-.73 2.24L18.09 21 13.18 17.44a2 2 0 0 0-2.36 0L5.91 21l1.88-5.06a2 2 0 0 0-.73-2.24L2.16 10.14H8.22a2 2 0 0 0 1.9-1.38L12 3z" />
    </svg>
  </div>
);

/**
 * ChatWelcome
 *
 * Sección de bienvenida en la parte superior de la página de nuevo proyecto.
 * Renderiza como Server Component (sin "use client").
 */
export function ChatWelcome({
  title = "¿En qué proyecto trabajamos hoy?",
  subtitle = "Describe tu idea o elige una categoría para empezar",
  className,
}: ChatWelcomeProps) {
  return (
    <header
      className={cn("flex flex-col items-center gap-4 text-center", className)}
    >
      {WelcomeIcon}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </header>
  );
}
