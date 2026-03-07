"use client";

import * as React from "react";
import { MIN_HEIGHT, MAX_HEIGHT } from "@/constants/chat-input.constants";

interface UseChatInputOptions {
  onSend?: (message: string) => void;
  disabled?: boolean;
  /** Valor controlado externo (optional) */
  controlledValue?: string;
  /** Callback para modo controlado (optional) */
  onControlledChange?: (value: string) => void;
}

/**
 * Hook que encapsula la lógica del ChatInput:
 * - Soporta modo controlado (controlledValue + onControlledChange) y no-controlado
 * - Auto-resize del textarea
 * - Envío de mensajes (Enter) / salto de línea (Shift+Enter)
 */
export function useChatInput({
  onSend,
  disabled = false,
  controlledValue,
  onControlledChange,
}: UseChatInputOptions) {
  const isControlled = controlledValue !== undefined;

  const [internalValue, setInternalValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // En modo controlado, el valor real viene de fuera
  const value = isControlled ? controlledValue : internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (isControlled) {
        onControlledChange?.(next);
      } else {
        setInternalValue(next);
      }
    },
    [isControlled, onControlledChange]
  );

  const resize = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${MIN_HEIGHT}px`;
    const next = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${next}px`;
  }, []);

  React.useEffect(() => {
    resize();
  }, [value, resize]);

  const handleSend = React.useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    setValue("");
    textareaRef.current?.focus();
  }, [value, disabled, onSend, setValue]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const canSend = value.trim().length > 0 && !disabled;

  return {
    value,
    setValue,
    textareaRef,
    handleSend,
    handleKeyDown,
    canSend,
  };
}
