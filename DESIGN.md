# Ember Steakhouse — Design System

## Brand Identity

**Name:** Ember  
**Tagline:** "Where fire meets flavor"  
**Established:** 2019, New York City  
**Positioning:** Premium NYC steakhouse. Dark, editorial, carnivorous. Think high-end magazine meets fire-lit dining room.  
**Audience:** Wealthy professionals 30–55, business dinners, romantic evenings.

---

## Color Palette

| Role               | Hex       | Usage                                              |
|--------------------|-----------|----------------------------------------------------|
| Background Dark    | `#0A0806` | Primary page background, hero, dark sections       |
| Background Warm    | `#1A1210` | Cards, secondary dark sections                     |
| Background Cream   | `#F2EDE4` | Alternating light sections (Story, Events)         |
| Gold Accent        | `#C8973A` | CTAs, labels, highlights, hover states             |
| Gold Hover         | `#B07D28` | Button hover                                       |
| Text Primary       | `#FFFFFF` | Headlines and body on dark backgrounds             |
| Text Muted         | `#9A8F85` | Secondary text, captions, form labels              |
| Text Dark          | `#1A1210` | Body text on cream sections                        |
| Border Subtle      | `#2A1F1A` | Dividers, card borders                             |

**Rule:** No gradients. Flat dark or flat cream. Amber is the only accent — use sparingly.

---

## Typography

### Fonts
- **Display (headings):** `Playfair Display` — serif, elegant, premium. Used for all section headings and the hero title.
- **UI / Body:** `Inter` — clean, readable, modern. Used for body copy, nav, labels, form fields.

### Scale
| Name        | Size       | Weight    | Usage                             |
|-------------|------------|-----------|-----------------------------------|
| Display XL  | 96–120px   | 700       | Hero "EMBER" logotype headline    |
| Display     | 56–72px    | 700       | Section headings ("A Story Told…")|
| Heading     | 32–40px    | 600       | Card/sub-section titles           |
| Body Large  | 18–20px    | 400       | Section intro paragraphs          |
| Body        | 15–16px    | 400       | General body copy                 |
| Label       | 11–12px    | 500       | ALL CAPS + wide tracking (0.15em) |

### Rules
- Section headings: Playfair Display, sentence case or title case (not all-caps)
- Labels/eyebrows above headings: Inter, ALL CAPS, letter-spacing 0.15em, gold color
- No default browser font fallbacks visible — always load from Google Fonts or next/font

---

## Spacing & Layout

- **Max content width:** 1280px, centered with `px-6 md:px-12 lg:px-20`
- **Section vertical padding:** `py-24 md:py-32`
- **Grid system:** 12-column CSS Grid; most content uses 4 or 6-col asymmetric splits
- **Card gap:** 24px (6 Tailwind units)
- **Section rhythm:** Dark → Cream → Dark → Cream alternation

---

## Animations

Subtle, performance-conscious. Never distracting.

- **Fade-in on scroll:** `opacity-0 → opacity-100`, `translateY(24px) → translateY(0)`, duration 600ms, ease-out. Apply to section headings, cards, gallery items.
- **Nav:** Transparent on hero, transitions to `#0A0806` with `backdrop-blur` on scroll (threshold: 80px).
- **CTA buttons:** Scale `1 → 1.02` on hover, background color transition 200ms.
- **Image hover:** Scale `1 → 1.04` on gallery images, overflow hidden, 400ms ease.
- **Use Framer Motion or CSS transitions** — no JS-heavy libraries.

---

## Components

### Navbar
- Transparent over hero, solid dark on scroll
- Logo left, nav links center (hidden on mobile → hamburger), CTA button right
- Nav links: Inter, 14px, uppercase, tracking wide, white, hover → gold
- CTA: outlined button (1px gold border, gold text) → filled on hover
- Mobile: full-screen overlay menu, dark background

### CTA Buttons
Two variants only:
- **Primary:** Filled gold `#C8973A` background, dark text, `px-8 py-3.5`, no border-radius (sharp corners), Inter 500 uppercase tracking-wide
- **Outline:** 1px `#C8973A` border, transparent background, gold text → filled on hover

No rounded pill buttons. Sharp rectangular CTAs only.

### Section Eyebrow
`<span>` above heading: ALL CAPS, Inter 11px, gold `#C8973A`, letter-spacing 0.2em.  
Example: `EST. 2019 · NEW YORK CITY`

### Menu Cards
- Dark background `#1A1210`
- Full-bleed dish photo (aspect ratio 4:3)
- Dish name: Playfair Display 22px
- Description: Inter 14px muted
- Price: Inter 16px gold, right-aligned

### Stat Blocks (Story section)
- Large number: Playfair Display 56px gold
- Label below: Inter 12px uppercase muted
- Separated by thin `#2A1F1A` vertical line

### Review Cards
- No card border — floating on dark background
- Large `"` quotation mark in gold (Playfair Display 120px, opacity 20%)
- Quote: Playfair Display italic 20px white
- Name: Inter 12px uppercase muted

### Reservation Form
- Inputs: No border-radius, bottom-border only `1px #2A1F1A`, transparent background
- On focus: bottom-border turns gold `#C8973A`
- Labels: Inter 11px uppercase tracking-wide, positioned above input
- Submit: Full-width primary button

---

## Section-by-Section Design Notes

### 1. Navbar
Sticky. Logo: "EMBER" wordmark in Playfair Display. Reserve button right.

### 2. Hero
- Full-viewport height (`100vh`)
- Background: full-bleed dark photo/video (steak on fire, smoke)
- Dark overlay: `rgba(0,0,0,0.5)`
- Content centered vertically
- Eyebrow: `EST. 2019 · NEW YORK CITY` in gold
- Headline: `EMBER` — Playfair Display 96–120px bold white
- Subtitle: *"Where fire meets flavor"* — Playfair Display italic 24px
- CTA button below subtitle

### 3. Story (About)
- **Cream background** `#F2EDE4`
- Two-column: left = body text + stats row; right = portrait photo (chef or fire)
- Stats row: 3 items — "Since 2019", "14 Awards", "Chef Marco Rodriguez"

### 4. Menu Highlights
- Dark background
- 4-card grid (2×2 on desktop, 1-col on mobile)
- "View Full Menu" outline button centered below grid

### 5. Ambiance (Gallery)
- Dark background
- Masonry-style photo grid: 5–6 images, mixed portrait/landscape
- Minimal text overlay: headline + one line

### 6. Special Events
- Cream background
- Split layout: large headline left, text + button right
- Background texture: subtle grain (CSS noise filter, opacity 4%)

### 7. Reviews
- Dark background
- 3-column quote grid
- Star rating: 5 dots/dashes in gold (no emoji stars)

### 8. Reservation Form
- Dark background `#1A1210`
- 2-column form fields, full-width textarea at bottom
- Phone number below button

### 9. Contacts
- Dark background
- 3-column: Address | Hours | Phone
- Thin `#2A1F1A` vertical dividers between columns

### 10. Footer
- Near-black `#0A0806`
- Logo left, nav links center, social icons right
- Bottom line: "Crafted with passion in New York City"
- Social icons: SVG only, no emoji, no icon libraries

---

## Photography Style

- Dark, moody, warm-toned food photography
- Shallow depth of field
- Fire, smoke, char — tactile textures
- No stock-photo brightness or oversaturation
- Placeholder: use dark Unsplash food photos until client provides assets

---

## What to Avoid

- Generic gradients (linear or radial color fills as backgrounds)
- Rounded pill buttons or cards with heavy border-radius
- Pastel or bright color accents other than the gold
- Icon libraries (Heroicons, FontAwesome) — use inline SVG only
- Box shadows that look "floaty" — depth through color contrast, not shadow
- Emoji of any kind
