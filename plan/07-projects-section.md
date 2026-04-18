# Step 07 — Projects Section

## Objective
Build a visually bold projects showcase that reads from `src/content/projects.json`. Featured projects get large cards with hover effects; non-featured ones appear in a compact grid below.

---

## Visual Design

```
03 / PROJECTS

Featured:
┌──────────────────────────────────────────────┐
│  EXPO — Angular Monorepo Platform            │
│  ──────────────────────────                  │
│  Monorepo platform unifying enforcement      │
│  apps and legacy systems at the CJIB.        │
│                                              │
│  [Angular] [NX] [TypeScript] [Monorepo]      │
│                             [Professional]   │
└──────────────────────────────────────────────┘
┌─────────────────────┐ ┌────────────────────┐
│ Digitaal Loket ...  │ │ Jip Snel Chatbot   │
└─────────────────────┘ └────────────────────┘

More Projects ↓
┌────────┐ ┌────────┐ ┌────────┐
│ Game   │ │ IBC    │ │ Quiz   │
└────────┘ └────────┘ └────────┘
```

---

## Implementation

### File: `src/components/Projects/Projects.jsx`

```jsx
import projects from '../../content/projects.json'
import styles from './Projects.module.css'

function Tag({ label }) {
  return <span className={styles.tag}>{label}</span>
}

function TypeBadge({ type }) {
  const classMap = {
    Professional: styles.badgePro,
    Personal: styles.badgePersonal,
    Study: styles.badgeStudy,
  }
  return (
    <span className={`${styles.badge} ${classMap[type] ?? ''}`}>{type}</span>
  )
}

function ProjectCard({ project, large = false }) {
  return (
    <article className={`${styles.card} ${large ? styles.large : ''} glass-card`}>
      <div className={styles.cardInner}>
        <TypeBadge type={project.type} />
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
      </div>
      <div className={styles.cardGlow} aria-hidden="true" />
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const [first, ...rest] = featured
  const others = projects.filter(p => !p.featured)

  return (
    <section id="projects" className={styles.projects}>
      <span className={styles.label}>03 / PROJECTS</span>
      <h2 className={styles.heading}>Selected Work</h2>

      {/* Large hero card for first featured project */}
      {first && <ProjectCard project={first} large />}

      {/* Two-column grid for remaining featured */}
      {rest.length > 0 && (
        <div className={styles.featuredGrid}>
          {rest.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}

      {/* Compact grid for non-featured */}
      {others.length > 0 && (
        <>
          <h3 className={styles.moreHeading}>More Projects</h3>
          <div className={styles.moreGrid}>
            {others.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </>
      )}
    </section>
  )
}
```

---

### File: `src/components/Projects/Projects.module.css`

Key styles:

- `.projects` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.card` (extends `.glass-card`) — `position: relative; overflow: hidden; cursor: default`
  - On hover: border glow intensifies (already handled by `.glass-card:hover`)
  - On hover: `.cardGlow` becomes visible
- `.large` — `margin-bottom: var(--space-6); padding: var(--space-12)`
  - `.large .title` — `font-size: var(--text-2xl)`
- `.cardInner` — `position: relative; z-index: 1; padding: var(--space-8)`
- `.cardGlow` — a radial gradient that appears on hover in the top-left corner of the card:
  ```css
  .cardGlow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 0% 0%,
      var(--color-accent-glow),
      transparent 60%
    );
    opacity: 0;
    transition: opacity var(--duration-slow) var(--ease-out-expo);
    pointer-events: none;
  }
  .card:hover .cardGlow { opacity: 1; }
  ```
- `.title` — `font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--space-4); color: var(--color-text)`
- `.description` — `color: var(--color-text-muted); line-height: 1.7; margin-bottom: var(--space-6)`
- `.tags` — flex wrap, using `.tag` from the shared style
- `.badge` — monospace pill, top-right corner absolute:
  ```css
  .badge {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    padding: 3px var(--space-3);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-6);
    display: inline-block;
  }
  .badgePro     { background: rgba(74,240,200,0.1); color: var(--color-accent); }
  .badgePersonal { background: rgba(160,100,240,0.1); color: #a064f0; }
  .badgeStudy   { background: rgba(240,180,74,0.1); color: #f0b44a; }
  ```
- `.featuredGrid` — `display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); margin-bottom: var(--space-12)`
  - Mobile: single column
- `.moreGrid` — `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4)`
  - Tablet (< 900px): 2 columns; Mobile: 1 column

---

## Scroll Animation (GSAP ScrollTrigger)
- Large card: slides up from `y: 50`, opacity 0 → 1 when entering viewport
- Featured grid cards: staggered `y: 30 → 0`, stagger 0.12s
- More grid cards: staggered `y: 20 → 0`, stagger 0.08s

---

## Interactive Tilt Effect (Optional Enhancement)
On `mousemove` over a card, apply a subtle 3D tilt using CSS `perspective` + `rotateX/Y`:

```js
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card, {
    rotateY: x * 8,
    rotateX: -y * 8,
    transformPerspective: 800,
    duration: 0.4,
    ease: 'power2.out'
  })
})
card.addEventListener('mouseleave', () => {
  gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6 })
})
```

Implement this in a custom `useTilt(ref)` hook in `src/hooks/useTilt.js`.

---

## Acceptance Criteria
- [ ] All projects from `projects.json` render
- [ ] Featured projects have visual hierarchy (large card + 2-col grid)
- [ ] Non-featured projects appear in the compact "More Projects" grid
- [ ] Card glow effect works on hover
- [ ] Type badge (Professional / Personal / Study) is color-coded
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Tilt effect (or graceful omission) implemented
- [ ] Section has `id="projects"` for nav anchor
- [ ] Responsive: correct grid breakpoints on mobile/tablet/desktop
