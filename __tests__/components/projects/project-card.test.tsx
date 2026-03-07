import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/interfaces/project.interface";

const BASE_PROJECT: Project = {
  id: "1",
  name: "Orquest Models",
  description: "Proyecto de agentes IA para marketing y desarrollo.",
  updatedAt: "3",
};

const PROJECT_WITH_BADGE: Project = {
  ...BASE_PROJECT,
  id: "2",
  name: "How to use Claude",
  badge: "Proyecto de ejemplo",
  updatedAt: "1",
};

describe("ProjectCard", () => {
  describe("renderizado", () => {
    it("muestra el nombre del proyecto", () => {
      render(<ProjectCard project={BASE_PROJECT} />);
      expect(screen.getByRole("heading", { name: "Orquest Models" })).toBeInTheDocument();
    });

    it("muestra la descripción del proyecto", () => {
      render(<ProjectCard project={BASE_PROJECT} />);
      expect(screen.getByText(/Proyecto de agentes IA/i)).toBeInTheDocument();
    });

    it("muestra la fecha de actualización formateada", () => {
      render(<ProjectCard project={BASE_PROJECT} />);
      expect(screen.getByText("Actualizado hace 3 días")).toBeInTheDocument();
    });

    it("muestra el badge cuando existe", () => {
      render(<ProjectCard project={PROJECT_WITH_BADGE} />);
      expect(screen.getByText("Proyecto de ejemplo")).toBeInTheDocument();
    });

    it("no muestra badge cuando no existe", () => {
      render(<ProjectCard project={BASE_PROJECT} />);
      expect(screen.queryByText("Proyecto de ejemplo")).not.toBeInTheDocument();
    });

    it("muestra singular cuando updatedAt es 1", () => {
      render(<ProjectCard project={PROJECT_WITH_BADGE} />);
      expect(screen.getByText("Actualizado hace 1 día")).toBeInTheDocument();
    });
  });

  describe("navegación", () => {
    it("el enlace apunta a la ruta del proyecto", () => {
      render(<ProjectCard project={BASE_PROJECT} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/dashboard/proyecto/1");
    });
  });
});
