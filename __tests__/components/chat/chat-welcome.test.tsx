import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatWelcome } from "@/components/chat/chat-welcome";

describe("ChatWelcome", () => {
  describe("renderizado por defecto", () => {
    it("renderiza el heading h1", () => {
      render(<ChatWelcome />);
      expect(
        screen.getByRole("heading", { level: 1 })
      ).toBeInTheDocument();
    });

    it("muestra el título por defecto", () => {
      render(<ChatWelcome />);
      expect(
        screen.getByText("¿En qué proyecto trabajamos hoy?")
      ).toBeInTheDocument();
    });

    it("muestra el subtítulo por defecto", () => {
      render(<ChatWelcome />);
      expect(
        screen.getByText("Describe tu idea o elige una categoría para empezar")
      ).toBeInTheDocument();
    });
  });

  describe("props personalizadas", () => {
    it("renderiza un título personalizado", () => {
      render(<ChatWelcome title="Título de prueba" />);
      expect(
        screen.getByRole("heading", { name: "Título de prueba" })
      ).toBeInTheDocument();
    });

    it("renderiza un subtítulo personalizado", () => {
      render(<ChatWelcome subtitle="Subtítulo custom" />);
      expect(screen.getByText("Subtítulo custom")).toBeInTheDocument();
    });

    it("aplica className adicional al contenedor", () => {
      const { container } = render(<ChatWelcome className="extra-class" />);
      expect(container.firstChild).toHaveClass("extra-class");
    });
  });

  describe("accesibilidad", () => {
    it("el icono decorativo tiene aria-hidden", () => {
      render(<ChatWelcome />);
      const decorativeEl = document.querySelector('[aria-hidden="true"]');
      expect(decorativeEl).toBeTruthy();
    });

    it("existe exactamente un h1 en el componente", () => {
      render(<ChatWelcome />);
      const headings = screen.getAllByRole("heading", { level: 1 });
      expect(headings).toHaveLength(1);
    });

    it("el elemento raíz es un <header>", () => {
      const { container } = render(<ChatWelcome />);
      expect(container.firstChild?.nodeName).toBe("HEADER");
    });
  });
});
