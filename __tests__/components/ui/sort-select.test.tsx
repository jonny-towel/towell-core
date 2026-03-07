import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortSelect } from "@/components/ui/sort-select";

const OPTIONS = [
  { value: "activity", label: "Actividad" },
  { value: "name", label: "Nombre" },
  { value: "created", label: "Recientes" },
];

describe("SortSelect", () => {
  describe("renderizado", () => {
    it('muestra el label "Ordenar por"', () => {
      render(
        <SortSelect value="activity" options={OPTIONS} onValueChange={vi.fn()} />
      );
      expect(screen.getByText("Ordenar por")).toBeInTheDocument();
    });

    it("renderiza el trigger con el valor actual", () => {
      render(
        <SortSelect value="activity" options={OPTIONS} onValueChange={vi.fn()} />
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("accesibilidad", () => {
    it("el trigger tiene role combobox (Select de Radix)", () => {
      render(
        <SortSelect value="activity" options={OPTIONS} onValueChange={vi.fn()} />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");
    });

    it("refleja el valor actual en el trigger", () => {
      render(
        <SortSelect value="activity" options={OPTIONS} onValueChange={vi.fn()} />
      );
      expect(screen.getByText("Actividad")).toBeInTheDocument();
    });
  });

  describe("reutilización", () => {
    it("funciona con cualquier lista de opciones", () => {
      const customOptions = [
        { value: "recent", label: "Más recientes" },
        { value: "title", label: "Título A-Z" },
      ];
      render(
        <SortSelect value="recent" options={customOptions} onValueChange={vi.fn()} />
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
