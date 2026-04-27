# Image Upload Guide — Bar Maaya

All site images live in `src/assets/`. Replace any file with a same-named file of equal or better quality. Vite bundles them at build time, so no URL changes are needed in code.

---

## Current Image Inventory

| File | Used On | Notes |
|------|---------|-------|
| `bar-atmosphere.jpg` | Index, Menus, Reservations, Gallery, Story (CTA bg) | Bar interior — warm amber. High usage. |
| `bar-panoramic.jpg` | Story (ImageComparison), Gallery, PourReveal, PrivateEvents | Wide bar shot. |
| `celebration.jpg` | SipAndPaint (about section), PrivateEvents | Group celebration photo. |
| `cocktail-amber.jpg` | Index, Menus, Gallery, Story (ImageComparison) | Hero cocktail shot — most-used asset. |
| `cta-bg.jpg` | CTABanner only | Background texture/bar shot. |
| `dj-night.jpg` | Index (slider + Instagram), SportsWatchParties, Story ch05 | Nightlife/DJ photo. |
| `food-dark.jpg` | Index (tray strip) | Dark food photography. |
| `food-plating.jpg` | Story ch03 | Food plating shot — rarely used elsewhere. |
| `gallery-1.png` through `gallery-8.png` | Gallery, Index slider/Instagram | Gallery images. Recommend replacing PNGs with JPGs for size. |
| `happy-hour.jpg` | Menus, SipAndPaint (PageHero) | Bar scene / cocktail. |
| `hero-bar.jpg` | Story ch02 | Bar overview — unique usage. |
| `illusion-face.jpg` | Story ch01 only | Illusion/optical art. Unique. |
| `maaya-logo.png` | Navbar, Footer, GiftCards, PourReveal, CinemaIntro | Logo — do not replace without brand approval. |
| `parallax-bg.jpg` | Index (Visit Maaya section bg) | Parallax background texture. |
| `private-event.jpg` | BookEvent (event panel), PrivateEvents | Private event photo. |
| `sax-night.jpg` | Index (slider + Instagram), Gallery | Live music / saxophone photo. |
| `table-setting.jpg` | Index (Illusion section), Reservations, Story ch04 | Table setup photo. |
| `team-event.jpg` | PrivateEvents | Corporate/team event photo. |
| `woman-amber.jpg` | Index (slider), Menus, Reservations, Story (hero) | Model / cocktail portrait — high usage. |
| `woman-cocktail.jpg` | Index (tray strip + Instagram) | Second model portrait. |

---

## Duplicate Usage Audit

The following images appear in 3+ locations. Consider whether each usage is intentional or if a visual variation would improve page differentiation:

- **`cocktail-amber.jpg`** — Index cocktail section, Index parallax bg, Menus, Gallery, Story ImageComparison. The most-used image. Replace the Index parallax usage with `parallax-bg.jpg` or a dedicated hero shot for visual variety.
- **`bar-atmosphere.jpg`** — Index, Menus, Reservations, Gallery, Story CTA bg. The interior image. Consider having 2–3 interior photos with different angles.
- **`woman-amber.jpg`** — Index, Menus, Reservations, Story hero. Consider a second portrait to reduce repetition on Menus and Reservations.

---

## How to Replace an Image

1. Prepare the replacement at the same or higher resolution.
2. Export as `.jpg` (quality 85–90) or `.webp` for best performance.
3. Name it exactly the same as the file you're replacing (e.g. `cocktail-amber.jpg`).
4. Drop it into `src/assets/` — Vite will pick it up on next `npm run dev` or `npm run build`.
5. No code changes needed unless you're adding a brand-new image (see below).

---

## Adding a New Image

1. Add the file to `src/assets/`.
2. Import it in the component that needs it:
   ```tsx
   import myNewPhoto from "@/assets/my-new-photo.jpg";
   ```
3. Use it as an `src` prop or in a `style={{ backgroundImage: `url(${myNewPhoto})` }}`.

---

## Image Sizing Guidelines

| Usage | Recommended dimensions | Format |
|-------|----------------------|--------|
| Hero / full-bleed | 2560 × 1440 px | JPG / WebP |
| Section image (2-col) | 1600 × 1200 px | JPG / WebP |
| Gallery tile | 1200 × 1200 px | JPG / WebP (avoid PNG unless transparency needed) |
| Card / thumbnail | 800 × 600 px | JPG / WebP |
| Logo | Vector preferred | PNG with transparency |

---

## Recommended Replacements (Priority)

1. **Gallery PNGs** (`gallery-1.png` → `gallery-8.png`) — Convert to JPG/WebP to reduce bundle size significantly.
2. **`cocktail-amber.jpg`** — The most critical visual. Source a high-resolution, professionally shot cocktail image specific to Bar Maaya's menu.
3. **`woman-amber.jpg`** — Used as hero on 4 pages. A second portrait would eliminate visual repetition on Menus and Reservations.
4. **`food-dark.jpg`** — Replace with an on-brand Bar Maaya food photo once plating photography is done.
