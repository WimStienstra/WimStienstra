# Step 10 — Deployment (GitHub Actions → GitHub Pages)

## Objective
Configure automatic deployment of the portfolio to GitHub Pages using GitHub Actions. Every push to `main` triggers a production build and deploys the `dist/` folder. The custom domain `wimstienstra.nl` is configured.

---

## Files to Create

### `.github/workflows/deploy.yml`

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### `public/CNAME`

For the custom domain `wimstienstra.nl`:

```
wimstienstra.nl
```

> **Note:** GitHub Pages also needs the domain configured in the repo settings: *Settings → Pages → Custom domain → `wimstienstra.nl`*

---

### DNS Configuration (outside repo — inform Wim)

In the DNS settings for `wimstienstra.nl`, add these records:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `wimstienstra.github.io` |

GitHub will automatically provision an HTTPS certificate (Let's Encrypt) once the DNS propagates (can take up to 24h).

---

### `vite.config.js` — Confirm Base Path

With the custom domain (`wimstienstra.nl`), the site is served from the root, so `base` should be `'/'`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

---

## GitHub Repository Settings

Enable GitHub Pages with Actions as the source:
1. Go to the repository *Settings → Pages*
2. Under *Build and deployment → Source*, select **GitHub Actions**
3. Add the custom domain `wimstienstra.nl` and check *Enforce HTTPS*

---

## Verify Deployment

After the first successful workflow run:
1. Open `https://wimstienstra.nl` — site loads
2. Open `https://www.wimstienstra.nl` — redirects to apex domain
3. Check HTTPS certificate is valid (padlock in browser)
4. Test all anchor links (`#about`, `#experience`, `#projects`, `#skills`, `#contact`)
5. Test on mobile (Chrome DevTools responsive mode: iPhone 14, Pixel 7)

---

## Performance Targets

After deployment, run a Lighthouse audit (`lighthouse https://wimstienstra.nl`):

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

Typical optimisations already covered by Vite:
- Tree-shaking (unused code removed)
- CSS Modules (no unused CSS)
- Asset hashing (long-term cache)

Additional quick wins:
- Add `<meta>` tags in `index.html` (OG tags, description, viewport)
- Add `robots.txt` in `public/`
- Add a `sitemap.xml` in `public/` (optional but helps SEO)
- Set `loading="lazy"` on the avatar `<img>` in About

---

## `index.html` Meta Tags

Update the existing `index.html` with proper meta tags:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wim Stienstra — Frontend Developer</title>
  <meta name="description" content="Frontend developer specialising in Angular monorepo systems, AI-assisted coding, and scalable frontend architecture. Based in Leeuwarden, Netherlands." />
  <meta property="og:title" content="Wim Stienstra — Frontend Developer" />
  <meta property="og:description" content="Frontend developer specialising in Angular monorepo systems, AI-assisted coding, and scalable frontend architecture." />
  <meta property="og:url" content="https://wimstienstra.nl" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://wimstienstra.nl" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
```

---

## Favicon

Create a minimal SVG favicon at `public/favicon.svg`:
- "WS" monogram in `JetBrains Mono`, accent color on dark background
- Or a simple geometric mark using the accent color `#4af0c8`

---

## Acceptance Criteria
- [ ] `.github/workflows/deploy.yml` exists and is valid YAML
- [ ] `public/CNAME` contains `wimstienstra.nl`
- [ ] Pushing to `main` triggers the workflow (visible in Actions tab)
- [ ] Workflow completes successfully (build + deploy jobs green)
- [ ] Site is live at `https://wimstienstra.nl`
- [ ] HTTPS is enforced
- [ ] Lighthouse Performance score ≥ 90
- [ ] `index.html` has all required meta tags
- [ ] Favicon is visible in browser tab
