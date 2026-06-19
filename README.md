# Rizwan Qureshy

Personal site for Rizwan Qureshy, AI strategist at Equinix and author of
*Think Before You AI*. Built with Astro, TypeScript, and Tailwind CSS, with a
WebGL hero and rich scroll motion via React islands.

## Tech stack

- **Astro 5** with static output (fast, SEO friendly, deploys anywhere).
- **TypeScript** and **Tailwind CSS 4** (CSS first design tokens).
- **React islands** (`@astrojs/react`) only where interactivity lives.
- **Motion** (Framer Motion) for reveals, magnetic buttons, and the animated headline.
- **React Three Fiber** and **Three.js** for the WebGL aurora hero.
- **Lenis** for smooth scrolling.
- Content authored in Markdown / MDX via Astro **content collections**.

## Getting started

Requires Node 18.20+ or 20+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the production site to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/
    nav/            Nav and Footer
    react/          Interactive islands (HeroCanvas, Reveal, MagneticButton, ...)
    sections/       Composed page sections (Hero, BookFeature, CTASection, ...)
    PageHeader.astro, ArticleCard.astro
  content/
    writing/        Articles (Markdown / MDX)
  layouts/
    BaseLayout.astro  Head, SEO meta, JSON-LD, nav, footer
  lib/
    site.ts         Central config: identity, links, pillars, credentials, flags
    format.ts       Date and reading time helpers
  pages/            Routes (index, about, book, writing, speaking, contact, 404)
  styles/
    global.css      Design tokens and global styles
public/             Static assets (favicon, robots.txt, images, og)
src/content.config.ts  Writing collection schema
```

## Editing your content

Almost everything you will want to change lives in **`src/lib/site.ts`**:
identity, job title, tagline, contact email, social links, the book details,
the five content pillars, credentials, and feature flags.

### Add an article

Create a new file in `src/content/writing/`, for example `my-post.md`:

```md
---
title: "Your title"
description: "One or two sentence summary used in listings and meta tags."
pubDate: 2026-06-01
pillar: "Responsible and ethical AI"   # optional, used as a tag
draft: false                            # set true to hide while drafting
---

Your article body in Markdown. MDX is also supported (`.mdx`).
```

The file name becomes the URL slug: `my-post.md` to `/writing/my-post`.
New posts appear automatically on `/writing` and in the home page Latest
writing section, sorted by `pubDate`.

### Toggle the Speaking page

In `src/lib/site.ts`, set `flags.speaking` to `false` to remove the Speaking
page from the nav. The `flags.selectedWork` flag is reserved for a future
work section and is intentionally off.

## Image and file slots

These placeholders are clearly marked in the code. Drop in real assets and
replace the placeholder markup noted in the comment beside each one:

- `public/images/headshot.jpg` (used on the home hero and the about page)
- `public/images/book-cover.jpg` (book page and home callout)
- `public/files/rizwan-qureshy-bio.pdf` (about page download)

The social share image `public/og/default.png` is already generated from the
brand design and included. See `public/og/README.md` to change it.

## Things to replace before launch

Search the codebase for `TODO` and update:

- Custom domain, currently `https://example.com` (in `src/lib/site.ts`,
  `astro.config.mjs`, and `public/robots.txt`).

Contact email, LinkedIn URL, and the book's Amazon link are already set.

## SEO and metadata

- Per page title, description, canonical URL, Open Graph, and Twitter cards.
- JSON-LD: Person and Book site wide, Article on each post.
- Sitemap generated at build (`/sitemap-index.xml`) and `robots.txt`.

## Analytics

No tracking ships by default. A clearly marked, commented out slot is in
`src/layouts/BaseLayout.astro`. Paste your analytics snippet there when ready.

## Accessibility

Semantic HTML, a skip link, keyboard navigable nav, visible focus styles,
alt text on real images (please add it when you replace the slots), and full
`prefers-reduced-motion` support that disables the heavy motion and falls back
to static visuals. Text colors target WCAG AA contrast.

## Deploy (GitHub Pages)

This repo is set up to deploy to a GitHub Pages **user site** at the root,
`https://rizqureshy.github.io`, via the workflow in
`.github/workflows/deploy.yml`. To go live:

1. **Name the repo `rizqureshy.github.io`.** A user site only serves from a
   repo with that exact name. Rename this repo in Settings, or create a new
   repo named `rizqureshy.github.io` and push this code to it.
2. **Enable Pages from Actions.** In the repo, go to Settings, then Pages, and
   set Source to "GitHub Actions".
3. **Push.** The workflow builds and deploys automatically on push to the
   configured branch (currently `claude/vibrant-meitner-j1ynb9`; change it to
   `main` in the workflow once that is your default branch). You can also run
   it manually from the Actions tab.

The site is fully static, so it also hosts anywhere else (Vercel, Netlify,
Cloudflare Pages): build with `npm run build`, publish `dist/`.

### Custom domain later

Set `site` in `astro.config.mjs` and `url` in `src/lib/site.ts` to the new
domain, add a `public/CNAME` file containing the domain, and configure the
domain under Settings, then Pages. Canonical URLs, the sitemap, and social
tags will follow.

## Note on the WebGL hero

The hero ships Three.js, which is a meaningful amount of JavaScript. It is
lazy loaded only when the hero is in view, and it falls back to a static CSS
aurora under reduced motion. If you ever want a lighter site, the hero is
isolated in `src/components/react/HeroCanvas.tsx` and can be swapped for a CSS
or canvas effect without touching anything else.
