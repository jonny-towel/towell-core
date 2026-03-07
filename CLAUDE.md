# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev              # Start development server (http://localhost:3000)
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint (next/core-web-vitals + typescript rules)
bun test             # Run tests (Vitest)
bun test:watch       # Run tests in watch mode
bun test:coverage    # Run tests with coverage report
```

## Testing (mandatory)

**Every requested change must be rigorously tested** before considering it complete.

- Run `bun test` and ensure all tests pass.
- Add or update tests for new or modified code (hooks, helpers, critical components).
- Verify edge cases and expected behavior.
- Run `bun build` after changes to confirm no regressions.

## Architecture

**Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL (Supabase)

**Package manager**: Bun. Always use `bun` instead of `npm`/`yarn`/`pnpm`.

**App Router**: All routes live under `app/`. The entry layout is `app/layout.tsx` with Geist fonts.

**Database**: Supabase (PostgreSQL). Access via Supabase MCP server.

**Path alias**: `@/*` resolves to the project root.

**Environment files**:

- `.env.local` — Supabase credentials (not committed)

**Folder structure** (mandatory):

- `components/<feature>/` — **only .tsx files** (React components)
- `components/projects/` — projects, lists, forms
- `components/projects/threads/chats/` — ChatWelcome, ChatSuggestions (project chat)
- `components/projects/threads/chat-input.tsx` — chat input
- `interfaces/` — TypeScript types and interfaces (project root)
- `hooks/` — custom hooks (project root)
- `constants/` — constants and config (project root)
- `store/` — global state with Zustand

**Global state**: Zustand in `store/`. One store per domain (e.g. `use-projects-list-store`, `use-new-project-store`).

**Metadata and layouts**: SEO metadata goes in each section's `layout.tsx`, not in pages. One layout per segment (e.g. `app/dashboard/proyecto/layout.tsx`) applies to all child routes. Do not create layouts in subfolders when the parent already defines the section.

**Helpers**: Pure utility functions in `helpers/`. Never define helpers inside `.tsx`.

## Code standards (mandatory)

- **Max 250 lines** per file. If exceeded, extract to subcomponents, hooks, or helpers.
- **Interfaces**: Always in `interfaces/`. Do not define interfaces inside `.tsx`.
- **Helpers**: Always in `helpers/`. Do not define helper functions inside `.tsx`.
- **Constants**: Always in `constants/`. No magic strings or values in components.
- **State**: Use **Zustand** (`store/`). Avoid `useState` for shareable or persistent state.
- **Hooks**: Reuse existing hooks in `hooks/` before creating new ones. Create hooks for reusable logic.
- **Config**: `config/project-standards.ts` and `useProjectStandards()` to validate against standards.

## Function comments (mandatory)

- **JSDoc required** for helpers, hooks, and exported functions: `@param`, `@returns`, brief description.
- Use concrete, valuable comments: explain the *why* when not obvious, not the *what*.
- Avoid redundant comments that repeat the function name.
- Include edge cases and design decisions when relevant.

## Workflow Rules

- **Update CLAUDE.md**: Whenever the user requests a change (design, frontend, architecture, deployment, etc.), update this file with the new patterns or relevant decisions.
- **Use skills by change type**:
  - UI/design changes → use skill `web-design-guidelines` and/or `vercel-react-best-practices`
  - Component refactor → use skill `vercel-composition-patterns`
  - Deploy → use skill `deploy-to-vercel`
  - React Native/Expo → use skill `vercel-react-native-skills`
  - Claude API integration → use skill `claude-api`
  - DB, tables, migrations, RLS, functions, or any backend → use **Supabase MCP** (`mcp__supabase__*`)
  - UI components → always use **shadcn MCP** (`mcp__shadcn__*`) to search, install, and consult library components. shadcn uses **Radix UI** as primitives (NOT Base UI)
