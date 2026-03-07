import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNewProjectForm } from "@/hooks/use-new-project-form";
import { useNewProjectStore } from "@/store/use-new-project-store";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@/store/use-new-project-store");

const mockSetIsCreating = vi.fn();
const mockSetError = vi.fn();
const mockReset = vi.fn();

function buildMockStore(overrides: Partial<ReturnType<typeof useNewProjectStore>> = {}) {
  return {
    name: "",
    description: "",
    isCreating: false,
    error: null,
    setName: vi.fn(),
    setDescription: vi.fn(),
    setIsCreating: mockSetIsCreating,
    setError: mockSetError,
    reset: mockReset,
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useNewProjectForm", () => {
  beforeEach(() => {
    vi.mocked(useNewProjectStore).mockReturnValue(buildMockStore());
    mockSetIsCreating.mockClear();
    mockSetError.mockClear();
    mockReset.mockClear();
  });

  describe("valores iniciales", () => {
    it("expone isCreating del store (false por defecto)", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.isCreating).toBe(false);
    });

    it("expone error del store (null por defecto)", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.error).toBeNull();
    });

    it("el formulario comienza inválido (nombre vacío)", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.isValid).toBe(false);
    });

    it("no hay errores de campo en el estado inicial", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.errors.name).toBeUndefined();
      expect(result.current.errors.description).toBeUndefined();
    });
  });

  describe("refleja estado del store", () => {
    it("expone isCreating: true cuando el store lo tiene en true", () => {
      vi.mocked(useNewProjectStore).mockReturnValue(
        buildMockStore({ isCreating: true })
      );
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.isCreating).toBe(true);
    });

    it("expone el mensaje de error del store", () => {
      vi.mocked(useNewProjectStore).mockReturnValue(
        buildMockStore({ error: "Algo falló" })
      );
      const { result } = renderHook(() => useNewProjectForm());
      expect(result.current.error).toBe("Algo falló");
    });
  });

  describe("onSubmit", () => {
    it("llama a setIsCreating(true) al inicio del envío", async () => {
      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      expect(mockSetIsCreating).toHaveBeenCalledWith(true);
    });

    it("llama a setError(null) al inicio del envío", async () => {
      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      expect(mockSetError).toHaveBeenCalledWith(null);
    });

    it("llama a reset() tras un envío exitoso", async () => {
      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it("llama a setIsCreating(false) al finalizar (bloque finally)", async () => {
      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      const calls = mockSetIsCreating.mock.calls;
      expect(calls[calls.length - 1][0]).toBe(false);
    });

    it("llama a setError con mensaje de error si falla", async () => {
      mockReset.mockImplementationOnce(() => {
        throw new Error("Error de red");
      });

      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      expect(mockSetError).toHaveBeenCalledWith("Error de red");
    });

    it("usa mensaje genérico si el error no es una instancia de Error", async () => {
      mockReset.mockImplementationOnce(() => {
        throw "fallo_desconocido";
      });

      const { result } = renderHook(() => useNewProjectForm());

      await act(async () => {
        await result.current.onSubmit({ name: "Mi Proyecto" });
      });

      expect(mockSetError).toHaveBeenCalledWith("Error al crear el proyecto");
    });
  });

  describe("handlers expuestos", () => {
    it("expone register como función", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(typeof result.current.register).toBe("function");
    });

    it("expone handleSubmit como función", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(typeof result.current.handleSubmit).toBe("function");
    });

    it("expone onSubmit como función", () => {
      const { result } = renderHook(() => useNewProjectForm());
      expect(typeof result.current.onSubmit).toBe("function");
    });
  });
});
