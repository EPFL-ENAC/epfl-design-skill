# Changelog

All notable changes to the EPFL Design System are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/);
versions follow [semver](https://semver.org/).

## [Unreleased]

### Removed
- **Suisse Int'l font files** (`fonts/*.ttf`, the desktop fonts) and the `fonts/` directory. The font is licensed to EPFL and may not be redistributed from a public repository or its public catalog. Font files are now git-ignored everywhere, and the catalog build never copies them.

### Added
- **Claude Code plugin marketplace** — `.claude-plugin/marketplace.json` and `plugin.json` (plugin `epfl`): `claude plugin marketplace add EPFL-ENAC/epfl-design-skill`, then `claude plugin install epfl@epfl-design-skill`.
- **Release archive** — `make skill` zips the skill folder into `dist/epfl-design.zip` (and the same file as `.skill`); `.github/workflows/release.yml` publishes both on each `v*` tag, for claude.ai, Claude Desktop, Codex and projects.
- **`tokens/fonts.css`** — Suisse Int'l `@font-face` from `https://enac-it-fonts.epfl.ch`, the ENAC IT4R font server, which serves `*.epfl.ch` origins only. `tokens/colors_and_type.css` `@import`s it, so `css/epfl.css` keeps loading the font with no setup. Faces: 400, 400 italic, 500, 600, 600 italic, 700 (no Light or Medium italic webfont yet). Local dev servers (`http://localhost:*`) get it from the EPFL network or VPN; elsewhere (`file://`, the public catalog, off VPN) text renders in Arial. `INSTALL.md` → Fonts lists the URLs and shows font-only use with an SCSS or CSS token.
- **Published catalog** — `scripts/build-catalog.mjs`, a zero-dependency Node generator that reads the `@dsCard` comments in `preview/*.html`, the `examples/` index, and the brand rules in `AGENTS.md`, and emits a static `site/` gallery (each specimen embedded at its declared viewport; chrome built with `epfl.css` tokens). New npm scripts: `dev`, `build:catalog`, `screenshots`, `serve:catalog`.
- **Live dev server** — `scripts/dev.mjs` (`npm run dev` / `make dev`): builds, serves on `:8080`, watches the source dirs, and live-reloads the browser via Server-Sent Events. Zero dependencies. A `Makefile` wraps the common tasks (`make help` lists them).
- **GitHub Pages deploy** — `.github/workflows/pages.yml` publishes the catalog to the `gh-pages` branch root → <https://epfl-enac.github.io/epfl-design-skill/> on push to `main` (one-time: Settings → Pages → Source "Deploy from a branch" → `gh-pages` / `(root)`). Uses `clean-exclude: pr-preview/` so it never wipes live PR previews.
- **Live per-PR preview URL** — `.github/workflows/pr-preview.yml` lints, rebuilds the catalog, and deploys it via `rossjrw/pr-preview-action` to its own URL (`…/pr-preview/pr-<N>/`), posted as a sticky PR comment; updates on each push and is removed when the PR closes. Replaces the manual "show the pixels" step (no screenshot artifact to download).
- **Optional local screenshots** — `scripts/screenshot.mjs` + `npm run screenshots` (Playwright) renders every specimen to `screenshots/` for slides/exports; no longer part of PR review.
- `playwright` dev dependency (local screenshots only; the generator itself has no deps).

### Changed
- **Installed as a plugin or an archive, never a clone or submodule.** The skill moves into a self-contained `skills/epfl-design/`: `SKILL.md`, `rules.md` (was the rules part of `AGENTS.md`), `design.md` (was the brand spec in `README.md`), `tokens/`, `css/`, `kits/`, `assets/`, `examples/`. `SKILL.md` frontmatter is now portable: `name` and a description under claude.ai's 200-character limit. Root `AGENTS.md` now holds the repo-maintenance rules; `README.md` the install per tool; `INSTALL.md` wiring into a project from the release archive.
- `preview/` cards, the catalog scripts, the adherence linter globs and the Cursor rule follow the new paths. The catalog output is unchanged.
- The `@dsCard` comment on a `preview/*.html` card is now **load-bearing** (it feeds the catalog), not an optional marker — documented in `AGENTS.md`, `CONTRIBUTING.md`.
- `.gitignore` now excludes the generated `site/` and `screenshots/`.
- **Maintainership made explicit** across the docs, the skill, and the catalog site: this is an *unofficial* reference maintained by the **EPFL ENAC IT4R** team, distilled from `epfl-si/elements` and not produced or endorsed by EPFL's central brand team.

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
