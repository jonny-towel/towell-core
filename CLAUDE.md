# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server (http://localhost:3000)
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint (next/core-web-vitals + typescript rules)
```

## Architecture

**Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL (Supabase)

**Package manager**: Bun. Always use `bun` instead of `npm`/`yarn`/`pnpm`.

**App Router**: All routes live under `app/`. The entry layout is `app/layout.tsx` with Geist fonts.

**Database**: Supabase (PostgreSQL). Access via Supabase MCP server.

**Path alias**: `@/*` resolves to the project root.

**Environment files**:

- `.env.local` — Supabase credentials (not committed)

**Estructura de carpetas** (convención obligatoria):

- `components/<feature>/` — **solo archivos .tsx** (componentes React)
- `components/projects/` — proyectos, listado, formularios
- `components/projects/threads/chats/` — ChatWelcome, ChatSuggestions (chat de proyecto)
- `components/projects/threads/chat-input.tsx` — input de chat
- `interfaces/` — interfaces y tipos TypeScript (raíz del proyecto)
- `hooks/` — hooks personalizados (raíz del proyecto)
- `constants/` — constantes y configuraciones (raíz del proyecto)
- `store/` — estado global con Zustand

**Estado global**: Zustand en `store/`. Un store por dominio (ej: `use-projects-list-store`, `use-new-project-store`).

**Metadata y layouts**: La metadata SEO va en el `layout.tsx` de cada sección, no en las páginas. Un layout por segmento (ej: `app/dashboard/proyecto/layout.tsx`) aplica a todas las rutas hijas (`/proyecto`, `/proyecto/nuevo`). No crear layouts en subcarpetas cuando el padre ya define la sección.

**Helpers**: Funciones puras de utilidad en `helpers/`. Nunca definir helpers dentro de `.tsx`.

## Estándares de código (obligatorios)

- **Máx. 250 líneas** por archivo. Si se excede, extraer a subcomponentes, hooks o helpers.
- **Interfaces**: Siempre en `interfaces/`. Prohibido definir interfaces dentro de `.tsx`.
- **Helpers**: Siempre en `helpers/`. Prohibido definir funciones helper dentro de `.tsx`.
- **Constants**: Siempre en `constants/`. Sin strings/valores mágicos en componentes.
- **Estado**: Usar **Zustand** (`store/`). Evitar `useState` para estado que pueda compartirse o persistir.
- **Hooks**: Reutilizar hooks existentes en `hooks/` antes de crear nuevos. Crear hooks para lógica reutilizable.
- **Config**: `config/project-standards.ts` y `useProjectStandards()` para validar contra estándares.

## Workflow Rules

- **Actualizar CLAUDE.md**: Cada vez que el usuario pida un cambio (diseño, frontend, arquitectura, deployment, etc.), actualizar este archivo con los nuevos patrones o decisiones relevantes.
- **Usar skills según el tipo de cambio**:
  - Cambios de UI/diseño → usar skill `web-design-guidelines` y/o `vercel-react-best-practices`
  - Refactor de componentes → usar skill `vercel-composition-patterns`
  - Deploy → usar skill `deploy-to-vercel`
  - React Native/Expo → usar skill `vercel-react-native-skills`
  - Integración con Claude API → usar skill `claude-api`
  - Cambios en DB, tablas, migraciones, RLS, funciones, o cualquier backend → usar **MCP de Supabase** (`mcp__supabase__*`)
  - Componentes UI → usar siempre **MCP de shadcn** (`mcp__shadcn__*`) para buscar, instalar y consultar componentes de la librería. shadcn usa **Radix UI** como primitivos (NO Base UI)
