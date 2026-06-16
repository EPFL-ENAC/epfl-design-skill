# Install & use

This repo is a **single source of truth** you pull into other projects. Pick whichever method fits the consuming project.

## A. As a design/skill reference in an agent tool (Claude Code, OpenCode, Cursor, …)

This repo **is** a skill: `SKILL.md` sits at its root, so dropping the whole repo into a `skills/<name>/` folder registers it. One location works for both Claude Code and OpenCode.

**Per project (shared with your team via the consuming repo's git):**

```bash
# Read by BOTH Claude Code and OpenCode (OpenCode also scans .claude/skills/)
git submodule add git@github.com:EPFL-ENAC/epfl-design-skill.git .claude/skills/epfl-design
git submodule update --remote   # later, to pull updates
```

**Globally (all your projects, not committed anywhere):**

```bash
# Claude Code
git clone git@github.com:EPFL-ENAC/epfl-design-skill.git ~/.claude/skills/epfl-design
# OpenCode (also accepts ~/.claude/skills/ as a fallback)
git clone git@github.com:EPFL-ENAC/epfl-design-skill.git ~/.config/opencode/skills/epfl-design
```

Then invoke it with `/epfl-design`, or just ask for EPFL UI and the agent picks it up. It reads `SKILL.md` → `AGENTS.md` (rules) → `README.md` (spec) and has the tokens, fonts, CSS, kits, assets, and `examples/` to work from.

- **Cursor:** the repo ships `.cursor/rules/epfl-design.mdc`, which points at `AGENTS.md`. Copy that file into the consuming project's `.cursor/rules/`, or vendor the repo so Cursor picks it up.
- **Any tool that reads `AGENTS.md`** (Codex, Gemini CLI, Windsurf, Zed, …) gets the rules for free. Claude Code reads `CLAUDE.md`, which imports `AGENTS.md`.

## B. In a production web project

Vendor the repo (submodule keeps it updatable):

```bash
git submodule add git@github.com:EPFL-ENAC/epfl-design-skill.git vendor/epfl-design
```

**1. Load the stylesheet once** (this is all most projects need):

```html
<link rel="stylesheet" href="/vendor/epfl-design/css/epfl.css">
```

`css/epfl.css` `@import`s the token layer and every atomic level. Fonts load automatically via `@font-face` in `tokens/colors_and_type.css` — its paths are relative, so **keep `tokens/` next to `fonts/`**. (Need tokens only, no component classes? Link `tokens/colors_and_type.css` instead.)

**2. Use components for your framework** (all wrap the same classes — see `kits/README.md`):

```js
// Vue
import '/vendor/epfl-design/css/epfl.css'
import { EpflButton, EpflCard } from '/vendor/epfl-design/kits/vue'
```

- **Quasar:** also apply the brand mapping — `import '…/kits/quasar/epfl-quasar-brand.css'` (runtime) or copy `quasar.variables.scss` (build-time).
- **Vuetify:** register `kits/vuetify/epfl-vuetify-theme.js` in `createVuetify`.
- **React:** `import { Header, Card } from '…/kits/react'`.
- **No framework:** copy markup from `kits/html/README.md`.

Copy `assets/svg/` + `assets/icons/` into your app's public dir (the kits' `logo` props default to `/assets/svg/…`).

## C. Quick copy (throwaway prototypes / mocks)

Copy `css/`, `tokens/`, `fonts/`, and any `assets/` you reference into your prototype, link `css/epfl.css`, and paste snippets from `kits/html/`. Fastest for one-offs; you lose update-ability.

## Updating

- Submodule consumers: `git submodule update --remote && git commit`.
- Pin to a tagged release for stability, or track `main` for the latest.

## Keeping it healthy

See `CONTRIBUTING.md`: small PRs, show the pixels, feed real screens back into `examples/`.
