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
  <strong>Espacio de trabajo colaborativo con asistencia de IA</strong>
</p>
<p align="center">
  Tu espacio para gestionar proyectos con IA.
</p>

---

## Índice

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Rutas](#rutas)
- [Casos de uso](#casos-de-uso)
- [Primeros pasos](#primeros-pasos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)

---

## Descripción

**Towell** es una aplicación web moderna que combina gestión de proyectos con chat impulsado por IA. Crea proyectos, organiza conversaciones en hilos y colabora con un asistente inteligente—todo en un solo lugar.

### Características principales

- **Gestión de proyectos** — Crear, listar y organizar proyectos con búsqueda y ordenamiento
- **Hilos de chat con IA** — Múltiples conversaciones por proyecto
- **Chats recientes** — Acceso rápido a tus últimas conversaciones con búsqueda y filtros
- **UI responsive** — Construida con shadcn/ui y Tailwind CSS v4
- **Autenticación** — Flujos de login y registro (Supabase Auth)

---

## Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Lenguaje** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS v4, shadcn/ui (Radix UI), Lucide Icons |
| **Base de datos** | PostgreSQL vía Supabase |
| **Estado** | Zustand |
| **Formularios** | React Hook Form, Zod |
| **Gestor de paquetes** | Bun |

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/login` | Inicio de sesión |
| `/signup` | Registro de usuario |
| `/dashboard` | Panel principal |
| `/dashboard/recents` | Chats recientes (búsqueda, orden) |
| `/dashboard/chat` | Sección de chat |
| `/dashboard/proyecto` | Lista de proyectos (búsqueda, orden) |
| `/dashboard/proyecto/nuevo` | Crear nuevo proyecto |
| `/dashboard/proyecto/[id]` | Detalle de proyecto con hilos de chat |

---

## Casos de uso

- **Crear un proyecto** — Iniciar un espacio de trabajo para un tema o cliente
- **Chatear con IA** — Mantener conversaciones en hilos dentro de cada proyecto
- **Explorar chats recientes** — Encontrar y retomar conversaciones pasadas rápidamente
- **Buscar y filtrar** — Buscar proyectos o chats; ordenar por actividad, nombre o antigüedad
- **Gestionar hilos** — Organizar múltiples conversaciones por proyecto

---

## Primeros pasos

### Requisitos previos

- [Bun](https://bun.sh/) (recomendado) o Node.js 18+

### Instalación y ejecución

```bash
bun install
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción

```bash
bun build
bun start
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `bun dev` | Iniciar servidor de desarrollo |
| `bun build` | Compilar para producción |
| `bun start` | Iniciar servidor de producción |
| `bun lint` | Ejecutar ESLint |
| `bun test` | Ejecutar tests (Vitest) |
| `bun run test:watch` | Ejecutar tests en modo watch |
| `bun run test:coverage` | Generar reporte de cobertura |

---

## Estructura del proyecto

```
app/                    # Next.js App Router
├── dashboard/          # Rutas del panel
│   ├── proyecto/       # Proyectos (lista, nuevo, [id])
│   ├── recents/        # Chats recientes
│   └── chat/           # Sección de chat
├── login/
├── signup/
components/
├── layouts/            # Layouts compartidos (ListPageWithSearch)
├── projects/           # Componentes de proyectos
├── ui/                 # Primitivos shadcn
constants/              # Constantes de la app
helpers/                # Funciones de utilidad puras
hooks/                  # Hooks personalizados
interfaces/             # Tipos TypeScript
store/                  # Stores Zustand
```

---

## Variables de entorno

Copia `.env.example` a `.env.local` y añade tus credenciales de Supabase. No subas `.env.local` al repositorio.

---

## Más información

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
