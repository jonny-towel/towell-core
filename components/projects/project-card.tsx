"use client";

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatProjectUpdatedAt } from "@/helpers/projects.helpers";
import type { ProjectCardProps } from "@/interfaces/project.interface";

/**
 * ProjectCard (memoizado: rerender-memo)
 *
 * Tarjeta de proyecto reutilizable. Memoizada para evitar re-renders
 * cuando la lista cambia por búsqueda pero la tarjeta no ha cambiado.
 */
export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/proyecto/${project.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-border bg-card p-4",
        "transition-colors hover:border-border/80 hover:bg-muted/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-foreground group-hover:text-foreground">
          {project.name}
        </h2>
        {project.badge && (
          <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {project.badge}
          </span>
        )}
      </div>
      <p className="line-clamp-3 text-sm text-muted-foreground">
        {project.description}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatProjectUpdatedAt(project.updatedAt)}
      </p>
    </Link>
  );
});
