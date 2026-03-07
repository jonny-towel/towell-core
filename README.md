<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Bun-Runtime-F9F1E1?style=for-the-badge&logo=bun" alt="Bun" />
  <img src="https://img.shields.io/badge/Zustand-State-764ABC?style=for-the-badge&logo=zustand" alt="Zustand" />
</p>

<h1 align="center">Towell</h1>
<p align="center">
  <strong>Collaborative workspace with AI assistance</strong>
</p>
<p align="center">
  Your space to manage projects, threads, and conversations—powered by AI.
</p>

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Routes](#routes)
- [Use Cases](#use-cases)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment](#environment)

---

## Description

**Towell** is a modern web application that combines project management with AI-powered chat. Create projects, organize conversations into threads, and collaborate with an intelligent assistant—all in one place.

### Key Features

- **Project management** — Create, list, and organize projects with search and sort
- **AI chat threads** — Multiple conversation threads per project
- **Recent chats** — Quick access to your latest conversations with search and filters
- **Responsive UI** — Built with shadcn/ui and Tailwind CSS v4
- **Authentication** — Login and signup flows (Supabase Auth)

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS v4, shadcn/ui (Radix UI), Lucide Icons |
| **Database** | PostgreSQL via Supabase |
| **State** | Zustand |
| **Forms** | React Hook Form, Zod |
| **Package manager** | Bun |

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | User login |
| `/signup` | User registration |
| `/dashboard` | Dashboard home |
| `/dashboard/recents` | Recent chats (search, sort) |
| `/dashboard/chat` | Chat section |
| `/dashboard/proyecto` | Projects list (search, sort) |
| `/dashboard/proyecto/nuevo` | Create new project |
| `/dashboard/proyecto/[id]` | Project detail with chat threads |

---

## Use Cases

- **Create a project** — Start a new workspace for a topic or client
- **Chat with AI** — Have threaded conversations within each project
- **Browse recent chats** — Find and resume past conversations quickly
- **Search & filter** — Search projects or chats; sort by activity, name, or recency
- **Manage threads** — Organize multiple conversation threads per project

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Install & Run

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun build
bun start
```

### Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun test` | Run tests (Vitest) |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Generate coverage report |

---

## Project Structure

```
app/                    # Next.js App Router
├── dashboard/          # Dashboard routes
│   ├── proyecto/       # Projects (list, new, [id])
│   ├── recents/        # Recent chats
│   └── chat/           # Chat section
├── login/
├── signup/
components/
├── layouts/            # Shared layouts (ListPageWithSearch)
├── projects/           # Project components
├── ui/                 # shadcn primitives
constants/              # App constants
helpers/                # Pure utility functions
hooks/                  # Custom React hooks
interfaces/             # TypeScript types
store/                  # Zustand stores
```

---

## Environment

Copy `.env.example` to `.env.local` and add your Supabase credentials. Do not commit `.env.local`.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
