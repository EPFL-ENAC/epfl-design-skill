# EPFL Design System — ENAC IT4R

A design system for building **EPFL**-branded web UI — École polytechnique fédérale de Lausanne — distilled from the official `epfl-si/elements` web styleguide ("Charte graphique Web EPFL").

> [!IMPORTANT]
> **Unofficial.** This is an internal working reference maintained by the **ENAC IT4R** team at EPFL ENAC (the School of Architecture, Civil and Environmental Engineering). It is **not** produced or endorsed by EPFL's central brand or communications team. For canonical EPFL brand assets, use the official [Elements styleguide](https://epfl-si.github.io/elements) — and when this reference and the official guidelines disagree, the official guidelines win.

## Install

Nothing to clone. Pick the line for your tool.

### Claude Code: a plugin (recommended)

```bash
claude plugin marketplace add EPFL-ENAC/epfl-design-skill
claude plugin install epfl@epfl-design-skill
```

Or the same two commands inside a session, as `/plugin marketplace add …` and
`/plugin install …`. The skill then works in every repo, and
`claude plugin marketplace update epfl-design-skill` pulls new versions.

**For a whole project team**, commit this to the project's `.claude/settings.json`;
everyone who trusts the folder is offered the plugin, with no per-person setup:

```json
{
  "extraKnownMarketplaces": {
    "epfl-design-skill": {
      "source": { "source": "github", "repo": "EPFL-ENAC/epfl-design-skill" }
    }
  },
  "enabledPlugins": { "epfl@epfl-design-skill": true }
}
```

### claude.ai and Claude Desktop: upload the skill

Download **`epfl-design.zip`** from the
[latest release](https://github.com/EPFL-ENAC/epfl-design-skill/releases/latest),
then add it under Settings, in the Skills section, with "Upload skill". The release
also carries the same archive as `epfl-design.skill`.

### Codex, OpenCode and other agents: unzip the skill

```bash
curl -fsSL https://github.com/EPFL-ENAC/epfl-design-skill/releases/latest/download/epfl-design.zip -o /tmp/epfl-design.zip
unzip -o /tmp/epfl-design.zip -d ~/.codex/skills/    # Codex
unzip -o /tmp/epfl-design.zip -d ~/.claude/skills/   # OpenCode (and Claude Code without plugins)
```

Rerun the two lines to update. **Cursor:** copy `.cursor/rules/epfl-design.mdc` into
the project's `.cursor/rules/` and the skill folder next to it. **Any tool that reads
`AGENTS.md`** can be pointed at `skills/epfl-design/rules.md`.

### In a production project or a prototype

The CSS, the tokens and the framework kits ship inside the same archive. See
[`INSTALL.md`](INSTALL.md) for wiring them into Vue/Quasar, Vuetify, React or plain
HTML, and for the Suisse Int'l font server.

## Use

Ask for EPFL UI and the skill triggers on its own, or call it with a brief
(`/epfl:epfl-design` in Claude Code with the plugin). The agent reads
`skills/epfl-design/rules.md`, then `design.md`, then studies `examples/`, and writes
either a static page on `css/epfl.css` or code for your framework's kit.

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

## How this is structured

The system is **CSS-first and atomic**. Design decisions cascade down layers, and you always author against the layer above — never re-invent below it. Everything the skill ships lives in **`skills/epfl-design/`**:

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
- **The brand spec** (the *why*: content, colors, type, shape, motion, states, iconography, principles) is [`skills/epfl-design/design.md`](skills/epfl-design/design.md); the operating rules are [`skills/epfl-design/rules.md`](skills/epfl-design/rules.md).
- **Browse it live** in the **catalog** — every component, token, and the brand rules in one place: <https://epfl-enac.github.io/epfl-design-skill/>. It is generated from `preview/*.html` by `scripts/build-catalog.mjs` (no build tooling), deployed on merge to `main`, and **every PR gets its own live preview URL** (`…/pr-preview/pr-<N>/`) posted as a comment. Run it locally with `make dev` (or `npm run dev`) — a live-reloading dev server on `:8080`, zero install. See [`CONTRIBUTING.md`](CONTRIBUTING.md#the-catalog--pr-previews).

## Index

| File / folder              | What it is |
|----------------------------|------------|
| `skills/epfl-design/`      | **The skill**, self-contained: what every install ships. |
| `skills/epfl-design/SKILL.md` | Agent-skill entry point. |
| `skills/epfl-design/rules.md` | Agent operating rules and the enforced brand constraints. |
| `skills/epfl-design/design.md` | The brand spec (the *why*). |
| `skills/epfl-design/tokens/` | The token layer (`colors_and_type.css`) and the Suisse Int'l `@font-face` (`fonts.css`). |
| `skills/epfl-design/css/`  | Canonical atomic CSS (`atoms/` `molecules/` `organisms/` `templates/`) + `epfl.css`. |
| `skills/epfl-design/kits/` | Framework wrappers: `vue/` `quasar/` `vuetify/` `react/` `html/`. |
| `skills/epfl-design/assets/` | EPFL logos, placeholders, UI and bespoke icons. |
| `skills/epfl-design/examples/` | Real screens the team has built — study before building. |
| `.claude-plugin/`          | The Claude Code marketplace and plugin manifests. |
| `INSTALL.md`               | Wiring the CSS and kits into a project; the font server. |
| `AGENTS.md`                | How to maintain this repo (`CLAUDE.md` imports it). |
| `CONTRIBUTING.md`          | How the team maintains + grows the system. |
| `CHANGELOG.md`             | Versioned record of changes. |
| `preview/`                 | Design-system review cards (one HTML per concept). |
| `adherence/`               | Self-contained brand linters (oxlint for JS/JSX, stylelint for CSS/Vue). |
| `scripts/`                 | Catalog generator (`build-catalog.mjs`), live dev server (`dev.mjs`), optional screenshots (`screenshot.mjs`). |
| `.github/workflows/`       | CI: the catalog on Pages, the per-PR preview, the release archive. |
