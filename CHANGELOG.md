# Changelog

All notable changes to the EPFL Design System are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/);
versions follow [semver](https://semver.org/).

## [Unreleased]

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
