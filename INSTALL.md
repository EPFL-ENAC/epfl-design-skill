# Install & use in a project

To install the **agent skill** (Claude Code plugin, claude.ai upload, Codex/OpenCode),
see the [README](README.md#install). This file covers wiring the design system's CSS,
tokens and kits into a real project.

Every path below is relative to the skill folder: `skills/epfl-design/` in this repo,
`vendor/epfl-design/` once unzipped into a project.

## A. In a production web project

Unzip the release archive into the project, once per update:

```bash
curl -fsSL https://github.com/EPFL-ENAC/epfl-design-skill/releases/latest/download/epfl-design.zip -o /tmp/epfl-design.zip
unzip -o /tmp/epfl-design.zip -d vendor/    # → vendor/epfl-design/
```

Pin a version by replacing `latest/download` with `download/vX.Y.Z`, and commit
`vendor/epfl-design/` so the build never depends on the network.

**1. Load the stylesheet once** (this is all most projects need):

```html
<link rel="stylesheet" href="/vendor/epfl-design/css/epfl.css">
```

`css/epfl.css` `@import`s the token layer (which pulls in `tokens/fonts.css`) and every atomic level. (Need tokens only, no component classes? Link `tokens/colors_and_type.css` instead.) Suisse Int'l then loads on `*.epfl.ch` sites; see [Fonts](#fonts).

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

## Fonts

Suisse Int'l is licensed to EPFL by Swiss Typefaces: free on the web for sites
under `epfl.ch`, only as the delivered webfont files, only through `@font-face`.
So the files are not in this repo. ENAC IT4R serves them from
`https://enac-it-fonts.epfl.ch`, which answers only requests whose `Origin` is
`https://epfl.ch` or `https://<anything>.epfl.ch`, plus a local dev server
(`http://localhost:<port>`, `http://127.0.0.1:<port>`) when you are on the EPFL
network or VPN. Anywhere else (`file://`, the public catalog, another domain,
off VPN) it answers 403 and text falls back to Arial.

| URL | Weight | Style |
|---|---|---|
| `https://enac-it-fonts.epfl.ch/SuisseIntl-Regular-WebS.woff2` | 400 | normal |
| `https://enac-it-fonts.epfl.ch/SuisseIntl-RegularItalic-WebS.woff2` | 400 | italic |
| `https://enac-it-fonts.epfl.ch/SuisseIntl-Medium-WebS.woff2` | 500 | normal |
| `https://enac-it-fonts.epfl.ch/SuisseIntl-SemiBold-WebS.woff2` | 600 | normal |
| `https://enac-it-fonts.epfl.ch/SuisseIntl-SemiBoldItalic-WebS.woff2` | 600 | italic |
| `https://enac-it-fonts.epfl.ch/SuisseIntl-Bold-WebS.woff2` | 700 | normal |

No Light (300) or Medium italic webfont yet: the browser uses the nearest face.
`tokens/fonts.css` declares all six faces and is the file to copy from.

Each face also exists as a Latin subset: replace `-WebS.woff2` with
`-WebS-latin.woff2` (for example `SuisseIntl-Regular-WebS-latin.woff2`). It
covers Basic Latin, Latin-1 (fr, en, de, es, it), Œ œ, dashes, curly quotes,
guillemets, bullet, ellipsis, € and −, in about 13 KB instead of 17 KB; any
other character renders in the next font of the stack. `tokens/fonts.css`
uses the full files; switch in your own copy only if the 4 KB per face matter.

**With the design system:** nothing to do. `css/epfl.css` (or
`tokens/colors_and_type.css`) loads `tokens/fonts.css`, and every element uses
`var(--font-sans)`.

**Font only**, for an app with its own tokens (a Quasar app like
co2-calculator): import `tokens/fonts.css`, or copy its `@font-face` blocks into
your own `fonts.css`. The family name is `"Suisse Int'l"`.

```js
// main.ts, or a Quasar boot file
import '/vendor/epfl-design/tokens/fonts.css'
```

Then point your font token at it, Arial last:

```scss
// SCSS token option (co2-calculator style: src/css/02-tokens/_options.scss)
$tokens-typography-font-family-base: "Suisse Int'l", Arial, "Helvetica Neue", Helvetica, sans-serif !default;
```

```css
/* plain CSS: --font-sans is the one token to override, after css/epfl.css */
:root { --font-sans: "Suisse Int'l", system-ui, Arial, sans-serif; }
```

The design system's default stack is `"Suisse Int'l", Arial, "Helvetica Neue",
Helvetica, sans-serif` (Arial is the brand-sanctioned fallback); only override it
for a reason.

**Load it sooner** (optional, in `<head>`). `crossorigin` is required: without
it the browser sends no `Origin` and the server answers 403.

```html
<link rel="preconnect" href="https://enac-it-fonts.epfl.ch" crossorigin>
<link rel="preload" href="https://enac-it-fonts.epfl.ch/SuisseIntl-Regular-WebS.woff2"
      as="font" type="font/woff2" crossorigin>
```

Never copy the font files into a project, public or private: that is what the
font server replaces.

## B. Quick copy (throwaway prototypes / mocks)

Unzip the archive as above, or copy `css/`, `tokens/`, and any `assets/` you reference into your prototype, link `css/epfl.css`, and paste snippets from `kits/html/`. Fastest for one-offs; you lose update-ability. Opened as a file it renders in Arial; served from `localhost` on the EPFL network or VPN it gets Suisse Int'l (see [Fonts](#fonts)).

## Updating

- Rerun the `curl` + `unzip` lines (with a new version for a pinned project), review
  the diff of `vendor/epfl-design/`, commit.

## Keeping it healthy

See `CONTRIBUTING.md`: small PRs, show the pixels, feed real screens back into `examples/`.
