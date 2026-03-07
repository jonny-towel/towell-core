"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { PROJECT_SUGGESTIONS } from "@/constants/chat-suggestions.constants";
import type {
  ChatSuggestion,
  ChatSuggestionsProps,
} from "@/interfaces/chat-suggestion.interface";

// ─── CategoryCard (memoizado: rerender-memo) ──────────────────────────────────

interface CategoryCardProps {
  suggestion: ChatSuggestion;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryCard = memo(function CategoryCard({
  suggestion,
  isSelected,
  onSelect,
}: CategoryCardProps) {
  const Icon = suggestion.icon;

  return (
    <li>
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => onSelect(suggestion.id)}
        className={cn(
          "group flex w-full flex-col gap-3 rounded-xl border p-4 text-left",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "active:scale-[0.98]",
          isSelected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border bg-card hover:border-border/80 hover:bg-muted/40"
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground group-hover:bg-muted/80"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {suggestion.label}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {suggestion.description}
          </p>
        </div>
      </button>
    </li>
  );
});

// ─── ChatSuggestions ──────────────────────────────────────────────────────────

/**
 * ChatSuggestions
 *
 * Selector de categoría de proyecto en forma de grid de cards.
 * Cada card muestra un ícono de Lucide, label y descripción.
 * Soporta selección visual con estado `selectedId`.
 */
export function ChatSuggestions({
  suggestions = PROJECT_SUGGESTIONS as ChatSuggestion[],
  selectedId,
  onSelect,
  className,
}: ChatSuggestionsProps) {
  return (
    <fieldset className={cn("border-none p-0 m-0", className)}>
      <legend className="sr-only">Categoría del proyecto</legend>
      <ul
        role="radiogroup"
        aria-label="Categoría del proyecto"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {suggestions.map((s) => (
          <CategoryCard
            key={s.id}
            suggestion={s}
            isSelected={selectedId === s.id}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </fieldset>
  );
}
