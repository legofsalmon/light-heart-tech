# Lightheart — Site Architecture & Developer Guide

> **Purpose:** Technical reference for website development and deployment
> **Last updated:** March 11, 2026
> **Repo:** `screeney/light-heart-tech` on GitHub

---

## Repository Structure

```
light-heart-tech/
├── app/                    ← Next.js 15 app (tech spec viewer)
├── components/             ← React components (tech spec UI)
├── data/                   ← Tech spec data (synced from Google Docs via Cloudflare Worker)
├── styles/                 ← SCSS styles (tech spec app)
├── public/
│   ├── marketing/          ← Static marketing website (HTML/CSS/JS)
│   │   ├── index.html      ← Homepage
│   │   ├── about.html      ← About page
│   │   ├── exhibitions.html
│   │   ├── visit.html
│   │   ├── membership.html ← Founding Circle
│   │   ├── press.html      ← Press & media
│   │   ├── newsletter.html ← Newsletter signup
│   │   ├── assets/
│   │   │   ├── css/main.css   ← Design system (see DESIGN-TOKENS.md)
│   │   │   ├── js/main.js    ← Analytics, forms, scroll tracking
│   │   │   └── images/       ← (populated after photography)
│   │   ├── internal/
│   │   │   ├── index.html    ← Internal document hub
│   │   │   └── plan.html     ← 21-section strategy dashboard (~91KB)
│   │   ├── _headers          ← Security headers (noindex for staging)
│   │   └── _redirects        ← Clean URLs (/about → about.html)
│   └── brand/              ← Brand & development assets
│       ├── for-rad/        ← Strategy docs for RAD
│       ├── for-developers/ ← Design tokens & architecture (this file)
│       └── shared/         ← Shared assets (logos, fonts, photos)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Two Applications, One Repo

### 1. Tech Spec Viewer (Next.js)
- **Path:** Root (`/`)
- **Tech:** Next.js 15, React, TypeScript, SCSS
- **Data source:** Cloudflare Worker at `lightheart-doc-sync.idirnet-lightheart.workers.dev`
- **Purpose:** Internal tech specification viewer (syncs from Google Docs)

### 2. Marketing Website (Static HTML)
- **Path:** `/marketing/`
- **Tech:** Static HTML, CSS, vanilla JS
- **Purpose:** Public-facing marketing site (pre-launch)
- **Pages:** 7 public + 2 internal

---

## Marketing Site Pages

| Page | Path | Purpose |
|------|------|---------|
| Homepage | `/marketing/` | Hero, value proposition, key CTAs |
| About | `/marketing/about.html` | Story, team, curatorial principles |
| Exhibitions | `/marketing/exhibitions.html` | Exhibition programme, coming soon |
| Visit | `/marketing/visit.html` | Location, hours, tickets, accessibility |
| Membership | `/marketing/membership.html` | Founding Circle tiers and signup |
| Press | `/marketing/press.html` | Press kit, media contacts, embargo protocol |
| Newsletter | `/marketing/newsletter.html` | Email signup form |

### Internal Pages (Not Public)
| Page | Path | Purpose |
|------|------|---------|
| Document Hub | `/marketing/internal/` | Navigation to all internal resources |
| Strategy Dashboard | `/marketing/internal/plan.html` | 21-section marketing strategy with sidebar nav |

---

## Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Running Locally

```bash
# Clone the repo
git clone https://github.com/screeney/light-heart-tech.git
cd light-heart-tech

# Install dependencies (for Next.js app)
npm install

# Run Next.js dev server
npm run dev
# → http://localhost:3000 (tech spec viewer)
# → http://localhost:3000/marketing/ (marketing site — static files)

# Or serve marketing site standalone
cd public/marketing
python3 -m http.server 8765
# → http://localhost:8765
```

---

## Deployment

### Platform: Vercel
- **Domain:** `staging.idirnet.com`
- **Repo:** `screeney/light-heart-tech`
- **Auto-deploy:** Pushes to `main` deploy automatically
- **Branch previews:** Feature branches get preview URLs

### URL Routing
- `/` → Next.js tech spec app
- `/marketing/` → Static marketing site
- `/brand/` → Brand assets directory

### Security Headers (Staging)
Currently set to `noindex, nofollow` — remove before public launch.

---

## JavaScript (`main.js`)

The marketing site JS handles:
- **Analytics:** Scroll depth tracking, CTA clicks, page timing
- **Newsletter:** Form submission with validation
- **Navigation:** Header scroll effect, mobile menu toggle
- **Scroll tracking:** Section visibility for engagement metrics

No framework dependencies — vanilla JS only.

---

## CSS Architecture

Single file: `assets/css/main.css` (~1,000 lines)

### Section Order
1. CSS Variables (design tokens)
2. Reset & base styles
3. Typography
4. Layout (container, section)
5. Header & navigation
6. Hero section
7. Component patterns (cards, buttons, forms)
8. Page-specific styles
9. Responsive breakpoints
10. Utility classes

### Naming Convention
- BEM-influenced: `.block`, `.block-modifier`
- CSS variables for all values (colours, spacing, typography)
- Mobile-first responsive approach

---

## Integration Points

### Cloudflare Worker
- **URL:** `lightheart-doc-sync.idirnet-lightheart.workers.dev`
- **Purpose:** Syncs Google Doc tech spec to JSON
- **Consumer:** Next.js tech spec viewer (`data/` directory)

### Google Fonts
- Playfair Display (display headings)
- Inter (body text)
- Loaded via Google Fonts CDN with preconnect

### Future Integrations (Post-Launch)
- Newsletter provider (TBD — Mailchimp, ConvertKit, or Buttondown)
- Ticket booking system
- Analytics (GA4 or Plausible)

---

## Git Workflow

### Branches
- `main` — Production (deploys to staging.idirnet.com)
- `feature/*` — Feature branches (get Vercel preview URLs)

### Commit Convention
```
type: short description

Longer description if needed.

Co-Authored-By: [Author] <email>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `content`

---

*For design token details, see DESIGN-TOKENS.md in this directory.*
