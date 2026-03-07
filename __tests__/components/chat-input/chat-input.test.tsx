import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "@/components/chat-input";

describe("ChatInput", () => {
  describe("renderizado", () => {
    it("renderiza el textarea", () => {
      render(<ChatInput />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renderiza el botón de enviar", () => {
      render(<ChatInput />);
      expect(
        screen.getByRole("button", { name: "Enviar mensaje" })
      ).toBeInTheDocument();
    });

    it("muestra el placeholder por defecto", () => {
      render(<ChatInput />);
      expect(
        screen.getByPlaceholderText("Escribe un mensaje...")
      ).toBeInTheDocument();
    });

    it("muestra un placeholder personalizado", () => {
      render(<ChatInput placeholder="Describe tu proyecto..." />);
      expect(
        screen.getByPlaceholderText("Describe tu proyecto...")
      ).toBeInTheDocument();
    });
  });

  describe("modo no-controlado", () => {
    it("el botón de enviar está deshabilitado cuando no hay texto", () => {
      render(<ChatInput />);
      expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeDisabled();
    });

    it("el botón se habilita al escribir texto", async () => {
      const user = userEvent.setup();
      render(<ChatInput />);
      await user.type(screen.getByRole("textbox"), "hola");
      expect(
        screen.getByRole("button", { name: "Enviar mensaje" })
      ).toBeEnabled();
    });

    it("llama a onSend con el texto al hacer click en enviar", async () => {
      const onSend = vi.fn();
      const user = userEvent.setup();
      render(<ChatInput onSend={onSend} />);
      await user.type(screen.getByRole("textbox"), "mensaje de prueba");
      await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
      expect(onSend).toHaveBeenCalledWith("mensaje de prueba");
    });

    it("llama a onSend al presionar Enter", async () => {
      const onSend = vi.fn();
      const user = userEvent.setup();
      render(<ChatInput onSend={onSend} />);
      await user.type(screen.getByRole("textbox"), "hola mundo{Enter}");
      expect(onSend).toHaveBeenCalledWith("hola mundo");
    });

    it("no llama a onSend al presionar Shift+Enter", async () => {
      const onSend = vi.fn();
      const user = userEvent.setup();
      render(<ChatInput onSend={onSend} />);
      await user.type(screen.getByRole("textbox"), "línea{Shift>}{Enter}{/Shift}");
      expect(onSend).not.toHaveBeenCalled();
    });
  });

  describe("modo controlado", () => {
    it("muestra el valor controlado externo", () => {
      render(<ChatInput value="valor externo" onValueChange={vi.fn()} />);
      expect(screen.getByRole("textbox")).toHaveValue("valor externo");
    });

    it("llama a onValueChange cuando el usuario escribe", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<ChatInput value="" onValueChange={onValueChange} />);
      await user.type(screen.getByRole("textbox"), "a");
      expect(onValueChange).toHaveBeenCalled();
    });
  });

  describe("estado disabled", () => {
    it("deshabilita el textarea cuando disabled=true", () => {
      render(<ChatInput disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("el botón de enviar está deshabilitado cuando disabled=true", () => {
      render(<ChatInput disabled />);
      expect(
        screen.getByRole("button", { name: "Enviar mensaje" })
      ).toBeDisabled();
    });
  });

  describe("accesibilidad", () => {
    it("el textarea tiene aria-label", () => {
      render(<ChatInput />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-label",
        "Mensaje"
      );
    });

    it("el botón de enviar tiene aria-label descriptivo", () => {
      render(<ChatInput />);
      expect(
        screen.getByRole("button", { name: "Enviar mensaje" })
      ).toBeInTheDocument();
    });
  });
});
