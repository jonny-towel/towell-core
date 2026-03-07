"use client";

import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { NEW_PROJECT_FORM } from "@/constants/new-project.constants";
import { useNewProjectForm } from "@/hooks/use-new-project-form";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * NewProjectClient
 *
 * Formulario profesional de creación de proyecto.
 * — Lógica de formulario delegada a useNewProjectForm (react-hook-form + zod)
 * — Estado de envío gestionado por Zustand vía el hook
 */
export function NewProjectClient() {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isCreating,
    error,
    onSubmit,
  } = useNewProjectForm();

  const nameInvalid = !!errors.name;

  return (
    <div className="w-full max-w-xl">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {NEW_PROJECT_FORM.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {NEW_PROJECT_FORM.subtitle}
        </p>
      </div>

      {/* ── Form ── */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label={NEW_PROJECT_FORM.formAriaLabel}
        className="flex flex-col gap-6"
      >
        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="project-name">
            {NEW_PROJECT_FORM.nameLabel}
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="project-name"
            placeholder={NEW_PROJECT_FORM.namePlaceholder}
            autoComplete="off"
            aria-required="true"
            {...register("name")}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={nameInvalid}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="project-description">
            {NEW_PROJECT_FORM.descriptionLabel}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              {NEW_PROJECT_FORM.descriptionOptional}
            </span>
          </Label>
          <textarea
            id="project-description"
            placeholder={NEW_PROJECT_FORM.descriptionPlaceholder}
            rows={3}
            className={cn(
              "w-full resize-none rounded-md border border-input bg-transparent px-3 py-2",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "shadow-xs outline-none transition-[border-color,box-shadow]",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...register("description")}
            aria-describedby={errors.description ? "desc-error" : undefined}
          />
          {errors.description && (
            <p id="desc-error" role="alert" className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Error global */}
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" asChild disabled={isCreating}>
            <Link href="/dashboard/proyecto">{NEW_PROJECT_FORM.cancel}</Link>
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isCreating}
            className="gap-2"
          >
            {isCreating ? (
              <>
                <Loader2Icon
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                {NEW_PROJECT_FORM.submitting}
              </>
            ) : (
              NEW_PROJECT_FORM.submit
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
