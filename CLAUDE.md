# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jersey Eats is a food-delivery marketplace for Jersey, Channel Islands. The platform is specified as **three separate applications** in `JerseyEats_Documentation.md` — Customer App, Vendor Portal, Admin Panel. **Only the customer app exists today**, in `client/`. Vendor + admin are out of scope until instructed.

The user is a product designer; a backend developer will wire Supabase later. All data today is mock data behind a typed service layer — see "Data layer" below.

Reference docs at the repo root:

- `JerseyEats_Documentation.md` — product spec (all three apps)
- `Jersey Eats Brand Guidelines.docx` — palette, type, tone
- `Jersey Eats UX_CRO Playbook.docx` — funnel targets, parish-first rationale, checkout rules
- `.superpowers/brainstorm/**` — saved visual brainstorm mockups, including `homepage-combined.html` which is the locked K × O × L direction
- `.claude/plans/hello-i-am-product-gentle-petal.md` — the approved implementation plan

## Commands (run from `client/`)

```bash
npm run dev -- --port 3100    # dev server (Turbopack) — use :3100 convention
npm run build                 # production build
npm run start                 # run prod build locally
npx tsc --noEmit              # typecheck (no test suite exists yet)
```

No test runner configured. Type safety + hitting routes with `curl -o /dev/null -w "%{http_code}"` is the current verification loop.

## Next.js 16 — read local docs before writing

`client/AGENTS.md` (already imported by `client/CLAUDE.md`) warns that this is **Next.js 16**, with breaking changes from 15. Before writing Next-specific code (routing, metadata, fetch patterns, params handling), read the relevant guide in `client/node_modules/next/dist/docs/01-app/` — those docs are version-matched. Training data is outdated.

Notable things already in place that reflect v16 conventions: `params` is a `Promise` and must be awaited; `PageProps<"/route">` and `LayoutProps<"/route">` are globally-available helper types (no import needed).

## Locked design system — K × O × L

The visual direction was chosen through brainstorming and **must not be redesigned without being asked**. Three parts:

- **K (typography)** — Inter sans 400–800 via `next/font`; Fraunces italic 400–500 for emphasis only. The `.em` class (globals.css) applies Fraunces italic — use sparingly on one or two words per headline, not whole paragraphs.
- **O (hero layout)** — Centered hero, blurred tan/blue/coral atmosphere blobs (`.je-blob` class + `AtmosphereBlobs` component), pill-shaped outlined parish bar, trust-signal stats row with Fraunces italic numerals.
- **L (navigation)** — Minimal two-zone nav on `bg-je-cream` with `backdrop-blur`, brand left, Help + outlined Sign-in right.

Brand tokens live as CSS custom properties in `src/app/globals.css` and are exposed as Tailwind utilities via the `@theme inline` block. Use `bg-ink`, `text-je-brown`, `border-line`, etc. — don't hardcode hex values. The working triad is `--ink: #1A1614` / `--paper: #FBF8F3` / `--line: #E8E2D9`, alongside the full brand palette (`--je-blue`, `--je-tan`, `--je-coral`, etc.).

Motion tokens: `--ease-out`, `--dur-base` (250ms), and the `.je-rise` / `.je-fade` keyframe utilities. Stagger hero elements with `style={{ animationDelay: "…ms" }}` in 80ms steps.

### Stacking-context gotcha

`.je-rise` animates `transform` and its final keyframe is `transform: none` (not `translate3d(0,0,0)`) specifically to avoid leaving a stacking context behind. Don't revert that. Components that render popovers/dropdowns across multiple animated siblings (or across sticky bars) **must portal to `document.body`** — see `InlineParishPicker.tsx` as the reference implementation.

## Data layer (Supabase-ready contract)

Every page reads through a service function in `src/lib/data/services/*.ts`. Each function has a `@backend` JSDoc block with the expected Supabase query. The mock data in `src/lib/data/mock/*.ts` is typed 1:1 against `src/lib/data/types/*.ts` — and those types mirror the Supabase tables the backend developer will create.

**When adding a new feature that needs data**: add or extend a service function following this pattern, do not inline fetches or invent new data shapes in components. The backend developer will replace the function bodies with Supabase calls and keep the signatures.

```
src/lib/data/
  types/      → table-shape TypeScript interfaces
  mock/       → realistic Jersey-flavoured seed data
  services/   → async functions with @backend JSDoc contracts
```

Prices are stored in **pence** (integers) throughout. Use `formatPrice(pence)` from `src/lib/utils.ts` to render.

## State

Zustand stores in `src/lib/store/`, persisted to `localStorage` via `zustand/middleware`:

- `parish.ts` — selected parish code (key: `je:parish`). Drives discovery filtering, stays stable across navigations.
- `basket.ts` — basket lines with derived selectors (`itemCount`, `subtotalPence`, `restaurantSlug`) and an `isOpen` drawer flag.

The basket's `addLine` automatically merges duplicate lines by `itemId` + identical `modifierSelections`, so don't duplicate that logic in components.

## Images

Restaurant heroes and menu item photos use **Unsplash CDN** URLs (`images.unsplash.com`). `Restaurant.heroImage` is a full CSS `background` shorthand — a `url(...) center/cover` layer on top of a gradient fallback — so drop it straight into `style={{ background: r.heroImage }}`. Menu item thumbs use a plain `<img>` tag with the `MenuItem.image` URL.

`next/image` is not configured for Unsplash remote patterns yet; either keep using `<img>` or add the domain to `next.config.ts` before migrating.

## Agentation

`src/components/dev/Agentation.tsx` mounts the `agentation` package in `app/layout.tsx`. It renders **dev-only** and is tree-shaken in production. Designers click elements to generate structured feedback with selectors + bounding boxes; that output lands back as page-feedback messages. Don't remove this or gate it behind anything else.

## Scope boundaries

- **No real payments** — the Apple/Google/Card tiles render the flow, but `placeOrder()` just creates an in-memory order and navigates to the confirmation.
- **Auth is stubbed** — `getCurrentUser()` returns the mock user by default. Social logins are visual only with commented Supabase OAuth calls.
- **No Vendor Portal, no Admin Panel** — even though the product doc describes them. Don't scaffold them unless asked.
