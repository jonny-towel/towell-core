"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Thread } from "@/interfaces/thread.interface";
import { formatThreadLastMessage } from "@/helpers/thread.helpers";

interface ProjectDetailThreadsListProps {
  threads: Thread[];
  projectId: string;
}

export function ProjectDetailThreadsList({
  threads,
  projectId,
}: ProjectDetailThreadsListProps) {
  return (
    <ul className="divide-y divide-border">
      {threads.map((thread) => (
        <li key={thread.id}>
          <Link
            href={`/dashboard/proyecto/${projectId}/thread/${thread.id}`}
            className={cn(
              "block py-4 transition-colors hover:bg-muted/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            )}
          >
            <p className="font-medium text-foreground">{thread.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {formatThreadLastMessage(thread.lastMessageDaysAgo)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
