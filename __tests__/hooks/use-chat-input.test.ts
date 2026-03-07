import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChatInput } from "@/hooks/use-chat-input";

describe("useChatInput", () => {
  describe("modo no-controlado (uncontrolled)", () => {
    it("inicia con valor vacío", () => {
      const { result } = renderHook(() => useChatInput({}));
      expect(result.current.value).toBe("");
    });

    it("canSend es false cuando el valor está vacío", () => {
      const { result } = renderHook(() => useChatInput({}));
      expect(result.current.canSend).toBe(false);
    });

    it("canSend es true cuando hay texto", () => {
      const { result } = renderHook(() => useChatInput({}));
      act(() => result.current.setValue("hola"));
      expect(result.current.canSend).toBe(true);
    });

    it("canSend es false si el valor es solo espacios", () => {
      const { result } = renderHook(() => useChatInput({}));
      act(() => result.current.setValue("   "));
      expect(result.current.canSend).toBe(false);
    });

    it("handleSend limpia el valor después de enviar", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend }));
      act(() => result.current.setValue("mensaje"));
      act(() => result.current.handleSend());
      expect(result.current.value).toBe("");
    });

    it("handleSend llama onSend con el texto trimado", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend }));
      act(() => result.current.setValue("  hola mundo  "));
      act(() => result.current.handleSend());
      expect(onSend).toHaveBeenCalledWith("hola mundo");
    });

    it("handleSend no llama onSend si el valor está vacío", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend }));
      act(() => result.current.handleSend());
      expect(onSend).not.toHaveBeenCalled();
    });

    it("handleSend no llama onSend si disabled es true", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend, disabled: true }));
      act(() => result.current.setValue("hola"));
      act(() => result.current.handleSend());
      expect(onSend).not.toHaveBeenCalled();
    });
  });

  describe("modo controlado (controlled)", () => {
    it("usa el valor externo cuando se provee controlledValue", () => {
      const { result } = renderHook(() =>
        useChatInput({ controlledValue: "valor externo" })
      );
      expect(result.current.value).toBe("valor externo");
    });

    it("llama onControlledChange al actualizar el valor", () => {
      const onControlledChange = vi.fn();
      const { result } = renderHook(() =>
        useChatInput({ controlledValue: "", onControlledChange })
      );
      act(() => result.current.setValue("nuevo valor"));
      expect(onControlledChange).toHaveBeenCalledWith("nuevo valor");
    });

    it("no actualiza estado interno en modo controlado", () => {
      const onControlledChange = vi.fn();
      const { result } = renderHook(() =>
        useChatInput({ controlledValue: "fijo", onControlledChange })
      );
      act(() => result.current.setValue("cambiado"));
      // El valor sigue siendo "fijo" porque es controlado externamente
      expect(result.current.value).toBe("fijo");
    });
  });

  describe("handleKeyDown", () => {
    it("llama handleSend al presionar Enter", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend }));
      act(() => result.current.setValue("hola"));
      act(() => {
        result.current.handleKeyDown({
          key: "Enter",
          shiftKey: false,
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
      });
      expect(onSend).toHaveBeenCalledWith("hola");
    });

    it("NO envía al presionar Shift+Enter", () => {
      const onSend = vi.fn();
      const { result } = renderHook(() => useChatInput({ onSend }));
      act(() => result.current.setValue("hola"));
      act(() => {
        result.current.handleKeyDown({
          key: "Enter",
          shiftKey: true,
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
      });
      expect(onSend).not.toHaveBeenCalled();
    });
  });

  describe("retorno del hook", () => {
    it("expone textareaRef", () => {
      const { result } = renderHook(() => useChatInput({}));
      expect(result.current.textareaRef).toBeDefined();
    });
  });
});
