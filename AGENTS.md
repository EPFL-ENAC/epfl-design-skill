# Maintaining the EPFL design skill

This repo ships one agent skill, `skills/epfl-design/`. To **use** it, follow
`skills/epfl-design/SKILL.md`; its rules are in `skills/epfl-design/rules.md`. This
file is for changing the design system itself. `CLAUDE.md` imports it.

## Where things live

- **Everything the skill reads lives in `skills/epfl-design/`**, referenced by relative
  paths: the folder is zipped as is for claude.ai, Codex and projects. Nothing in it may
  point outside it.
- **`SKILL.md` frontmatter stays portable:** `name` and `description` only, the
  description under 200 characters (claude.ai's limit).
- **Repo tooling stays at the root:** `preview/` (catalog cards, linking
  `../skills/epfl-design/…`), `scripts/` (catalog generator, dev server, screenshots),
  `adherence/` (brand linters), `.github/workflows/`, `.claude-plugin/`.
- The catalog reads its "Brand rules" panels from the `## Enforced constraints` and
  `## Brand rules the linter can't see` sections of `skills/epfl-design/rules.md`: keep
  those headings.

## Building a component (checklist)

1. Author it in `skills/epfl-design/css/` under the right atomic level, using tokens only
   (`rem`, `var(--…)`), and add its `@import` to `css/epfl.css`.
2. Cover **hover, focus (2px outline), active, disabled**.
3. Add the thin wrapper(s) in the relevant `skills/epfl-design/kits/`.
4. Add a `preview/<name>.html` card (links `../skills/epfl-design/css/epfl.css`, no
   duplicated CSS). It **must** start with a valid `@dsCard` comment —
   `<!-- @dsCard group="…" name="…" subtitle="…" viewport="WxH" -->` — because the
   published catalog is generated from it. A card with no `@dsCard` is silently dropped.
5. Run the adherence linter (`npm run lint`); fix until clean. Note it in `CHANGELOG.md`.

See `CONTRIBUTING.md` for the full workflow.

## Releasing

Bump `version` in `.claude-plugin/plugin.json` and `package.json`, move the
`CHANGELOG.md` entries under the new version, merge, then tag `vX.Y.Z`. The release
workflow builds `dist/epfl-design.zip` and `.skill` (`make skill` locally) and publishes
them; plugin users get the update with `claude plugin marketplace update`.
