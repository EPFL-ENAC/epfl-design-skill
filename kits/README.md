# UI kits

Thin, framework-specific wrappers over the **canonical CSS layer** (`../css/`). The CSS classes are the source of truth; a kit only maps a framework's component ergonomics onto those classes. Same brand, many adapters.

> **Always load `css/epfl.css` once, globally.** Kits carry no styling of their own — they render `epfl-*` classes that `css/epfl.css` defines. (Fonts load via the token layer from `fonts/` next to `tokens/`; the licensed files are not in this repo, see `../fonts/README.md`.)

| Kit | What it is | Status |
|-----|-----------|--------|
| [`vue/`](vue/) | Vue 3 SFC components (`<script setup>`) | **Primary** — our main stack |
| [`quasar/`](quasar/) | Quasar brand mapping (EPFL tokens → Quasar colors) + recipe | Primary |
| [`vuetify/`](vuetify/) | Vuetify 3 theme object recipe | Supported |
| [`react/`](react/) | React function components (ES modules) | Kept for React projects |
| [`html/`](html/) | Plain copy-paste HTML snippets, no framework | Always works |

## Choosing a kit

- **Vue / Quasar project** → import from `vue/` and apply the `quasar/` brand mapping.
- **Vuetify project** → register the `vuetify/` theme; use `html/` snippets for EPFL-specific patterns (hero, key-number, distinction card) Vuetify doesn't ship.
- **React project** → import from `react/`.
- **Prototype / any stack** → copy from `html/`.

## Import rule

Import from a kit's **`index.js`** (its public entry), never reach into component internals — this keeps consuming code insulated from internal renames. The adherence linter enforces this.

## Adding to a kit

Build the pattern in `../css/` **first** (it must work as plain classes), then add the thin wrapper here. Cover hover / focus / active / disabled. See `../CONTRIBUTING.md`.
