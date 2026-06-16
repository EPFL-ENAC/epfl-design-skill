# Changelog

All notable changes to the EPFL Design System are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/);
versions follow [semver](https://semver.org/).

## [Unreleased]

### Added
- **Published catalog** — `scripts/build-catalog.mjs`, a zero-dependency Node generator that reads the `@dsCard` comments in `preview/*.html`, the `examples/` index, and the brand rules in `AGENTS.md`, and emits a static `site/` gallery (each specimen embedded at its declared viewport; chrome built with `epfl.css` tokens). New npm scripts: `dev`, `build:catalog`, `screenshots`, `serve:catalog`.
- **Live dev server** — `scripts/dev.mjs` (`npm run dev` / `make dev`): builds, serves on `:8080`, watches the source dirs, and live-reloads the browser via Server-Sent Events. Zero dependencies. A `Makefile` wraps the common tasks (`make help` lists them).
- **GitHub Pages deploy** — `.github/workflows/pages.yml` publishes the catalog to <https://epfl-enac.github.io/epfl-design-skill/> on push to `main` (one-time: enable Settings → Pages → Source "GitHub Actions").
- **Per-PR visual preview** — `.github/workflows/pr-preview.yml` runs the adherence linter, rebuilds the catalog, screenshots every specimen with Playwright (`scripts/screenshot.mjs`), uploads the `catalog-screenshots` artifact, and posts a sticky comment listing the touched components (`scripts/pr-summary.mjs`). Replaces the manual "show the pixels" step.
- `playwright` dev dependency (screenshots only; the generator itself has no deps).

### Changed
- The `@dsCard` comment on a `preview/*.html` card is now **load-bearing** (it feeds the catalog), not an optional marker — documented in `AGENTS.md`, `CONTRIBUTING.md`.
- `.gitignore` now excludes the generated `site/` and `screenshots/`.

## [0.2.0] — 2026-06-16

Restructured into a co-maintained, multi-tool, multi-framework system: CSS-first + atomic, one source of rules across tools, and self-contained tooling.

### Added
- **`AGENTS.md`** — canonical, tool-neutral agent operating rules (read by Claude Code, OpenCode, Cursor, Codex, …). `CLAUDE.md` now imports it (`@AGENTS.md`); `.cursor/rules/epfl-design.mdc` points to it.
- **`css/`** — the canonical component layer as framework-agnostic, atomic CSS (`atoms/` → `molecules/` → `organisms/` → `templates/`), token-pure (`rem` + `var(--…)` only). `css/epfl.css` is the single stylesheet to link.
- **`kits/`** — thin framework wrappers over `css/`: `vue/` (primary, Vue 3 SFCs + `index.js`), `quasar/` (token→Quasar brand mapping, runtime CSS + build-time Sass), `vuetify/` (theme recipe), `react/` (ES-module components + `index.js`), `html/` (copy-paste snippets).
- **`adherence/`** — self-contained brand linters: `.oxlintrc.json` (JS/JSX) + `.stylelintrc.json` (CSS/Vue). Optional dev-only `package.json` with a `lint` script.
- Two real reference screens in `examples/`: `research-landing.html`, `news-listing.html`.
- Alert-tint tokens (`--info-bg/-border/-fg`, etc.), `--border-on-dark`, `--focus-w`.
- Governance + consumption layer (carried from Unreleased): `CONTRIBUTING.md`, `INSTALL.md`.

### Changed
- `colors_and_type.css` moved to **`tokens/colors_and_type.css`** (the only place raw values live); `@font-face` paths now relative to `tokens/`.
- Components gained explicit **focus / active** states (2px hue-matched outline).
- Preview cards now link `css/epfl.css` and use canonical `.epfl-*` classes instead of duplicating component CSS inline.
- Docs (`README.md`, `SKILL.md`, `CONTRIBUTING.md`, `INSTALL.md`) rewritten around the CSS-first/atomic/kits model and per-framework consumption.

### Removed
- The external "omelette" SPA tooling and its artifacts: `_ds_bundle.js`, `_ds_manifest.json`, and the `x-omelette` block (the repo is now self-contained).
- `ui_kits/website/` — its CSS moved to `css/`, its components to `kits/react`, its demo to `examples/research-landing.html`.

## [0.1.0] — 2026-06-16

First assembled version, built from the `epfl-si/elements` styleguide.

### Added
- `colors_and_type.css` — full token layer (85 tokens): brand red (web `#FF0000` + print `#E30713`), Canard/Léman teals, 6-step gray ramp, status colors, type scale (48→18px), spacing, tight 2/4px radii, shadows, motion.
- **Suisse Int'l** bundled in `fonts/` — Light, Regular, Medium, SemiBold, Bold + Light/Medium italics, wired via `@font-face`.
- `assets/svg/` — EPFL wordmark (positive + negative), placeholders.
- `assets/icons/` — Elements custom UI icons + sample of bespoke "research" pictograms.
- `ui_kits/website/` — public `epfl.ch` chrome: Header (red active dot), signature overlapping Hero, Card / CardDeck (with distinction flag), KeyNumber, Button, Footer.
- `preview/` — 21 review cards across Colors, Type, Spacing, Components, Brand.
- Iconography documented as three tiers: Feather (primary UI), Elements custom, and bespoke research pictograms.
- `README.md` + `SKILL.md`.
