# Ember Steakhouse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-page marketing site for Ember Steakhouse (NYC) with 10 sections, online reservation form with validation, and responsive layout — deployed to Vercel.

**Architecture:** Next.js App Router single-page site. All sections are React Server Components except the Navbar (scroll state), ReservationForm (controlled inputs + validation), and FadeIn wrapper (Framer Motion). Static content lives in a single `content.ts` file. No database — form submission logs to console and shows an in-page success state.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next/font (Playfair Display + Inter), next/image

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout — fonts, metadata, body classes |
| `src/app/page.tsx` | Assembles all 10 sections in order |
| `src/app/globals.css` | Tailwind directives + CSS custom props |
| `tailwind.config.ts` | Design token extensions (colors, fonts, sizes) |
| `src/lib/content.ts` | All static copy, menu items, reviews, stats |
| `src/lib/validation.ts` | Pure reservation form validation logic |
| `src/components/ui/Button.tsx` | Primary + outline button variants |
| `src/components/ui/SectionEyebrow.tsx` | Gold uppercase label above headings |
| `src/components/ui/FadeIn.tsx` | Framer Motion scroll-triggered fade wrapper |
| `src/components/sections/Navbar.tsx` | Sticky nav — transparent → solid on scroll |
| `src/components/sections/Hero.tsx` | Full-viewport hero with background image |
| `src/components/sections/Story.tsx` | About section — two-column + stats |
| `src/components/sections/MenuHighlights.tsx` | 4-card dish grid |
| `src/components/sections/Ambiance.tsx` | Photo gallery grid |
| `src/components/sections/SpecialEvents.tsx` | Private events split layout |
| `src/components/sections/Reviews.tsx` | 3-column guest quotes |
| `src/components/sections/ReservationForm.tsx` | Controlled form with validation + success |
| `src/components/sections/Contacts.tsx` | Address / hours / phone 3-column |
| `src/components/sections/Footer.tsx` | Logo, nav, social, tagline |

---

## Task 1: Project Bootstrap

**Files:**
- Create: entire Next.js project in current directory

- [ ] **Step 1: Scaffold the project**

Run from `/Users/jack/Desktop/FREELANCE/PROJECTS/PORTFOLIO/restaurant_steakhouse `:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Select defaults when prompted. The `.` installs into the current directory.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: `✓ Ready on http://localhost:3000`. Open the URL — default Next.js page should load.

- [ ] **Step 4: Remove boilerplate**

Delete the contents of `src/app/page.tsx` (replace with `export default function Page() { return null; }`).
Delete `src/app/globals.css` contents except the `@tailwind` directives.
Delete all files in `public/` (SVGs).

- [ ] **Step 5: Commit**

```bash
git init && git add . && git commit -m "feat: bootstrap Next.js project"
```

---

## Task 2: Design Tokens & Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Configure Tailwind with design tokens**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ember: {
          black: '#0A0806',
          warm: '#1A1210',
          cream: '#F2EDE4',
          gold: '#C8973A',
          'gold-hover': '#B07D28',
          muted: '#9A8F85',
          border: '#2A1F1A',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Set globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #0A0806;
    color: #ffffff;
  }
  * {
    border-radius: 0 !important;
  }
}
```

- [ ] **Step 3: Set up fonts in layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ember — Where Fire Meets Flavor',
  description: 'Premium steakhouse in New York City. Reserve your table at Ember.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Open browser devtools → Network → Fonts. You should see Playfair Display and Inter requests.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: add design tokens and fonts"
```

---

## Task 3: Static Content

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create content.ts**

```typescript
export const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Events', href: '#events' },
]

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Ribeye 16oz',
    description: 'Dry-aged, truffle butter, roasted bone marrow',
    price: '$89',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  },
  {
    id: 2,
    name: 'Wagyu Tenderloin',
    description: 'Japanese A5, yuzu kosho, micro herbs',
    price: '$145',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: 3,
    name: 'Lobster Bisque',
    description: 'Maine lobster, cognac cream, chive oil',
    price: '$28',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    id: 4,
    name: 'Lava Cake',
    description: 'Valrhona chocolate, vanilla bean ice cream',
    price: '$18',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
  },
]

export const STORY_STATS = [
  { value: '2019', label: 'Established' },
  { value: '14', label: 'Awards' },
  { value: 'Marco Rodriguez', label: 'Executive Chef' },
]

export const AMBIANCE_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Dining room', aspect: 'landscape' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', alt: 'Bar', aspect: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80', alt: 'Dish detail', aspect: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Interior', aspect: 'landscape' },
  { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80', alt: 'Guests', aspect: 'portrait' },
]

export const REVIEWS = [
  {
    id: 1,
    quote: 'The Wagyu tenderloin was unlike anything I have experienced in twenty years of dining in New York. Ember has redefined what a steakhouse can be.',
    author: 'James H.',
    context: 'Business Dinner',
    stars: 5,
  },
  {
    id: 2,
    quote: 'We hosted our anniversary here and the team made every detail feel effortless. The dry-aged ribeye is worth every penny.',
    author: 'Sophia & Daniel M.',
    context: 'Anniversary Dinner',
    stars: 5,
  },
  {
    id: 3,
    quote: 'The atmosphere is electric but intimate. The lobster bisque alone deserves a Michelin star. We will be back next month.',
    author: 'Rachel T.',
    context: 'Regular Guest',
    stars: 5,
  },
]

export const CONTACT_INFO = {
  address: '142 West 53rd Street\nNew York, NY 10019',
  hours: 'Mon – Thu: 5 PM – 11 PM\nFri – Sat: 5 PM – 12 AM\nSun: 5 PM – 10 PM',
  phone: '+1 (212) 555-0198',
  email: 'reservations@ember-nyc.com',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add static content"
```

---

## Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionEyebrow.tsx`
- Create: `src/components/ui/FadeIn.tsx`

- [ ] **Step 1: Create Button.tsx**

```typescript
// src/components/ui/Button.tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 transition-all duration-200 cursor-pointer'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-ember-gold text-ember-black hover:bg-ember-gold-hover',
    outline:
      'border border-ember-gold text-ember-gold hover:bg-ember-gold hover:text-ember-black',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create SectionEyebrow.tsx**

```typescript
// src/components/ui/SectionEyebrow.tsx
interface SectionEyebrowProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionEyebrow({ children, light = false }: SectionEyebrowProps) {
  return (
    <span
      className={`block font-sans text-[11px] font-medium uppercase tracking-[0.2em] mb-4 ${
        light ? 'text-ember-muted' : 'text-ember-gold'
      }`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create FadeIn.tsx**

```typescript
// src/components/ui/FadeIn.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components"
```

---

## Task 5: Validation Logic + Test

**Files:**
- Create: `src/lib/validation.ts`
- Create: `src/lib/validation.test.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/validation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { validateReservationForm, type ReservationFields } from './validation'

const valid: ReservationFields = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '2125550198',
  date: '2026-06-01',
  time: '19:00',
  guests: '2',
  requests: '',
}

describe('validateReservationForm', () => {
  it('returns no errors for valid input', () => {
    expect(validateReservationForm(valid)).toEqual({})
  })

  it('requires name', () => {
    const errors = validateReservationForm({ ...valid, name: '' })
    expect(errors.name).toBe('Name is required')
  })

  it('requires valid email', () => {
    const errors = validateReservationForm({ ...valid, email: 'notanemail' })
    expect(errors.email).toBe('Valid email is required')
  })

  it('requires phone with at least 10 digits', () => {
    const errors = validateReservationForm({ ...valid, phone: '123' })
    expect(errors.phone).toBe('Valid phone number is required')
  })

  it('requires date', () => {
    const errors = validateReservationForm({ ...valid, date: '' })
    expect(errors.date).toBe('Date is required')
  })

  it('requires time', () => {
    const errors = validateReservationForm({ ...valid, time: '' })
    expect(errors.time).toBe('Time is required')
  })

  it('requires guests between 1 and 20', () => {
    const tooMany = validateReservationForm({ ...valid, guests: '21' })
    expect(tooMany.guests).toBe('Guests must be between 1 and 20')

    const zero = validateReservationForm({ ...valid, guests: '0' })
    expect(zero.guests).toBe('Guests must be between 1 and 20')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `validateReservationForm` not found.

- [ ] **Step 4: Implement validation.ts**

```typescript
// src/lib/validation.ts
export interface ReservationFields {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  requests: string
}

export type ValidationErrors = Partial<Record<keyof ReservationFields, string>>

export function validateReservationForm(fields: ReservationFields): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Valid email is required'
  }

  const digits = fields.phone.replace(/\D/g, '')
  if (digits.length < 10) {
    errors.phone = 'Valid phone number is required'
  }

  if (!fields.date) {
    errors.date = 'Date is required'
  }

  if (!fields.time) {
    errors.time = 'Time is required'
  }

  const guestCount = parseInt(fields.guests, 10)
  if (isNaN(guestCount) || guestCount < 1 || guestCount > 20) {
    errors.guests = 'Guests must be between 1 and 20'
  }

  return errors
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test
```

Expected: All 7 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/validation.ts src/lib/validation.test.ts vitest.config.ts package.json
git commit -m "feat: add reservation form validation with tests"
```

---

## Task 6: Navbar

**Files:**
- Create: `src/components/sections/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```typescript
// src/components/sections/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ember-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="font-display text-2xl font-bold tracking-[0.15em] text-white uppercase"
        >
          Ember
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs uppercase tracking-[0.15em] text-white/80 hover:text-ember-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="outline" href="#reservations">
            Reserve a Table
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-ember-black/98 absolute top-20 left-0 right-0 px-6 py-10 flex flex-col gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm uppercase tracking-[0.2em] text-white hover:text-ember-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outline" href="#reservations">
            Reserve a Table
          </Button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Add to page.tsx temporarily and verify**

```typescript
// src/app/page.tsx
import Navbar from '@/components/sections/Navbar'
export default function Page() {
  return <main><Navbar /></main>
}
```

Run `npm run dev`. Navbar should appear. Scroll down — background should fill in after 80px. Mobile: hamburger opens an overlay.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Navbar.tsx src/app/page.tsx
git commit -m "feat: add navbar with scroll state and mobile menu"
```

---

## Task 7: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Add: `public/hero.jpg` (download a placeholder)

- [ ] **Step 1: Download a placeholder hero image**

```bash
curl -L "https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80" -o public/hero.jpg
```

- [ ] **Step 2: Create Hero.tsx**

```typescript
// src/components/sections/Hero.tsx
import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.jpg"
        alt="Ember steakhouse — fire and steak"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <SectionEyebrow>EST. 2019 · NEW YORK CITY</SectionEyebrow>

        <h1 className="font-display text-[clamp(80px,14vw,160px)] font-bold leading-none text-white tracking-[0.05em] mb-6">
          EMBER
        </h1>

        <p className="font-display italic text-[clamp(18px,2.5vw,28px)] text-white/80 mb-10">
          Where fire meets flavor
        </p>

        <Button href="#reservations">Reserve Your Table</Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and verify**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
export default function Page() {
  return <main><Navbar /><Hero /></main>
}
```

Open browser. Hero should be full viewport height with image, overlay, centered text, and CTA button.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx public/hero.jpg src/app/page.tsx
git commit -m "feat: add hero section"
```

---

## Task 8: Story Section

**Files:**
- Create: `src/components/sections/Story.tsx`

- [ ] **Step 1: Create Story.tsx**

```typescript
// src/components/sections/Story.tsx
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { STORY_STATS } from '@/lib/content'

export default function Story() {
  return (
    <section id="story" className="bg-ember-cream py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text column */}
          <FadeIn>
            <SectionEyebrow light>Our Story</SectionEyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-ember-warm leading-tight mb-8">
              A Story Told Through Fire
            </h2>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-6">
              Ember was born from a singular obsession: the perfect cut of beef, coaxed to its highest expression by live fire. Chef Marco Rodriguez spent a decade sourcing the finest ranches across the United States before opening our doors in 2019.
            </p>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-12">
              Every plate tells the story of the land it came from. We work exclusively with local farms, dry-age our own cuts in-house, and let the fire speak for itself.
            </p>

            {/* Stats */}
            <div className="flex gap-10">
              {STORY_STATS.map((stat, i) => (
                <div key={i} className={`${i > 0 ? 'pl-10 border-l border-ember-warm/20' : ''}`}>
                  <div className="font-display text-[40px] font-bold text-ember-gold leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Image column */}
          <FadeIn delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=900&q=80"
                alt="Chef Marco Rodriguez"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add next.config.ts image domains**

Modify `next.config.ts` to allow Unsplash images:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Add to page.tsx and verify**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
export default function Page() {
  return <main><Navbar /><Hero /><Story /></main>
}
```

Open browser. Story section should have cream background, two-column layout with text+stats on left, image on right.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Story.tsx next.config.ts src/app/page.tsx
git commit -m "feat: add story section"
```

---

## Task 9: Menu Highlights

**Files:**
- Create: `src/components/sections/MenuHighlights.tsx`

- [ ] **Step 1: Create MenuHighlights.tsx**

```typescript
// src/components/sections/MenuHighlights.tsx
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import { MENU_ITEMS } from '@/lib/content'

export default function MenuHighlights() {
  return (
    <section id="menu" className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-16">
          <SectionEyebrow>What We Serve</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Signature Dishes
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {MENU_ITEMS.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <div className="bg-ember-warm group overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-ember-gold px-2 py-1">
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ember-black font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-[19px] font-semibold text-white leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-sans text-[15px] text-ember-gold font-medium ml-4 shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-ember-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <Button variant="outline">View Full Menu</Button>
        </FadeIn>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<MenuHighlights />` after `<Story />`. Verify 4 cards appear in a responsive grid.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/MenuHighlights.tsx src/app/page.tsx
git commit -m "feat: add menu highlights section"
```

---

## Task 10: Ambiance Gallery

**Files:**
- Create: `src/components/sections/Ambiance.tsx`

- [ ] **Step 1: Create Ambiance.tsx**

```typescript
// src/components/sections/Ambiance.tsx
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { AMBIANCE_IMAGES } from '@/lib/content'

export default function Ambiance() {
  return (
    <section className="bg-ember-warm py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="mb-14">
          <SectionEyebrow>The Space</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            The Experience
          </h2>
          <p className="font-sans text-[17px] text-ember-muted mt-4 max-w-xl leading-relaxed">
            Low light, warm leather, the scent of oak smoke. Every corner of Ember is designed to disappear into the meal.
          </p>
        </FadeIn>

        {/* Gallery grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Large landscape — spans 8 cols */}
          <FadeIn className="col-span-12 md:col-span-8">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[0].src}
                alt={AMBIANCE_IMAGES[0].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          {/* Portrait — spans 4 cols */}
          <FadeIn className="col-span-12 md:col-span-4" delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden h-full min-h-[240px]">
              <Image
                src={AMBIANCE_IMAGES[1].src}
                alt={AMBIANCE_IMAGES[1].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          {/* Two portraits */}
          {AMBIANCE_IMAGES.slice(2, 4).map((img, i) => (
            <FadeIn key={i} className="col-span-6 md:col-span-4" delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </FadeIn>
          ))}

          {/* Wide landscape */}
          <FadeIn className="col-span-12 md:col-span-8" delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[4].src}
                alt={AMBIANCE_IMAGES[4].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Ambiance />` after `<MenuHighlights />`. Verify the asymmetric photo grid renders correctly at desktop and mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Ambiance.tsx src/app/page.tsx
git commit -m "feat: add ambiance gallery section"
```

---

## Task 11: Special Events

**Files:**
- Create: `src/components/sections/SpecialEvents.tsx`

- [ ] **Step 1: Create SpecialEvents.tsx**

```typescript
// src/components/sections/SpecialEvents.tsx
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'

export default function SpecialEvents() {
  return (
    <section id="events" className="bg-ember-cream py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeIn>
            <SectionEyebrow light>Private Dining</SectionEyebrow>
            <h2 className="font-display text-[clamp(40px,6vw,72px)] font-bold text-ember-warm leading-tight">
              Host Your Next Event
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-6">
              From intimate corporate dinners to milestone celebrations, Ember's private dining rooms are designed for moments that matter. We handle every detail — menu curation, florals, wine pairings — so you can focus on your guests.
            </p>
            <ul className="font-sans text-[15px] text-ember-warm/60 space-y-2 mb-10">
              {['Corporate & client entertainment', 'Birthday & anniversary dinners', 'Wedding rehearsal events', 'Buyouts for up to 120 guests'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-ember-gold mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="mailto:events@ember-nyc.com">Enquire About Events</Button>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<SpecialEvents />` after `<Ambiance />`. Cream background, two-column split layout.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SpecialEvents.tsx src/app/page.tsx
git commit -m "feat: add special events section"
```

---

## Task 12: Reviews

**Files:**
- Create: `src/components/sections/Reviews.tsx`

- [ ] **Step 1: Create Reviews.tsx**

```typescript
// src/components/sections/Reviews.tsx
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { REVIEWS } from '@/lib/content'

export default function Reviews() {
  return (
    <section className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-16">
          <SectionEyebrow>Guest Voices</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            What Our Guests Say
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.12}>
              <div className="relative p-8 border border-ember-border">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-ember-gold">
                      <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.895l-3.09 1.605L4.5 7.07 2 4.635l3.455-.505L7 1z" fill="currentColor" />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="absolute top-4 right-6 font-display text-[80px] leading-none text-ember-gold/10 select-none pointer-events-none">
                  "
                </div>

                <p className="font-display italic text-[17px] text-white/85 leading-relaxed mb-8">
                  "{review.quote}"
                </p>

                <div>
                  <div className="font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white">
                    {review.author}
                  </div>
                  <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted mt-1">
                    {review.context}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Reviews />` after `<SpecialEvents />`. Three bordered review cards on dark background.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Reviews.tsx src/app/page.tsx
git commit -m "feat: add reviews section"
```

---

## Task 13: Reservation Form

**Files:**
- Create: `src/components/sections/ReservationForm.tsx`

- [ ] **Step 1: Create ReservationForm.tsx**

```typescript
// src/components/sections/ReservationForm.tsx
'use client'

import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import { validateReservationForm, type ReservationFields, type ValidationErrors } from '@/lib/validation'

const EMPTY: ReservationFields = {
  name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '',
}

const TIME_SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export default function ReservationForm() {
  const [fields, setFields] = useState<ReservationFields>(EMPTY)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof ReservationFields]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateReservationForm(fields)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    setSubmitted(true)
  }

  const inputClass = (field: keyof ReservationFields) =>
    `w-full bg-transparent border-b py-3 font-sans text-[15px] text-white placeholder-ember-muted/50 outline-none transition-colors duration-200 focus:border-ember-gold ${
      errors[field] ? 'border-red-400' : 'border-ember-border'
    }`

  const labelClass = 'block font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted mb-1'

  if (submitted) {
    return (
      <section id="reservations" className="bg-ember-warm py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <SectionEyebrow>Confirmed</SectionEyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white mb-6">
              Your Table Awaits
            </h2>
            <p className="font-sans text-[17px] text-ember-muted max-w-md mx-auto">
              We have received your reservation and will confirm within the hour. See you soon.
            </p>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="reservations" className="bg-ember-warm py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-14">
          <SectionEyebrow>Book Your Visit</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Reserve Your Table
          </h2>
        </FadeIn>

        <FadeIn>
          <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

              {/* Name */}
              <div>
                <label className={labelClass} htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe"
                  value={fields.name} onChange={handleChange} className={inputClass('name')} />
                {errors.name && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com"
                  value={fields.email} onChange={handleChange} className={inputClass('email')} />
                {errors.email && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+1 (212) 000-0000"
                  value={fields.phone} onChange={handleChange} className={inputClass('phone')} />
                {errors.phone && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Guests */}
              <div>
                <label className={labelClass} htmlFor="guests">Number of Guests</label>
                <input id="guests" name="guests" type="number" min="1" max="20"
                  value={fields.guests} onChange={handleChange} className={inputClass('guests')} />
                {errors.guests && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.guests}</p>}
              </div>

              {/* Date */}
              <div>
                <label className={labelClass} htmlFor="date">Date</label>
                <input id="date" name="date" type="date"
                  value={fields.date} onChange={handleChange} className={inputClass('date')} />
                {errors.date && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className={labelClass} htmlFor="time">Time</label>
                <select id="time" name="time" value={fields.time} onChange={handleChange}
                  className={`${inputClass('time')} appearance-none cursor-pointer`}>
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t} className="bg-ember-warm">{t}</option>
                  ))}
                </select>
                {errors.time && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.time}</p>}
              </div>

              {/* Special requests — full width */}
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="requests">Special Requests</label>
                <textarea id="requests" name="requests" rows={3} placeholder="Allergies, occasions, seating preferences..."
                  value={fields.requests} onChange={handleChange}
                  className={`${inputClass('requests')} resize-none`} />
              </div>

            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <Button type="submit">Confirm Reservation</Button>
              <p className="font-sans text-[13px] text-ember-muted mt-6">
                Or call us: <a href="tel:+12125550198" className="text-white hover:text-ember-gold transition-colors">+1 (212) 555-0198</a>
              </p>
            </div>

          </form>
        </FadeIn>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<ReservationForm />` after `<Reviews />`. Test: submit empty form → inline error messages appear. Fill valid data → success state shows.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ReservationForm.tsx src/app/page.tsx
git commit -m "feat: add reservation form with validation"
```

---

## Task 14: Contacts Section

**Files:**
- Create: `src/components/sections/Contacts.tsx`

- [ ] **Step 1: Create Contacts.tsx**

```typescript
// src/components/sections/Contacts.tsx
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { CONTACT_INFO } from '@/lib/content'

export default function Contacts() {
  return (
    <section id="contact" className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="mb-14">
          <SectionEyebrow>Find Us</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Come Find Us
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-ember-border">

            {/* Address */}
            <div className="md:pr-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Location</div>
              {CONTACT_INFO.address.split('\n').map((line, i) => (
                <p key={i} className="font-sans text-[16px] text-white/80">{line}</p>
              ))}
            </div>

            {/* Hours */}
            <div className="md:px-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Hours</div>
              {CONTACT_INFO.hours.split('\n').map((line, i) => (
                <p key={i} className="font-sans text-[15px] text-white/80 leading-relaxed">{line}</p>
              ))}
            </div>

            {/* Contact */}
            <div className="md:pl-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Contact</div>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="block font-sans text-[16px] text-white/80 hover:text-ember-gold transition-colors mb-2"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block font-sans text-[15px] text-white/60 hover:text-ember-gold transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Contacts />` after `<ReservationForm />`. Three columns with gold labels, separated by vertical dividers on desktop.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contacts.tsx src/app/page.tsx
git commit -m "feat: add contacts section"
```

---

## Task 15: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```typescript
// src/components/sections/Footer.tsx
import Link from 'next/link'
import { NAV_LINKS, CONTACT_INFO } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-ember-black border-t border-ember-border">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-10">

          {/* Logo */}
          <Link href="#" className="font-display text-2xl font-bold tracking-[0.15em] text-white uppercase">
            Ember
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a href={CONTACT_INFO.social.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="text-ember-muted hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer"
              aria-label="Facebook" className="text-ember-muted hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-ember-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[12px] text-ember-muted">
            Crafted with passion in New York City
          </p>
          <p className="font-sans text-[12px] text-ember-muted">
            &copy; {new Date().getFullYear()} Ember Restaurant. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Footer.tsx
git commit -m "feat: add footer"
```

---

## Task 16: Full Page Assembly + Polish

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections**

```typescript
// src/app/page.tsx
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import MenuHighlights from '@/components/sections/MenuHighlights'
import Ambiance from '@/components/sections/Ambiance'
import SpecialEvents from '@/components/sections/SpecialEvents'
import Reviews from '@/components/sections/Reviews'
import ReservationForm from '@/components/sections/ReservationForm'
import Contacts from '@/components/sections/Contacts'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <MenuHighlights />
      <Ambiance />
      <SpecialEvents />
      <Reviews />
      <ReservationForm />
      <Contacts />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run dev and walk through each section**

```bash
npm run dev
```

Check each section in order:
- [ ] Navbar transparent → solid on scroll
- [ ] Hero: full viewport, correct font sizes at mobile/desktop
- [ ] Story: cream bg, two-column, stats visible
- [ ] Menu: 4 cards, responsive grid
- [ ] Ambiance: asymmetric grid
- [ ] Events: cream bg, split layout
- [ ] Reviews: 3 bordered cards
- [ ] Form: validation errors show, success state works
- [ ] Contacts: 3-column with dividers
- [ ] Footer: links + social icons

- [ ] **Step 3: Run build to check for TypeScript/compile errors**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Fix any TypeScript errors before continuing.

- [ ] **Step 4: Run tests**

```bash
npm test
```

Expected: All 7 validation tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full page"
```

---

## Task 17: Vercel Deployment

**Files:**
- No code changes — deploy existing build

- [ ] **Step 1: Push to GitHub**

Create a repo at github.com, then:

```bash
git remote add origin https://github.com/<your-handle>/ember-steakhouse.git
git push -u origin main
```

- [ ] **Step 2: Import to Vercel**

Go to vercel.com → New Project → import your GitHub repo. Framework will be detected as Next.js. No env vars needed. Click Deploy.

- [ ] **Step 3: Verify production URL**

Open `https://ember-steakhouse.vercel.app`. Walk through all 10 sections. Test reservation form on production. Confirm fonts and images load.

---

## Self-Review Against Spec

| Spec Requirement | Task |
|-----------------|------|
| Navbar with logo, nav links, CTA | Task 6 |
| Hero fullscreen with headline/subtitle/CTA | Task 7 |
| Story section — history, stats | Task 8 |
| Menu Highlights — 4 dish cards with prices | Task 9 |
| Ambiance gallery | Task 10 |
| Special Events section | Task 11 |
| Reviews — 3 guest quotes | Task 12 |
| Reservation form with all fields | Task 13 |
| Form validation + success message | Tasks 5 + 13 |
| Contacts section | Task 14 |
| Footer with social | Task 15 |
| Responsive layout | Task 16 step 2 |
| Next.js + Tailwind | Task 1 |
| Vercel deployment | Task 17 |

All requirements covered.
