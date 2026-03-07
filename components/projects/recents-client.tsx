"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListPageWithSearch } from "@/components/layouts/list-page-with-search";
import { SortSelect } from "@/components/ui/sort-select";
import {
  RECENTS_PAGE,
  RECENTS_SORT_OPTIONS,
  MOCK_RECENTS_THREADS,
} from "@/constants/recents.constants";
import { formatRecentsThreadSubtitle, sortRecentsThreads } from "@/helpers/thread.helpers";
import type { RecentsSortOption } from "@/interfaces/recents-thread.interface";
import { useRecentsStore } from "@/store/use-recents-store";

/**
 * RecentsClient
 *
 * Sección de chats recientes: título, búsqueda, orden y lista de conversaciones.
 * Usa font-display para títulos según diseño.
 */
export function RecentsClient() {
  const { search, setSearch, sort, setSort } = useRecentsStore();

  const filteredAndSorted = useMemo(() => {
    const filtered = MOCK_RECENTS_THREADS.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
    return sortRecentsThreads([...filtered], sort);
  }, [search, sort]);

  return (
    <ListPageWithSearch
      title={RECENTS_PAGE.title}
      titleClassName="font-display"
      action={
        <Button
          asChild
          size="default"
          className="gap-2 bg-black text-white hover:bg-black/90"
        >
          <Link href="/dashboard/proyecto/nuevo">
            <PlusIcon className="size-4" aria-hidden />
            {RECENTS_PAGE.newChat}
          </Link>
        </Button>
      }
      searchPlaceholder={RECENTS_PAGE.searchPlaceholder}
      searchValue={search}
      onSearchChange={setSearch}
      searchAriaLabel={RECENTS_PAGE.searchAriaLabel}
      toolbar={
        <SortSelect
          value={sort}
          options={RECENTS_SORT_OPTIONS}
          onValueChange={(v) => setSort(v as RecentsSortOption)}
        />
      }
    >
      {filteredAndSorted.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/10 py-16 px-4">
          <p className="text-center text-sm text-muted-foreground">
            {RECENTS_PAGE.emptyMessage}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {filteredAndSorted.map((thread) => (
            <li key={thread.id}>
              <Link
                href={`/dashboard/proyecto/${thread.projectId}/thread/${thread.id}`}
                className="block py-4 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded"
              >
                <p className="font-display font-medium text-foreground">
                  {thread.title}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {formatRecentsThreadSubtitle(
                    thread.lastMessageDaysAgo,
                    thread.modelName
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </ListPageWithSearch>
  );
}
