# EPFL design system: rules

The tool-neutral rules for any agent building EPFL web UI (Claude Code, OpenCode, Codex,
Cursor, …). `SKILL.md` routes here. Every path below is relative to this folder.

## What this is

The **ENAC IT4R** team's working reference for EPFL's (École polytechnique fédérale de Lausanne) web design language, distilled from the upstream `epfl-si/elements` styleguide. **Unofficial**: not produced or endorsed by EPFL's central brand team; when it disagrees with the official guidelines, those win. Use it two ways:

1. as a **design reference** (you, reading these docs to design on-brand);
2. as a **CSS + framework kits** bundle copied into a real project (Vue/Quasar, Vuetify, React, or plain HTML), or into a throwaway prototype.

**No build system is required to use it.** Everything is static: tokens CSS, atomic CSS, SVGs, HTML, and framework component source meant to be copied or imported into the consuming app's own build. To "see" something, open an `examples/*.html` in a browser, or browse the published catalog at <https://epfl-enac.github.io/epfl-design-skill/>.

## Read order (do this before generating any EPFL output)

1. **`rules.md`** (this file): how to operate, the enforced rules.
2. **`design.md`**: the brand spec, the *why*. The authoritative content + visual fundamentals.
3. **`examples/`**: real, finished screens. Study these before building a new page; tokens alone don't capture the last mile.
4. As needed: **`tokens/colors_and_type.css`** (the tokens), **`css/`** (the atomic CSS layer), **`kits/<framework>/`** (component wrappers for the project's stack), **`assets/`** (logos + icons).

If invoked with no brief, ask what the user wants to build, then act as an EPFL designer producing either static HTML artifacts (mocks/prototypes) or production code for their framework.

## The architecture (CSS-first + atomic)

Decisions cascade through layers; **always author against the layer above, never re-invent below it.**

```
tokens/colors_and_type.css   raw + semantic CSS variables + @font-face   ← the only place raw values live
        ↓ var(--…)
css/  atoms → molecules → organisms → templates   framework-agnostic .epfl-* classes   ← the canonical components
        ↓ class names
kits/ vue · quasar · vuetify · react · html   thin wrappers that render those classes
        ↓ compose
examples/   full pages (the reference library)
```

- **The CSS classes are canonical.** A framework kit is a thin adapter — it adds no styling of its own; it renders `.epfl-*` classes. Build a new component in `css/` first (must work as plain HTML), then wrap it per framework.
- **Pick the kit that matches the project's stack** (`kits/README.md` has the chooser). Vue/Quasar is the primary stack. Import a kit from its **`index.js`**, never from component internals.
- Class naming is `epfl-<block>[-<element>]` (`.epfl-card`, `.epfl-card-title`, `.epfl-btn-primary`).

## Enforced constraints (checked by the linter — your output must pass)

The design system's brand linters (oxlint for JS/JSX, stylelint for CSS/Vue) check these. Hard rules:

- **No raw hex colors.** Use a token: `var(--primary)`, `var(--fg)`, … Raw values live *only* in `tokens/colors_and_type.css` (and framework brand-mapping recipes, which are exempt).
- **No raw `px`.** Use `rem` or a spacing token (`var(--space-*)`, `var(--gutter)`, `var(--radius)`, `var(--border-w)`). The whole `css/` layer is `rem`-only on purpose.
- **Only `Suisse Int'l`** as a font family (Arial is the sanctioned fallback, already in `--font-sans`).
- **Never commit or bundle font files.** Suisse Int'l is licensed to EPFL; pages load it from `https://enac-it-fonts.epfl.ch` (`tokens/fonts.css`), which serves `*.epfl.ch` origins, and `localhost` dev servers on the EPFL network or VPN. A mock opened as a file, or off VPN, renders in Arial: that is expected, not a bug to fix.
- **Import kits from `index.js`**, never from internals.

## Brand rules the linter can't see (from `design.md` — follow them anyway)

- **Sentence case** for headings and buttons — never Title Case. ("Discover our research", not "Discover Our Research".) UPPERCASE only for h6 / category labels.
- **No emoji. Ever.** Not in UI, not in content.
- **No gradients, no textures, no drop-shadows on cards.** Borders > shadows. Surfaces are flat.
- **Tight radii** — 2px (`--radius`) / 4px (`--radius-lg`).
- **Hover changes color/border, never scales or lifts.** No "card lift on hover".
- **Focus = 2px solid outline, 2px offset, hue-matched** (red-dark / gray-600 / canard-dark). Disabled stays at opacity 1.
- **French is primary**; voice is institutional, precise, calm. Web red is `#FF0000`/`#B51F1F`; **print** red is `#E30713` — never mix them.
- **Signatures:** white text-panel hero over a full-bleed photo; 7×6px red dot under the active nav item; red triangle flag on distinction cards; "three" is the recurring count.

## Building a pattern

1. Use an existing `.epfl-*` class or kit component first.
2. Author anything new against the tokens only (`rem`, `var(--…)`), and cover **hover, focus (2px outline), active, disabled**.
3. A pattern worth reusing belongs in the design system itself (its `css/` first, then the kits): tell the user, so the ENAC IT4R team can add it.
