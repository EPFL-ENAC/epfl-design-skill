@AGENTS.md

# Claude Code notes

Rules for maintaining this repo live in `AGENTS.md` (imported above), so every tool
shares one source. The skill itself is `skills/epfl-design/`; this repo is also a
Claude Code plugin marketplace (`.claude-plugin/`).

- There is no build for the design system itself. The optional tooling is the catalog
  (`make dev`), the adherence linter (`npm run lint`) and `make skill`, which zips the
  skill folder.
