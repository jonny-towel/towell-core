"use client";

import { ChatInput } from "@/components/chat-input";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-800">
      {/* Ancho máximo de chat centrado */}
      <div className="w-full max-w-2xl px-4">
        <ChatInput
          onSend={(msg) => console.log("Mensaje enviado:", msg)}
          placeholder="Escribe un mensaje..."
        />
      </div>
    </main>
  );
}
