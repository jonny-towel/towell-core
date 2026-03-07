import { create } from "zustand";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NewProjectState {
  /** Nombre del proyecto (campo requerido) */
  name: string;
  /** Descripción del proyecto (opcional) */
  description: string;
  /** Estado de envío */
  isCreating: boolean;
  /** Mensaje de error si falla la creación */
  error: string | null;
}

interface NewProjectActions {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setIsCreating: (value: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type NewProjectStore = NewProjectState & NewProjectActions;

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: NewProjectState = {
  name: "",
  description: "",
  isCreating: false,
  error: null,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useNewProjectStore = create<NewProjectStore>((set) => ({
  ...INITIAL_STATE,

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setIsCreating: (value) => set({ isCreating: value }),
  setError: (error) => set({ error }),
  reset: () => set(INITIAL_STATE),
}));
