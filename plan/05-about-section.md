# Step 05 — About Section

## Objective
Build the About section: a personal intro that communicates who Wim is beyond a job title — his values, working style, and unique combination of engineering + AI + hobbies. Visually distinct but calmer than the hero.

---

## Visual Design

```
┌─────────────────────────────────────────────────┐
│  01 / ABOUT                                     │
│                                                 │
│  ┌──────────┐   Frontend developer with a       │
│  │          │   focus on scalable architecture, │
│  │  [photo] │   user-friendly interfaces, and   │
│  │          │   future-proof solutions...        │
│  └──────────┘                                   │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Angular  │  │  AI-Dev  │  │  Scrum   │      │
│  │ Monorepo │  │ Explorer │  │  PSM I   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## Implementation

### File: `src/components/About/About.jsx`

- Import `meta` from `../../content/meta.json`
- Render:
  1. Section number label `01 / ABOUT` (monospace, muted)
  2. A two-column grid: avatar photo on the left, bio text on the right
  3. Three "highlight card" tiles below — one each for:
     - **Architecture focus** — "Angular monorepo systems at scale"
     - **AI exploration** — "AI-assisted coding since 2019"
     - **Certified Scrum** — "PSM I certified, Scrum Master experience"

```jsx
import meta from '../../content/meta.json'
import styles from './About.module.css'

const highlights = [
  {
    icon: '⬡',
    title: 'Monorepo Architecture',
    body: 'Building scalable Angular monorepo platforms at the CJIB, unifying new and legacy systems under one roof.'
  },
  {
    icon: '◎',
    title: 'AI-Assisted Development',
    body: 'Exploring AI since 2019 — structured prompting, MCP, and agent workflows as first-class engineering tools.'
  },
  {
    icon: '◈',
    title: 'Scrum & Team Leadership',
    body: 'PSM I certified. Served as Scrum Master during my studies, combining technical and leadership skills.'
  }
]

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <span className={styles.label}>01 / ABOUT</span>

      <div className={styles.grid}>
        <div className={styles.avatarWrap}>
          <img
            src={meta.avatarUrl}
            alt="Wim Stienstra"
            className={styles.avatar}
          />
          <div className={styles.avatarGlow} aria-hidden="true" />
        </div>

        <div className={styles.bio}>
          <h2 className={styles.heading}>
            Building things that <span className={styles.accent}>scale</span>.
          </h2>
          <p className={styles.text}>{meta.about}</p>
          <a href={meta.cvUrl} className={styles.cvLink} download>
            Download CV ↓
          </a>
        </div>
      </div>

      <div className={styles.highlights}>
        {highlights.map(h => (
          <div key={h.title} className={`${styles.card} glass-card`}>
            <span className={styles.cardIcon}>{h.icon}</span>
            <h3 className={styles.cardTitle}>{h.title}</h3>
            <p className={styles.cardBody}>{h.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

### File: `src/components/About/About.module.css`

Key styles:
- `.about` — `padding: var(--section-padding)`, `max-width: var(--max-width)`, centred with `margin: 0 auto`
- `.label` — `font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-muted); letter-spacing: 0.2em`
- `.grid` — `display: grid; grid-template-columns: 280px 1fr; gap: var(--space-16); align-items: center`
  - On mobile (< 768px): single column, avatar on top
- `.avatarWrap` — `position: relative`; contains the image and a radial glow behind it
- `.avatar` — `width: 100%; border-radius: var(--radius-lg); border: 2px solid var(--color-border); filter: grayscale(20%)`
- `.avatarGlow` — `position: absolute; inset: -20px; background: radial-gradient(circle, var(--color-accent-glow), transparent 70%); z-index: -1`
- `.heading` — `font-size: var(--text-xl)`, `.accent` — `color: var(--color-accent)`
- `.cvLink` — styled like `.ctaSecondary` from Hero but smaller
- `.highlights` — `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6)`
  - On mobile: single column
- `.card` — uses `.glass-card` utility + `padding: var(--space-8)`
- `.cardIcon` — large decorative icon, `font-size: 2rem; color: var(--color-accent); margin-bottom: var(--space-4)`

---

## Scroll Entrance Animation (GSAP ScrollTrigger)
In a `useEffect`, use `gsap.registerPlugin(ScrollTrigger)` and animate:
1. The avatar slides in from the left (`x: -40 → 0`, opacity 0 → 1)
2. The bio text slides in from the right (`x: 40 → 0`)
3. Highlight cards stagger in from below (`y: 30 → 0`, stagger: 0.15s)

All triggered when the section enters the viewport (start: `"top 80%"`).

---

## Avatar Image
The avatar image must be placed at `public/assets/avatar.jpg`. If Wim does not provide a photo, use a placeholder (e.g., a generated avatar or a stylised SVG with his initials "WS") so the layout is preserved.

---

## Acceptance Criteria
- [ ] Section renders with bio text pulled from `meta.json`
- [ ] Avatar image is displayed with glow effect
- [ ] Three highlight cards visible, styled as glass cards
- [ ] Responsive: single-column on mobile
- [ ] GSAP ScrollTrigger entrance animation works
- [ ] CV download link points to `/assets/cv-wim-stienstra.pdf`
- [ ] Section has `id="about"` for nav anchor
