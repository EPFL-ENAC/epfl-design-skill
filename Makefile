# EPFL design system — convenience targets (thin wrappers over the npm scripts).
# The catalog generator/dev server are zero-dependency (Node built-ins); only
# `make screenshots` needs Playwright (see `make install`).

.DEFAULT_GOAL := help
.PHONY: help dev build serve screenshots lint install skill

help:
	@echo "make dev          live catalog dev server (build + watch + live-reload) on :8080"
	@echo "make build        build the static catalog into site/"
	@echo "make serve        build + serve site/ without watch (python http.server)"
	@echo "make screenshots  screenshot every specimen into screenshots/ (needs Playwright)"
	@echo "make lint         run the adherence linter"
	@echo "make install      install dev dependencies + Playwright Chromium"
	@echo "make skill        zip skills/epfl-design into dist/epfl-design.zip (+ .skill)"
	@echo ""
	@echo "Tip: PORT=3000 make dev   to use a different port."

dev:
	npm run dev

build:
	npm run build:catalog

serve:
	npm run serve:catalog

screenshots:
	npm run screenshots

lint:
	npm run lint

install:
	npm install
	npx playwright install chromium

# The skill as one archive: the epfl-design/ folder with SKILL.md at its root, which
# is what claude.ai, Claude Desktop and Codex install. A .skill file is the same zip.
skill:
	rm -rf dist && mkdir dist
	cd skills && zip -qr ../dist/epfl-design.zip epfl-design -x '*.DS_Store'
	cp dist/epfl-design.zip dist/epfl-design.skill
