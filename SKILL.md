---
name: epfl-design
description: Generates on-brand interfaces, components, and assets for EPFL (École polytechnique fédérale de Lausanne) — production code or throwaway prototypes. Use when building or styling any EPFL UI, working with the EPFL brand/design system, or when the user mentions EPFL pages, components, tokens, colors, or fonts. Ships design tokens, the Suisse Int'l font, framework-agnostic CSS, and Vue/Quasar/Vuetify/React/HTML component kits. Unofficial reference maintained by the EPFL ENAC IT4R team, distilled from EPFL's official guidelines (epfl-si/elements).
user-invocable: true
---

# EPFL Design System

> Unofficial reference maintained by the **ENAC IT4R** team at EPFL ENAC — distilled from
> EPFL's official brand guidelines (`epfl-si/elements`), not produced or endorsed by EPFL's
> central brand team. When this reference and the official guidelines disagree, those win.

Read **`AGENTS.md`** first — it holds the operating rules and the enforced brand
constraints. Then read **`README.md`** for the full content + visual fundamentals
(the *why*). Then **study `examples/`** — real finished screens are the best guide
to what EPFL output should look like. Pull in the rest as needed:
`tokens/colors_and_type.css` (tokens), `css/` (the atomic CSS layer),
`kits/<framework>/` (components for the project's stack — see `kits/README.md`),
`assets/` (logos + icons).

For **mocks / prototypes**: copy assets out and build static HTML using
`css/epfl.css`. For **production code**: pick the kit matching the project's
framework (Vue/Quasar primary), or use the plain `.epfl-*` classes directly.

If invoked with no brief, ask the user what they want to build, ask a couple of
questions, and act as an expert EPFL designer.

## Quick reference (hard rules)

- Tokens only — **no raw hex, no raw `px`** (use `var(--…)` or `rem`).
- Font: **Suisse Int'l** → Arial fallback (built into `--font-sans`).
- Primary red `#FF0000` / `#B51F1F` hover (web). Print red is `#E30713` — don't mix.
- Tertiary teal `#007480` (Canard). Heading/button case: **sentence case**, never Title Case.
- **No emoji. No gradients. No card drop-shadows.** Borders > shadows. Tight 2px radii.
- Hover changes color/border, never scales/lifts. Focus = 2px outline, 2px offset.
- Signature hero = white text panel overlapping a photo. Active nav = 7×6px red dot.

`CONTRIBUTING.md` covers how the team maintains/grows this; `INSTALL.md` covers
pulling it into other projects.
