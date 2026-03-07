"use client";

import * as React from "react";
import { MIN_HEIGHT, MAX_HEIGHT } from "../constants/chat-input.constants";

interface UseChatInputOptions {
  onSend?: (message: string) => void;
  disabled?: boolean;
}

/**
 * Hook que encapsula la lógica del ChatInput:
 * - Estado del valor
 * - Auto-resize del textarea
 * - Envío de mensajes
 * - Atajos de teclado
 */
export function useChatInput({ onSend, disabled = false }: UseChatInputOptions) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

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
  }, [value, disabled, onSend]);

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
