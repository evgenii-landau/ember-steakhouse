# Ember Steakhouse

Marketing site for Ember, a fire-driven steakhouse — a single scrollable landing page with the menu, gallery, reservations, and contact details.

## Tech stack

- **Next.js** (App Router) + **React**
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** for scroll-triggered animation
- **React Hook Form** + **Zod** for the reservation form
- **react-pageflip** for the book-style full menu

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Vitest unit tests |

## Project structure

```
src/
  app/                 App Router entry (layout, page, global styles)
  components/
    sections/          One file per page section (Hero, Menu, Story, …)
    ui/                Reusable UI (Button, MenuModal, Calendar, …)
  lib/                 Content data, full menu, form validation
public/                Dish and gallery imagery
```

All sections are composed in `src/app/page.tsx`. Editable site copy and data
live in `src/lib/content.ts` and `src/lib/menu.ts`.

## Deployment

Hosted on [Vercel](https://vercel.com). Pushing to `main` triggers an
automatic production deploy.
