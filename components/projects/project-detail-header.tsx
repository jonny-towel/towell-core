"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  MoreVerticalIcon,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Project } from "@/interfaces/project.interface";
import { PROJECT_DETAIL } from "@/constants/project-detail.constants";

interface ProjectDetailHeaderProps {
  project: Project;
}

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/proyecto"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        {PROJECT_DETAIL.backLink}
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground truncate">
              {project.name}
            </h1>
            {project.badge && (
              <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {project.badge}
              </span>
            )}
          </div>
          {project.description && (
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Marcar favorito">
            <StarIcon className="size-4" aria-hidden />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Más opciones">
                <MoreVerticalIcon className="size-4" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{PROJECT_DETAIL.menuEdit}</DropdownMenuItem>
              <DropdownMenuItem>{PROJECT_DETAIL.menuSettings}</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                {PROJECT_DETAIL.menuDelete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
