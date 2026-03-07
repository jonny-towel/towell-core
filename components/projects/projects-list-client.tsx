"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MOCK_PROJECTS, SORT_OPTIONS } from "@/constants/projects.constants";
import {
  filterAndSortProjects,
  formatProjectUpdatedAt,
} from "@/helpers/projects.helpers";
import type { SortOption } from "@/interfaces/project.interface";
import { useProjectsListStore } from "@/store/use-projects-list-store";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProjectsListClient
 *
 * Listado de proyectos con búsqueda y ordenamiento.
 * Estado de filtros en Zustand (useProjectsListStore).
 */
export function ProjectsListClient() {
  const { search, sort, setSearch, setSort } = useProjectsListStore();

  const filteredAndSorted = useMemo(
    () => filterAndSortProjects(MOCK_PROJECTS, search, sort),
    [search, sort]
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Proyectos
        </h1>
        <Button asChild size="default" className="gap-2">
          <Link href="/dashboard/proyecto/nuevo">
            <PlusIcon className="size-4" aria-hidden />
            Nuevo proyecto
          </Link>
        </Button>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full pl-9"
            aria-label="Buscar proyectos"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por</span>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Project cards ── */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAndSorted.map((project) => (
          <Link
            key={project.id}
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
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/20 py-16">
          <p className="text-sm text-muted-foreground">
            {search
              ? "No se encontraron proyectos con ese criterio."
              : "Aún no tienes proyectos. Crea uno para empezar."}
          </p>
          {!search && (
            <Button asChild>
              <Link href="/dashboard/proyecto/nuevo">
                <PlusIcon className="size-4" aria-hidden />
                Nuevo proyecto
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
