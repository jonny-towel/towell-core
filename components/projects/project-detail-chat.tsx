"use client";

import { ChatInput } from "@/components/projects/threads/chat-input";
import { PROJECT_DETAIL } from "@/constants/project-detail.constants";

export function ProjectDetailChat() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <ChatInput
        placeholder={PROJECT_DETAIL.chatPlaceholder}
        onSend={(msg) => console.log("Send:", msg)}
      />

      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/10 py-16 px-4">
        <p className="text-center text-sm text-muted-foreground max-w-sm">
          {PROJECT_DETAIL.emptyChatMessage}
        </p>
      </div>
    </div>
  );
}
