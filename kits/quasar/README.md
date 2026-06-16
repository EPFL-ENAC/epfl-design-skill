# Quasar kit

Quasar already ships a deep component set, so the EPFL kit here is mostly a **brand mapping**, not a component rebuild: point Quasar's brand colors and font at EPFL tokens, then use Quasar components normally. For the few EPFL-specific patterns Quasar doesn't have (the signature hero, key-number, distinction card), use the [`vue/`](../vue/) components or the [`html/`](../html/) snippets — they're all built on the same `css/epfl.css` classes.

## 1. Load tokens + fonts (always)

```js
// main.js / boot file
import 'epfl-design/css/epfl.css'   // tokens, fonts, atomic classes
```

## 2. Apply the brand — pick ONE path

**Runtime (simplest):** import the CSS-var override after Quasar's styles.

```js
import 'epfl-design/kits/quasar/epfl-quasar-brand.css'
```

**Build-time:** copy `quasar.variables.scss` into your project's Quasar variables file (or `@import` it) so Quasar generates EPFL-colored utility classes.

Either way: `color="primary"` → EPFL red, `color="secondary"` → Canard, `color="accent"` → Léman.

## 3. Font

Set Quasar's typography to Suisse Int'l (the `quasar.variables.scss` snippet sets `$typography-font-family`; the runtime path inherits it from `--font-sans` via `css/epfl.css`'s `body` rule).

## 4. Mind the brand rules Quasar defaults break

- **Radius:** Quasar's default radii are rounder than EPFL's 2px. Add `style="border-radius: var(--radius)"` or a small override on `.q-btn`, `.q-card`.
- **Shadows:** EPFL cards are flat. Use `flat bordered` on `<q-card>` (borders > shadows).
- **No lift/scale on hover, no gradients, sentence-case labels** — see `../../README.md`.
