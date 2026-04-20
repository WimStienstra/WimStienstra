# Step 11 — Hobbies Section

## Objective
Build a visually engaging Hobbies section as an Angular 19 standalone component that reads from `src/content/hobbies.json`. The section showcases Wim's personality beyond code: game modding (RimWorld, Blade & Sorcery), drone flying and videography, music production, and indie game development. A Boneyard skeleton is shown while content loads. Media items open in a lightbox on click.

---

## Visual Design

```
05 / HOBBIES   (contact becomes 06)

  [ 🎮 Game Modding ]  [ 🚁 Drone ]  [ 🎵 Music ]  [ 👾 Game Dev ]
       ↑ tab filter

  ┌────────────────────────────────────────────────────┐
  │  Game Modding                                      │
  │                                                    │
  │  I create mods for games I love...                 │
  │                                                    │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
  │  │[img/vid] │  │[img/vid] │  │[img/vid] │  ←      │
  │  │  caption │  │  caption │  │  caption │  gallery │
  │  └──────────┘  └──────────┘  └──────────┘         │
  │                                                    │
  │  [ Nexus Mods Profile ↗ ]                          │
  └────────────────────────────────────────────────────┘

  Clicking a media item → full-screen lightbox overlay
```

---

## Implementation

### File: `src/app/components/hobbies/hobbies.component.ts`

```typescript
import { Component, OnInit, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkeletonComponent } from 'boneyard-js/angular'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import hobbiesData from '../../../content/hobbies.json'

gsap.registerPlugin(ScrollTrigger)

export interface MediaItem {
  type: 'image' | 'video'
  url: string
  poster?: string
  caption: string
}

export interface Hobby {
  id: string
  title: string
  icon: string
  description: string
  media: MediaItem[]
  links: Array<{ label: string; url: string }>
}

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
})
export class HobbiesComponent implements OnInit, OnDestroy {
  readonly hobbies: Hobby[] = hobbiesData as Hobby[]
  activeHobby = signal<Hobby>(this.hobbies[0])
  isLoading = signal(true)
  lightboxItem = signal<MediaItem | null>(null)

  private keydownListener!: (e: KeyboardEvent) => void

  ngOnInit(): void {
    setTimeout(() => this.isLoading.set(false), 700)

    // Close lightbox on Escape
    this.keydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.closeLightbox()
    }
    document.addEventListener('keydown', this.keydownListener)
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keydownListener)
    ScrollTrigger.getAll().forEach(st => st.kill())
  }

  selectHobby(hobby: Hobby): void {
    this.activeHobby.set(hobby)
    // Re-trigger media grid entrance animation
    gsap.fromTo('.media-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' })
  }

  openLightbox(item: MediaItem): void {
    this.lightboxItem.set(item)
    document.body.style.overflow = 'hidden'
  }

  closeLightbox(): void {
    this.lightboxItem.set(null)
    document.body.style.overflow = ''
  }
}
```

---

### File: `src/app/components/hobbies/hobbies.component.html`

```html
<section id="hobbies" class="hobbies">
  <span class="label">05 / HOBBIES</span>
  <h2 class="heading">Beyond the Code</h2>

  <!-- Tab navigation -->
  <div class="tabs" role="tablist">
    @for (hobby of hobbies; track hobby.id) {
      <button
        role="tab"
        class="tab"
        [class.active]="activeHobby().id === hobby.id"
        [attr.aria-selected]="activeHobby().id === hobby.id"
        (click)="selectHobby(hobby)"
      >
        <span class="tab-icon">{{ hobby.icon }}</span>
        <span class="tab-label">{{ hobby.title }}</span>
      </button>
    }
  </div>

  <!-- Content panel with Boneyard skeleton -->
  <boneyard-skeleton name="hobbies" [loading]="isLoading()" animate="shimmer" [transition]="300">
    <div class="panel glass-card">
      <div class="panel-header">
        <span class="panel-icon">{{ activeHobby().icon }}</span>
        <h3 class="panel-title">{{ activeHobby().title }}</h3>
      </div>

      <p class="panel-description">{{ activeHobby().description }}</p>

      <!-- Media gallery -->
      @if (activeHobby().media.length) {
        <div class="media-grid">
          @for (item of activeHobby().media; track item.url) {
            <div class="media-card" (click)="openLightbox(item)" role="button" tabindex="0"
                 [attr.aria-label]="'View: ' + item.caption">
              @if (item.type === 'image') {
                <img [src]="item.url" [alt]="item.caption" class="media-thumb" loading="lazy" />
              } @else {
                <video [src]="item.url" [poster]="item.poster" class="media-thumb" muted preload="none"></video>
                <div class="play-overlay" aria-hidden="true">▶</div>
              }
              <p class="media-caption">{{ item.caption }}</p>
            </div>
          }
        </div>
      }

      <!-- External links -->
      @if (activeHobby().links.length) {
        <div class="panel-links">
          @for (link of activeHobby().links; track link.url) {
            <a [href]="link.url" target="_blank" rel="noopener noreferrer" class="panel-link">
              {{ link.label }} ↗
            </a>
          }
        </div>
      }
    </div>
  </boneyard-skeleton>

  <!-- Lightbox overlay -->
  @if (lightboxItem()) {
    <div class="lightbox" (click)="closeLightbox()" role="dialog" aria-modal="true">
      <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close lightbox">✕</button>
      <div class="lightbox-content" (click)="$event.stopPropagation()">
        @if (lightboxItem()!.type === 'image') {
          <img [src]="lightboxItem()!.url" [alt]="lightboxItem()!.caption" class="lightbox-img" />
        } @else {
          <video [src]="lightboxItem()!.url" [poster]="lightboxItem()!.poster"
                 class="lightbox-video" controls autoplay></video>
        }
        <p class="lightbox-caption">{{ lightboxItem()!.caption }}</p>
      </div>
    </div>
  }
</section>
```

---

### File: `src/app/components/hobbies/hobbies.component.scss`

Key styles:

- `.hobbies` — `padding: var(--section-padding); max-width: var(--max-width); margin: 0 auto`
- `.tabs` — `display: flex; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-8)`
- `.tab` — pill button; `.active` — `background: var(--color-tag-bg); color: var(--color-accent); border-color: var(--color-accent)`
- `.tab-icon` — `font-size: 1.2rem; margin-right: var(--space-2)`
- `.panel` (uses `.glass-card`) — `padding: var(--space-8)`
- `.panel-header` — `display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6)`
- `.panel-icon` — `font-size: 2.5rem`
- `.panel-title` — `font-size: var(--text-xl); font-weight: 700; color: var(--color-accent)`
- `.panel-description` — `color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-8); max-width: 70ch`
- `.media-grid` — `display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6)`
- `.media-card` — `border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border); cursor: pointer; position: relative; transition: border-color var(--duration-base), transform var(--duration-base)`
  - `&:hover` — `border-color: var(--color-accent); transform: translateY(-3px)`
- `.media-thumb` — `width: 100%; height: 160px; object-fit: cover; display: block`
- `.play-overlay` — `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: white; background: rgba(0,0,0,0.35); opacity: 0; transition: opacity var(--duration-base)`
  - `.media-card:hover .play-overlay` — `opacity: 1`
- `.media-caption` — `padding: var(--space-3) var(--space-4); font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-mono)`
- `.panel-links` — `display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-4)`
- `.panel-link` — ghost button style with accent color

**Lightbox:**
```scss
.lightbox {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn var(--duration-base) var(--ease-out-expo);
}
.lightbox-content {
  max-width: 90vw; max-height: 90vh;
  display: flex; flex-direction: column; align-items: center; gap: var(--space-4);
}
.lightbox-img, .lightbox-video {
  max-width: 90vw; max-height: 80vh;
  border-radius: var(--radius-md);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}
.lightbox-caption {
  color: var(--color-text-muted); font-size: var(--text-sm); text-align: center;
}
.lightbox-close {
  position: absolute; top: var(--space-6); right: var(--space-6);
  background: var(--color-surface); border: 1px solid var(--color-border);
  color: var(--color-text); border-radius: 50%; width: 40px; height: 40px;
  cursor: pointer; font-size: 1.1rem;
  transition: border-color var(--duration-base), color var(--duration-base);
  &:hover { border-color: var(--color-accent); color: var(--color-accent); }
}
```

---

## Boneyard Skeleton Setup

After building the component, capture the skeleton:

```bash
npx boneyard-js build
```

This adds `src/bones/hobbies.bones.json`. It is automatically picked up by the shared registry import in `src/main.ts`.

---

## Section Number Update

With the Hobbies section added, the Contact section becomes **06 / CONTACT** instead of 05. Update:
- `src/content/hobbies.json` section label (already set as 05)
- `contact.component.html` label: `06 / CONTACT`
- The sticky nav (if implemented) to include a `#hobbies` anchor link

---

## Scroll Entrance Animation

In `ngAfterViewInit`, use GSAP ScrollTrigger to animate:
- Tabs slide in from the top: `y: -20 → 0`, stagger `0.05s`
- Panel fades in: `opacity: 0 → 1`, `y: 20 → 0`

---

## Accessibility Notes
- Each tab has `role="tab"` and `aria-selected`
- Media cards have `role="button"`, `tabindex="0"`, and descriptive `aria-label`
- Lightbox has `role="dialog"` and `aria-modal="true"`
- Keyboard: `Escape` closes lightbox, `Enter`/`Space` should open media cards (add `(keydown.enter)="openLightbox(item)"` to the media-card)
- Videos: `muted` in the thumbnail grid; `controls` in the lightbox

---

## Content Update Workflow (for Wim)
1. Drop new images/videos into `public/assets/hobbies/`
2. Add an entry to the relevant hobby's `media` array in `src/content/hobbies.json`:
   ```json
   { "type": "image", "url": "/assets/hobbies/new-image.jpg", "caption": "My description" }
   ```
3. Commit and push — the site rebuilds in ~45 seconds

---

## Acceptance Criteria
- [ ] All hobby categories from `hobbies.json` render as tabs
- [ ] Clicking a tab shows the correct hobby panel with description and media
- [ ] Media grid renders images and videos with correct thumbnails
- [ ] Clicking a media item opens the lightbox with the full image/video
- [ ] Lightbox closes on Escape key, overlay click, and close button
- [ ] Boneyard skeleton shows for ~700ms then fades to real content
- [ ] `src/bones/hobbies.bones.json` exists after running `npx boneyard-js build`
- [ ] Videos show a play overlay on hover
- [ ] External links open in new tab with `rel="noopener noreferrer"`
- [ ] Section has `id="hobbies"` for nav anchor
- [ ] Contact section label updated to `06 / CONTACT`
- [ ] GSAP ScrollTrigger entrance animation fires correctly
- [ ] Responsive: media grid wraps correctly on mobile
- [ ] Keyboard accessible: tabs and media cards navigable via keyboard
