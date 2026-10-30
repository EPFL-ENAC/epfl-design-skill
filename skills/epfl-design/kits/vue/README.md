# Vue 3 kit

Thin `<script setup>` components wrapping the `epfl-*` classes from `css/epfl.css`. No scoped styles — all styling comes from the global stylesheet.

## Setup

```js
// main.js — load the design system stylesheet once
import 'epfl-design/css/epfl.css'
```

```vue
<script setup>
import { EpflHeader, EpflHero, EpflCard, EpflCardDeck, EpflButton, EpflKeyNumber, EpflFooter } from 'epfl-design/kits/vue'
</script>

<template>
  <EpflHeader active="Research" />
  <EpflHero title="Pioneering research, made in Switzerland" :image="heroImg">
    <p>EPFL is one of the most vibrant science and technology institutions in Europe.</p>
    <EpflButton variant="primary">Discover our research</EpflButton>
  </EpflHero>

  <EpflCardDeck>
    <EpflCard :image="img" category="News" date="12 Mar 2026" title="…" distinction>Summary…</EpflCard>
  </EpflCardDeck>
</template>
```

## Components

| Component | Key props |
|-----------|-----------|
| `EpflButton` | `variant` (primary/secondary/tertiary), `size` ('' / sm), `disabled` |
| `EpflCard` | `image`, `category`, `date`, `title`, `distinction` |
| `EpflCardDeck` | — (wraps cards in the 3-up grid) |
| `EpflHero` | `title`, `image` (+ default slot for body) |
| `EpflHeader` | `items`, `active`, `langs`, `activeLang`, `logo` |
| `EpflKeyNumber` | `pre`, `value`, `label` |
| `EpflFooter` | `cols`, `logo`, `copyright` (+ `legal` slot) |

## Notes

- `logo` props default to `/assets/svg/…`. Point them at wherever you serve the EPFL assets (copy `assets/svg/` into your app's public dir, or set an import path).
- Pair with the [`quasar/`](../quasar/) brand mapping in Quasar projects.
