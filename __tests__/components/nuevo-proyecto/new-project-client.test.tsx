import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";
import { NewProjectClient } from "@/app/dashboard/proyecto/nuevo/_components/new-project-client";
import { useNewProjectStore } from "@/store/use-new-project-store";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// next/link se comporta como un <a> en tests
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resetStore() {
  act(() => {
    useNewProjectStore.getState().reset();
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("NewProjectClient", () => {
  beforeEach(() => {
    resetStore();
  });

  // ── Renderizado ──────────────────────────────────────────────────────────────

  describe("renderizado", () => {
    it("muestra el heading principal 'Nuevo proyecto'", () => {
      render(<NewProjectClient />);
      expect(
        screen.getByRole("heading", { name: /nuevo proyecto/i })
      ).toBeInTheDocument();
    });

    it("muestra el subtítulo descriptivo", () => {
      render(<NewProjectClient />);
      expect(
        screen.getByText(/configura tu espacio de trabajo/i)
      ).toBeInTheDocument();
    });

    it("renderiza el formulario con aria-label", () => {
      render(<NewProjectClient />);
      expect(
        screen.getByRole("form", { name: /formulario de nuevo proyecto/i })
      ).toBeInTheDocument();
    });

    it("muestra el label '¿En qué está trabajando?'", () => {
      render(<NewProjectClient />);
      expect(
        screen.getByText(/¿en qué está trabajando\?/i)
      ).toBeInTheDocument();
    });

    it("muestra el label '¿Qué intenta lograr?'", () => {
      render(<NewProjectClient />);
      expect(screen.getByText(/¿qué intenta lograr\?/i)).toBeInTheDocument();
    });

    it("renderiza el input de nombre", () => {
      render(<NewProjectClient />);
      expect(screen.getByRole("textbox", { name: /en qué está trabajando/i })).toBeInTheDocument();
    });

    it("renderiza el textarea de descripción", () => {
      render(<NewProjectClient />);
      expect(screen.getByRole("textbox", { name: /qué intenta lograr/i })).toBeInTheDocument();
    });

    it("renderiza el botón Cancelar como enlace a /dashboard", () => {
      render(<NewProjectClient />);
      const cancelar = screen.getByRole("link", { name: /cancelar/i });
      expect(cancelar).toHaveAttribute("href", "/dashboard");
    });

    it("renderiza el botón de envío 'Crear proyecto'", () => {
      render(<NewProjectClient />);
      expect(
        screen.getByRole("button", { name: /crear proyecto/i })
      ).toBeInTheDocument();
    });
  });

  // ── Validación ───────────────────────────────────────────────────────────────

  describe("validación", () => {
    it("el botón submit está deshabilitado con formulario vacío", () => {
      render(<NewProjectClient />);
      expect(screen.getByRole("button", { name: /crear proyecto/i })).toBeDisabled();
    });

    it("el botón submit se habilita cuando el nombre es válido (≥2 chars)", async () => {
      render(<NewProjectClient />);
      const nameInput = screen.getByRole("textbox", { name: /en qué está trabajando/i });

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: "Mi proyecto" } });
      });

      expect(screen.getByRole("button", { name: /crear proyecto/i })).toBeEnabled();
    });

    it("muestra error cuando el nombre tiene menos de 2 caracteres", async () => {
      render(<NewProjectClient />);
      const nameInput = screen.getByRole("textbox", { name: /en qué está trabajando/i });

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: "A" } });
        fireEvent.blur(nameInput);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/al menos 2 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it("muestra aria-invalid=true en el input cuando hay error", async () => {
      render(<NewProjectClient />);
      const nameInput = screen.getByRole("textbox", { name: /en qué está trabajando/i });

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: "A" } });
        fireEvent.blur(nameInput);
      });

      await waitFor(() => {
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("el input de nombre tiene aria-required=true", () => {
      render(<NewProjectClient />);
      const nameInput = screen.getByRole("textbox", { name: /en qué está trabajando/i });
      expect(nameInput).toHaveAttribute("aria-required", "true");
    });
  });

  // ── Estado de carga ──────────────────────────────────────────────────────────

  describe("estado de carga", () => {
    it("muestra 'Creando...' cuando isCreating es true", () => {
      act(() => {
        useNewProjectStore.getState().setIsCreating(true);
      });
      render(<NewProjectClient />);
      expect(screen.getByText(/creando\.\.\./i)).toBeInTheDocument();
    });

    it("deshabilita el submit cuando isCreating es true", () => {
      act(() => {
        useNewProjectStore.getState().setIsCreating(true);
      });
      render(<NewProjectClient />);
      expect(screen.getByRole("button", { name: /creando/i })).toBeDisabled();
    });

    it("no muestra el spinner cuando isCreating es false", () => {
      render(<NewProjectClient />);
      expect(screen.queryByText(/creando\.\.\./i)).not.toBeInTheDocument();
    });
  });

  // ── Error global ─────────────────────────────────────────────────────────────

  describe("error global", () => {
    it("muestra el mensaje de error del store cuando existe", () => {
      act(() => {
        useNewProjectStore.getState().setError("Error de conexión");
      });
      render(<NewProjectClient />);
      expect(screen.getByText("Error de conexión")).toBeInTheDocument();
    });

    it("el mensaje de error tiene role=alert", () => {
      act(() => {
        useNewProjectStore.getState().setError("Error de conexión");
      });
      render(<NewProjectClient />);
      const alerts = screen.getAllByRole("alert");
      const globalAlert = alerts.find((a) => a.textContent === "Error de conexión");
      expect(globalAlert).toBeTruthy();
    });

    it("no muestra alerta de error cuando error es null", () => {
      render(<NewProjectClient />);
      // No debe haber alerta de error global (sólo puede haber si hay error de campo)
      expect(screen.queryByText(/error de/i)).not.toBeInTheDocument();
    });
  });

  // ── Accesibilidad ─────────────────────────────────────────────────────────────

  describe("accesibilidad", () => {
    it("el heading del formulario es un h1", () => {
      render(<NewProjectClient />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("el input de nombre está asociado correctamente a su label (htmlFor)", () => {
      render(<NewProjectClient />);
      const label = screen.getByText(/¿en qué está trabajando\?/i).closest("label");
      const input = screen.getByRole("textbox", { name: /en qué está trabajando/i });
      expect(label).toHaveAttribute("for", input.id);
    });
  });
});
