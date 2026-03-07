"use client";

import { ProjectDetailHeader } from "./project-detail-header";
import { ProjectDetailChat } from "./project-detail-chat";
import type { Project } from "@/interfaces/project.interface";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-6 p-8">
      <ProjectDetailHeader project={project} />
      <ProjectDetailChat />
    </div>
  );
}
