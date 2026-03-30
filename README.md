# Pixel Desktop Remastered

Pixel Desktop Remastered is a personal site built as a Windows 95 desktop shell with a parallel reading mode for people who want the content without the nostalgia layer.

The project is intentionally opinionated. It keeps the operating-system metaphor, but it also treats routing, search metadata, blog structure, and case-study pages like first-class parts of the product.

## What It Includes

- a Windows 95-style desktop with draggable windows and app-like navigation
- a cleaner reading surface for experience, writing, selected builds, and contact
- route-aware metadata for articles and project pages
- generated `sitemap.xml`, `rss.xml`, and social preview assets
- dedicated project pages for the strongest public builds

## Why It Exists

Most personal sites look interchangeable. This repo was built to keep a distinctive interface idea without sacrificing clarity, search visibility, or usability.

The site is also a good frontend systems exercise:

- interface design with constraints
- multi-mode navigation
- content modeling
- metadata and structured data
- generated static assets as part of the build pipeline

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router

## Project Structure

```text
src/
  components/
    applications/   # Win95 app windows
    ui/             # shared UI primitives
  config/           # desktop and shell configuration
  data/             # portfolio, blog, and case-study content
  hooks/            # app hooks
  pages/            # route-level pages

public/
  blog/posts/       # markdown posts
  projects/         # generated project share cards
  rss.xml           # generated feed
  sitemap.xml       # generated sitemap

scripts/
  generate_site_assets.py
```

## Local Development

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

The production build automatically regenerates:

- `public/rss.xml`
- `public/sitemap.xml`
- `public/og-image.jpg`
- project preview cards in `public/projects/`

If you want to run that generation step directly:

```bash
npm run generate:site
```

## Modes and Routes

- `/` renders the cleaner reading mode by default
- `/?mode=win95` opens the Windows 95 shell
- `/blog/:slug` opens blog posts in the Win95 browser view
- `/projects/:slug` renders project case-study pages

## Content Sources

- work and build data live in `src/data/portfolioData.ts`
- project case studies live in `src/data/caseStudies.ts`
- blog posts are markdown files in `public/blog/posts/`

## Notes

- This repo intentionally avoids generic personal-site copy and exposed internal labels.
- Search and social assets are generated from source content so they do not drift from the published site.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run generate:site` | Regenerate feed, sitemap, and social assets |
| `npm run build` | Generate assets and build production output |
| `npm run build:dev` | Development-mode build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Site

- Live: [prithivraj.xyz](https://prithivraj.xyz)
- Win95 mode: [prithivraj.xyz/?mode=win95](https://prithivraj.xyz/?mode=win95)
