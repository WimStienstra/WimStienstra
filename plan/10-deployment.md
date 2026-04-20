# Step 10 — Deployment (GitHub Actions → GitHub Pages)

## Objective
Configure automatic deployment of the Angular portfolio to GitHub Pages using GitHub Actions. Every push to `main` triggers a production build and deploys the output folder. The custom domain `wimstienstra.nl` is configured.

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

      - name: Build Angular app
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/wimstienstra/browser

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

> **Angular output path:** Angular 17+ with the new esbuild builder outputs to `dist/<project>/browser/`. Confirm the exact path by checking the `outputPath` in `angular.json` under `projects.wimstienstra.architect.build.options`. Adjust the `path:` in the workflow if needed.

---

### `public/CNAME`

For the custom domain `wimstienstra.nl`:

```
wimstienstra.nl
```

> GitHub Pages also needs the domain configured in the repo settings: *Settings → Pages → Custom domain → `wimstienstra.nl`*

---

### `angular.json` — Confirm Base Href & Output Path

Under `projects.wimstienstra.architect.build.options`:

```json
{
  "baseHref": "/",
  "outputPath": "dist/wimstienstra"
}
```

For the production configuration, ensure `outputHashing` is `"all"` for long-term cache busting:

```json
{
  "configurations": {
    "production": {
      "outputHashing": "all"
    }
  }
}
```

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

GitHub will automatically provision an HTTPS certificate (Let's Encrypt) once DNS propagates (up to 24h).

---

## GitHub Repository Settings

1. Go to *Settings → Pages*
2. Under *Build and deployment → Source*, select **GitHub Actions**
3. Add the custom domain `wimstienstra.nl` and check *Enforce HTTPS*

---

## `index.html` Meta Tags

Update `src/index.html` with proper meta tags:

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
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
```

---

## Favicon

Create `public/favicon.svg`:
- "WS" monogram in JetBrains Mono, accent color `#4af0c8` on dark navy `#080d1a` background
- Or a minimal geometric mark using the accent color

---

## Performance Targets

After deployment, run a Lighthouse audit:

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

Angular-specific optimisations included by default:
- Tree-shaking (dead code removed)
- Lazy loading (standalone components load on demand if routing is added later)
- Asset hashing (long-term cache)
- esbuild bundler (fast, small output)

Quick wins:
- Add `loading="lazy"` on all `<img>` below the fold (already in plans for each section)
- Ensure `public/robots.txt` exists
- Add `public/sitemap.xml` (optional but helps SEO)

---

## Verify Deployment

After the first successful workflow run:
1. Open `https://wimstienstra.nl` — site loads
2. Open `https://www.wimstienstra.nl` — redirects to apex domain
3. Check HTTPS padlock is valid
4. Test all anchor links (`#about`, `#experience`, `#projects`, `#skills`, `#hobbies`, `#contact`)
5. Test on mobile (Chrome DevTools: iPhone 14, Pixel 7)

---

## Acceptance Criteria
- [ ] `.github/workflows/deploy.yml` exists and is valid YAML
- [ ] `public/CNAME` contains `wimstienstra.nl`
- [ ] `angular.json` has `baseHref: "/"` and correct output path
- [ ] Pushing to `main` triggers the workflow (visible in Actions tab)
- [ ] Workflow completes successfully (build + deploy jobs green)
- [ ] Output path in the workflow matches the Angular build output
- [ ] Site is live at `https://wimstienstra.nl`
- [ ] HTTPS is enforced
- [ ] `index.html` has all required meta tags and Google Fonts preconnect
- [ ] Favicon is visible in browser tab
