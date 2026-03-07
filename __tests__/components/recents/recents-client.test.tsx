import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecentsClient } from "@/components/projects/recents-client";
import { useRecentsStore } from "@/store/use-recents-store";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@/store/use-recents-store");

const mockSetSearchQuery = vi.fn();
const mockSetSort = vi.fn();

function setupStore(overrides = {}) {
  vi.mocked(useRecentsStore).mockReturnValue({
    search: "",
    sort: "recent",
    setSearch: mockSetSearchQuery,
    setSort: mockSetSort,
    reset: vi.fn(),
    ...overrides,
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("RecentsClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupStore();
  });

  describe("renderizado", () => {
    it("muestra el título de la sección", () => {
      render(<RecentsClient />);
      expect(screen.getByRole("heading", { name: /chats/i })).toBeInTheDocument();
    });

    it("muestra el buscador", () => {
      render(<RecentsClient />);
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renderiza los threads del mock por defecto", () => {
      render(<RecentsClient />);
      expect(screen.getByText(/Diseño de esquemas de base de datos/i)).toBeInTheDocument();
    });
  });

  describe("bug fix: botón Nuevo Chat", () => {
    it('el botón "Nuevo chat" apunta a /dashboard/chat', () => {
      render(<RecentsClient />);
      const link = screen.getByRole("link", { name: /nuevo chat/i });
      expect(link).toHaveAttribute("href", "/dashboard/chat");
    });
  });

  describe("búsqueda", () => {
    it("filtra threads según el search del store", () => {
      setupStore({ search: "ETFs" });
      render(<RecentsClient />);
      expect(screen.getByText(/Mejores ETFs/i)).toBeInTheDocument();
      expect(screen.queryByText(/Diseño de esquemas/i)).not.toBeInTheDocument();
    });

    it("muestra estado vacío cuando no hay coincidencias", () => {
      setupStore({ search: "zzz-no-match" });
      render(<RecentsClient />);
      expect(screen.getByText(/No hay conversaciones recientes/i)).toBeInTheDocument();
    });

    it("llama setSearchQuery al escribir en el buscador", async () => {
      const user = userEvent.setup();
      render(<RecentsClient />);
      const input = screen.getByRole("searchbox");
      await user.type(input, "a");
      expect(mockSetSearchQuery).toHaveBeenCalled();
    });
  });
});
