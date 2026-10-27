# Hans Impex — 360° E-Showroom

An immersive, browser-based **360° virtual e-showroom** for Hans Impex (Noida export house, est. 2003) — a WebGL panorama built with Three.js that presents premium Indian dry fruits, machine-cleaned makhana (foxnuts), and export spices.

Live brand site: [hansimpex.online](https://hansimpex.online/)

## Features

- **360° panorama viewport** — inverted equirectangular sphere rendered with Three.js, with drag/keyboard navigation and hot-spot anchors.
- **Interactive product hot-spots** — category-aware screen anchors driven by `js/catalog.js` (Dry Fruits, Makhana, Spices).
- **Live search HUD** — instant product search across the catalog.
- **Lighting modes & audio soundscape** — atmosphere and ambience toggles.
- **Guided auto-tour** and a mobile layout.
- **Offline support** — the panorama falls back through a multi-tier texture candidate chain, including a `file://` base64 embed, so the showroom works without a server.

## Project Structure

```
.
├── index.html                 # Single-page app entry
├── css/
│   └── showroom.css           # All UI styling
├── js/
│   ├── catalog.js             # Product / category catalog + spec data
│   ├── showroom.js            # Three.js panorama engine & interactions
│   └── three.min.js           # Three.js library
├── assets/                    # Product images, verification shots, panorama, logo
├── background.webp|.jpg       # Primary 360° panorama texture
└── backgraound*.webp|.jpg     # Fallback panorama textures (name kept for the loader chain)
```

> The `backgraound*` files are intentionally named with the historical typo — `js/showroom.js` references them as texture fallbacks.

## Running Locally

It is a fully static site with no build step. Serve the root directory with any static server:

```powershell
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open `http://localhost:8080`. Opening `index.html` directly via `file://` also works, thanks to the embedded panorama fallback.

## Deployment (GitHub Pages)

1. Push to the `main` branch.
2. Repository **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

The root directory is the deployable site; no build step is required. A `.nojekyll` file is included so GitHub Pages serves the files as-is.

## Excluded from Version Control

See `.gitignore`. `node_modules/`, `dist/`, `public/`, and `scratch/` are
intentionally untracked: `dist/` and `public/` are stale Vite scaffolding
duplicates of the root site, and `scratch/` holds local debug artifacts.
