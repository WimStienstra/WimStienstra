# Step 03 — Design System

## Objective
Establish the visual identity of the site: color palette, typography, spacing scale, animation utilities, and global SCSS. Every component will consume these tokens — no hardcoded colors or sizes anywhere.

---

## Color Palette

```scss
// src/styles/_tokens.scss
:root {
  // Backgrounds
  --color-bg:          #080d1a;   // deep navy — page background
  --color-surface:     #0f1729;   // slightly lighter — card backgrounds
  --color-surface-2:   #162036;   // hover states, raised surfaces

  // Accent
  --color-accent:      #4af0c8;   // electric cyan-green — primary CTA, highlights
  --color-accent-dim:  #1a9e85;   // muted accent for secondary elements
  --color-accent-glow: rgba(74, 240, 200, 0.15); // glow overlay

  // Text
  --color-text:        #e8eaf0;   // primary text
  --color-text-muted:  #7a8099;   // secondary / labels
  --color-text-faint:  #3d4462;   // very subtle, decorative

  // Borders / Glass
  --color-border:      rgba(74, 240, 200, 0.12);
  --color-glass:       rgba(15, 23, 41, 0.6);

  // Status / Tags
  --color-tag-bg:      rgba(74, 240, 200, 0.08);
  --color-tag-text:    #4af0c8;
}
```

---

## Typography

**Fonts to load** (add `<link>` tags in `index.html` for Google Fonts, or self-host):
- **Inter** — body text, headings
- **JetBrains Mono** — code labels, section numbers, tech tags

```scss
// src/styles/_typography.scss
:root {
  --font-body:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  // Fluid scale with clamp
  --text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);
  --text-sm:   clamp(0.85rem, 2vw,   0.9rem);
  --text-base: clamp(1rem,    2.5vw, 1.05rem);
  --text-lg:   clamp(1.15rem, 3vw,   1.25rem);
  --text-xl:   clamp(1.4rem,  4vw,   1.75rem);
  --text-2xl:  clamp(2rem,    5vw,   2.75rem);
  --text-3xl:  clamp(2.8rem,  7vw,   4.5rem);
  --text-hero: clamp(3.5rem,  9vw,   7rem);
}
```

---

## Spacing & Layout

```scss
// Add to _tokens.scss
:root {
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-24:  6rem;
  --space-32:  8rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --max-width: 1100px;
  --section-padding: var(--space-24) var(--space-8);
}
```

---

## Animation Tokens

```scss
:root {
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);

  --duration-fast:  150ms;
  --duration-base:  300ms;
  --duration-slow:  600ms;
  --duration-enter: 900ms;
}
```

---

## Global Reset & Base Styles

Create `src/styles/_reset.scss`:
- CSS reset (box-sizing, margin 0, scroll-behavior smooth)
- `body`: `background-color: var(--color-bg)`, `color: var(--color-text)`, `font-family: var(--font-body)`
- `::selection` with accent color background
- Custom scrollbar (thin, accent-colored track on dark bg)
- Focus ring: `2px solid var(--color-accent)` with `outline-offset: 4px`

---

## Glassmorphism Card Utility

Create `src/styles/_utilities.scss` with a `.glass-card` class that Angular components can use via `ViewEncapsulation.None` or by referencing the global class in templates:

```scss
.glass-card {
  background: var(--color-glass);
  backdrop-filter: blur(12px) saturate(1.5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(74, 240, 200, 0.04) inset;
  transition:
    border-color var(--duration-base) var(--ease-out-expo),
    box-shadow   var(--duration-base) var(--ease-out-expo);

  &:hover {
    border-color: rgba(74, 240, 200, 0.28);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.5),
      0 0 32px rgba(74, 240, 200, 0.06) inset;
  }
}
```

> In Angular components, apply global utility classes by adding `class="glass-card"` in the template. Component styles use `ViewEncapsulation.Emulated` (the default) so global utility classes defined in `styles.scss` still apply.

---

## Background — Animated Grid

Pure CSS fixed background grid in `_reset.scss`:

```scss
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(74, 240, 200, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 240, 200, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
```

---

## Section Number Label Convention

Each section has a small monospace label, e.g. `01 / EXPERIENCE`, positioned top-left in muted text. Define a shared SCSS mixin:

```scss
// in _utilities.scss
@mixin section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: var(--space-4);
}
```

Use it in each component's SCSS: `.label { @include section-label; }`

---

## Boneyard Skeleton Color Customisation

Boneyard's shimmer color is configured globally in `boneyard.config.json` (done in Step 01). To override per-component, pass `[color]` and `[darkColor]` inputs to `<boneyard-skeleton>`.

The default `rgba(74, 240, 200, 0.08)` cyan tint matches the site's accent palette and looks intentional rather than generic.

---

## File Structure

```
src/styles/
  _tokens.scss
  _typography.scss
  _reset.scss
  _utilities.scss
  _animations.scss   ← keyframes for entrance animations
src/styles.scss      ← Angular's global stylesheet; imports all partials
```

`src/styles.scss` content:

```scss
@use 'styles/tokens';
@use 'styles/typography';
@use 'styles/reset';
@use 'styles/utilities';
@use 'styles/animations';
```

---

## Acceptance Criteria
- [ ] All SCSS partial files created and imported in `src/styles.scss`
- [ ] Page background is `#080d1a` (dark navy)
- [ ] Accent color `#4af0c8` applied to at least one visible element
- [ ] Custom scrollbar styled
- [ ] `.glass-card` utility class works (test by adding it to a stub component template)
- [ ] Animated grid background is visible and subtle
- [ ] `ng build` passes without errors
