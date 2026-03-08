# Lightheart Next.js

Next.js 15 + SCSS rewrite of the Lightheart immersive experience spec viewer.

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify the SCSS foundation is working.

## Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout + providers
├── page.tsx            # Homepage
├── page.module.scss    # Homepage styles
├── brief/page.tsx      # Stub — Section 1
├── projection/page.tsx # Stub — Section 3
├── ...                 # All 16 routes stubbed
components/             # Shared components (Step 3-4)
data/                   # LiveDocProvider + types (Step 2)
├── types.ts            # SpecData types — ready
hooks/                  # Custom hooks (Step 7)
sections/               # Homepage sections (Step 5)
styles/                 # SCSS architecture
├── globals.scss        # Entry point
├── _variables.scss     # Design tokens
├── _mixins.scss        # Reusable patterns
├── _animations.scss    # Keyframes
└── _base.scss          # Reset + utility classes
```

## Migration Status

- [x] Step 1: Next.js scaffold + SCSS foundation
- [x] Step 2: Data layer (LiveDocProvider + useLiveSection)
- [x] Step 3: App shell (layout, header, footer, auth, HUD)
- [x] Step 4: UI component library (SpecTable, DocSectionRenderer, SpecPage)
- [x] Step 5: Homepage with live data overview
- [x] Step 6: All 16 pages wired to live doc
- [ ] Step 7: Optional polish (SoundEngine, HudSettings panel, CustomCursor)
- [ ] Step 8: Deploy to Vercel

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework: **Next.js** (auto-detected)
4. Deploy
