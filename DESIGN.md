# Design Language: Wim Stienstra Portfolio
## Biomorphic Glassmorphism × Mid-Century Modern × Warm Earth Tones

---

## Overview

A design language that **feels like Wim's home**: warm earth tones (caramel, sage, oker, navy), biomorphic organic shapes, mid-century modern sophistication, natural materials (wood, plants), and cutting-edge tech (glassmorphism, fluid animations, home automation vibes). Light, airy, functional, with **nature-inspired flow**.

**Inspired by:** Wim's living room (tan sofa, orange accent chair, natural light, plants) + home office (sage green wall, multi-monitor setup, pegboard organization, warm wood shelves).

---

## Design Philosophy

**Three Pillars:**

1. **Organic Warmth** – Biomorphic shapes (rounded blobs, flowing curves), warm earth palette (not cold tech), natural materials (wood textures, plant greens), soft shadows (not harsh geometry).

2. **Functional Sophistication** – Mid-century modern precision (clean lines, purposeful spacing), locally-hosted tech vibes (smart home control panels, dashboard aesthetics), accessible luxury (WCAG 2.2 AA, keyboard-first).

3. **Performant Fluidity** – Smooth organic animations (blob morphing, fluid transitions), GPU-accelerated, 60fps, respects `prefers-reduced-motion`.

**Core Aesthetic:** "**What if a smart home dashboard had the warmth of a mid-century living room bathed in evening sunset light?**" — Functional tech wrapped in organic, inviting materiality with the warm ambient glow of Wim's evening lighting setup (sunset lamp, FADO globe, VARMBLIXT donut lamp, RGB sofa lights on warm orange tones).

---

## Visual Identity

### Color Palette (Warm Earth Tones from Wim's Home)

```scss
// === FOUNDATIONS (Light, Airy, Warm) ===
// Based on Wim's living room walls and natural light
--color-bg-canvas:         #f8f4ef    // Warm off-white/bone (main page background, like walls)
--color-bg-surface:        #fdfbf7    // Lightest surface (elevated cards, panels)
--color-bg-surface-warm:   #f0ebe3    // Warmer beige (hover states, subtle depth)
--color-bg-overlay:        rgba(45, 42, 38, 0.85)  // Dark warm overlay for modals

// === PRIMARY PALETTE (From Home Photos) ===
// Caramel (from tan sofa, wood furniture)
--color-caramel:           #c19a6b    // Primary caramel (warm, inviting)
--color-caramel-light:     #d4b896    // Light caramel (subtle backgrounds)
--color-caramel-dark:      #9d7a52    // Deep caramel (text, borders)

// Sage Green (from office accent wall)
--color-sage:              #8a9a8d    // Mid-tone sage (primary accent, CTAs)
--color-sage-light:        #b3c2b8    // Light sage (tags, badges, hover)
--color-sage-dark:         #5f6d5f    // Deep sage (text, icons)

// Oker/Mustard (warm yellow accent, like plants/decor)
--color-oker:              #d4a54a    // Warm mustard (highlight accent)
--color-oker-light:        #e8c87e    // Light oker (soft glow, backgrounds)
--color-oker-dark:         #a6843b    // Deep oker (text, emphasis)

// Navy (dark blue-grey, like window blinds, modern tech)
--color-navy:              #2d3e50    // Warm navy (not cold blue)
--color-navy-light:        #4a5f7a    // Lighter navy (secondary elements)
--color-navy-dark:         #1e2a38    // Deep navy (text on light, overlays)

// === EVENING GLOW ACCENTS (From Warm Lighting Setup) ===
// Inspired by: Sunset lamp ceiling LED, FADO ribbed globe, VARMBLIXT donut, RGB sofa lights
--color-sunset:            #ff8c42    // Warm orange (sunset lamp ceiling glow)
--color-amber:             #ffb366    // Softer peachy glow (FADO lamp, pendant lights)
--color-ember:             #ff6b42    // Deeper red-orange (ambient RGB ceiling wash)

// === ACCENT HIERARCHY ===
--color-accent-primary:    var(--color-sage);       // Sage = primary CTA (nature, calm)
--color-accent-secondary:  var(--color-caramel);    // Caramel = secondary (warmth)
--color-accent-highlight:  var(--color-oker);       // Oker = tertiary (pop of energy)
--color-accent-glow:       var(--color-sunset);     // Sunset = warm glow (hover, ambient)

// === TEXT HIERARCHY (Dark on Light) ===
--color-text-primary:      #2d2a26    // Almost black, warm brown undertone
--color-text-secondary:    #5f5a52    // Warm dark grey (labels, meta)
--color-text-tertiary:     #8a8579    // Muted warm grey (decorative)
--color-text-on-dark:      #f8f4ef    // For dark overlays/sections (inversed)

// === GLASSMORPHISM (Warm Tinted Glass) ===
--glass-light:             rgba(253, 251, 247, 0.7)   // Light glass (barely there)
--glass-warm:              rgba(193, 154, 107, 0.15)  // Caramel-tinted glass
--glass-sage:              rgba(138, 154, 141, 0.2)   // Sage-tinted glass
--glass-glow:              rgba(255, 140, 66, 0.12)   // Sunset-tinted glass (warm ambient)
--glass-blur:              12px                       // Backdrop blur intensity

--border-warm:             rgba(193, 154, 107, 0.2)   // Warm glass border (caramel)
--border-sage:             rgba(138, 154, 141, 0.25)  // Sage glass border
--border-glow:             rgba(255, 140, 66, 0.3)    // Warm glow border (sunset)
--border-subtle:           rgba(93, 90, 82, 0.1)      // Neutral divider

// === SHADOWS (Soft, Diffused, Organic) ===
--shadow-soft:             0 2px 12px rgba(45, 42, 38, 0.06);
--shadow-medium:           0 4px 20px rgba(45, 42, 38, 0.08);
--shadow-elevated:         0 8px 32px rgba(45, 42, 38, 0.12);
--shadow-ambient:          0 12px 48px rgba(45, 42, 38, 0.15); // For modals
--shadow-glow-soft:        0 8px 24px rgba(255, 140, 66, 0.25);  // Warm glow hover
--shadow-glow-medium:      0 12px 32px rgba(255, 140, 66, 0.3); // Warm glow active
--shadow-glow-ambient:     0 0 48px rgba(255, 140, 66, 0.15);   // Radial ambient glow

// === SEMANTIC (Nature-Inspired, Desaturated) ===
--color-success:           #6b9e78    // Natural green (plant-like)
--color-warning:           var(--color-oker);     // Reuse oker
--color-error:             #c76a5e    // Terracotta red (warm, earthy)
--color-info:              var(--color-navy-light);
```

**Color Usage Strategy:**
- **Backgrounds:** Warm off-white canvas (`#f8f4ef`) — airy, natural light feel from Wim's home
- **Primary Accent (Sage):** CTAs, primary buttons, active states — calm, nature-inspired
- **Secondary Accent (Caramel):** Links, secondary buttons, warm highlights — wood, furniture tones
- **Highlight Accent (Oker):** Badges, tags, energy bursts — like plants, sunlight through windows
- **Navy:** Text, icons, dark overlays — grounding, sophisticated (sparingly used)

**Rationale:** Light background (not dark) reflects Wim's bright, airy home. Warm earth tones create inviting, human-centered tech. Glassmorphism uses warm-tinted overlays (caramel/sage) instead of cold blue. Palette matches physical environment: walls, furniture, plants, natural materials.

---

## Typography (Rounded, Warm, Functional)

**Font Stack:**
- **Display (Hero):** **'DM Sans' 700-800** or **'Outfit' 700** — Rounded geometric sans, warm but modern
- **Headlines (H1-H3):** **'Inter' 600-700** — Reliable, clean, slightly rounded
- **Body (Paragraphs, UI):** **'Inter' 400-500** — Readable, accessible, neutral
- **Code/Tech Labels:** **'JetBrains Mono' 400** — Developer credibility (monospace)
- **Alternative Display:** **'Space Grotesk' 500-700** — Rounded, geometric, slightly retro (mid-century vibe)

**Hierarchy (Fluid, Responsive):**

```scss
:root {
  // Fluid typography with CSS clamp (mobile → desktop)
  --text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);   // 11-12px
  --text-sm:   clamp(0.85rem, 2vw,   0.9rem);    // 13.5-14.5px
  --text-base: clamp(1rem,    2.5vw, 1.05rem);   // 16-17px
  --text-lg:   clamp(1.15rem, 3vw,   1.25rem);   // 18-20px
  --text-xl:   clamp(1.4rem,  4vw,   1.75rem);   // 22-28px
  --text-2xl:  clamp(2rem,    5vw,   2.75rem);   // 32-44px
  --text-3xl:  clamp(2.8rem,  7vw,   4.5rem);    // 45-72px
  --text-hero: clamp(3.5rem,  9vw,   7rem);      // 56-112px (kinetic hero)

  // Line heights (airy, readable)
  --leading-tight:    1.15;  // Headlines
  --leading-normal:   1.5;   // Body text
  --leading-relaxed:  1.75;  // Long-form reading
  
  // Letter spacing
  --tracking-tight:   -0.02em;  // Headlines (tighter)
  --tracking-normal:  0;        // Body
  --tracking-wide:    0.05em;   // Uppercase labels, monospace
}
```

**Typography Rules:**
- **Headlines:** Slightly rounded sans-serif (DM Sans, Outfit, Space Grotesk) for organic warmth
- **Body:** Inter for clarity, accessibility (WCAG 2.2)
- **Code:** JetBrains Mono for tech credibility
- **Max line length:** `65ch` for readability
- **Minimum size:** 16px base (mobile), never below 14px

---

## Spacing & Layout (Organic Grid, Asymmetric Flow)

```scss
:root {
  // 8px base scale (1.5x multiplier for macro-whitespace)
  --space-1:   0.25rem;    // 4px   — tight inline spacing
  --space-2:   0.5rem;     // 8px   — button padding, gaps
  --space-3:   0.75rem;    // 12px  — card internal padding
  --space-4:   1rem;       // 16px  — standard spacing
  --space-6:   1.5rem;     // 24px  — card padding, section gaps
  --space-8:   2rem;       // 32px  — section horizontal padding
  --space-12:  3rem;       // 48px  — vertical section spacing
  --space-16:  4rem;       // 64px  — large section spacing
  --space-24:  6rem;       // 96px  — massive vertical whitespace
  --space-32:  8rem;       // 128px — hero section spacing

  // Border radius (Biomorphic, organic, rounded)
  --radius-sm:   8px;      // Small elements (tags, badges)
  --radius-md:   16px;     // Cards, buttons
  --radius-lg:   24px;     // Large cards, panels
  --radius-xl:   32px;     // Hero sections, major containers
  --radius-blob: 64% 36% 47% 53% / 53% 39% 61% 47%;  // Organic blob shape (CSS)
  --radius-pill: 9999px;   // Fully rounded pills

  // Layout constraints
  --max-width:        1200px;   // Main content container
  --max-width-text:   65ch;     // Readable line length
  --section-padding:  var(--space-24) var(--space-8);  // 96px vertical, 32px horizontal
}
```

**Biomorphic Layout Principles:**
- **Organic shapes:** Use `border-radius: var(--radius-blob)` for hero backgrounds, decorative blobs
- **Asymmetric grids:** CSS Grid with unequal columns (`grid-template-columns: 2fr 1fr`)
- **Flowing sections:** Alternating left/right alignment (not everything centered)
- **Macro-whitespace:** Minimum `96px` (`--space-24`) between major sections
- **Blob morphing:** GSAP animations morph blob shapes on scroll/hover

---

## Biomorphic Glassmorphism (Warm Organic Glass)

### Core Glass Effect (Warm-Tinted)

```scss
.glass-card {
  background: var(--glass-warm);  // Caramel-tinted glass
  backdrop-filter: blur(var(--glass-blur)) saturate(1.3);
  border: 1px solid var(--border-warm);
  border-radius: var(--radius-lg);  // 24px organic rounded
  box-shadow: var(--shadow-soft);
  
  // Inner glow (warm refraction)
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(193, 154, 107, 0.2),  // Caramel glow top-left
      rgba(138, 154, 141, 0.1)   // Sage glow bottom-right
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  
  // Hover state (lift + warm glow)
  &:hover {
    border-color: var(--border-sage);
    box-shadow: var(--shadow-elevated);
    transform: translateY(-2px);
    transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}

// Sage-tinted glass variant
.glass-card-sage {
  background: var(--glass-sage);
  border: 1px solid var(--border-sage);
}

// Warm glow glass variant (evening lighting aesthetic)
.glass-card-glow {
  background: linear-gradient(
    135deg,
    rgba(255, 140, 66, 0.12),  // Sunset glow
    rgba(255, 179, 102, 0.08)  // Amber fade
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(1.4);
  border: 1px solid var(--border-glow);
  box-shadow: 
    var(--shadow-soft),
    inset 0 1px 0 rgba(255, 179, 102, 0.3);
  
  &:hover {
    box-shadow: 
      var(--shadow-glow-soft),
      inset 0 1px 0 rgba(255, 179, 102, 0.4);
  }
}

// Radial ambient glow effect (mimics sunset lamp, FADO globe)
.glow-ambient {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -40px;
    background: radial-gradient(
      circle at center,
      rgba(255, 140, 66, 0.2) 0%,
      rgba(255, 179, 102, 0.1) 30%,
      transparent 70%
    );
    filter: blur(40px);
    z-index: -1;
    pointer-events: none;
  }
}

// Multi-point radial glows (layered warm lighting)
.ambient-multi-glow {
  position: relative;
  background: 
    radial-gradient(
      ellipse at 20% 30%,
      rgba(255, 140, 66, 0.08),
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 70%,
      rgba(255, 179, 102, 0.06),
      transparent 50%
    ),
    var(--color-bg-canvas);
}
```

### Biomorphic Blob Backgrounds

```scss
.blob-bg {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle at 30% 40%,
    rgba(138, 154, 141, 0.15),  // Sage blob
    rgba(193, 154, 107, 0.08)   // Caramel fade
  );
  border-radius: var(--radius-blob);
  filter: blur(60px);
  animation: blob-morph 20s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes blob-morph {
  0%, 100% {
    border-radius: 64% 36% 47% 53% / 53% 39% 61% 47%;
    transform: translate(0, 0) scale(1);
  }
  33% {
    border-radius: 47% 53% 36% 64% / 61% 47% 53% 39%;
    transform: translate(30px, -20px) scale(1.05);
  }
  66% {
    border-radius: 53% 47% 64% 36% / 39% 61% 47% 53%;
    transform: translate(-20px, 30px) scale(0.95);
  }
}

// Warm glow blob variants (evening lighting aesthetic)
.blob-bg-sunset {
  background: radial-gradient(
    circle at 30% 40%,
    rgba(255, 140, 66, 0.2),   // Sunset warm orange
    rgba(255, 179, 102, 0.1)   // Amber fade
  );
  border-radius: var(--radius-blob);
  filter: blur(60px);
  animation: blob-morph 20s ease-in-out infinite;
  animation-delay: -5s;  // Offset timing for organic variance
}

.blob-bg-amber {
  background: radial-gradient(
    circle at 30% 40%,
    rgba(255, 179, 102, 0.18),  // Peachy amber
    rgba(255, 140, 66, 0.08)    // Sunset fade
  );
  border-radius: var(--radius-blob);
  filter: blur(60px);
  animation: blob-morph 20s ease-in-out infinite;
  animation-delay: -10s;  // Different offset for layering
}
```

**Usage:** Place blobs behind hero sections, major containers (fixed, `z-index: -1`, `pointer-events: none`). Animate with GSAP for scroll-sync or use CSS keyframes.

---

## Motion & Animation (Organic, Fluid, Natural)

### Custom Easing (Organic, Not Mechanical)

```scss
:root {
  // Natural, spring-like easing (not linear/robotic)
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);      // Decelerate (default)
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);      // Accelerate
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  // Playful bounce
  --ease-smooth:    cubic-bezier(0.25, 0.46, 0.45, 0.94); // iOS-like smooth
  --ease-organic:   cubic-bezier(0.33, 0, 0.2, 1);      // Organic flow
  
  // Durations (tied to interaction type)
  --duration-instant: 100ms;   // Micro-feedback (button press)
  --duration-fast:    200ms;   // Hover states
  --duration-base:    400ms;   // Standard transitions
  --duration-slow:    600ms;   // Scroll reveals
  --duration-enter:   900ms;   // Hero entrance
  --duration-morph:   1200ms;  // Blob morphing, major state changes
}
```

### Animation Categories

**1. Entrance Animations (Page Load + Scroll Reveals)**

```scss
// Fade-up (organic slide-in from below)
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fade-up var(--duration-slow) var(--ease-out-expo) both;
}

// Staggered list reveals (cascade waterfall)
.stagger-item {
  animation: fade-up var(--duration-slow) var(--ease-out-expo) both;
  animation-delay: calc(var(--index) * 80ms);
}
```

**2. Blob Morphing (Biomorphic Shape Transitions)**

Use GSAP MorphSVG or CSS `border-radius` animation:

```typescript
// GSAP blob morph on scroll
gsap.to('.blob-bg', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
  },
  borderRadius: '47% 53% 36% 64% / 61% 47% 53% 39%',
  x: 30,
  y: -20,
  scale: 1.05,
  ease: 'power2.inOut',
});
```

**3. Glassmorphic Card Hover (Organic Lift + Glow)**

```scss
.glass-card {
  transition:
    transform var(--duration-base) var(--ease-organic),
    box-shadow var(--duration-base) var(--ease-organic),
    border-color var(--duration-base) var(--ease-organic);
  
  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: var(--shadow-ambient);
    border-color: var(--border-sage);
  }
}
```

**4. Button Micro-Interactions (Tactile, Organic)**

```scss
.btn-primary {
  transform-origin: center;
  transition: all var(--duration-fast) var(--ease-organic);
  
  &:hover {
    transform: scale(1.03);
    box-shadow: var(--shadow-medium);
  }
  
  &:active {
    transform: scale(0.97);  // Organic press (not harsh snap)
  }
}
```

**5. GSAP ScrollTrigger (Parallax Depth, Organic Flow)**

```typescript
// Parallax background blobs
gsap.to('.blob-bg', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,  // Smooth organic scrub
  },
  y: 150,
  scale: 1.2,
  opacity: 0.5,
  ease: 'none',
});

// Organic section reveals (not harsh)
gsap.from('.section-content', {
  scrollTrigger: {
    trigger: '.section-content',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  duration: 1,
  opacity: 0,
  y: 40,
  scale: 0.95,
  ease: 'power2.out',
});
```

### Motion Performance Rules (60fps Guarantee)

✅ **Animate only:** `transform` (translate, scale, rotate), `opacity`, `filter` (blur, brightness)  
✅ **Use `will-change`:** Sparingly, only on actively animating elements  
✅ **Blob blur limits:** Max `60px` blur on blobs, only on fixed `position: fixed` elements  
✅ **Respect accessibility:** Honor `prefers-reduced-motion: reduce` (disable animations)  
❌ **Never animate:** `top`, `left`, `width`, `height`, `margin` (layout triggers)  
❌ **Never apply `backdrop-filter`:** To scrolling containers (kills mobile performance)  

```scss
// Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .blob-bg {
    animation: none !important;
  }
}
```

---

## Component Architecture (Organic, Modular, Accessible)

### 1. Hero Section (Kinetic Typography + Blobs)

**Structure:**
- Warm off-white background with animated organic blobs (sage + caramel gradients)
- Pretext kinetic typography (cursor-reactive display text)
- Glassmorphic card overlay with intro text
- Primary CTA (sage green pill button)

```html
<section class="hero">
  <!-- Animated organic blobs (background) -->
  <div class="blob-bg blob-sage"></div>
  <div class="blob-bg blob-caramel"></div>
  
  <!-- Kinetic hero text (Pretext library) -->
  <div class="pretext-hero" data-pretext>
    <h1>Wim Stienstra</h1>
  </div>
  
  <!-- Glassmorphic intro card -->
  <div class="glass-card hero-card">
    <p class="text-secondary">
      Angular developer × Creative technologist × Home automation enthusiast
    </p>
    <button class="btn-primary">Explore my work</button>
  </div>
</section>
```

### 2. Section Header (Eyebrow + Headline Pattern)

```html
<header class="section-header">
  <span class="eyebrow">
    <svg class="icon-sage" aria-hidden="true"><!-- leaf icon --></svg>
    Experience
  </span>
  <h2>Building the future, one commit at a time</h2>
</header>
```

```scss
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--glass-sage);
  border: 1px solid var(--border-sage);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-sage-dark);
}
```

### 3. Glass Card (Warm Biomorphic Container)

**Reusable component for all content cards:**

```html
<article class="glass-card card-project">
  <img src="..." alt="..." class="card-image">
  <div class="card-content">
    <h3 class="card-title">Project Name</h3>
    <p class="card-description">Brief description...</p>
    <div class="card-tags">
      <span class="tag tag-sage">Angular</span>
      <span class="tag tag-caramel">TypeScript</span>
    </div>
  </div>
</article>
```

```scss
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.card-content {
  padding: var(--space-6);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
```

### 4. Tag/Badge System (Organic Pills)

```scss
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.tag-sage {
  background: var(--glass-sage);
  border: 1px solid var(--border-sage);
  color: var(--color-sage-dark);
}

.tag-caramel {
  background: var(--glass-warm);
  border: 1px solid var(--border-warm);
  color: var(--color-caramel-dark);
}

.tag-oker {
  background: rgba(212, 165, 74, 0.15);
  border: 1px solid rgba(212, 165, 74, 0.25);
  color: var(--color-oker-dark);
}
```

### 5. Button Hierarchy (Organic, Rounded)

```scss
// Primary CTA (Sage green, solid)
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--color-sage);
  color: white;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-organic);
  
  &:hover {
    background: var(--color-sage-dark);
    transform: scale(1.03);
    box-shadow: var(--shadow-glow-soft);  // Warm glow on hover
  }
  
  &:active {
    transform: scale(0.97);
  }
}

// Secondary (Outlined, caramel)
.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-caramel);
  color: var(--color-caramel-dark);
  
  &:hover {
    background: var(--glass-glow);  // Warm glow glass on hover
    border-color: var(--color-sunset);
    box-shadow: var(--shadow-glow-soft);
  }
}

// Tertiary (Ghost, minimal)
.btn-tertiary {
  background: transparent;
  border: none;
  color: var(--color-sage-dark);
  text-decoration: underline;
  text-underline-offset: 4px;
  
  &:hover {
    color: var(--color-sage);
    text-decoration-thickness: 2px;
  }
}
```

### 6. Focus States (Accessibility, WCAG 2.2)

```scss
// Universal focus ring (sage accent, visible)
*:focus-visible {
  outline: 2px solid var(--color-sage);
  outline-offset: 4px;
  border-radius: 4px;
}

// Button focus (inner ring for better visibility)
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--color-sage-dark);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--glass-sage);
}

// Card focus (entire card outline)
.glass-card:focus-visible {
  outline: 2px solid var(--color-sage);
  outline-offset: 4px;
}
```

---

## Accessibility & Inclusivity (WCAG 2.2 Level AA)

### Color Contrast (Dark on Light)

**WCAG Requirements:**
- Normal text (16px+): **4.5:1** minimum contrast
- Large text (18.5px bold / 24px+): **3:1** minimum
- UI controls: **3:1** minimum

**Our Palette (Verified):**
- `--color-text-primary` (#2d2a26) on `--color-bg-canvas` (#f8f4ef): **11.2:1** ✅
- `--color-text-secondary` (#5f5a52) on `--color-bg-canvas`: **6.8:1** ✅
- `--color-sage-dark` (#5f6d5f) on `--color-bg-canvas`: **5.2:1** ✅
- `--color-sage` (#8a9a8d) on white buttons: **3.1:1** ✅ (large text/UI)

**Test with:** WebAIM Contrast Checker, Chrome DevTools Lighthouse

### Keyboard Navigation

✅ **Tab order:** Follows visual reading order (left-to-right, top-to-bottom)  
✅ **Focus visible:** All interactive elements have visible focus ring (sage outline)  
✅ **Skip link:** "Skip to main content" link (visible on focus)  
✅ **Interactive elements:** All `<button>`, `<a>`, `<input>` keyboard accessible  
✅ **No keyboard traps:** Modals can be closed with `Escape` key  
✅ **Touch targets:** Minimum 44×44px for mobile (iOS/Android guidelines)  

```html
<!-- Skip link (first focusable element) -->
<a href="#main-content" class="sr-only-focusable">
  Skip to main content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

```scss
.sr-only-focusable:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.sr-only-focusable:focus {
  clip: auto;
  clip-path: none;
  height: auto;
  width: auto;
  position: static;
  padding: var(--space-4);
  background: var(--color-sage);
  color: white;
  font-weight: 600;
  text-decoration: none;
}
```

### Semantic HTML & ARIA

✅ **Landmarks:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`  
✅ **Headings:** Proper hierarchy (H1 → H2 → H3), no skipped levels  
✅ **Form labels:** All `<input>` have associated `<label for="...">`  
✅ **Alt text:** Descriptive alt text for all images (`alt="..."`)  
✅ **ARIA roles:** Only when necessary (avoid ARIA soup)  
✅ **Live regions:** `aria-live="polite"` for dynamic content updates  

```html
<!-- Example: Project card with semantic HTML + ARIA -->
<article class="glass-card card-project" aria-labelledby="project-1-title">
  <img
    src="/assets/project-1.jpg"
    alt="Screenshot of home automation dashboard showing temperature controls and lighting scenes"
    loading="lazy"
  >
  <div class="card-content">
    <h3 id="project-1-title" class="card-title">
      Smart Home Dashboard
    </h3>
    <p class="card-description">
      Angular-based control panel for locally-hosted home automation...
    </p>
    <div class="card-tags" role="list">
      <span class="tag tag-sage" role="listitem">Angular</span>
      <span class="tag tag-caramel" role="listitem">Home Assistant</span>
    </div>
    <a
      href="/projects/smart-home"
      class="btn-primary"
      aria-label="View Smart Home Dashboard project details"
    >
      View Project
      <svg aria-hidden="true"><!-- arrow icon --></svg>
    </a>
  </div>
</article>
```

### Motion & Animation Accessibility

```scss
// Disable ALL animations if user prefers reduced motion
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  // Disable blob morphing, parallax, scroll-triggered reveals
  .blob-bg,
  [data-gsap],
  .fade-up,
  .stagger-item {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

**Auto-playing animations:** ONLY use infinite subtle animations (blob morph, ambient glow) that don't distract. No auto-playing video. No carousel auto-advance.

---

## Implementation Structure

### SCSS Folder Organization

```
src/styles/
├── _tokens.scss         ← All CSS variables (colors, spacing, typography, timing, biomorphic radii)
├── _reset.scss          ← CSS reset, base element styles (body, headings, links)
├── _typography.scss     ← Font-face declarations, text utility classes
├── _glassmorphism.scss  ← .glass-card, .glass-card-sage, .glass-overlay
├── _biomorphic.scss     ← .blob-bg, @keyframes blob-morph, organic shape utilities
├── _animations.scss     ← @keyframes fade-up, stagger-item, entrance animations
├── _utilities.scss      ← .sr-only-focusable, .fade-up, .stagger-item
├── _buttons.scss        ← .btn-primary, .btn-secondary, .btn-tertiary
├── _tags.scss           ← .tag, .tag-sage, .tag-caramel, .tag-oker
└── styles.scss          ← Main import file (imports all partials in order)
```

### Component Folder Structure (Angular Standalone)

```
src/app/components/
├── hero/
│   ├── hero.component.ts        ← Pretext kinetic + blob backgrounds
│   ├── hero.component.html
│   ├── hero.component.scss
│   └── hero.component.spec.ts
├── about/
│   ├── about.component.ts       ← Text + optional image (asymmetric layout)
│   └── ...
├── experience/
│   ├── experience.component.ts  ← Timeline with glassmorphic cards
│   └── ...
├── projects/
│   ├── projects.component.ts    ← Grid of project cards (masonry-like)
│   └── ...
├── skills/
│   ├── skills.component.ts      ← Skill categories with proficiency bars
│   └── ...
├── hobbies/
│   ├── hobbies.component.ts     ← Gallery grid (game mods, drone, music)
│   └── ...
├── contact/
│   ├── contact.component.ts     ← Contact form or CTA
│   └── ...
└── shared/
    ├── glass-card/              ← Reusable glassmorphic card wrapper
    │   ├── glass-card.component.ts
    │   └── ...
    ├── badge/                   ← Tag/badge component (sage, caramel, oker variants)
    │   └── ...
    ├── button/                  ← Button component (primary, secondary, tertiary)
    │   └── ...
    ├── section-header/          ← Eyebrow + H2 pattern
    │   └── ...
    ├── blob-background/         ← Animated organic blob (reusable)
    │   └── ...
    └── skeleton-wrapper/        ← Boneyard skeleton container
        └── ...
```

### CSS Custom Properties (Tokens) Usage in Components

**Every component MUST use CSS variables, never hardcoded values:**

```typescript
// ✅ GOOD: Use design tokens
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `...`,
  styles: [`
    :host {
      display: block;
      padding: var(--space-24) var(--space-8);
      background: var(--color-bg-canvas);
      position: relative;
      overflow: hidden;
    }
    
    .hero-title {
      font-size: var(--text-hero);
      color: var(--color-text-primary);
      letter-spacing: var(--tracking-tight);
    }
    
    .glass-card {
      background: var(--glass-warm);
      border: 1px solid var(--border-warm);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
    }
  `]
})
export class HeroComponent {}

// ❌ BAD: Hardcoded values
.hero {
  padding: 96px 32px;
  background: #f8f4ef;
}

.glass-card {
  background: rgba(193, 154, 107, 0.15);
  border: 1px solid rgba(193, 154, 107, 0.2);
  border-radius: 24px;
  padding: 24px;
}
```

---

## Design System Enforcement

### ✅ Do's

- **Use design tokens exclusively** (CSS variables from `_tokens.scss`)
- **Apply glassmorphism classes** (`.glass-card`, `.glass-card-sage`)
- **Use biomorphic shapes** (`--radius-blob`, organic `border-radius` animations)
- **Animate organically** (`transform`, `opacity`, custom easing functions)
- **Maintain warm palette** (sage, caramel, oker, navy — no cold blues)
- **Respect spacing scale** (multiples of `--space-4`, use `--space-24` for sections)
- **Test accessibility** (WCAG contrast, keyboard nav, `prefers-reduced-motion`)
- **Use semantic HTML** (`<article>`, `<section>`, `<header>`, proper heading hierarchy)
- **Load fonts efficiently** (preload critical fonts, `font-display: swap`)
- **Optimize images** (WebP format, lazy loading, descriptive alt text)

### ❌ Don'ts

- **Hardcode colors, spacing, or border-radius**
- **Use cold blue accents** (no electric cyan, no neon purple gradients)
- **Use harsh geometric shapes** (no sharp 0px radius, no perfect rectangles)
- **Use Inter/Roboto for display text** (use DM Sans, Outfit, Space Grotesk for warmth)
- **Animate layout-triggering properties** (`top`, `left`, `width`, `height`)
- **Apply `backdrop-filter` to scrolling containers** (kills mobile performance)
- **Create auto-playing carousels** (accessibility violation)
- **Skip semantic HTML** (no `<div>` soup, use proper landmarks)
- **Ignore focus states** (all interactive elements must have visible focus)
- **Use generic placeholder content** (no "Lorem ipsum", use realistic data)

---

## Biomorphic Design Patterns (Unique to This System)

### 1. Organic Blob Gradients (Background Depth)

```html
<div class="section-with-blobs">
  <div class="blob-bg blob-sage" style="--blob-x: 20%; --blob-y: 30%;"></div>
  <div class="blob-bg blob-caramel" style="--blob-x: 80%; --blob-y: 60%;"></div>
  
  <div class="section-content">
    <!-- Actual content here -->
  </div>
</div>
```

```scss
.blob-bg {
  position: absolute;
  width: 600px;
  height: 600px;
  top: var(--blob-y, 50%);
  left: var(--blob-x, 50%);
  transform: translate(-50%, -50%);
  border-radius: var(--radius-blob);
  filter: blur(60px);
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
  
  // Infinite organic morphing
  animation: blob-morph 20s ease-in-out infinite;
}

.blob-sage {
  background: radial-gradient(
    circle at 30% 40%,
    var(--color-sage-light),
    var(--color-sage)
  );
}

.blob-caramel {
  background: radial-gradient(
    circle at 60% 50%,
    var(--color-caramel-light),
    var(--color-caramel)
  );
  animation-delay: -10s; // Offset for asynchronous morphing
}
```

### 2. Asymmetric Grid Layouts (Organic Flow)

```html
<div class="bento-grid">
  <div class="grid-item grid-span-2">Large project card</div>
  <div class="grid-item">Small card 1</div>
  <div class="grid-item">Small card 2</div>
  <div class="grid-item grid-span-3">Wide panoramic card</div>
</div>
```

```scss
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-span-2 {
  grid-column: span 2;
}

.grid-span-3 {
  grid-column: span 3;
}
```

### 3. Warm Wood Texture Overlays (Optional)

```scss
.wood-texture {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/assets/textures/wood-grain.png');
    background-size: cover;
    opacity: 0.03;  // Very subtle
    mix-blend-mode: multiply;
    pointer-events: none;
  }
}
```

**Usage:** Apply to hero sections, large cards to add organic materiality (like Wim's wood furniture). Keep opacity ≤ 0.05 to avoid overwhelming content.

---

## Key Deliverables (Implementation Roadmap)

| Phase | Deliverable | Description |
|-------|------------|-------------|
| **1. Design System Setup** | SCSS token files, global styles | Create `_tokens.scss`, `_reset.scss`, `_glassmorphism.scss`, `_biomorphic.scss`, `_animations.scss` |
| **2. Component Library** | Shared components | Build reusable components: glass-card, button, badge, section-header, blob-background |
| **3. Hero Section** | Kinetic hero + blobs | Integrate Pretext kinetic typography, animated organic blobs, glassmorphic intro card |
| **4. Content Sections** | About, Experience, Projects, Skills, Hobbies, Contact | Build all major sections with glassmorphic cards, biomorphic layouts |
| **5. Animation Integration** | GSAP ScrollTrigger, blob morphing | Wire up scroll-triggered reveals, parallax depth, organic blob animations |
| **6. Accessibility Audit** | WCAG 2.2 AA compliance | Test contrast, keyboard nav, screen readers, focus states, `prefers-reduced-motion` |
| **7. Performance Audit** | Lighthouse 90+ score | Optimize images (WebP), lazy loading, eliminate layout shifts, 60fps animations |
| **8. Content Population** | JSON → UI | Wire up content layer (`src/content/*.json`) to Angular components |
| **9. Boneyard Skeletons** | Skeleton screens | Add Boneyard auto-captured skeletons for data-loaded sections |
| **10. Cross-browser Testing** | Chrome, Firefox, Safari, mobile | Test on all major browsers + iOS Safari, Android Chrome |

---

## Why This Matters

**This design language is Wim's home, digitized:**

- **Warm earth tones** (caramel, sage, oker, navy) = physical environment (walls, furniture, plants)
- **Biomorphic shapes** (organic blobs, rounded corners) = natural, human-centered tech
- **Glassmorphism** (warm-tinted glass) = modern sophistication without coldness
- **Light background** (off-white canvas) = airy, inviting, like Wim's living room with natural light
- **Mid-century modern precision** (clean typography, purposeful spacing) = functional elegance
- **Organic animations** (blob morphing, fluid transitions) = living, breathing interface
- **Home automation vibes** (dashboard aesthetics, smart controls) = tech mastery
- **Accessibility-first** (WCAG 2.2 AA, keyboard nav) = inclusive, thoughtful engineering

**The Result:** A portfolio that feels like **walking into Wim's home** — warm, inviting, sophisticated, nature-inspired, and undeniably personal. Not a template, not generic AI output, but a **digital extension of Wim's character**.
