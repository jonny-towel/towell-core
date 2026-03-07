import type { Metadata } from "next";
import { NEW_CHAT } from "@/constants/new-chat.constants";

export const metadata: Metadata = {
  title: NEW_CHAT.pageTitle,
  description: NEW_CHAT.pageDescription,
};

/**
 * ChatLayout
 *
 * Layout para la sección de chat (/dashboard/chat).
 * Aplica h-full para que NewChatClient pueda anclar el input al bottom.
 */
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-full flex-col">{children}</div>;
}
