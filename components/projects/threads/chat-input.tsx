"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ChatInputProps } from "@/interfaces/chat-input.interface";
import { useChatInput } from "@/hooks/use-chat-input";

/**
 * ChatInput
 *
 * Input de chat con textarea que crece automáticamente.
 * - Enter → envía el mensaje.
 * - Shift + Enter → salto de línea.
 */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Escribe un mensaje...",
  className,
  value: controlledValue,
  onValueChange,
}: ChatInputProps) {
  const {
    value,
    setValue,
    textareaRef,
    handleSend,
    handleKeyDown,
    canSend,
  } = useChatInput({
    onSend,
    disabled,
    controlledValue,
    onControlledChange: onValueChange,
  });

  return (
    <div
      className={cn(
        "flex items-end gap-2 w-full",
        "rounded-full border border-input bg-background pl-5 pr-1 py-1",
        "shadow-xs transition-[box-shadow,border-color]",
        "focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/30",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        aria-label="Mensaje"
        aria-multiline="true"
        className={cn(
          "flex-1 resize-none bg-transparent outline-none pt-2",
          "min-h-[36px] max-h-[180px]",
          "text-sm text-foreground placeholder:text-muted-foreground",
          "overflow-y-auto scrollbar-thin"
        )}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={!canSend}
        onClick={handleSend}
        aria-label="Enviar mensaje"
        className={cn(
          "shrink-0 rounded-full mb-0.5 self-end transition-all w-9 h-9",
          canSend
            ? "bg-blue-500 text-white hover:bg-blue-600! hover:text-white!"
            : "text-muted-foreground"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </Button>
    </div>
  );
}
