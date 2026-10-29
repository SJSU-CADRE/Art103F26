# AGENTS.md — Art 103 Max Projects Showcase

Guidance for AI agents working in this repository.

## Project

- **Course:** Art 103, San José State University (SJSU)
- **Purpose:** Minimal public webpage showcasing student Max (Cycling '74) projects for the class final
- **Stack:** Static HTML + CSS (no build step). Style later; keep structure simple.
- **Primary files:** `index.html`, `styles.css`, `grid.js`

## Max deep links (Cycling '74)

Projects launch Max from the browser with the `c74max://` protocol:

```html
<a href="c74max://patcherurl/?src=https://www.andrewblanton.com/20_Objects/_downloads/metro_01.maxpat">
  Open in Max
</a>
```

Rules:

- Format: `c74max://patcherurl/?src=` + absolute HTTPS URL to a `.maxpat` file
- The `src` host must be on Cycling '74's allowlist ("greenlit")
- **Currently greenlit:** this project's hosting domain (when deployed) and `cycling74.com` — plus Andrew's site used in examples (`andrewblanton.com`) as the working reference host
- Do not invent other hosts for deep-link `src` URLs unless confirmed greenlit
- Placeholder patches in the gallery use `PATH/TO/patch.maxpat` — replace with real hosted `.maxpat` URLs before shipping

## Gallery / grid

- Layout: CSS Grid with **fixed** tracks: `repeat(auto-fill, var(--cell))` + `grid-auto-rows: var(--cell)` — tiles do **not** stretch with the viewport
- Variable spans via classes: `size-sm`, `size-md`, `size-lg`, `size-wide`, `size-tall` (dense packing)
- Reflow on resize is FLIP-animated in `grid.js` (Web Animations API) when the column track count changes; duration `--reflow-ms`; respects `prefers-reduced-motion`
- Tune footprint with `--cell` / `--gap` in `:root`, not by switching back to `1fr` columns
- Add a new work by copying an `<article class="project size-…">` block and updating title, name, description, and deep-link `href`

## Design intent

- Keep the page **minimal** until directed to style it
- Prefer editing CSS variables in `:root` before inventing new visual systems
- Avoid heavy frameworks unless requested
- Accessibility: keep semantic `<article>`, headings, and real `<a>` deep links (not JS-only buttons)

## Conventions for agents

- Do not commit unless the user asks
- Do not expand scope into auth, CMS, or bundlers without asking
- When adding projects, keep markup consistent with existing gallery items
- Preserve deep-link URL shape; only change the `src` target path/host when greenlit
