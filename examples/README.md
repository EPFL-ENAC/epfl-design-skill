# Examples — the team's reference library

**This is the most important folder for quality over time.**

Tokens and rules get an agent ~70% of the way to looking like EPFL. What closes the gap is **real screens to study**. Every good page your team builds should leave a copy here. Agents (and humans) read these before building anything new, and the whole team's output converges on them.

## What belongs here

Finished **page-level compositions** — not single components (those live in `css/` + `kits/`). Think: a news listing, a lab homepage, an event detail page, a faculty profile, a search-results view, a 404.

## How to add one

1. Save a **self-contained HTML file** of the screen (inline or relative assets that resolve within the repo). Name it for the screen: `news-listing.html`, `lab-homepage.html`.
2. Add a one-line entry to the index below.
3. Keep it real — ship something you actually built and were happy with. No filler.

## Index

| File | Screen | Notes |
|------|--------|-------|
| `research-landing.html` | Research landing page | The canonical reference — header, signature overlapping hero, card deck (with a distinction card), key numbers, dark footer. |
| `news-listing.html` | News listing | Page header, filter tags, a paged 6-card grid, "load more". A different page type. |

_Add new rows as you contribute screens. Plain self-contained HTML is best for studying; framework page examples (e.g. `.vue`) can live under `kits/<framework>/` so this study library stays neutral._
