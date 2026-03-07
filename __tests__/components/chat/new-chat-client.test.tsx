import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NewChatClient } from "@/components/projects/threads/new-chat-client";
import { NEW_CHAT } from "@/constants/new-chat.constants";

describe("NewChatClient", () => {
  describe("renderizado", () => {
    it("muestra el título de bienvenida", () => {
      render(<NewChatClient />);
      expect(
        screen.getByRole("heading", { name: NEW_CHAT.welcomeTitle })
      ).toBeInTheDocument();
    });

    it("muestra el subtítulo", () => {
      render(<NewChatClient />);
      expect(screen.getByText(NEW_CHAT.welcomeSubtitle)).toBeInTheDocument();
    });

    it("muestra las sugerencias de categoría", () => {
      render(<NewChatClient />);
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("muestra el input de chat", () => {
      render(<NewChatClient />);
      expect(screen.getByRole("textbox", { name: /mensaje/i })).toBeInTheDocument();
    });
  });

  describe("selección de categoría", () => {
    it("no tiene ninguna categoría seleccionada por defecto", () => {
      render(<NewChatClient />);
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("aria-checked", "false");
      });
    });

    it("selecciona una categoría al hacer click", () => {
      render(<NewChatClient />);
      const radios = screen.getAllByRole("radio");
      fireEvent.click(radios[0]);
      expect(radios[0]).toHaveAttribute("aria-checked", "true");
    });

    it("deselecciona al hacer click nuevamente", () => {
      render(<NewChatClient />);
      const radios = screen.getAllByRole("radio");
      fireEvent.click(radios[0]);
      fireEvent.click(radios[0]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
    });

    it("cambia la selección al elegir otra categoría", () => {
      render(<NewChatClient />);
      const radios = screen.getAllByRole("radio");
      fireEvent.click(radios[0]);
      fireEvent.click(radios[1]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
    });
  });
});
