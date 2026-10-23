---
name: Gastro Pop Bakery
colors:
  surface: '#fff8f6'
  surface-dim: '#f0d4cd'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e4'
  surface-container-high: '#ffe2db'
  surface-container-highest: '#f9dcd5'
  on-surface: '#271814'
  on-surface-variant: '#5c3f42'
  inverse-surface: '#3e2c28'
  inverse-on-surface: '#ffede9'
  outline: '#906f72'
  outline-variant: '#e5bdc0'
  surface-tint: '#bd0042'
  primary: '#b90040'
  on-primary: '#ffffff'
  primary-container: '#e31754'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2ba'
  secondary: '#3b6934'
  on-secondary: '#ffffff'
  secondary-container: '#b9eeab'
  on-secondary-container: '#3f6d38'
  tertiary: '#635a56'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d726f'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2ba'
  on-primary-fixed: '#400011'
  on-primary-fixed-variant: '#910030'
  secondary-fixed: '#bcf0ae'
  secondary-fixed-dim: '#a1d494'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#23501e'
  tertiary-fixed: '#ede0db'
  tertiary-fixed-dim: '#d1c4bf'
  on-tertiary-fixed: '#211a17'
  on-tertiary-fixed-variant: '#4d4542'
  background: '#fff8f6'
  on-background: '#271814'
  surface-variant: '#f9dcd5'
typography:
  display-lg:
    fontFamily: Comfortaa
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Comfortaa
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Comfortaa
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Comfortaa
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Comfortaa
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Comfortaa
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a vibrant Gastro Pop aesthetic engineered for an artisanal bakery and cafe in Đà Nẵng. The brand fuses French pastry heritage with lively coastal energy, pairing luscious pastry-cream neutrals with punchy strawberry pinks and vivid Uji matcha greens.

### Personality & Tone
- **Playful yet Chic:** High-end artisanal discipline framed by upbeat, unpretentious pop energy.
- **Sun-drenched & Tactile:** Reminiscent of warm morning light, rich browned butter, freshly whisked tea foam, and glossy glazes.
- **Bilingual & Cosmopolitan:** Gracefully handles dual Vietnamese and English content with balanced line heights and open letterforms.

### Aesthetic Principles
- **Gastro Pop Accents:** Interactive badge stickers, pill-shaped tags, and vibrant contrasting highlights over creamy, serene canvas backdrops.
- **Sensory Depth:** Warm, pillowy surfaces that rely on soft tinted ambient shadows rather than rigid dividing lines.
- **Balanced Delight:** Vibrant accents (strawberry pop and matcha) are applied strictly for functional accents, calls-to-action, and status chips, ensuring the pastry photography remains the centerpiece.

## Colors

The palette references classic cafe materials: whipped cream, wild berries, ceremonial grade green tea, and dark roasted robusta beans.

### Palette Roles
- **Primary (`#FF3366` - Strawberry Pop):** The focal pop tone. Reserved for key transactional touchpoints, primary buttons, promotional stickers, active indicators, and high-impact editorial tags.
- **Secondary (`#2D5A27` - Uji Matcha):** Anchors the brand’s artisanal credibility. Applied to specialty matcha product tags, seasonal sustainability notices, secondary badges, and delicate micro-copy accents.
- **Tertiary (`#FCEEE9` - Pastry Cream Tint):** The ambient fill tone. Used for warm card fills, tinted module backgrounds, badge chips, and soft highlight sections.
- **Neutral (`#271814` - Dark Espresso):** High-contrast, warm dark brown replacing harsh default blacks. Provides superior legibility and an organic, cocoa-tinted baseline for body copy and headlines.
- **Canvas & Surface Tint:** Base layouts rest on a warm, milk-foam white (`#FFFDFB`), with layered elements stepping up through `#FFFFFF` and `#FFF8F6`.

## Typography

The typographic hierarchy pairs the soft, circular geometry of **Comfortaa** for display headers with the balanced clarity of **Plus Jakarta Sans** for body and metadata.

### Typographic Rules
- **Vietnamese Tone Mark Consideration:** Generous line-heights across body text prevent overlapping diacritical marks in dual Vietnamese-English copy blocks.
- **Display Treatment:** `Comfortaa` is reserved strictly for expressive titles, product names, and pricing callouts. Never use it for long-form editorial copy.
- **Sticker & Badge Microcopy:** `label-sm` and `label-md` are rendered in uppercase with positive letter spacing (`+0.04em` to `+0.06em`) to preserve legibility on high-saturation badges.

## Layout & Spacing

Layouts follow a warm, breezy cadence with generous negative space, mimicking an airy coastal storefront.

### Grid & Breakpoints
- **Desktop (1024px+):** 12-column fluid grid, `margin: 3rem`, `gutter: 1.5rem`. Max container bound of `1280px` for catalog displays.
- **Tablet (768px - 1023px):** 8-column grid, `margin-tablet: 2rem`, `gutter: 1.25rem`.
- **Mobile (320px - 767px):** 4-column fluid grid, `margin-mobile: 1.25rem`, `gutter-mobile: 1rem`.

### Spatial Flow
- **Component Padding:** Cards and content buckets use `space-lg` (24px) internally on desktop, scaling down to `space-md` (16px) on mobile viewports.
- **Rhythm:** Macro vertical spacing between home sections uses multi-step multiples of `space-xl` (40px to 80px) to give product imagery ample room to breathe.

## Elevation & Depth

Visual depth is achieved through pillowy, ambient light rather than stark dropshadows, evoking the soft, billowy surface of meringue and brioche.

### Elevation Tiers
- **Tier 0 (Base Canvas):** Flat warm ground (`#FFFDFB`).
- **Tier 1 (Surface Cards & Trays):** Pure cream layer (`#FFFFFF`) with a subtle espresso-tinted ambient glow: `0px 4px 20px -2px rgba(39, 24, 20, 0.05)`.
- **Tier 2 (Popovers, Dropdowns & Modals):** Lifted surfaces receiving direct light: `0px 12px 32px -4px rgba(39, 24, 20, 0.08), 0px 4px 12px 0px rgba(255, 51, 102, 0.04)`.
- **Tier 3 (Floating Action & Gastro Pop Badges):** High-energy floating elements feature a distinct pink-cast diffusion: `0px 8px 24px 0px rgba(255, 51, 102, 0.22)`.

### Border Structure
Avoid cold grays. All boundaries utilize a warm translucent pastry wash: `1px solid rgba(39, 24, 20, 0.06)`.

## Shapes

The interface embraces a bulbous, inviting silhouette language (`roundedness: 3`). Soft arcs and pill formations mirror physical sticker tags, dough balls, and cafe ceramics.

### Geometric Conventions
- **Buttons, Badges & Pills:** Full pill treatment (`9999px` / `rounded-full`).
- **Standard Cards:** Standard containers receive a generous `rounded-xl` (2rem / 32px), eliminating sharp digital corners.
- **Input Fields & Micro Trays:** Medium rounding using `rounded-lg` (1.5rem / 24px) maintains internal geometric harmony with primary buttons.
- **Images:** Pastry photography employs smooth corner masks (`rounded-xl`) or organic stadium shapes.

## Components

### Buttons
- **Primary:** Full pill shape, solid `#FF3366` fill, `#FFFFFF` text (`label-lg`), and an ambient shadow (`0 8px 20px rgba(255, 51, 102, 0.24)`). On hover, scales slightly (`1.02`) with an intensified strawberry glow.
- **Secondary / Matcha:** Solid `#2D5A27` with `#FFFFFF` text, applied to fresh-order or tea-specific actions.
- **Tertiary / Cream Outline:** `#FFF8F6` background with a subtle border (`rgba(39, 24, 20, 0.08)`), text in `#271814`.

### Gastro Pop Sticker Chips & Badges
- Pill-shaped or tilted-stamp format (-2deg to +2deg rotation) applied to highlights like "Fresh Whisked", "Pure French Butter", or "Đà Nẵng Special".
- Colorways:
  - **Strawberry:** `#FF3366` background, `#FFFFFF` text.
  - **Matcha Cream:** `#D8F3DC` background, `#2D5A27` text.
  - **Pastry Peach:** `#FCEEE9` background, `#FF3366` text.

### Cards
- **Pastry & Souvenir Cards:** `#FFFFFF` background, `rounded-xl` (32px), subtle warm ambient shadow (`Tier 1`), and `space-md` internal padding. Imagery occupies the top segment with edge-to-edge rounding matching the card's inner radius. Price tags sit in high-contrast espresso (`#271814`) or pop pink (`#FF3366`).

### Input Fields
- Form inputs feature pill-shaped borders with a `#FFFDFB` background, a 1.5px border of `rgba(39, 24, 20, 0.12)`, and text in `#271814`. Focused states transition the border to `#FF3366` accompanied by a soft `0 0 0 4px rgba(255, 51, 102, 0.12)` halo.

### Checkboxes & Radios
- Rounded squircle check boxes (8px radius) and circular radio buttons. Inactive states use a warm cream border. Selected states snap to `#FF3366` with a crisp white tick mark or center pip.

### Lists & Cart Rows
- Separated by soft peach hairline rules (`#FCEEE9`) instead of gray borders. Quantity pickers use rounded pill capsules containing espresso glyphs on pastry-cream buttons.