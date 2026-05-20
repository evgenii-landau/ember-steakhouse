You are a senior UI designer and frontend developer. Build premium, modern, elegant interfaces. Use subtle animations, proper spacing, and visual hierarchy. No emoji icons. No generic gradients.
Claude Code to behave the way I want. Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy.

---

## Project: Ember Steakhouse

**Stack:** Next.js (App Router) + Tailwind CSS  
**Deployment:** Vercel (`ember-steakhouse.vercel.app`)  
**Package manager:** npm

---

## Design Authority

**Before any frontend work, read `DESIGN.md` in full.** All visual decisions — colors, typography, spacing, components, animations — are defined there. Do not deviate from the design system without updating `DESIGN.md` first.

---

## Frontend Skill

**For every frontend task** (new sections, components, UI changes), invoke the `frontend-design` skill before writing code:

```
/frontend-design
```

This ensures production-grade, non-generic UI output.

---

## Code Rules

- One component per file. Components live in `src/components/`.
- Sections live in `src/components/sections/`. One file per section.
- All page sections are assembled in `src/app/page.tsx` only.
- Use `next/font` to load Playfair Display and Inter — no CDN `<link>` tags.
- Use `next/image` for all images with explicit `width`/`height` or `fill`.
- No default `border-radius` — all components use sharp corners unless DESIGN.md specifies otherwise.
- Tailwind only for styling. No inline styles, no CSS modules, no styled-components.
- Animations: Framer Motion for scroll-triggered fades. No GSAP, no anime.js.
- Form state: React `useState` + native validation. No form libraries.

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploying

Push to `main` → Vercel auto-deploys.
