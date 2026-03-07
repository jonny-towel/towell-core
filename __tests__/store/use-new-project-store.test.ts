import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useNewProjectStore } from "@/store/use-new-project-store";

describe("useNewProjectStore", () => {
  beforeEach(() => {
    act(() => {
      useNewProjectStore.getState().reset();
    });
  });

  describe("estado inicial", () => {
    it("debe tener name vacío", () => {
      const { result } = renderHook(() => useNewProjectStore());
      expect(result.current.name).toBe("");
    });

    it("debe tener description vacío", () => {
      const { result } = renderHook(() => useNewProjectStore());
      expect(result.current.description).toBe("");
    });

    it("debe tener isCreating en false", () => {
      const { result } = renderHook(() => useNewProjectStore());
      expect(result.current.isCreating).toBe(false);
    });

    it("debe tener error en null", () => {
      const { result } = renderHook(() => useNewProjectStore());
      expect(result.current.error).toBeNull();
    });
  });

  describe("setName", () => {
    it("debe actualizar el name", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => { result.current.setName("Proyecto Alpha"); });
      expect(result.current.name).toBe("Proyecto Alpha");
    });

    it("debe aceptar string vacío", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => {
        result.current.setName("Algo");
        result.current.setName("");
      });
      expect(result.current.name).toBe("");
    });
  });

  describe("setDescription", () => {
    it("debe actualizar la description", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => { result.current.setDescription("Descripción detallada"); });
      expect(result.current.description).toBe("Descripción detallada");
    });
  });

  describe("setIsCreating", () => {
    it("debe actualizar isCreating a true", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => { result.current.setIsCreating(true); });
      expect(result.current.isCreating).toBe(true);
    });

    it("debe actualizar isCreating a false", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => {
        result.current.setIsCreating(true);
        result.current.setIsCreating(false);
      });
      expect(result.current.isCreating).toBe(false);
    });
  });

  describe("setError", () => {
    it("debe guardar el mensaje de error", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => { result.current.setError("Error de conexión"); });
      expect(result.current.error).toBe("Error de conexión");
    });

    it("debe limpiar el error con null", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => {
        result.current.setError("Error");
        result.current.setError(null);
      });
      expect(result.current.error).toBeNull();
    });
  });

  describe("reset", () => {
    it("debe restaurar todo al estado inicial", () => {
      const { result } = renderHook(() => useNewProjectStore());
      act(() => {
        result.current.setName("Proyecto X");
        result.current.setDescription("Desc");
        result.current.setIsCreating(true);
        result.current.setError("Algo falló");
      });
      act(() => { result.current.reset(); });
      expect(result.current.name).toBe("");
      expect(result.current.description).toBe("");
      expect(result.current.isCreating).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
