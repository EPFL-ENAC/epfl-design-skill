@AGENTS.md

# Claude Code notes

The rules for this repo live in **`AGENTS.md`** (imported above) so every tool —
Claude Code, OpenCode, Cursor — shares one source of truth. Don't duplicate rules
here; edit `AGENTS.md`.

Claude-Code-specific:

- This repo is an **agent skill**: `SKILL.md` is the entry point and is
  user-invocable (e.g. `/epfl-design`). When the skill triggers, follow the read
  order in `AGENTS.md`.
- There is **no build/test/`package.json`** for the design system itself. The only
  optional tooling is the adherence linter in `adherence/` (run it to check your
  output passes the brand rules). To preview, open `examples/*.html` or
  `preview/*.html` in a browser.
