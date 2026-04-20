# Step 10 — Deployment (Static Files → wimstienstra.nl)

## Objective
Build the Angular portfolio into a set of **purely static files** and deploy them to Wim's existing static web host under `wimstienstra.nl`. No server-side rendering is used — `ng build` produces HTML, hashed JS/CSS, and assets that any static host can serve without configuration.

---

## Why This Works with Any Static Host

The portfolio uses:
- **No Angular Router** (`--routing false`) → no deep-link 404 problem
- **No SSR / SSG** → no Node.js server needed
- **Pure `baseHref: "/"`** → all paths resolve from the domain root

The output folder `dist/wimstienstra/browser/` is 100% static and identical to what Netlify, Cloudflare Pages, Vercel, shared cPanel hosting, or any FTP-based host would expect.

---

## Build Command

```bash
npm run build
# equivalent to: ng build --configuration production
```

Angular 21 uses the **esbuild** bundler by default. Expected output:

```
dist/
└── wimstienstra/
    └── browser/
        ├── index.html
        ├── main-XXXX.js
        ├── polyfills-XXXX.js
        ├── styles-XXXX.css
        └── assets/
            ├── avatar.jpg
            ├── cv-wim-stienstra.pdf
            ├── experience/
            ├── skills/
            └── hobbies/
```

> Upload **everything inside `dist/wimstienstra/browser/`** to the root of your web host.

---

## `angular.json` — Build Options to Confirm

Under `projects.wimstienstra.architect.build.options`:

```json
{
  "baseHref": "/",
  "outputPath": "dist/wimstienstra"
}
```

Production configuration (should be present by default in Angular 21):

```json
{
  "configurations": {
    "production": {
      "outputHashing": "all",
      "optimization": true,
      "sourceMap": false
    }
  }
}
```

---

## Deployment Options

Choose the method that fits the hosting provider.

---

### Option A — Manual Upload (cPanel / File Manager / FTP)

1. Run `npm run build` locally
2. Open your host's file manager or FTP client (FileZilla, WinSCP, etc.)
3. Upload the contents of `dist/wimstienstra/browser/` to the **document root** of `wimstienstra.nl` (usually `public_html/` or `www/`)
4. If a previous version exists, delete old hashed JS/CSS files first to avoid stale file conflicts

> **Tip:** Enable gzip/brotli compression in your host's `.htaccess` or control panel for better performance.

Optional `.htaccess` for Apache-based hosts (add to the root of the upload):

```apacheconf
# Cache hashed assets for 1 year
<FilesMatch "\.[0-9a-f]{8,}\.(js|css)$">
  Header set Cache-Control "max-age=31536000, immutable"
</FilesMatch>

# Cache index.html for 10 minutes only
<Files "index.html">
  Header set Cache-Control "max-age=600, no-cache"
</Files>

# Enable gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

### Option B — Netlify (free, automatic deploys from GitHub)

1. Connect the `WimStienstra/WimStienstra` GitHub repo to Netlify
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/wimstienstra/browser`
   - **Node version:** `22`
3. Add custom domain `wimstienstra.nl` in *Netlify → Domain management*
4. Netlify provisions HTTPS automatically (Let's Encrypt)

`netlify.toml` (optional, place in repo root for committed config):

```toml
[build]
  command = "npm run build"
  publish = "dist/wimstienstra/browser"

[build.environment]
  NODE_VERSION = "22"
```

---

### Option C — Cloudflare Pages (free, automatic deploys from GitHub)

1. Connect the repo in Cloudflare Pages
2. Build settings:
   - **Framework preset:** Angular
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/wimstienstra/browser`
   - **Node.js version:** `22`
3. Add custom domain `wimstienstra.nl` in Cloudflare Pages → Custom domains
4. HTTPS provisioned automatically

---

### Option D — Vercel (free)

1. Import repo in Vercel; choose "Angular" framework
2. Override output directory to `dist/wimstienstra/browser`
3. Add `wimstienstra.nl` as a custom domain

---

### Option E — GitHub Actions CI Build + FTP Deploy

If the host only supports FTP, use a GitHub Actions workflow to build and push automatically on every push to `main`:

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy Portfolio

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node 22
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Angular app
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: dist/wimstienstra/browser/
          server-dir: /public_html/    # adjust to your host's root path
```

> Add `FTP_HOST`, `FTP_USERNAME`, and `FTP_PASSWORD` as encrypted GitHub Actions secrets (*Repo → Settings → Secrets and variables → Actions*). Never hardcode credentials.

---

## DNS Configuration

Point the domain to the static host. Exact records depend on the hosting provider — use the values they provide:

| Common provider | Record type | Typical value |
|-----------------|-------------|---------------|
| cPanel / shared host | A | IP from host's control panel |
| Netlify | CNAME (apex: A + AAAA) | `<app>.netlify.app` |
| Cloudflare Pages | CNAME (proxied) | `<app>.pages.dev` |
| Vercel | A | `76.76.21.21` |

**www redirect:** Add a CNAME `www → wimstienstra.nl` and enable a redirect (301) in the host's control panel so `www.wimstienstra.nl` → `wimstienstra.nl`.

---

## `index.html` Meta Tags

Update `src/index.html` with proper meta tags for SEO and social sharing:

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

After deployment, run a Lighthouse audit at `https://wimstienstra.nl`:

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

Angular 21 build optimisations active by default:
- **esbuild** bundler — fast, compact output
- Tree-shaking — no unused code
- Asset hashing — long-term browser cache
- Defer loading — non-critical scripts load after paint

Quick wins to check:
- `loading="lazy"` on all `<img>` below the fold (already in each section plan)
- `public/robots.txt` exists (`User-agent: *\nAllow: /`)
- `.htaccess` gzip rules if on Apache

---

## Verify Deployment

1. Open `https://wimstienstra.nl` — site loads
2. Open `https://www.wimstienstra.nl` — redirects to apex domain
3. HTTPS padlock is valid
4. All section anchors work: `#about`, `#experience`, `#projects`, `#skills`, `#hobbies`, `#contact`
5. Test on mobile (Chrome DevTools: iPhone 15, Pixel 8)
6. Run Lighthouse audit

---

## Acceptance Criteria
- [ ] `npm run build` succeeds and `dist/wimstienstra/browser/` is populated
- [ ] `angular.json` has `baseHref: "/"` and correct output path
- [ ] All static files (HTML, JS, CSS, assets) upload to the host root
- [ ] Site is live at `https://wimstienstra.nl`
- [ ] HTTPS is active
- [ ] `www.wimstienstra.nl` redirects to apex
- [ ] `index.html` has all required meta tags and Google Fonts preconnect
- [ ] Favicon visible in browser tab
- [ ] Lighthouse Performance ≥ 90
