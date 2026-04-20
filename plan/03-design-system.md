# Step 03 — Design System

## Overview

This project uses a comprehensive **Biomorphic Glassmorphism** design language that reflects Wim's personal aesthetic — warm earth tones from his home environment (caramel, sage, oker, navy), organic shapes, mid-century modern precision, and fluid animations.

> **📋 Full Design Specification:** See [`DESIGN.md`](../DESIGN.md) in the project root for the complete design language documentation.

---

## Quick Reference

### Design Philosophy
- **Organic Warmth:** Biomorphic shapes, warm earth palette, natural materials
- **Functional Sophistication:** Mid-century modern precision, accessible luxury (WCAG 2.2 AA), **mobile-first responsive design**
- **Performant Fluidity:** GPU-accelerated animations, 60fps, respects `prefers-reduced-motion`

**Core Aesthetic:** "What if a smart home dashboard had the warmth of a mid-century living room bathed in evening sunset light?"

**Mobile-First Approach:**
- Design for mobile viewports first (320px → 768px)
- Progressive enhancement using `min-width` media queries
- Touch-friendly tap targets (minimum 44×44px)
- Optimized for mobile performance and bandwidth

---

## Color Palette Summary

```scss
// Foundations (Light, Airy, Warm)
--color-bg-canvas:       #f8f4ef    // Warm off-white/bone (main background)
--color-bg-surface:      #fdfbf7    // Lightest surface (elevated cards)

// Primary Palette (From Wim's Home)
--color-sage:            #8a9a8d    // Primary accent (office wall, nature)
--color-caramel:         #c19a6b    // Secondary accent (furniture, warmth)
--color-oker:            #d4a54a    // Highlight accent (plants, energy)
--color-navy:            #2d3e50    // Text, icons (grounding sophistication)

// Evening Glow Accents (From Warm Lighting Setup)
--color-sunset:          #ff8c42    // Warm orange (sunset lamp, ceiling LED)
--color-amber:           #ffb366    // Peachy glow (FADO globe, pendants)
--color-ember:           #ff6b42    // Deep red-orange (RGB ambient ceiling)

// Glassmorphism (Warm Tinted)
--glass-warm:            rgba(193, 154, 107, 0.15)  // Caramel-tinted glass
--glass-sage:            rgba(138, 154, 141, 0.2)   // Sage-tinted glass
--glass-glow:            rgba(255, 140, 66, 0.12)   // Sunset-tinted glass (ambient)
--glass-blur:            12px                       // Backdrop blur
```

**Rationale:** Light background reflects Wim's bright, airy home. Warm earth tones create inviting tech. Evening glow accents (sunset, amber, ember) capture the cozy warmth of Wim's evening lighting setup — sunset lamp ceiling LED, FADO ribbed globe lamp, VARMBLIXT donut lamp, and RGB sofa lights set to warm orange tones. No cold blues or dark themes.

---

## Typography Summary

**Font Stack:**
- **Display:** DM Sans 700-800 / Outfit 700 (rounded, warm)
- **Headlines:** Inter 600-700 (clean, accessible)
- **Body:** Inter 400-500 (readable, WCAG compliant)
- **Code:** JetBrains Mono 400 (developer credibility)

```scss
// Fluid Scale (Mobile → Desktop)
--text-hero: clamp(3.5rem, 9vw, 7rem);      // Hero kinetic text
--text-3xl:  clamp(2.8rem, 7vw, 4.5rem);    // Major headings
--text-2xl:  clamp(2rem, 5vw, 2.75rem);     // Section headers
--text-base: clamp(1rem, 2.5vw, 1.05rem);   // Body text
```

---

## Spacing & Layout Summary

```scss
// 8px Base Scale
--space-2:   0.5rem;     // 8px   — button padding
--space-4:   1rem;       // 16px  — standard spacing
--space-6:   1.5rem;     // 24px  — card padding
--space-24:  6rem;       // 96px  — section vertical spacing
--space-32:  8rem;       // 128px — hero spacing

// Biomorphic Border Radius
--radius-md:   16px;     // Cards, buttons
--radius-lg:   24px;     // Large cards
--radius-blob: 64% 36% 47% 53% / 53% 39% 61% 47%;  // Organic blobs
--radius-pill: 9999px;   // Fully rounded pills

// Layout Constraints
--max-width:        1200px;  // Main content container
--max-width-text:   65ch;    // Readable line length
```

---

## Animation Tokens Summary

```scss
// Custom Easing (Organic, Not Mechanical)
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);      // Decelerate (default)
--ease-organic:   cubic-bezier(0.33, 0, 0.2, 1);      // Organic flow
--ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  // Playful bounce

// Durations
--duration-instant: 100ms;   // Micro-feedback
--duration-fast:    200ms;   // Hover states
--duration-base:    400ms;   // Standard transitions
--duration-slow:    600ms;   // Scroll reveals
--duration-morph:   1200ms;  // Blob morphing
```

### Tactile Haptic Feedback (Mobile-First)

**Library:** [`web-haptics`](https://haptics.lochie.me/) — Haptic vibration feedback for mobile web

**Installation:** `npm i web-haptics`

**Usage Pattern:**
```typescript
import { useWebHaptics } from 'web-haptics/react';

// Presets: light, medium, heavy, success, warning, error, selection, nudge
trigger('medium');  // Standard button tap
trigger('success'); // Form submission
```

**Haptic Mapping:**
- **Button hover:** `light` (subtle feedback)
- **Button press:** `medium` (standard interaction)
- **CTA click:** `heavy` (primary actions)
- **Form submit:** `success` (confirmation)
- **Validation error:** `warning` (alert)
- **Card selection:** `selection` (project/skill tap)
- **Menu open:** `rigid` (drawer/modal)

**Accessibility:** Respects `prefers-reduced-motion`, gracefully degrades on desktop

---

## Key Design Patterns

### Glassmorphic Cards
Warm-tinted glass with caramel/sage overlays, soft shadows, organic rounded corners.

```scss
.glass-card {
  background: var(--glass-warm);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.3);
  border: 1px solid var(--border-warm);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}
```

### Biomorphic Blob Backgrounds
Organic shapes that morph infinitely, placed behind sections for depth.

```scss
.blob-bg {
  border-radius: var(--radius-blob);
  filter: blur(60px);
  animation: blob-morph 20s ease-in-out infinite;
}
```

### Button Hierarchy
1. **Primary:** Sage green solid (`.btn-primary`)
2. **Secondary:** Caramel outlined (`.btn-secondary`)
3. **Tertiary:** Ghost/underlined (`.btn-tertiary`)

### Tag/Badge System
Organic pill-shaped badges with warm-tinted backgrounds (`.tag-sage`, `.tag-caramel`, `.tag-oker`)

---

## Implementation Structure

### SCSS Files to Create

```
src/styles/
├── _tokens.scss         ← CSS variables (colors, spacing, typography, easing, radii)
├── _reset.scss          ← CSS reset, base element styles
├── _typography.scss     ← Font-face declarations
├── _glassmorphism.scss  ← Glass card utilities
├── _biomorphic.scss     ← Blob backgrounds, animations
├── _animations.scss     ← Keyframes (fade-up, blob-morph)
├── _utilities.scss      ← Helper classes (.sr-only-focusable, etc.)
├── _buttons.scss        ← Button variants
├── _tags.scss           ← Tag/badge variants
└── styles.scss          ← Main import file
```

### Angular Components

```
src/app/components/
├── hero/                ← Pretext kinetic + blobs
├── about/               ← Asymmetric text layout
├── experience/          ← Timeline with glass cards
├── projects/            ← Grid of project cards
├── skills/              ← Skill categories
├── hobbies/             ← Gallery grid
├── contact/             ← Contact form/CTA
└── shared/
    ├── glass-card/      ← Reusable card wrapper
    ├── badge/           ← Tag component
    ├── button/          ← Button component
    ├── section-header/  ← Eyebrow + H2 pattern
    ├── blob-background/ ← Animated blob
    └── skeleton-wrapper/← Boneyard container
```

---

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance
✅ **Color Contrast:**
- Primary text (#2d2a26) on canvas (#f8f4ef): **11.2:1**
- Secondary text (#5f5a52) on canvas: **6.8:1**
- Sage dark (#5f6d5f) on canvas: **5.2:1**

✅ **Keyboard Navigation:**
- All interactive elements keyboard accessible
- Visible focus states (sage outline)
- Skip link to main content
- No keyboard traps

✅ **Motion Accessibility:**
- Honor `prefers-reduced-motion: reduce`
- Disable all animations for users who request it

✅ **Semantic HTML:**
- Proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Heading hierarchy (no skipped levels)
- ARIA labels where needed

---

## Performance Guidelines

### 60fps Animation Target
✅ **Animate only:** `transform`, `opacity`, `filter`  
❌ **Never animate:** `top`, `left`, `width`, `height`, `margin`  
✅ **Blob blur limit:** Max 60px blur, only on `position: fixed` elements  
❌ **Never apply `backdrop-filter`:** To scrolling containers (mobile performance killer)

### Image Optimization
- Use WebP format
- Lazy loading with `loading="lazy"`
- Descriptive alt text for accessibility

### Font Loading
- Preload critical fonts (DM Sans, Inter)
- Use `font-display: swap` to prevent FOIT

---

## Next Steps

1. ✅ Review full design specification in [`DESIGN.md`](../DESIGN.md)
2. 📝 Create SCSS token files in `src/styles/`
3. 🏗️ Build shared component library
4. ✨ Implement hero section with Pretext + blobs
5. 🎨 Build content sections (About, Experience, Projects, Skills, Hobbies, Contact)
6. 🎬 Wire up GSAP ScrollTrigger animations
7. 🦴 Add Boneyard skeleton screens
8. ♿ Accessibility audit (WCAG 2.2 AA)
9. 🚀 Performance audit (Lighthouse 90+)
10. 🌍 Deploy to wimstienstra.nl

---

## Design System Enforcement

### ✅ Do's
- Use design tokens exclusively (CSS variables)
- Apply glassmorphism classes
- Use biomorphic shapes (organic border-radius)
- Maintain warm palette (sage, caramel, oker, navy)
- Test accessibility (WCAG contrast, keyboard nav)
- Optimize for 60fps (GPU-only animations)

### ❌ Don'ts
- Hardcode colors, spacing, or border-radius
- Use cold blue accents (no electric cyan!)
- Use harsh geometric shapes (no sharp corners)
- Animate layout-triggering properties
- Skip semantic HTML
- Ignore focus states

---

**For complete design language documentation, component patterns, animation specifications, and accessibility guidelines, see [`DESIGN.md`](../DESIGN.md).**

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
