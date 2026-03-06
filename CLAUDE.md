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

## Workflow Rules

- **Actualizar CLAUDE.md**: Cada vez que el usuario pida un cambio (diseño, frontend, arquitectura, deployment, etc.), actualizar este archivo con los nuevos patrones o decisiones relevantes.
- **Usar skills según el tipo de cambio**:
  - Cambios de UI/diseño → usar skill `web-design-guidelines` y/o `vercel-react-best-practices`
  - Refactor de componentes → usar skill `vercel-composition-patterns`
  - Deploy → usar skill `deploy-to-vercel`
  - React Native/Expo → usar skill `vercel-react-native-skills`
  - Integración con Claude API → usar skill `claude-api`
  - Cambios en DB, tablas, migraciones, RLS, funciones, o cualquier backend → usar **MCP de Supabase** (`mcp__supabase__*`)
