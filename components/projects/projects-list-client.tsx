"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListPageWithSearch } from "@/components/layouts/list-page-with-search";
import { SortSelect } from "@/components/ui/sort-select";
import { ProjectCard } from "@/components/projects/project-card";
import { MOCK_PROJECTS, SORT_OPTIONS, PROJECTS_PAGE } from "@/constants/projects.constants";
import { filterAndSortProjects } from "@/helpers/projects.helpers";
import type { SortOption } from "@/interfaces/project.interface";
import { useProjectsListStore } from "@/store/use-projects-list-store";

/**
 * ProjectsListClient
 *
 * Listado de proyectos con búsqueda y ordenamiento.
 * Usa ListPageWithSearch (layout compartido con Chats).
 */
export function ProjectsListClient() {
  const { search, sort, setSearch, setSort } = useProjectsListStore();

  const filteredAndSorted = useMemo(
    () => filterAndSortProjects(MOCK_PROJECTS, search, sort),
    [search, sort]
  );

  return (
    <ListPageWithSearch
      title={PROJECTS_PAGE.title}
      action={
        <Button
          asChild
          size="default"
          className="gap-2 bg-black text-white hover:bg-black/90"
        >
          <Link href="/dashboard/proyecto/nuevo">
            <PlusIcon className="size-4" aria-hidden />
            {PROJECTS_PAGE.newProject}
          </Link>
        </Button>
      }
      searchPlaceholder={PROJECTS_PAGE.searchPlaceholder}
      searchValue={search}
      onSearchChange={setSearch}
      searchAriaLabel={PROJECTS_PAGE.searchAriaLabel}
      toolbar={
        <SortSelect
          value={sort}
          options={SORT_OPTIONS}
          onValueChange={(v) => setSort(v as SortOption)}
        />
      }
    >
      <div className="grid grid-cols-1 gap-4">
        {filteredAndSorted.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/20 py-16">
          <p className="text-sm text-muted-foreground">
            {search
              ? PROJECTS_PAGE.emptySearch
              : PROJECTS_PAGE.emptyDefault}
          </p>
          {!search && (
            <Button asChild>
              <Link href="/dashboard/proyecto/nuevo">
                <PlusIcon className="size-4" aria-hidden />
                {PROJECTS_PAGE.newProject}
              </Link>
            </Button>
          )}
        </div>
      )}
    </ListPageWithSearch>
  );
}
