# Adherence — brand linters

Self-contained checks that flag brand violations. No external "design-system tooling" — just two standard linters with EPFL rules. They are an **optional dev check**; using the design system requires no build.

| Config | Lints | Enforces |
|--------|-------|----------|
| `.oxlintrc.json` | JS / JSX (`kits/react`, `examples`) | no raw hex, no raw `px`, Suisse Int'l only, import kits from `index.js` |
| `.stylelintrc.json` | CSS + Vue `<style>` (`css/**`, `kits/**/*.vue`) | no hex (`color-no-hex`), no `px` units, `font-family` must be Suisse Int'l / inherit / `var(--font…)` |

## Run

```bash
# one-time (dev only)
npm install

# both linters
npm run lint
# or individually
npm run lint:css
npm run lint:js
```

Without installing, you can also use `npx`:

```bash
npx stylelint "css/**/*.css" "kits/**/*.vue" --config adherence/.stylelintrc.json
npx oxlint --config adherence/.oxlintrc.json kits/react examples
```

## Exemptions

Raw color/size literals are allowed **only** where a value must be defined or handed to a framework that can't take a CSS variable:

- `tokens/colors_and_type.css` — the token layer (the one source of raw values).
- `kits/quasar/quasar.variables.scss` — Quasar Sass brand mapping.
- `kits/vuetify/*theme*.js` — Vuetify theme object.

Everything else must use tokens. If you need a value no token provides, add the token first (see `../CONTRIBUTING.md`).
