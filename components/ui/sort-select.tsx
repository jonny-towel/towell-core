"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortSelectProps } from "@/interfaces/sort-select.interface";

/**
 * SortSelect
 *
 * Selector de ordenamiento reutilizable con label "Ordenar por".
 * Usado en ProjectsListClient y RecentsClient.
 */
export function SortSelect({ value, options, onValueChange }: SortSelectProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-sm text-muted-foreground">Ordenar por</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
