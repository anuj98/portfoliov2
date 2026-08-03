# Project Context

This file provides context for AI coding assistants working in this repository. It documents architecture, conventions, and constraints that are not obvious from the code alone.

---

## Project Overview

A **Next.js 16 / React 19** personal portfolio site deployed on **Vercel**. Content (experience, projects, skills, hobbies) is stored in **Vercel Postgres** (backed by Neon). Blog posts are fetched live from the **Dev.to API** with ISR. Static assets (images, icons) are served from **Vercel Blob Storage**.

**Live site:** [anuj98.vercel.app](https://anuj98.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 (server + client components) |
| Language | TypeScript 5 (strict mode) |
| Styling | CSS Modules (no Tailwind, no CSS-in-JS) |
| Fonts | Geist Sans / Geist Mono (`next/font/google`, exposed as CSS variables) |
| Animation | framer-motion 12 (element entrance animations, scroll-triggered reveals) |
| 3D | three.js + @react-three/fiber 9 (3D particle hero background) |
| Icons | lucide-react (`Mail`, `ExternalLink`; brand icons via inline SVGs — lucide 1.x removed them) |
| Database | Vercel Postgres → Neon (`@vercel/postgres`) |
| Blob storage | Vercel Blob (`@vercel/blob`) |
| Blog data | Dev.to public API (ISR, revalidate 3600s) |
| Deployment | Vercel |
| Linting | `next lint` was removed in Next.js 16; `.eslintrc.json` exists but the `npm run lint` script is currently non-functional |
| Node | ≥ 18.17.0 |

---

## Development Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run start     # Serve production build locally
npm run lint      # BROKEN: next lint was removed in Next.js 16 — run eslint directly instead
npm run seed      # Seed the database (requires POSTGRES_URL in .env)
```

**No test suite is configured.** There is no `npm test` command.

If dependency issues arise after adding packages:
```bash
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## Environment Setup

The `.env` file is not committed. To get it:

```bash
npx vercel link       # Link repo to Vercel project (one-time)
npx vercel env pull   # Writes all env vars to .env
```

Or set manually:

| Variable | Where to find it | Required for |
|---|---|---|
| `POSTGRES_URL` | Vercel → Storage → Postgres → `.env.local` tab | All DB queries + seed script |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob → `.env.local` tab | Uploading new assets only |

> Vercel Postgres migrated to Neon in Dec 2024. The Neon integration still injects `POSTGRES_*` legacy variables (including `POSTGRES_URL`) for backwards compatibility with `@vercel/postgres`.

---

## Project Structure

```
portfoliov2/
├── app/
│   ├── page.tsx                  # Root page — async server component, fetches all data in parallel
│   ├── layout.tsx                # Root layout (HTML shell, fonts)
│   ├── loading.tsx               # Loading skeleton
│   ├── globals.css               # Global styles, CSS custom properties, keyframes, reset
│   ├── page.module.css
│   ├── loading.module.css
│   ├── blog/
│   │   ├── page.tsx              # Blog listing — fetches Dev.to posts
│   │   └── page.module.css
│   ├── components/               # All UI components (co-located with CSS Modules)
│   │   ├── about.tsx             # [CLIENT] Personal intro + hobbies + resume button
│   │   ├── experience.tsx        # [CLIENT] Job history with tab navigation + dialog
│   │   ├── projects.tsx          # [CLIENT] Infinite auto-scroll carousel
│   │   ├── projectCard.tsx       # [CLIENT] 3D flip card; canvas-based image brightness
│   │   ├── skills.tsx            # [CLIENT] Tech stack grouped by category (framer-motion skill bars)
│   │   ├── contacts.tsx          # Footer with GitHub / LinkedIn / Email (server)
│   │   ├── navBar.tsx            # [CLIENT] Sticky header with mobile drawer + theme toggle
│   │   ├── themeToggle.tsx       # [CLIENT] Dark/light toggle; reads/writes localStorage
│   │   ├── scrollReveal.tsx      # [CLIENT] IntersectionObserver fade-in wrapper
│   │   ├── dialog.tsx            # [CLIENT] Compound modal component (Dialog.Root/Header/…)
│   │   ├── button.tsx            # [CLIENT] Reusable button (primary / secondary variants)
│   │   ├── blogCard.tsx          # Card for Dev.to blog posts (server)
│   │   ├── hobby.tsx             # Hobby display (icon + name) (server)
│   │   ├── particleScene.tsx     # [CLIENT] Three.js 3D particle hero (dynamic import, ssr: false)
│   │   └── *.module.css          # Co-located CSS Module for each component
│   ├── db/
│   │   ├── data.ts               # All SQL queries using @vercel/postgres sql``
│   │   └── models.ts             # TypeScript interfaces for DB row shapes
│   ├── lib/
│   │   ├── devtoService.ts       # Dev.to API fetch with ISR
│   │   └── types/
│   │       └── devto.ts          # DevToBlog interface
│   └── hooks/
│       └── useImageBrightness.ts # Canvas-based image brightness detection
├── scripts/
│   └── seed.js                   # DB init: creates tables + inserts seed data from Blob JSON
├── public/                       # Static assets
├── next.config.js                # Image domains for Vercel Blob remotePatterns
├── tsconfig.json                 # Strict TypeScript, @/* path alias
├── .eslintrc.json                # ESLint: extends next/core-web-vitals
└── package.json                  # Deps, scripts, React 19 overrides
```

---

## Architecture

### Data flow

```
Browser
  └─► Next.js Server (app/page.tsx — async server component)
        ├─► app/db/data.ts  ──────────► Vercel Postgres (Neon)
        └─► app/lib/devtoService.ts ──► Dev.to REST API
```

`app/page.tsx` runs `Promise.all([...])` to fetch personal details, hobbies, experience, projects, skills, and blog posts in parallel, then passes them as props to child components.

### Server vs. client components

| Component | Type | Reason |
|---|---|---|
| `navBar.tsx` | `"use client"` | Manages mobile drawer state + scroll effects |
| `themeToggle.tsx` | `"use client"` | Reads/writes `localStorage`; touches DOM (`dataset.theme`) |
| `scrollReveal.tsx` | `"use client"` | Uses `IntersectionObserver` (browser API) |
| `about.tsx` | `"use client"` | Has inline `onClick` handler (resume download) |
| `button.tsx` | `"use client"` | Accepts and calls `onClick` prop |
| `experience.tsx` | `"use client"` | Tab state, dialog open/close state |
| `projects.tsx` | `"use client"` | Carousel state + `setInterval` for auto-scroll |
| `projectCard.tsx` | `"use client"` | `useImageBrightness` hook uses canvas (browser API) |
| `dialog.tsx` | `"use client"` | Escape-key listener; open/close state |
| `skills.tsx` | `"use client"` | Framer-motion `useInView` for animated skill bars |
| `contacts.tsx` | Server | Pure display — no browser APIs or event handlers |
| `blogCard.tsx` | Server | Pure display — no browser APIs or event handlers |
| `hobby.tsx` | Server | Pure display — no browser APIs or event handlers |

**Rule:** Only add `"use client"` when a component genuinely requires browser APIs, event listeners, or React state/effects. Keep the client boundary as low in the tree as possible.

### Database layer

All queries live in `app/db/data.ts` as named async functions using the `sql` tagged template literal from `@vercel/postgres`. Each function returns typed results using interfaces from `app/db/models.ts`.

```typescript
// Pattern used throughout data.ts
export async function fetchExperience(): Promise<Experience[]> {
  const { rows } = await sql<Experience>`SELECT * FROM experience`;
  return rows;
}
```

---

## Styling System

### Overview

All styles are written in **CSS Modules** co-located with their component. `app/globals.css` is the single source of truth for design tokens (CSS custom properties), global keyframe animations, and the CSS reset. Do not hardcode color values or pixel sizes anywhere that a token exists — always use `var(--token-name)`.

### Theme System

The site supports dark and light themes via a **three-layer cascade** in `globals.css`:

```
Layer 1: :root { }
  Default tokens — dark theme applied on first render
  (avoids flash of unstyled content on SSR)

Layer 2: @media (prefers-color-scheme: light) { :root { } }
  Overrides layer 1 if the OS is set to light mode

Layer 3: [data-theme="dark"] and [data-theme="light"] on <html>
  Explicit user toggle — overrides both layers above
  Written to localStorage and applied by themeToggle.tsx on mount
```

`themeToggle.tsx` sets `document.documentElement.dataset.theme` to `"dark"` or `"light"`. It renders an invisible SSR placeholder to prevent hydration mismatch. `layout.tsx` sets `suppressHydrationWarning` on `<html>` for the same reason.

**Never define theme-dependent values inline or in a component module.** Always add a token to `globals.css` (in all three layers) and reference it via `var()`.

### CSS Custom Property Categories

All tokens are defined in `app/globals.css`. The naming conventions below tell you which token to reach for when adding new styles:

| Category | Tokens | When to use |
|---|---|---|
| **Page background** | `--bg` | `background-color` on the page / section root |
| **Glass surfaces** | `--bg-surface`, `--bg-surface-hover` | Cards, panels, any frosted-glass element |
| **Glass border** | `--glass-border` | `border` on glass surfaces |
| **Accent** | `--accent`, `--accent-2`, `--accent-dim`, `--accent-gradient` | Brand color, active states, highlights |
| **Text** | `--text`, `--text-muted`, `--text-dim` | Primary copy, secondary copy, placeholder/disabled |
| **Glow / shadows** | `--glow-sm`, `--glow-md`, `--glow-lg` | `box-shadow` for depth and hover feedback |
| **Component tokens** | `--nav-bg`, `--dialog-bg`, `--drawer-bg`, `--card-back-bg`, … | Scoped to a single component; keeps globals.css legible |
| **Icon** | `--icon-filter` | CSS `filter` to invert icons for dark/light mode |

Add a new component-specific token only when a global token does not exist and the value needs to change between themes.

### Glassmorphism Recipe

Every card and panel follows this pattern. Do not deviate from it — consistency is deliberate:

```css
.card {
  background: var(--bg-surface);           /* rgba white/black ~4% opacity */
  border: 1px solid var(--glass-border);   /* rgba white/black ~8% opacity */
  border-radius: var(--border-radius);     /* 12px */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Blur intensity varies by component role:
- Navbar / drawer: `blur(20px)` – highest, always on screen
- Dialog overlay: `blur(6px)` – moderate, behind modal
- Dialog panel: `blur(24px)` – strong, modal surface
- Project card (back face): `blur(8px)` – subtle

### Standard Hover / Transition Pattern

Use this exact pattern for interactive glass surfaces. Transition only the properties that change:

```css
.card {
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.card:hover {
  background: var(--bg-surface-hover);
  border-color: var(--accent-border-hover);
  box-shadow: var(--glow-sm);
}
```

For links and icon buttons that lift on hover:

```css
.item:hover {
  transform: translateY(-3px);
  box-shadow: var(--glow-sm);
}
```

Pseudo-element underline / slide animations (navBar links, button fill) use `transform: scaleX(0) → scaleX(1)` on `::after` / `::before` with `transform-origin: left`.

### Animation Patterns

**Global keyframes** are defined in `globals.css` and referenced by name from CSS Modules:

| Keyframe | Duration | Used on |
|---|---|---|
| `blob-float` | 13–21 s, infinite | Background blobs in `page.module.css` |
| `profile-glow` | 3 s, infinite alternate | Profile picture border glow in `about.module.css` |
| `cursor-blink` | 1 s, step-end, infinite | Typewriter cursor in `about.module.css` |

> Unresolved keyframe names in a CSS Module fall through to the global scope — this is how `about.module.css` can reference `cursor-blink` even though the keyframes live in `globals.css`. Same pattern as `blob-float` / `profile-glow`.

**Scroll-reveal / entrance animations** are handled in two ways:
- `scrollReveal.tsx` + `scrollReveal.module.css`: IntersectionObserver wrapper that fades in a whole section (`opacity: 0; translateY(28px)` → visible). Staggered `delay` prop applied as `transitionDelay`. Respects `prefers-reduced-motion`.
- `framer-motion`: individual elements. Skills uses `useInView` to trigger animated skill bars; the About hero uses staggered `motion` elements.

```tsx
// Both coexist in page.tsx — ScrollReveal wraps whole sections…
<ScrollReveal><About … /></ScrollReveal>
<ScrollReveal delay={80}><Skills … /></ScrollReveal>
```

`ScrollReveal` details: IntersectionObserver (threshold 0.08) adds a `.visible` class when the section enters the viewport; the `delay` prop (ms) is applied as `transitionDelay`. It **respects `prefers-reduced-motion`** — the CSS module disables the transition entirely when the OS requests reduced motion.

### Responsive Strategy

All components are **mobile-first**. Base styles target the smallest viewport; overrides are in `min-width` media queries.

Standard breakpoints used across modules:

| Breakpoint | Common changes |
|---|---|
| `480px` | Project card grows; blog grid switches to auto-fill |
| `640px` | Skills grid: 1 col → 2 col |
| `768px` | NavBar switches to horizontal; contacts sidebar appears; single-column → multi-column layouts |
| `1024px` | Project card reaches its largest size (420 × 300 px) |
| `1100px` | Content wrapper capped at `--max-width`; skills grid: 2 col → 3 col |

Max content width is `--max-width: 1100px`, applied via a `.contentWrapper` class in `page.module.css`.

---

## Component Breakdown and Patterns

### Page-level composition (`app/page.tsx`)

The root page is an async server component. It fetches all data with `Promise.all`, then renders each major section wrapped in `ScrollReveal` for entrance animation:

```
<main>
  ├── Blob background (aria-hidden, decorative)
  ├── contentWrapper (max-width 1100px)
  │   ├── <ScrollReveal>       → <About>
  │   ├── <ScrollReveal delay> → <Skills>
  │   ├── <ScrollReveal delay> → <Experience>
  │   └── <ScrollReveal delay> → <Projects>
  └── <Contacts>  (outside contentWrapper — full-width sidebar)
```

### Dialog compound component (`dialog.tsx`)

`Dialog` is exported as a single object with named sub-components. This compound pattern keeps the call site readable without prop-drilling:

```tsx
// Exported as: Dialog.Root, Dialog.Header, Dialog.Divider, Dialog.Content, Dialog.Footer, Dialog.Button
<Dialog.Root open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
  <Dialog.Header title="…" subtitle="…" meta="…" />
  <Dialog.Divider label="Details" />
  <Dialog.Content>…</Dialog.Content>
  <Dialog.Footer>
    <Dialog.Button onClick={…}>Close</Dialog.Button>
  </Dialog.Footer>
</Dialog.Root>
```

Do not break this into separate named exports — the compound pattern is intentional.

### ScrollReveal wrapper (`scrollReveal.tsx`)

Wrap sections (not individual elements) in `ScrollReveal`. Each major section gets one wrapper. Use the `delay` prop (milliseconds) to stagger sibling sections:

```tsx
// Good — section-level wrapping with stagger
<ScrollReveal delay={80}><Skills /></ScrollReveal>

// Bad — wrapping individual list items creates too many observers
{items.map(item => <ScrollReveal key={item.id}><Item /></ScrollReveal>)}
```

### ThemeToggle (`themeToggle.tsx`)

Uses `navBar.module.css` for its styles (it shares the navbar's style scope). This is intentional — the toggle is always rendered inside the navbar. If the toggle is ever moved outside the navbar, give it its own module.

### Button component (`button.tsx`)

Two variants controlled by the `isPrimary` boolean:
- **Primary** (`isPrimary: true`): solid accent-gradient fill, dark text via `--btn-text-on-accent`
- **Secondary** (`isPrimary: false`): transparent background, accent border, slide-in fill on hover

Always use the `Button` component for interactive actions. Do not create one-off `<button>` elements with custom styles.

---

## Coding Conventions

### General

- **Do not** add `import React from 'react'` — React 19 automatic JSX transform is active (`jsx: react-jsx` in `tsconfig.json`).
- **Do not** add a test file — there is no test infrastructure.
- Use `@/*` path alias for imports from the project root (e.g. `import { fetchProjects } from '@/app/db/data'`).
- TypeScript strict mode is on — no implicit `any`, no missing return types on exported functions.

### Components

- New display-only components → server component (no `"use client"` directive).
- New component that needs state/effects/browser APIs → client component with `"use client"` at top.
- Every new component gets a co-located `ComponentName.module.css` file.
- Use CSS Modules for all styles — no inline styles except `transitionDelay` / dynamic values that cannot be expressed in CSS.
- Never use global class names. Always reference classes via the imported `styles` object.

### Styling

- Use `var(--token)` from `globals.css` for every color, shadow, and border-radius. Do not hardcode `rgba(...)` values that already exist as tokens.
- New theme-aware values → add to all three layers in `globals.css` (`:root`, `@media prefers-color-scheme: light`, `[data-theme="light"]`).
- Follow the glassmorphism recipe and hover pattern documented above.
- Add new keyframe animations to `globals.css`, not inside a CSS Module.

### Database

- All SQL goes in `app/db/data.ts`. Do not write raw SQL in components.
- Add a corresponding TypeScript interface to `app/db/models.ts` for any new table.
- Use the `sql` tagged template literal — never string-interpolate user data into queries.

### React 19 / Next.js notes

- `package.json` uses `overrides` to pin the entire dependency tree to React 19.2.3. If adding a package that pulls in React 18, check that the override still applies after install.
- ESLint config is `.eslintrc.json` (classic format, `extends: next/core-web-vitals`) — not the new flat config. The `eslint-config-next` version tracks the Next.js version (`16.1.4`).
- **`next lint` was removed in Next.js 16** — the CLI command no longer exists, so `npm run lint` errors with "Invalid project directory provided". The `.eslintrc.json` config file still ships, but no linting is wired into the toolchain. To lint, invoke ESLint directly: `npx eslint app/`.
- `next.config.js` uses `module.exports` (CommonJS). The empty `next.config.mjs` can be ignored.
- If third-party library types break due to React version mismatch, check and update the `overrides` block in `package.json`.

---

## Deployment

- **Platform:** Vercel
- **Database:** Vercel Postgres → migrated to Neon (Dec 2024); legacy `POSTGRES_*` env vars are preserved
- **Asset storage:** Vercel Blob (`vmdi8qakqy5un7sl.public.blob.vercel-storage.com`)
- **Image optimization:** Next.js `<Image>` with AVIF + WebP formats; remote patterns configured in `next.config.js`
- **Blog ISR:** Dev.to posts revalidate every 3600 seconds (`revalidate: 3600` in `devtoService.ts`)
