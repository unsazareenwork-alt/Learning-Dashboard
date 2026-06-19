# Pace — Next-Gen Learning Dashboard

A dark-mode, animated student dashboard built for the Frontend Intern Challenge.
Live courses, a daily learning streak, and an activity heatmap are rendered in
a Bento grid, fetched server-side from Supabase, and animated with Framer Motion.

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (CSS-variable-based design tokens, no `tailwind.config` theme needed)
- **Framer Motion** for all animation and layout transitions
- **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) for the `courses` and `activity` tables
- **Lucide React** for icons, including dynamic icon resolution from a DB-stored string

## Getting started

```bash
npm install
npm run dev
```

The dashboard works immediately with **mock data** — no Supabase project required
to see it running. To connect a real backend:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run `supabase/seed.sql` — it creates the `courses`
   and `activity` tables, enables RLS with public read policies, and inserts
   sample rows.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key
   (Project Settings → API).
4. Restart the dev server. The dashboard will now read live data — and if the
   query ever fails, it quietly falls back to mock data with a small inline
   notice instead of crashing.

## Architecture & the server/client split

The guiding rule: **fetch on the server, animate on the client.**

- `app/dashboard/page.tsx` is a Server Component. It renders the static shell
  (sidebar, header) immediately and wraps the data-dependent part of the page
  in `<Suspense>`.
- `components/dashboard/dashboard-data.tsx` is an `async` Server Component.
  This is where `getCourses()`, `getActivity()`, and `getStudentProfile()` are
  awaited — all three run in parallel via `Promise.all`. Because this runs on
  the server, the Supabase anon key and query logic never reach the browser
  bundle.
- `lib/data.ts` is the data-access layer. Each function tries Supabase first,
  and falls back to deterministic mock data (`lib/mock-data.ts`) if env vars
  are missing, the query errors, or the table is empty. This means the same
  code path works in three states: no Supabase configured, Supabase configured
  but empty, and Supabase configured with real rows — without `if` branches
  scattered through the UI.
- Everything below that — `HeroTile`, `CourseCard`, `ActivityTile`, `Sidebar`,
  `BentoTile`, the progress bar — is a **Client Component** (`"use client"`),
  because they all need Framer Motion, hooks, or interaction. Server Components
  pass plain serializable props (numbers, strings, arrays) down to them; no
  functions or class instances cross the boundary.
- `app/dashboard/loading.tsx` provides the route-level instant loading state
  (shown on navigation), while the `<Suspense>` boundary inside the page
  handles the same skeleton for the initial server render — both reuse the
  same `DashboardGridSkeleton` component so they're visually identical.
- `app/dashboard/error.tsx` is a Client Component error boundary for anything
  that escapes the try/catch in `lib/data.ts` (e.g. a render-time exception),
  so a bad deploy never shows the default Next.js error screen.

## Animation notes

- All hover and entrance animations use only `transform` and `opacity` (box-shadow
  on hover is the one exception, used deliberately for the glow effect since it
  doesn't affect layout) — nothing animates `width`, `height`, `top`, or `margin`
  on interaction, so there are no layout shifts or repaints.
- Tile entrance uses a parent `StaggerGrid` with `staggerChildren`, and each
  `BentoTile` defines its own `hidden`/`visible` variants with spring physics
  (`stiffness: 260, damping: 24`), so tiles fade and rise into place in
  sequence rather than all at once.
- Hover elevation uses `whileHover={{ scale: 1.015 }}` with
  `type: "spring", stiffness: 300, damping: 20` as specified in the brief.
- The sidebar's active-item highlight uses a single shared `layoutId`
  (`sidebar-active-highlight`) so Framer Motion animates the highlight
  sliding between nav items rather than fading a new one in.
- The course progress bars animate `width` from `0%` to the fetched value on
  mount — this is the one place width animates, but it only happens once on
  initial paint, not as a hover/interaction response, so it doesn't count
  against the "zero layout shift on interaction" requirement.
- `prefers-reduced-motion: reduce` is respected globally via a CSS media query
  that collapses all animation/transition durations to near-zero.

## Responsive behavior

- **Desktop (>1024px):** full 4-column Bento grid, sidebar expanded with labels.
- **Tablet (768–1024px):** sidebar auto-collapses to icons-only (still
  toggleable manually), grid drops to 2 columns.
- **Mobile (<768px):** sidebar is hidden entirely in favor of a fixed bottom
  navigation bar; the grid stacks into a single column.

## Design choices

Dark base (`#08090c`) with two accent colors used for distinct *roles* rather
than one decorative accent: violet (`#7c5cff`) for structural/brand elements
and the default progress state, teal (`#33e2c0`) for "near complete" progress
and the activity heatmap. The daily streak — called out specifically in the
brief — gets its own warm ember accent and a pulsing glow, since it's the one
piece of the dashboard that's meant to feel alive rather than informational.
Type pairs a geometric display face (Space Grotesk) for headings against
Inter for body text, with JetBrains Mono reserved for numeric "readouts"
(streak count, percentages) to give data points a distinct, instrument-panel
feel rather than blending into the prose.

## Known limitations / next steps

- There's no authentication yet — `getStudentProfile()` returns a hardcoded
  name and streak. Wiring this to Supabase Auth and a `profiles` table would
  be the natural next step, with the streak computed from the `activity` table
  rather than stored as a flat number.
- The sidebar's nav items don't route anywhere yet (`Courses`, `Achievements`,
  `Settings` are placeholders) — only `Dashboard` has a page.
- Font loading uses self-hosted `@fontsource` packages rather than
  `next/font/google`, because the original build environment couldn't reach
  `fonts.googleapis.com`. Functionally equivalent (same files, self-hosted,
  no layout-shift/FOUT issues), but worth knowing if you expected the
  `next/font` API specifically.
