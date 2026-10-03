# EPFL Design System — ENAC IT4R

A design system for building **EPFL**-branded web UI — École polytechnique fédérale de Lausanne — distilled from the official `epfl-si/elements` web styleguide ("Charte graphique Web EPFL").

> [!IMPORTANT]
> **Unofficial.** This is an internal working reference maintained by the **ENAC IT4R** team at EPFL ENAC (the School of Architecture, Civil and Environmental Engineering). It is **not** produced or endorsed by EPFL's central brand or communications team. For canonical EPFL brand assets, use the official [Elements styleguide](https://epfl-si.github.io/elements) — and when this reference and the official guidelines disagree, the official guidelines win.

## Source materials

- **Codebase:** `github.com/epfl-si/elements` (accessed via fork `pierreleripoll/elements@dev`)
  - `assets/config/colors.json` — raw palette
  - `assets/config/bootstrap-variables.scss` — full token map (Bootstrap 4-derived)
  - `assets/config/typography.scss` — type scale
  - `assets/config/theme.json` — brand primary `#E30713`
  - `docs/design/index.html` — design principles (Clarity, Balance, Modularity)
  - `docs/design/typography.html` — typography reference
  - `assets/svg/`, `assets/icons/` — logos and icon library
- **Brand reference:** EPFL Brand Guidelines PDF (2019), linked from the codebase. Not bundled here.
- **Live styleguide:** https://epfl-si.github.io/elements

## Product context

**EPFL** is a Swiss federal research university in Lausanne, focused on natural sciences, engineering, and architecture. Its three missions are **Education, Research, Innovation** — three is a recurring brand motif.

The design system serves **the EPFL public web** — a large polylingual (FR / EN / DE) WordPress + Drupal estate covering:

- `epfl.ch` — the main institutional site
- School / lab / faculty subsites (hundreds of them, all on the same chrome)
- Internal tools, news, magazines, event pages

Elements is **atomic-design** organized (atoms / molecules / organisms / templates) and built on a customized Bootstrap 4 base. Twig is the canonical template language; SCSS is the source CSS.

## How this is structured

The system is **CSS-first and atomic**. Design decisions cascade down layers, and you always author against the layer above — never re-invent below it.

```
tokens/colors_and_type.css   raw + semantic CSS variables + fonts   ← the only place raw values live
        ↓ var(--…)
css/  atoms → molecules → organisms → templates   framework-agnostic .epfl-* classes   ← canonical components
        ↓ class names
kits/ vue · quasar · vuetify · react · html       thin wrappers that render those classes
        ↓ compose
examples/   full pages (the team's reference library)
```

- **The CSS classes are the source of truth.** `css/epfl.css` is the one file to link — it `@import`s the tokens and every atomic layer. A framework **kit** adds no styling; it just maps a framework's ergonomics onto the `.epfl-*` classes.
- **Pick the kit for your stack** — see [`kits/README.md`](kits/README.md). Vue/Quasar is the primary stack; Vuetify, React, and plain HTML are supported.
- **Tokens** are plain CSS custom properties: a raw layer (`--epfl-red`, `--epfl-gray-100`…) and semantic aliases (`--primary`, `--fg`, `--space-*`, `--fs-*`, `--radius*`). Author with the semantic tokens.
- **Browse it live** in the **catalog** — every component, token, and the brand rules in one place: <https://epfl-enac.github.io/epfl-design-skill/>. It is generated from `preview/*.html` by `scripts/build-catalog.mjs` (no build tooling), deployed on merge to `main`, and **every PR gets its own live preview URL** (`…/pr-preview/pr-<N>/`) posted as a comment. Run it locally with `make dev` (or `npm run dev`) — a live-reloading dev server on `:8080`, zero install. See [`CONTRIBUTING.md`](CONTRIBUTING.md#the-catalog--pr-previews).

## Index

| File / folder              | What it is |
|----------------------------|------------|
| `README.md`                | This file — the brand spec (the *why*). |
| `AGENTS.md`                | Canonical agent operating rules (all tools read this). |
| `SKILL.md`                 | Agent-skill entry point. |
| `CONTRIBUTING.md`          | How the team maintains + grows the system. |
| `INSTALL.md`               | How to consume the repo per framework (submodule / copy / skill). |
| `CHANGELOG.md`             | Versioned record of changes. |
| `tokens/colors_and_type.css` | The token layer: CSS variables + `@font-face` + element defaults. |
| `css/`                     | Canonical atomic CSS (`atoms/` `molecules/` `organisms/` `templates/`) + `epfl.css`. |
| `kits/`                    | Framework wrappers: `vue/` `quasar/` `vuetify/` `react/` `html/`. |
| `fonts/`                   | Where licensed projects put the Suisse Int'l files (not in git, see `fonts/README.md`). |
| `assets/svg/`              | EPFL logo (positive + negative), placeholders. |
| `assets/icons/`            | UI icons + a sample of the bespoke "EPFL" illustrative icon family. |
| `examples/`                | Real screens the team has built — study before building. |
| `preview/`                 | Design-system review cards (one HTML per concept). |
| `adherence/`               | Self-contained brand linters (oxlint for JS/JSX, stylelint for CSS/Vue). |
| `scripts/`                 | Catalog generator (`build-catalog.mjs`), live dev server (`dev.mjs`), optional screenshots (`screenshot.mjs`). |
| `.github/workflows/`       | CI: deploy the catalog to Pages, and the per-PR screenshot preview. |

## Content fundamentals

EPFL writes like a **Swiss public research university**: precise, civic, calm, never marketing-shouty. The voice is institutional but warm.

- **Languages:** French is the primary language; every page exists in EN and DE. Copy is written first in French and translated. Never abbreviate "EPFL".
- **Person:** third person institutional ("EPFL is...", "Researchers at the school..."). Direct "you" is rare; "we" appears in editorial pieces.
- **Casing:** **Sentence case** for headings and buttons. ("Discover our research", not "Discover Our Research".) UPPERCASE only for h6 / category labels and the "EPFL" wordmark.
- **Punctuation:** French typography rules where applicable — non-breaking space before `:` `;` `?` `!` `»`. French quotes are guillemets (« »); English uses curly quotes.
- **Numbers:** Spelled out under ten in body, numerals for stats / "key numbers" (a hero feature on faculty pages).
- **Tone examples (paraphrased from the codebase / live site):**
  - "EPFL is one of the most vibrant and cosmopolitan science and technology institutions in Europe."
  - "Standardizing perovskite aging measurements"
  - "The Swiss team has won the Solar Decathlon competition"
  - "Teaching & PhD" (links use `&`, ampersand-comfortable)
- **Emoji:** never. Not in product, not in content.
- **Vibe:** academic, precise, modular, lake-and-mountains Swiss. Confident without flourish. Bauhaus-Helvetica DNA, modernized.

## Visual foundations

### Colors

- **Primary:** `#FF0000` web red, `#B51F1F` red-dark on hover. (Print brand uses `#E30713` / `#92000E`.)
- **Tertiary teal accent:** `#007480` Canard, `#004248` dark — used sparingly for non-primary CTAs and "Léman" lake references.
- **Accent:** `#00A79F` Léman teal — only in editorial / illustration.
- **Neutrals:** a tight 6-step gray ramp from `#E6E6E6` through `#212121` (soft black, never pure black). Pure `#000` is avoided.
- **Status:** blue/orange/green Bootstrap-tier colors; red doubles as the danger color.

### Typography

- **Suisse Int'l** is canonical: Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700, plus Light & Medium italics. It is licensed to EPFL and **not in this repo**: put the files in `fonts/` (see `fonts/README.md`); Arial is the fallback.
- Scale: 48 / 38 / 28 / 24 / 20 / 18 px. Body 16–18px (clamp). H6 is uppercase.
- Body line-height 1.5; headings 1.1–1.4. Italics available in Light and Medium.

### Spacing / shape / layout

- Bootstrap 4 12-column grid, 32px gutter.
- **Tight corner radii** — 2px (`--radius`) and 4px (`--radius-lg`). Pills (10rem) reserved for badges.
- Borders: 1px solid `--epfl-gray-200` is the default; rarely heavier.
- Whitespace is generous; gutters and `margin-bottom: .75em` on headings.
- Layout chrome: 5.5rem (88px) header height, 28rem (448px) main-nav width.

### Backgrounds & imagery

- **Full-bleed photography** is the dominant hero pattern. Photos lean toward **warm, naturalistic, daylight** — no heavy grading. Subjects: campus architecture (the Rolex Learning Center, SwissTech, EPFL Pavilion are iconic), researchers at work, students, lake/mountain landscape.
- The `.hero` component **overlaps a white text panel onto the photo** — the title sits in a white rectangle that breaks the image edge. This panel is a *signature* EPFL move.
- **No gradients** as backgrounds. `$enable-gradients: false` is set in the SCSS. The only gradients are subtle button-active states.
- **No repeating patterns or textures.** Surfaces are flat: white, gray-100, or photographic.
- Cards have a subtle 1px `gray-100` border and zero shadow by default — Swiss-flat.

### Motion

- Default transition: `.15s ease-in-out` on color/background/border. `.2s` on bigger UI moves.
- No bouncy/spring easing. No parallax. Fades and 1-step color transitions only.
- Hover states: change of color / border, never scale or lift. **No "card lifts on hover" pattern.**

### States

- **Hover:** primary buttons darken to `--epfl-red-dark`. Secondary buttons gain `gray-100` fill. Links shift body-color → red.
- **Active:** further darken (~10% on lightness) — never a different hue.
- **Focus:** distinctive 2px solid outline, 2px offset, in the same hue as the element (`red-dark` for primary, `gray-600` for secondary, `canard-dark` for tertiary). The Elements `.focused` mixin applies a thin transparent border that becomes red on focus.
- **Disabled:** `gray-100` background, `gray-300` border + text. Opacity stays at 1 (Elements explicitly overrides Bootstrap's `.65` opacity for accessibility).
- **Visited links:** mid-gray.

### Borders, shadows, transparency

- **Borders, not shadows**, are the primary separator. Shadow appears only on dropdowns / modals.
- Dropdown shadow: `0 .5rem 1rem rgba(0,0,0,.175)`.
- Transparency / blur: minimal. Modal backdrop is solid black at 50% opacity; no `backdrop-filter` blurs.
- No "glass" effects.

### Signature shapes

- **Trapeze**: a recurring 0.5rem-tall trapezoidal accent at the top/bottom of cards / nav items. Used as a hover indicator on links and current-menu states. Two variants: vertical and horizontal.
- **Triangle pull-quote marker**: a red downward triangle sits at the top-left of "distinguished" cards (`.card-distinction`).
- **Red dot under nav items**: a 7×6px red rectangle appears beneath the active main-nav link.

### Iconography

EPFL Elements ships **three** distinct icon systems, and the codebase is explicit about it (see `docs/design/iconography.md` → `#/atoms/icon`).

1. **Feather icons** — *the primary UI icon set.* From [feathericons.com](https://feathericons.com). Stroke-style, 24×24 viewBox, 2px stroke, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, color via `currentColor`. In Elements markup the SVG carries the class `feather` to apply those defaults (see `assets/components/atoms/icon/icon.scss`). For prototypes link the Feather CDN at runtime; in production code use the `<Icon>` atom or inline the SVG.
2. **Elements custom UI icons** — a small set of project-specific glyphs Feather doesn't cover, copied into `assets/icons/`: `chevron-*`, `arrow-*`, `close`, `browse`, `accessibility`, `elements`, `bluesky`. Same currentColor treatment — use only when Feather has no equivalent.
3. **Bespoke EPFL "research" icons** — the custom illustrative pictogram set (~165 of them: Rolex, SwissTech, Pavilion, scientist, group, smiley, `epfl-corporate-cdh`…). Flat, single-color, mid-detail line-illustrations, rendered ~64px. Lives behind the `research-icon` atom; we sample 8 in `assets/icons/epfl-*.svg`.

There's also a `social-icon` atom for brand marks (LinkedIn, YouTube, Bluesky) — out of scope here.
- **Emoji:** never used in production UI. Don't introduce them.
- **Unicode characters as icons:** rare. The breadcrumb separator is `›` (`\203A`); blockquote uses real curly quotes / guillemets.
- **Logos:** `assets/svg/epfl-logo.svg` (red on white) and `epfl-logo-negative.svg` (white on dark). The logo is the wordmark "EPFL" plus a small flag glyph; it should never be redrawn.

> **Fonts:** Suisse Int'l only (Light, Regular, Medium, SemiBold, Bold + Light/Medium italics), supplied by the consuming project under EPFL's licence (`fonts/README.md`); Arial is the sole fallback.

## Design principles (from `docs/design/index.html`)

1. **Clarity** — clear messages, intentional choices, accessibility first.
2. **Balance** — serve diversity, harmony of decisions.
3. **Modularity** — atomic-design building blocks, consistency through reuse.

> Three is the goto number — it echoes the three institutional missions.

## UI kits

The public `epfl.ch` chrome — Header (red active dot), signature overlapping Hero, Card / CardDeck (with distinction flag), KeyNumber, Button, Footer — is implemented once as canonical CSS in `css/` and wrapped per framework in `kits/`:

- [`kits/vue/`](kits/vue/) — Vue 3 components (**primary** stack).
- [`kits/quasar/`](kits/quasar/) — Quasar brand mapping (EPFL tokens → Quasar colors).
- [`kits/vuetify/`](kits/vuetify/) — Vuetify 3 theme recipe.
- [`kits/react/`](kits/react/) — React components.
- [`kits/html/`](kits/html/) — copy-paste snippets, no framework.

See [`kits/README.md`](kits/README.md) for which to use. A finished page assembled from them lives in [`examples/`](examples/).
