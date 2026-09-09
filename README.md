# lfdiego.xyz

[![Deploy to production](https://github.com/DiegoLikesPizza/lfdiego.xyz/actions/workflows/deploy.yml/badge.svg)](https://github.com/DiegoLikesPizza/lfdiego.xyz/actions/workflows/deploy.yml)

My personal site — a portfolio for **Diego Göttler**, software developer.
Live at **[lfdiego.xyz](https://lfdiego.xyz)**.

A light, near-monochrome editorial design ("Ledger Editorial"): warm paper-white,
near-black ink, and a single warm accent, with a numbered, editorial *Selected
Work* index. Built to read as professional first, distinctive second.

## Tech

- **[Next.js 16](https://nextjs.org)** (App Router) — static export (`output: 'export'`)
- **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — design tokens in `globals.css`
- **[Framer Motion](https://www.framer.com/motion/)** — restrained, reduced-motion-aware reveals
- **[lucide-react](https://lucide.dev)** — icons
- Fonts (via `next/font`): Space Grotesk (headings), Inter (body), JetBrains Mono (labels)

## Local development

Requires **Node 20+**.

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production static export -> ./out
npm run lint     # eslint
```

The build is a pure static export, so `./out` can be served by any static host —
no Node runtime needed in production.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        # root layout: fonts, metadata, sticky header
│  ├─ page.tsx          # hero + section composition
│  ├─ globals.css       # design tokens + base styles
│  └─ icon.svg          # favicon (DG monogram)
├─ components/
│  ├─ SiteHeader.tsx    # sticky nav with active-section underline
│  ├─ Monogram.tsx      # "DG" brand mark
│  ├─ SectionIndex.tsx  # "01 / About" editorial section labels
│  ├─ Reveal.tsx        # scroll reveal (honors prefers-reduced-motion)
│  ├─ AboutSection.tsx
│  ├─ StackSection.tsx
│  ├─ ProjectsSection.tsx
│  └─ ContactSection.tsx
└─ lib/
   └─ utils.ts          # cn() class-name helper
```

## Deployment

Hosted on a Linux server behind nginx. Every push to `main` triggers the
**Deploy to production** GitHub Action, which builds the static export on the
server and publishes it — so shipping a change is just:

```bash
git push origin main
```

The workflow lives in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

© 2026 Diego Göttler
