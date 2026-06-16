# Contributing to the EPFL Design System

This repo is the **ENAC IT4R** team's shared reference for building EPFL-branded web UI, consumed across our projects (agent skills in Claude Code / OpenCode / Cursor, and production Vue/Quasar/Vuetify/React code). It is maintained by the IT4R team at EPFL ENAC — **unofficial**, distilled from EPFL's official brand guidelines (`epfl-si/elements`), and not produced or endorsed by EPFL's central brand team.

## Golden rules

1. **One change, one PR.** Small and reviewable beats big and perfect.
2. **Show the pixels.** Visuals are reviewed visually. Every PR automatically rebuilds the catalog and uploads a screenshot of each specimen (the `catalog-screenshots` artifact) plus a comment listing what changed — see [The catalog & PR previews](#the-catalog--pr-previews). You don't need to attach screenshots by hand anymore; just check the artifact looks right.
3. **Back-port, don't fork.** If you invent a good pattern in a product project, bring it back here so everyone benefits.
4. **CSS-first.** Build a pattern as canonical CSS in `css/` before wrapping it in any framework kit. The classes are the truth; kits are thin adapters.
5. **Stay on-brand.** When in doubt, defer to `README.md` (the why) and `AGENTS.md` (the rules).
6. **No new colors or fonts** without team sign-off. Use the tokens.

## Repo layout

| Path | What it is | Touch it when… |
|------|-----------|----------------|
| `AGENTS.md` | Canonical agent rules (CLAUDE.md + Cursor import it) | the workflow or rules change |
| `README.md` | Brand spec + index | you add a foundation or rule |
| `tokens/colors_and_type.css` | The token layer (CSS variables + fonts) | you add/adjust a token |
| `css/` | Canonical atomic CSS (atoms → templates) | new/updated component styling |
| `kits/` | Framework wrappers (`vue` `quasar` `vuetify` `react` `html`) | a component changes per framework |
| `assets/` | Logos + icons | new brand asset |
| `examples/` | ⭐ Real screens the team built | **often — this is how the system grows** |
| `preview/` | Review cards (one concept each) | you add a component/token worth showcasing |
| `adherence/` | Brand linters (oxlint + stylelint) | the enforced rules change |
| `scripts/` | Catalog generator + screenshot tooling (zero/dev-only deps) | the catalog build or PR preview changes |
| `.github/` | CI: Pages deploy + PR preview workflows | the deploy or PR-review automation changes |

## How to add a token

1. Add the CSS variable to `tokens/colors_and_type.css` under the right section, with a clear comment. Raw color/size values belong **only** in this file.
2. Reference it from `css/` via `var(--…)`. (The `/* @kind … */` comment is optional human annotation.)
3. If it's worth showcasing, add/update a card in `preview/`.
4. Note it in `CHANGELOG.md`.

## How to add a component

1. **Build it in `css/`** under the right atomic level (`atoms/`, `molecules/`, `organisms/`, `templates/`) using tokens only — `rem`, never `px`; `var(--…)`, never hex. Add its `@import` to `css/epfl.css`.
2. Cover all states: **hover, focus (2px outline), active, disabled.**
3. Add thin wrappers in the relevant `kits/` (at least `vue/`; export from the kit's `index.js`). Quasar/Vuetify usually need only a brand note, not a rebuild.
4. Add a `preview/<component>.html` card that links `../css/epfl.css` — **don't re-declare the component's CSS inline.** The first line **must** be a valid `@dsCard` marker — `<!-- @dsCard group="Components" name="…" subtitle="…" viewport="WxH" -->` — it is what puts the card in the published catalog (a card without it is dropped).
5. **Run the adherence linter** (see below) until clean. Update the kit `README.md` and `CHANGELOG.md`.

## How to add an example (do this a lot)

`examples/` is the highest-leverage folder. See `examples/README.md`. In short: drop a **self-contained HTML page** of a real screen you built (linking `../css/epfl.css`), add a one-line row to the examples index, done.

## Running the adherence linter

The checks are self-contained in `adherence/` (no external tooling). From the repo root:

```bash
npx stylelint "css/**/*.css" "kits/**/*.vue" --config adherence/.stylelintrc.json
npx oxlint --config adherence/.oxlintrc.json kits/react examples
```

Expect zero raw-hex / raw-px / non-Suisse-font violations. (If a dev `package.json` is present, `npm run lint` runs both.)

## The catalog & PR previews

The repo ships a small, zero-dependency generator that turns every `preview/*.html`
card (read via its `@dsCard` comment), the `examples/` index, and the brand rules in
`AGENTS.md` into one static site — the **catalog**.

- **Look at it locally:** `make dev` (or `npm run dev`) — builds the catalog, serves it
  on <http://localhost:8080>, and **live-reloads** as you edit any `preview/`, `css/`,
  `tokens/`, `examples/`, `assets/` file or `AGENTS.md`. Zero install (Node built-ins).
  Use `PORT=3000 make dev` for a different port. `make` with no target lists everything.
- **One-off build (no watch):** `npm run build:catalog` writes `site/`; open it directly
  or `npm run serve:catalog`.
- **Screenshot everything:** `npm run screenshots` (needs Playwright once:
  `npx playwright install chromium`) — renders each specimen at its `@dsCard`
  viewport into `screenshots/`.
- **Published:** on merge to `main`, `.github/workflows/pages.yml` deploys the catalog
  to <https://epfl-enac.github.io/epfl-design-skill/> *(one-time: enable repo Settings →
  Pages → Source: "GitHub Actions")*.
- **On every PR:** `.github/workflows/pr-preview.yml` runs the linter, rebuilds the
  catalog, screenshots each specimen, uploads the `catalog-screenshots` artifact, and
  posts a sticky comment listing the components your PR touched. That **is** "show the
  pixels" — review the artifact instead of attaching screenshots by hand. (Fork PRs run
  with a read-only token, so the comment is skipped; the artifact is still produced.)

`site/` and `screenshots/` are generated and git-ignored — never commit them.

## Commit / branch convention

- Branch: `feat/<thing>`, `fix/<thing>`, `docs/<thing>`, `example/<thing>`.
- Commit messages in the imperative: "Add news-listing example", "Fix focus ring on tertiary button".
- Tag releases with semver (`v1.2.0`) and summarize in `CHANGELOG.md`.

## Review checklist

- [ ] Pattern exists as canonical CSS in `css/` (kits only wrap it)
- [ ] Uses tokens, not literals (no raw hex/px); Suisse Int'l only
- [ ] Sentence case in copy; no emoji
- [ ] Focus / hover / active / disabled states present
- [ ] Adherence linter passes (also enforced by the PR workflow)
- [ ] New/changed `preview/` card carries a valid `@dsCard` comment
- [ ] PR `catalog-screenshots` artifact reviewed and looks right
- [ ] `CHANGELOG.md` updated
