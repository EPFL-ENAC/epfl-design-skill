# Vuetify kit

Like Quasar, Vuetify brings its own components, so the EPFL kit is a **theme mapping**. Register the EPFL theme, load the design-system stylesheet for fonts + the EPFL-specific patterns Vuetify lacks (hero, key-number, distinction card — use the [`html/`](../html/) snippets for those).

## Setup

```js
import 'epfl-design/css/epfl.css'                                  // tokens, fonts, atomic classes
import { epflVuetifyTheme } from 'epfl-design/kits/vuetify/epfl-vuetify-theme'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: epflVuetifyTheme,
  defaults: {
    // EPFL is flat + tight: borders over shadows, 2px radius.
    VCard: { variant: 'outlined', rounded: 'sm' },
    VBtn:  { rounded: 'sm', flat: true },
  },
})
```

Set the app font to Suisse Int'l (loaded by `css/epfl.css`):

```css
.v-application { font-family: var(--font-sans); }
```

## Brand rules to enforce on top of Vuetify

- No elevation/shadows on cards (`variant="outlined"`); no hover lift/scale; no gradients.
- Sentence case on all labels; never Title Case. No emoji.
- See `../../README.md` for the full spec.
