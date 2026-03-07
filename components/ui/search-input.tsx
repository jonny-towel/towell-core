"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SearchInputProps } from "@/interfaces/search-input.interface";

/**
 * SearchInput
 *
 * Input de búsqueda reutilizable con icono de lupa.
 * Usa el Input de shadcn.
 */
export function SearchInput({
  placeholder,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-10 pl-9"
      />
    </div>
  );
}
