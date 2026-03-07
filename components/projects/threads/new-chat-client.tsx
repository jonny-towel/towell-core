"use client";

import { useState } from "react";
import { ChatWelcome } from "./chats/chat-welcome";
import { ChatSuggestions } from "./chats/chat-suggestions";
import { ChatInput } from "./chat-input";
import { NEW_CHAT } from "@/constants/new-chat.constants";

/**
 * NewChatClient
 *
 * Página de inicio de un nuevo chat: bienvenida, selector de categoría
 * e input fijo en el bottom. Al enviar un mensaje se iniciará un thread.
 *
 * Layout: flex column h-full — contenido centrado arriba, input anclado abajo.
 */
export function NewChatClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleCategorySelect(id: string) {
    setSelectedCategory((prev) => (prev === id ? null : id));
  }

  function handleSend(message: string) {
    // TODO: crear thread vía Supabase y navegar a /dashboard/proyecto/[id]/thread/[threadId]
    console.log("New chat:", { message, category: selectedCategory });
  }

  return (
    <div className="flex h-full flex-col">
      {/* ── Content area — centrado verticalmente ── */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 overflow-y-auto px-6 py-16">
        <ChatWelcome
          title={NEW_CHAT.welcomeTitle}
          subtitle={NEW_CHAT.welcomeSubtitle}
        />
        <ChatSuggestions
          selectedId={selectedCategory}
          onSelect={handleCategorySelect}
          className="w-full max-w-2xl"
        />
      </div>

      {/* ── Input bar — anclado al bottom ── */}
      <div className="border-t bg-background px-6 py-4">
        <div className="mx-auto w-full max-w-2xl">
          <ChatInput
            placeholder={NEW_CHAT.inputPlaceholder}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
