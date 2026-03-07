import { describe, it, expect } from "vitest";
import {
  formatThreadLastMessage,
  sortRecentsThreads,
  formatRecentsThreadSubtitle,
} from "@/helpers/thread.helpers";

// ─── formatThreadLastMessage ──────────────────────────────────────────────────

describe("formatThreadLastMessage", () => {
  it('retorna "Último mensaje hace 1 día" cuando days es 1', () => {
    expect(formatThreadLastMessage(1)).toBe("Último mensaje hace 1 día");
  });

  it("retorna plural para N días", () => {
    expect(formatThreadLastMessage(2)).toBe("Último mensaje hace 2 días");
    expect(formatThreadLastMessage(7)).toBe("Último mensaje hace 7 días");
  });

  it("maneja 0 días", () => {
    expect(formatThreadLastMessage(0)).toBe("Último mensaje hace 0 días");
  });
});

// ─── sortRecentsThreads ───────────────────────────────────────────────────────

const THREADS = [
  { id: "1", title: "Zeta thread",  lastMessageDaysAgo: 5 },
  { id: "2", title: "Alpha thread", lastMessageDaysAgo: 1 },
  { id: "3", title: "Mango thread", lastMessageDaysAgo: 3 },
];

describe("sortRecentsThreads", () => {
  it('ordena por lastMessageDaysAgo ASC cuando sort es "recent"', () => {
    const result = sortRecentsThreads([...THREADS], "recent");
    expect(result.map((t) => t.id)).toEqual(["2", "3", "1"]);
  });

  it('ordena por título A-Z cuando sort es "title"', () => {
    const result = sortRecentsThreads([...THREADS], "title");
    expect(result.map((t) => t.title)).toEqual([
      "Alpha thread",
      "Mango thread",
      "Zeta thread",
    ]);
  });

  it("no muta el array original", () => {
    const original = [...THREADS];
    sortRecentsThreads([...THREADS], "recent");
    expect(THREADS).toEqual(original);
  });

  it("funciona con array vacío", () => {
    expect(sortRecentsThreads([], "recent")).toEqual([]);
  });
});

// ─── formatRecentsThreadSubtitle ─────────────────────────────────────────────

describe("formatRecentsThreadSubtitle", () => {
  it("incluye el nombre del modelo cuando se provee", () => {
    const result = formatRecentsThreadSubtitle(2, "Claude Sonnet");
    expect(result).toBe("Último mensaje hace 2 días en Claude Sonnet");
  });

  it("retorna solo la fecha cuando no hay modelo", () => {
    const result = formatRecentsThreadSubtitle(1);
    expect(result).toBe("Último mensaje hace 1 día");
  });

  it("usa formatThreadLastMessage internamente (singular)", () => {
    const result = formatRecentsThreadSubtitle(1, "GPT-4");
    expect(result).toBe("Último mensaje hace 1 día en GPT-4");
  });
});
