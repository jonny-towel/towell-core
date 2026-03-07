import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────────────

/** Schema de validación del formulario de nuevo proyecto */
export const newProjectSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "Máximo 80 caracteres"),
  description: z.string().max(300, "Máximo 300 caracteres").optional(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

/** Tipo inferido del schema del formulario */
export type NewProjectFormValues = z.infer<typeof newProjectSchema>;
