import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BarChart2 } from "lucide-react";
import { ChatSuggestions } from "@/components/projects/threads/chats/chat-suggestions";
import { PROJECT_SUGGESTIONS } from "@/constants/chat-suggestions.constants";
import type { ChatSuggestion } from "@/interfaces/chat-suggestion.interface";

const CUSTOM_SUGGESTIONS: ChatSuggestion[] = [
  {
    id: "test-1",
    label: "Test Card",
    description: "Descripción de prueba",
    icon: BarChart2,
  },
  {
    id: "test-2",
    label: "Test Card 2",
    description: "Descripción 2",
    icon: BarChart2,
  },
];

describe("ChatSuggestions", () => {
  describe("renderizado", () => {
    it("renderiza las categorías por defecto", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      PROJECT_SUGGESTIONS.forEach((s) => {
        expect(screen.getByText(s.label)).toBeInTheDocument();
      });
    });

    it("renderiza sugerencias personalizadas", () => {
      render(<ChatSuggestions onSelect={vi.fn()} suggestions={CUSTOM_SUGGESTIONS} />);
      expect(screen.getByText("Test Card")).toBeInTheDocument();
      expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    });

    it("renderiza exactamente 4 opciones por defecto", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      expect(screen.getAllByRole("radio")).toHaveLength(PROJECT_SUGGESTIONS.length);
    });

    it("renderiza las descripciones de cada categoría", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      PROJECT_SUGGESTIONS.forEach((s) => {
        expect(screen.getByText(s.description)).toBeInTheDocument();
      });
    });
  });

  describe("selección", () => {
    it("llama a onSelect con el id al hacer click", () => {
      const onSelect = vi.fn();
      render(<ChatSuggestions onSelect={onSelect} />);
      fireEvent.click(screen.getByText("Análisis de datos"));
      expect(onSelect).toHaveBeenCalledWith("analytics");
    });

    it("llama a onSelect con el id correcto de la sugerencia custom", () => {
      const onSelect = vi.fn();
      render(<ChatSuggestions onSelect={onSelect} suggestions={CUSTOM_SUGGESTIONS} />);
      fireEvent.click(screen.getByText("Test Card"));
      expect(onSelect).toHaveBeenCalledWith("test-1");
    });

    it("muestra aria-checked=true en la categoría seleccionada", () => {
      render(<ChatSuggestions onSelect={vi.fn()} selectedId="analytics" />);
      const selected = screen.getByRole("radio", { name: /análisis de datos/i });
      expect(selected).toHaveAttribute("aria-checked", "true");
    });

    it("muestra aria-checked=false en categorías no seleccionadas", () => {
      render(<ChatSuggestions onSelect={vi.fn()} selectedId="analytics" />);
      const unselected = screen.getByRole("radio", { name: /desarrollo/i });
      expect(unselected).toHaveAttribute("aria-checked", "false");
    });

    it("puede hacer click en todas las opciones sin error", () => {
      const onSelect = vi.fn();
      render(<ChatSuggestions onSelect={onSelect} />);
      screen.getAllByRole("radio").forEach((btn) => fireEvent.click(btn));
      expect(onSelect).toHaveBeenCalledTimes(PROJECT_SUGGESTIONS.length);
    });
  });

  describe("accesibilidad", () => {
    it("tiene un radiogroup con aria-label", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      expect(
        screen.getByRole("radiogroup", { name: "Categoría del proyecto" })
      ).toBeInTheDocument();
    });

    it("todos los elementos tienen role radio", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBe(PROJECT_SUGGESTIONS.length);
    });

    it("los botones son focusables y habilitados", () => {
      render(<ChatSuggestions onSelect={vi.fn()} />);
      screen.getAllByRole("radio").forEach((btn) => {
        expect(btn).toBeEnabled();
      });
    });
  });

  describe("estilos", () => {
    it("aplica className adicional al fieldset", () => {
      const { container } = render(
        <ChatSuggestions onSelect={vi.fn()} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });
});
