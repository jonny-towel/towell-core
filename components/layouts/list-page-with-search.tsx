"use client";

import { SearchInput } from "@/components/ui/search-input";
import { cn } from "@/lib/utils";
import type { ListPageWithSearchProps } from "@/interfaces/list-page-with-search.interface";

/**
 * ListPageWithSearch
 *
 * Layout reutilizable para páginas con título, botón de acción, búsqueda y contenido.
 * Usado en Proyectos y Chats.
 */
export function ListPageWithSearch({
  title,
  titleClassName,
  action,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  searchAriaLabel,
  toolbar,
  children,
}: ListPageWithSearchProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className={cn(
            "text-2xl font-semibold tracking-tight text-foreground",
            titleClassName
          )}
        >
          {title}
        </h1>
        {action}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          aria-label={searchAriaLabel}
          className={cn("min-w-0 flex-1", !toolbar && "sm:max-w-md")}
        />
        {toolbar}
      </div>

      {children}
    </div>
  );
}
