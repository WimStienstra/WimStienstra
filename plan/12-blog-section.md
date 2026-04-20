# Step 12 — Blog Section (Markdown Posts with Multi-Image Support)

## Objective
Build a fully-featured blog system with dedicated routes (`/blog` and `/blog/:slug`) that supports markdown posts with frontmatter, multi-image content, tags/search, code syntax highlighting, auto-generated table of contents, and reading time estimates. Built as Angular 21 standalone components with static prerendering for SEO and instant loading.

---

## Visual Design

### Blog List Page (`/blog`)

```
┌─────────────────────────────────────────────────────┐
│  06 / BLOG                                          │
│                                                     │
│  [ Search... ]                  🔖 home-automation  │
│                                 🔖 ai               │
│                                 🔖 iot              │
│                                                     │
│  ┌──────────────────────────────────────────┐      │
│  │ [cover image]                            │      │
│  │                                          │      │
│  │ My First Home Automation Setup           │      │
│  │ April 15, 2026 · 8 min read              │      │
│  │                                          │      │
│  │ How I built a custom smart home...       │      │
│  │                                          │      │
│  │ #home-automation #iot #smart-home        │      │
│  └──────────────────────────────────────────┘      │
│                                                     │
│  ┌──────────────────────────────────────────┐      │
│  │ [cover image]                            │      │
│  │ Experimenting with AI Agents             │      │
│  │ ...                                      │      │
└─────────────────────────────────────────────────────┘
```

### Blog Post Page (`/blog/first-home-automation-setup`)

```
┌─────────────────────────────────────────────────────┐
│  Blog > My First Home Automation Setup              │
│                                                     │
│  My First Home Automation Setup                     │
│  April 15, 2026 · 8 min read                        │
│  #home-automation #iot #smart-home                  │
│                                                     │
│  ┌─ Table of Contents ──────────────────┐          │
│  │ • Introduction                        │          │
│  │ • Hardware Setup                      │          │
│  │ • Software Configuration              │          │
│  └───────────────────────────────────────┘          │
│                                                     │
│  [cover image full width]                           │
│                                                     │
│  ## Introduction                                    │
│  Lorem ipsum dolor sit amet...                      │
│                                                     │
│  ![sensor diagram](/assets/blog/sensor.png)         │
│                                                     │
│  ```typescript                                      │
│  const sensor = new ESP32Sensor()                   │
│  ```                                                │
│                                                     │
│  ← Back to Blog                                     │
└─────────────────────────────────────────────────────┘
```

---

## Architecture

### Content Flow

```
Markdown files (src/content/blog/*.md)
         ↓ [build time]
   Blog Index Script (scripts/generate-blog-index.js)
         ↓
   blog-index.json (src/content/blog-index.json)
         ↓ [runtime - list page]
   BlogListComponent loads index → displays cards
         ↓ [user clicks post]
   BlogPostComponent loads .md via HTTP
         ↓
   ngx-markdown parses → renders with PrismJS
```

---

## Implementation

### 1. Install Dependencies

```bash
npm install ngx-markdown marked
npm install prismjs @types/prismjs
npm install gray-matter  # for parsing frontmatter in build script
```

### 2. Create Content Structure

#### File: `src/content/blog/first-home-automation-setup.md`

```markdown
---
title: "My First Home Automation Setup"
date: "2026-04-15"
slug: "first-home-automation-setup"
tags: ["home-automation", "iot", "smart-home"]
excerpt: "How I built a custom smart home system using Home Assistant and ESP32 boards"
coverImage: "/assets/blog/home-assistant-dashboard.jpg"
---

# Introduction

Building a smart home doesn't require expensive proprietary systems. Here's how I did it with open-source tools.

## Hardware Setup

I used the following components:

- ESP32 development boards
- DHT22 temperature sensors
- Relay modules for lights

![ESP32 sensor setup](/assets/blog/esp32-sensor-setup.jpg)

## Software Configuration

The brain of the system is Home Assistant running on a Raspberry Pi.

```yaml
sensor:
  - platform: mqtt
    name: "Living Room Temperature"
    state_topic: "home/livingroom/temperature"
```

Multiple images work great for step-by-step guides!

![Home Assistant dashboard](/assets/blog/home-assistant-dashboard.jpg)

## Conclusion

This setup cost less than €200 and gives me full control over my data.
```

#### File: `src/content/blog/experimenting-with-ai-agents.md`

```markdown
---
title: "Experimenting with AI Agents"
date: "2026-04-10"
slug: "experimenting-with-ai-agents"
tags: ["ai", "automation", "development"]
excerpt: "My journey building custom AI agents for code generation and automation tasks"
coverImage: "/assets/blog/ai-agent-workflow.png"
draft: false
---

# Getting Started with AI Agents

AI agents are transforming how we write code...

[content continues]
```

### 3. Blog Index Generator Script

#### File: `scripts/generate-blog-index.js`

```javascript
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const BLOG_DIR = path.join(__dirname, '../src/content/blog')
const OUTPUT_FILE = path.join(__dirname, '../src/content/blog-index.json')

function generateBlogIndex() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  
  const posts = files.map(filename => {
    const filepath = path.join(BLOG_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf-8')
    const { data } = matter(content)
    
    // Filter out drafts in production
    if (data.draft && process.env.NODE_ENV === 'production') {
      return null
    }
    
    return {
      title: data.title,
      date: data.date,
      slug: data.slug,
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      draft: data.draft || false
    }
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2))
  console.log(`✅ Generated blog index with ${posts.length} posts`)
}

generateBlogIndex()
```

#### Update `package.json`

```json
{
  "scripts": {
    "blog:index": "node scripts/generate-blog-index.js",
    "prebuild": "npm run blog:index",
    "build": "ng build"
  }
}
```

### 4. Configure ngx-markdown with PrismJS

#### File: `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection, SecurityContext } from '@angular/core'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideMarkdown } from 'ngx-markdown'

import { routes } from './app.routes'

// Import Prism.js core and languages
import 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(),
    provideMarkdown({
      sanitize: SecurityContext.NONE, // Trust markdown content (we control it)
    }),
  ],
}
```

#### Import Prism CSS in `styles.scss`

```scss
// Import Prism theme at the top of src/styles.scss
@import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for code blocks

// ... rest of styles
```

### 5. Blog List Component

#### File: `src/app/components/blog/blog-list/blog-list.component.ts`

```typescript
import { Component, OnInit, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { SkeletonComponent } from 'boneyard-js/angular'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import blogIndex from '../../../content/blog-index.json'

gsap.registerPlugin(ScrollTrigger)

export interface BlogPost {
  title: string
  date: string
  slug: string
  tags: string[]
  excerpt: string
  coverImage: string
  draft?: boolean
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SkeletonComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  readonly allPosts: BlogPost[] = blogIndex as BlogPost[]
  
  searchQuery = signal('')
  selectedTags = signal<string[]>([])
  isLoading = signal(true)

  // All unique tags across all posts
  readonly allTags = computed(() => {
    const tagSet = new Set<string>()
    this.allPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  })

  // Filtered posts based on search and tags
  readonly filteredPosts = computed(() => {
    const query = this.searchQuery().toLowerCase()
    const tags = this.selectedTags()
    
    return this.allPosts.filter(post => {
      // Search filter
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      
      // Tag filter
      const matchesTags = tags.length === 0 || 
        tags.some(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  })

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
      this.animateCards()
    }, 700)
  }

  toggleTag(tag: string): void {
    const current = this.selectedTags()
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter(t => t !== tag))
    } else {
      this.selectedTags.set([...current, tag])
    }
    
    // Re-animate filtered results
    setTimeout(() => this.animateCards(), 50)
  }

  clearFilters(): void {
    this.searchQuery.set('')
    this.selectedTags.set([])
  }

  private animateCards(): void {
    gsap.fromTo(
      '.blog-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 80%',
        },
      }
    )
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  calculateReadingTime(excerpt: string): number {
    // Rough estimate: 200 words per minute
    const wordCount = excerpt.split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / 200))
  }
}
```

#### File: `src/app/components/blog/blog-list/blog-list.component.html`

```html
<section class="blog-section" id="blog">
  <div class="container">
    <h2 class="section-title">
      <span class="section-number">06</span>
      <span class="section-slash">/</span>
      BLOG
    </h2>

    <!-- Search and Filter Controls -->
    <div class="blog-controls">
      <div class="search-box">
        <input
          type="search"
          placeholder="Search posts..."
          [(ngModel)]="searchQuery"
          class="search-input"
          aria-label="Search blog posts"
        />
      </div>

      <div class="tag-filter">
        @for (tag of allTags(); track tag) {
          <button
            class="tag-button"
            [class.active]="selectedTags().includes(tag)"
            (click)="toggleTag(tag)"
            type="button"
          >
            🔖 {{ tag }}
          </button>
        }
        
        @if (selectedTags().length > 0 || searchQuery()) {
          <button class="clear-filters" (click)="clearFilters()" type="button">
            Clear filters
          </button>
        }
      </div>
    </div>

    <!-- Loading Skeleton -->
    @if (isLoading()) {
      <div class="blog-grid">
        @for (i of [1, 2, 3]; track i) {
          <app-skeleton src="/bones/blog-card.bones.json" />
        }
      </div>
    }

    <!-- Blog Posts Grid -->
    @if (!isLoading()) {
      @if (filteredPosts().length === 0) {
        <div class="no-results">
          <p>No posts found matching your filters.</p>
        </div>
      } @else {
        <div class="blog-grid">
          @for (post of filteredPosts(); track post.slug) {
            <article class="blog-card">
              <a [routerLink]="['/blog', post.slug]" class="card-link">
                @if (post.coverImage) {
                  <div class="card-image">
                    <img [src]="post.coverImage" [alt]="post.title" loading="lazy" />
                  </div>
                }
                
                <div class="card-content">
                  <h3 class="card-title">{{ post.title }}</h3>
                  
                  <div class="card-meta">
                    <time [attr.datetime]="post.date">{{ formatDate(post.date) }}</time>
                    <span class="meta-separator">·</span>
                    <span class="reading-time">{{ calculateReadingTime(post.excerpt) }} min read</span>
                  </div>
                  
                  <p class="card-excerpt">{{ post.excerpt }}</p>
                  
                  <div class="card-tags">
                    @for (tag of post.tags; track tag) {
                      <span class="tag">#{{ tag }}</span>
                    }
                  </div>
                </div>
              </a>
            </article>
          }
        </div>
      }
    }
  </div>
</section>
```

#### File: `src/app/components/blog/blog-list/blog-list.component.scss`

```scss
@import '../../../styles/tokens';

.blog-section {
  min-height: 100vh;
  padding: 8rem 0;
  background: var(--color-bg-primary);
}

.section-title {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  .section-number {
    opacity: 0.6;
  }

  .section-slash {
    margin: 0 0.5rem;
    opacity: 0.4;
  }
}

.blog-controls {
  margin-bottom: 3rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 240, 200, 0.2);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(74, 240, 200, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-button {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 240, 200, 0.2);
  border-radius: 20px;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-accent);
  }

  &.active {
    background: var(--color-accent);
    color: var(--color-bg-primary);
    border-color: var(--color-accent);
  }
}

.clear-filters {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(255, 100, 100, 0.5);
  border-radius: 20px;
  color: rgba(255, 100, 100, 0.8);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 100, 100, 0.1);
    border-color: rgba(255, 100, 100, 0.8);
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 240, 200, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-8px);
    border-color: var(--color-accent);
    box-shadow: 0 12px 40px rgba(74, 240, 200, 0.2);
  }
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .blog-card:hover & img {
    transform: scale(1.05);
  }
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  font-family: var(--font-mono);

  .meta-separator {
    opacity: 0.5;
  }
}

.card-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  opacity: 0.8;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }

  .search-input {
    max-width: 100%;
  }
}
```

### 6. Blog Post Component

#### File: `src/app/components/blog/blog-post/blog-post.component.ts`

```typescript
import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { MarkdownComponent } from 'ngx-markdown'
import { SkeletonComponent } from 'boneyard-js/angular'
import { firstValueFrom } from 'rxjs'
import { gsap } from 'gsap'
import blogIndex from '../../../content/blog-index.json'

interface BlogPost {
  title: string
  date: string
  slug: string
  tags: string[]
  excerpt: string
  coverImage: string
}

interface TocItem {
  level: number
  text: string
  id: string
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownComponent, SkeletonComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private http = inject(HttpClient)

  readonly allPosts: BlogPost[] = blogIndex as BlogPost[]

  postMetadata = signal<BlogPost | null>(null)
  markdownContent = signal<string>('')
  isLoading = signal(true)
  tableOfContents = signal<TocItem[]>([])

  readonly readingTime = computed(() => {
    const content = this.markdownContent()
    if (!content) return 0
    const wordCount = content.split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / 200))
  })

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug')
    if (!slug) {
      this.router.navigate(['/blog'])
      return
    }

    // Find post metadata from index
    const metadata = this.allPosts.find(p => p.slug === slug)
    if (!metadata) {
      this.router.navigate(['/blog'])
      return
    }

    this.postMetadata.set(metadata)

    // Load markdown file
    try {
      const markdown = await firstValueFrom(
        this.http.get(`/content/blog/${slug}.md`, { responseType: 'text' })
      )
      
      // Remove frontmatter (already in metadata)
      const contentWithoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n/, '')
      this.markdownContent.set(contentWithoutFrontmatter)
      
      this.generateTableOfContents(contentWithoutFrontmatter)
      
      this.isLoading.set(false)
      this.animateEntrance()
    } catch (error) {
      console.error('Failed to load blog post:', error)
      this.router.navigate(['/blog'])
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private generateTableOfContents(markdown: string): void {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const toc: TocItem[] = []
    let match: RegExpExecArray | null

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      toc.push({ level, text, id })
    }

    this.tableOfContents.set(toc)
  }

  private animateEntrance(): void {
    setTimeout(() => {
      gsap.fromTo(
        '.post-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      
      gsap.fromTo(
        '.post-content',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
    }, 100)
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  scrollToHeading(id: string): void {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
```

#### File: `src/app/components/blog/blog-post/blog-post.component.html`

```html
<article class="blog-post">
  @if (isLoading()) {
    <div class="container">
      <app-skeleton src="/bones/blog-post.bones.json" />
    </div>
  }

  @if (!isLoading() && postMetadata(); as post) {
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a routerLink="/blog">Blog</a>
        <span class="separator">></span>
        <span>{{ post.title }}</span>
      </nav>

      <!-- Post Header -->
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>

        <div class="post-meta">
          <time [attr.datetime]="post.date">{{ formatDate(post.date) }}</time>
          <span class="meta-separator">·</span>
          <span class="reading-time">{{ readingTime() }} min read</span>
        </div>

        <div class="post-tags">
          @for (tag of post.tags; track tag) {
            <span class="tag">#{{ tag }}</span>
          }
        </div>

        @if (post.coverImage) {
          <div class="cover-image">
            <img [src]="post.coverImage" [alt]="post.title" />
          </div>
        }
      </header>

      <!-- Table of Contents -->
      @if (tableOfContents().length > 0) {
        <aside class="table-of-contents">
          <h2 class="toc-title">Table of Contents</h2>
          <ul class="toc-list">
            @for (item of tableOfContents(); track item.id) {
              <li [class]="'toc-item toc-level-' + item.level">
                <button
                  (click)="scrollToHeading(item.id)"
                  type="button"
                  class="toc-link"
                >
                  {{ item.text }}
                </button>
              </li>
            }
          </ul>
        </aside>
      }

      <!-- Post Content -->
      <div class="post-content">
        <markdown
          [data]="markdownContent()"
          emoji
          katex
        ></markdown>
      </div>

      <!-- Back to Blog -->
      <footer class="post-footer">
        <a routerLink="/blog" class="back-link">
          ← Back to Blog
        </a>
      </footer>
    </div>
  }
</article>
```

#### File: `src/app/components/blog/blog-post/blog-post.component.scss`

```scss
@import '../../../styles/tokens';

.blog-post {
  min-height: 100vh;
  padding: 4rem 0 8rem;
  background: var(--color-bg-primary);
}

.breadcrumb {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .separator {
    margin: 0 0.75rem;
    opacity: 0.5;
  }
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(74, 240, 200, 0.2);
}

.post-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  font-family: var(--font-mono);

  .meta-separator {
    opacity: 0.5;
  }
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;

  .tag {
    padding: 0.5rem 1rem;
    background: rgba(74, 240, 200, 0.1);
    border: 1px solid rgba(74, 240, 200, 0.3);
    border-radius: 20px;
    font-size: 0.875rem;
    color: var(--color-accent);
    font-family: var(--font-mono);
  }
}

.cover-image {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(74, 240, 200, 0.2);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.table-of-contents {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 240, 200, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);

  .toc-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    font-family: var(--font-mono);
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    margin-bottom: 0.5rem;
  }

  .toc-level-2 {
    padding-left: 0;
  }

  .toc-level-3 {
    padding-left: 1.5rem;
    font-size: 0.9rem;
  }

  .toc-link {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    text-align: left;
    padding: 0.25rem 0;
    transition: color 0.3s ease;
    font-family: inherit;
    font-size: inherit;

    &:hover {
      color: var(--color-accent);
    }
  }
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  line-height: 1.8;

  // Markdown styling
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    color: var(--color-text-primary);
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.3;
  }

  :deep(h2) {
    font-size: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(74, 240, 200, 0.2);
  }

  :deep(h3) {
    font-size: 1.5rem;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(a) {
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-bottom-color: var(--color-accent);
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem 0;
    border: 1px solid rgba(74, 240, 200, 0.2);
  }

  :deep(code) {
    background: rgba(255, 255, 255, 0.05);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.9em;
    color: var(--color-accent);
  }

  :deep(pre) {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(74, 240, 200, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: 0.9rem;
    }
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  :deep(li) {
    margin-bottom: 0.5rem;
  }

  :deep(blockquote) {
    border-left: 4px solid var(--color-accent);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    opacity: 0.9;
  }
}

.post-footer {
  max-width: 800px;
  margin: 4rem auto 0;
  padding-top: 3rem;
  border-top: 1px solid rgba(74, 240, 200, 0.2);
}

.back-link {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 240, 200, 0.2);
  border-radius: 8px;
  color: var(--color-accent);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-accent);
    transform: translateX(-4px);
  }
}
```

### 7. Configure Routing

#### Update `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { ExperienceComponent } from './components/experience/experience.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { SkillsComponent } from './components/skills/skills.component'
import { HobbiesComponent } from './components/hobbies/hobbies.component'
import { BlogListComponent } from './components/blog/blog-list/blog-list.component'
import { BlogPostComponent } from './components/blog/blog-post/blog-post.component'
import { ContactComponent } from './components/contact/contact.component'

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
    title: 'Wim Stienstra | Frontend Developer',
  },
  {
    path: 'blog',
    component: BlogListComponent,
    title: 'Blog | Wim Stienstra',
  },
  {
    path: 'blog/:slug',
    component: BlogPostComponent,
    title: 'Blog Post | Wim Stienstra', // Will be dynamically updated
  },
  {
    path: '**',
    redirectTo: '',
  },
]
```

### 8. Configure Prerendering

#### Update `angular.json` (in `projects.wimstienstra.architect.build.options`)

```json
{
  "prerender": {
    "routesFile": "prerender-routes.txt"
  }
}
```

#### Create `prerender-routes.txt` generator script

#### File: `scripts/generate-prerender-routes.js`

```javascript
const fs = require('fs')
const path = require('path')

const blogIndex = require('../src/content/blog-index.json')

const routes = [
  '/',
  '/blog',
  ...blogIndex.map(post => `/blog/${post.slug}`)
]

const outputFile = path.join(__dirname, '../prerender-routes.txt')
fs.writeFileSync(outputFile, routes.join('\n'))

console.log(`✅ Generated ${routes.length} prerender routes`)
```

#### Update `package.json` prebuild script

```json
{
  "scripts": {
    "blog:index": "node scripts/generate-blog-index.js",
    "blog:routes": "node scripts/generate-prerender-routes.js",
    "prebuild": "npm run blog:index && npm run blog:routes",
    "build": "ng build"
  }
}
```

---

## Testing & Verification

1. **Create sample blog posts**
   - Write 2-3 markdown files in `src/content/blog/`
   - Add images to `public/assets/blog/`
   - Test various markdown features (headings, lists, code blocks, images, links)

2. **Run blog index generator**
   ```bash
   npm run blog:index
   ```
   - Verify `src/content/blog-index.json` contains all posts
   - Check metadata extraction is correct

3. **Development testing**
   ```bash
   ng serve
   ```
   - Navigate to `/blog` — verify list displays correctly
   - Test search functionality
   - Test tag filtering (single and multi-select)
   - Click a post card — verify route navigation
   - On post page:
     - Verify markdown renders correctly
     - Check code syntax highlighting works (PrismJS)
     - Verify table of contents generates and scrolls work
     - Check images display correctly
     - Verify reading time calculation
     - Test "Back to Blog" link

4. **Build and prerender**
   ```bash
   npm run build
   ```
   - Verify `dist/wimstienstra/browser/blog/index.html` exists
   - Verify `dist/wimstienstra/browser/blog/[slug]/index.html` exists for each post
   - Check all routes prerendered successfully

5. **Boneyard skeleton capture**
   ```bash
   npx boneyard capture --url http://localhost:4200/blog --output src/bones/blog-list.bones.json
   npx boneyard capture --url http://localhost:4200/blog/first-home-automation-setup --output src/bones/blog-post.bones.json
   ```

---

## Accessibility

- **Semantic HTML**: Use `<article>`, `<nav>`, `<aside>`, `<time>`, etc.
- **ARIA labels**: Search input has `aria-label="Search blog posts"`
- **Keyboard navigation**: All interactive elements (tag buttons, TOC links) are keyboard accessible
- **Focus management**: Ensure focus indicators visible on all controls
- **Alt text**: All images must have meaningful alt text in markdown
- **Heading hierarchy**: Ensure proper heading levels in markdown (no skipping levels)

---

## Performance Considerations

- **Lazy loading images**: Use `loading="lazy"` on list page images
- **Code splitting**: Blog routes are automatically code-split by Angular
- **Prerendering**: All routes prerendered for instant first paint
- **Markdown parsing**: Only parse markdown on-demand when viewing a post
- **Build-time index**: Fast list page load (no markdown parsing needed)

---

## Future Enhancements (Optional)

1. **RSS Feed Generation**
   - Add RSS/Atom feed generator to `generate-blog-index.js`
   - Output `public/feed.xml` with post metadata

2. **Related Posts**
   - At bottom of post page, show 2-3 related posts based on shared tags

3. **Comments**
   - Integrate Giscus (GitHub Discussions) for comments

4. **Share Buttons**
   - Add Twitter/LinkedIn share buttons to post pages

5. **View Counter**
   - Integrate simple analytics (Plausible or umami) to track views

6. **Draft Preview Mode**
   - Add query param `?preview=true` to view draft posts in development

---

## Notes

- **Draft posts**: Set `draft: true` in frontmatter; they'll be filtered out in production builds
- **Image paths**: All markdown image paths should be absolute from `public/`, e.g., `/assets/blog/image.jpg`
- **Code highlighting**: Add more Prism language components in `app.config.ts` as needed
- **Content updates**: Just commit new `.md` files or update existing ones; GitHub Actions rebuilds automatically
