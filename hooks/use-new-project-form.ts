"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newProjectSchema,
  type NewProjectFormValues,
} from "@/interfaces/new-project-form.interface";
import { useNewProjectStore } from "@/store/use-new-project-store";

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useNewProjectForm
 *
 * Encapsula toda la lógica del formulario de creación de proyecto:
 * — react-hook-form con validación Zod
 * — Estado de UI sincronizado con el store de Zustand
 * — Handler de envío con manejo de errores
 */
export function useNewProjectForm() {
  const { isCreating, error, setIsCreating, setError, reset } =
    useNewProjectStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewProjectFormValues>({
    resolver: zodResolver(newProjectSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (values: NewProjectFormValues) => {
      setIsCreating(true);
      setError(null);
      try {
        // TODO: integrar con Supabase → insertar proyecto y redirigir
        console.log("Crear proyecto:", values);
        reset();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al crear el proyecto"
        );
      } finally {
        setIsCreating(false);
      }
    },
    [setIsCreating, setError, reset]
  );

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isCreating,
    error,
    onSubmit,
  };
}
