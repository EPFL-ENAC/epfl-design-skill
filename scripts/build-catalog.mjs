#!/usr/bin/env node
/**
 * build-catalog.mjs — EPFL design-system catalog generator (zero runtime deps).
 *
 * Scans `preview/*.html` for their `@dsCard` metadata, the `examples/` index,
 * and the canonical brand rules in `AGENTS.md`, then emits a static `site/`
 * directory: one branded gallery page that embeds each specimen in an iframe at
 * its declared viewport. No bundler, no framework, Node built-ins only — true to
 * the repo's no-build philosophy. The catalog chrome is itself authored with
 * `epfl.css` tokens/classes (dogfooding).
 *
 *   node scripts/build-catalog.mjs   →   site/index.html (+ copied asset dirs)
 *
 * Asset dirs are copied into site/ preserving structure, so each preview's
 * repo-relative paths (`../css/epfl.css`, `../assets/…`) still resolve.
 */
import {
  readFileSync, writeFileSync, readdirSync,
  rmSync, mkdirSync, cpSync, existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const COPY_DIRS = ['css', 'tokens', 'assets', 'fonts', 'preview', 'examples'];
// Foundations first, components last; any unknown group is appended after.
const GROUP_ORDER = ['Brand', 'Colors', 'Type', 'Spacing', 'Components'];

const CATALOG_URL = 'https://epfl-enac.github.io/epfl-design-skill/';

// ── tiny helpers ───────────────────────────────────────────────────────────
const escapeHtml = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
   .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// minimal markdown inline → HTML: escape first, then **bold**, *italic*, `code`
const mdInline = (s = '') =>
  escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

const slug = (s = '') =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ── parse the @dsCard comment in a preview file ─────────────────────────────
function parseDsCard(html) {
  const m = html.match(/@dsCard([\s\S]*?)-->/);
  if (!m) return null;
  const attrs = {};
  for (const a of m[1].matchAll(/(\w+)="([^"]*)"/g)) attrs[a[1]] = a[2];
  return attrs;
}

function readPreviews() {
  const dir = join(ROOT, 'preview');
  const cards = [];
  for (const file of readdirSync(dir).filter(f => f.endsWith('.html')).sort()) {
    const meta = parseDsCard(readFileSync(join(dir, file), 'utf8'));
    if (!meta) { console.warn(`  ⚠ preview/${file}: no @dsCard comment — skipped`); continue; }
    const [w, h] = String(meta.viewport || '700x200').split('x').map(Number);
    cards.push({
      file,
      group: meta.group || 'Other',
      name: meta.name || file.replace(/\.html$/, ''),
      subtitle: meta.subtitle || '',
      w: w || 700,
      h: h || 200,
    });
  }
  return cards;
}

// ── parse the examples/README.md index table ────────────────────────────────
function readExamples() {
  const path = join(ROOT, 'examples', 'README.md');
  if (!existsSync(path)) return [];
  const rows = [];
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\|\s*`([^`]+\.html)`\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|/);
    if (m && existsSync(join(ROOT, 'examples', m[1]))) {
      rows.push({ file: m[1], title: m[2], notes: m[3] });
    }
  }
  return rows;
}

// ── parse the two rule sections out of AGENTS.md (single source of truth) ────
function readRules() {
  const md = readFileSync(join(ROOT, 'AGENTS.md'), 'utf8');
  const lines = md.split('\n');
  const section = (needle) => {
    const start = lines.findIndex(l => l.startsWith('## ') && l.includes(needle));
    if (start === -1) return [];
    const out = [];
    for (let i = start + 1; i < lines.length; i++) {
      if (lines[i].startsWith('## ')) break;
      const m = lines[i].match(/^-\s+(.*)$/);
      if (m) out.push(m[1].trim());
    }
    return out;
  };
  return {
    enforced: section('Enforced constraints'),
    brand: section("Brand rules the linter can't see"),
  };
}

// ── render ───────────────────────────────────────────────────────────────
function renderCard(c) {
  return `      <figure class="ds-card">
        <figcaption class="ds-card__bar">
          <span class="ds-card__name">${escapeHtml(c.name)}</span>
          ${c.subtitle ? `<span class="ds-card__sub">${escapeHtml(c.subtitle)}</span>` : ''}
          <a class="ds-card__src" href="preview/${escapeHtml(c.file)}" target="_blank" rel="noopener">preview/${escapeHtml(c.file)}</a>
        </figcaption>
        <div class="ds-card__frame">
          <iframe loading="lazy" src="preview/${escapeHtml(c.file)}" title="${escapeHtml(c.name)}" width="${c.w}" height="${c.h}"></iframe>
        </div>
      </figure>`;
}

function renderGroups(cards) {
  const groups = [...new Set(cards.map(c => c.group))].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a), ib = GROUP_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  return groups.map(g => {
    const items = cards.filter(c => c.group === g).map(renderCard).join('\n');
    return `    <section class="ds-section" id="group-${slug(g)}">
      <h2 class="ds-section__title">${escapeHtml(g)}</h2>
      <div class="ds-grid">
${items}
      </div>
    </section>`;
  }).join('\n');
}

function renderRuleList(items) {
  if (!items.length) return '<li>See <code>AGENTS.md</code>.</li>';
  return items.map(t => `<li>${mdInline(t)}</li>`).join('\n          ');
}

function renderExamples(examples) {
  if (!examples.length) return '';
  const cards = examples.map(e => `      <figure class="ds-card ds-card--wide">
        <figcaption class="ds-card__bar">
          <span class="ds-card__name">${escapeHtml(e.title)}</span>
          <a class="ds-card__src" href="examples/${escapeHtml(e.file)}" target="_blank" rel="noopener">open full page →</a>
        </figcaption>
        ${e.notes ? `<p class="ds-card__notes">${escapeHtml(e.notes)}</p>` : ''}
        <div class="ds-card__frame ds-card__frame--page">
          <iframe loading="lazy" src="examples/${escapeHtml(e.file)}" title="${escapeHtml(e.title)}" width="1280" height="760"></iframe>
        </div>
      </figure>`).join('\n');
  return `    <section class="ds-section" id="group-examples">
      <h2 class="ds-section__title">Examples — full screens</h2>
      <div class="ds-grid">
${cards}
      </div>
    </section>`;
}

function renderNav(cards, examples) {
  const groups = [...new Set(cards.map(c => c.group))].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a), ib = GROUP_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  const links = [
    '<a href="#foundations">Brand rules</a>',
    ...groups.map(g => `<a href="#group-${slug(g)}">${escapeHtml(g)}</a>`),
    examples.length ? '<a href="#group-examples">Examples</a>' : '',
  ].filter(Boolean).join('\n      ');
  return links;
}

function renderPage({ cards, examples, rules }) {
  const count = cards.length;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EPFL Design System — catalog</title>
  <link rel="stylesheet" href="css/epfl.css">
  <link rel="stylesheet" href="catalog.css">
</head>
<body class="ds-body">
  <header class="ds-masthead">
    <div class="ds-masthead__brand">
      <img class="ds-masthead__logo" src="assets/svg/epfl-logo.svg" alt="EPFL">
      <span class="ds-masthead__titles">
        <span class="ds-masthead__title">Design system</span>
        <span class="ds-masthead__org">ENAC IT4R · unofficial reference</span>
      </span>
    </div>
    <nav class="ds-masthead__nav" aria-label="Sections">
      ${renderNav(cards, examples)}
    </nav>
  </header>

  <main class="ds-main">
    <section class="ds-intro" id="top">
      <h1 class="ds-intro__h1">EPFL design system catalog</h1>
      <p class="lead">The <strong>ENAC IT4R</strong> team's working reference for building
        EPFL-branded web UI — ${count} component and token cards, plus the brand rules and
        reference screens. Every card renders the canonical <code>css/epfl.css</code> in
        isolation. Generated from <code>preview/*.html</code>; do not edit by hand.</p>
      <p class="ds-disclaimer">
        <strong>Unofficial.</strong> Maintained by the <strong>ENAC IT4R</strong> team at
        EPFL ENAC (School of Architecture, Civil and Environmental Engineering). It is
        distilled from EPFL's official brand guidelines and the
        <a href="https://github.com/epfl-si/elements">epfl-si/elements</a> styleguide, and
        is <strong>not</strong> produced or endorsed by EPFL's central brand or
        communications team. For canonical EPFL brand assets, use the official
        <a href="https://epfl-si.github.io/elements">Elements styleguide</a>.
      </p>
    </section>

    <section class="ds-section ds-rules" id="foundations">
      <h2 class="ds-section__title">Brand rules</h2>
      <div class="ds-rules__grid">
        <div class="ds-rules__panel">
          <h3 class="h6">Enforced by the linter</h3>
          <ul class="ds-rules__list">
          ${renderRuleList(rules.enforced)}
          </ul>
        </div>
        <div class="ds-rules__panel">
          <h3 class="h6">Brand rules the linter can't see</h3>
          <ul class="ds-rules__list">
          ${renderRuleList(rules.brand)}
          </ul>
        </div>
      </div>
      <p class="ds-rules__source">Parsed from <code>AGENTS.md</code> — the canonical rules file.</p>
    </section>

${renderGroups(cards)}
${renderExamples(examples)}
  </main>

  <footer class="ds-foot">
    <p>Maintained by <strong>EPFL ENAC IT4R</strong> — unofficial, distilled from
      <a href="https://github.com/epfl-si/elements">epfl-si/elements</a>.
      <a href="${CATALOG_URL}">${CATALOG_URL}</a> · built with <code>scripts/build-catalog.mjs</code></p>
  </footer>
</body>
</html>
`;
}

// ── catalog chrome (token-based; lives here so it is not a linted source .css) ─
const CATALOG_CSS = `/* Catalog chrome — generated by scripts/build-catalog.mjs. Do not edit. */
.ds-body { margin: 0; background: var(--bg-subtle); }

.ds-masthead {
  position: sticky; top: 0; z-index: 10;
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--bg);
  border-bottom: var(--border-w) solid var(--border);
  border-top: 4px solid var(--primary); /* red signature stripe */
}
.ds-masthead__brand { display: flex; align-items: center; gap: var(--space-2); }
.ds-masthead__logo { height: 1.75rem; width: auto; display: block; }
.ds-masthead__titles { display: flex; flex-direction: column; line-height: 1.2; }
.ds-masthead__title { font-weight: var(--w-bold); font-size: var(--fs-sm); text-transform: uppercase; letter-spacing: .04em; color: var(--fg-muted); }
.ds-masthead__org { font-size: var(--fs-xs); color: var(--fg-subtle); }
.ds-masthead__nav { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-left: auto; }
.ds-masthead__nav a {
  font-size: var(--fs-sm); text-decoration: none; color: var(--fg);
  padding-bottom: 2px; border-bottom: var(--border-w) solid transparent;
}
.ds-masthead__nav a:hover { color: var(--primary); border-bottom-color: var(--primary); }

.ds-main { max-width: 84rem; margin: 0 auto; padding: var(--space-5) var(--space-4); }

.ds-intro { margin-bottom: var(--space-5); max-width: 48rem; }
.ds-intro__h1 { margin-top: 0; }
.ds-disclaimer {
  margin-top: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-muted);
  border-left: 4px solid var(--primary);
  border-radius: var(--radius);
  font-size: var(--fs-sm); color: var(--fg-muted); line-height: var(--lh-normal);
}
.ds-disclaimer strong { color: var(--fg); }

.ds-section { margin-bottom: var(--space-5); scroll-margin-top: 6rem; }
.ds-section__title {
  font-size: var(--fs-h4); font-weight: var(--w-bold);
  padding-bottom: var(--space-2); margin-bottom: var(--space-4);
  border-bottom: var(--border-w) solid var(--border);
}

.ds-grid { display: grid; gap: var(--space-4); }

.ds-card {
  margin: 0; background: var(--bg);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
}
.ds-card__bar {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border-w) solid var(--border-subtle);
}
.ds-card__name { font-weight: var(--w-bold); }
.ds-card__sub { color: var(--fg-muted); font-size: var(--fs-sm); }
.ds-card__src { margin-left: auto; font-size: var(--fs-xs); font-family: var(--font-mono); color: var(--fg-subtle); }
.ds-card__notes { margin: 0; padding: var(--space-2) var(--space-3) 0; color: var(--fg-muted); font-size: var(--fs-sm); }
.ds-card__frame { padding: var(--space-3); overflow: auto; background: var(--bg); }
.ds-card__frame iframe { display: block; border: 0; max-width: 100%; }
.ds-card__frame--page { padding: 0; }
.ds-card__frame--page iframe { width: 100%; }

.ds-rules__grid { display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); }
.ds-rules__panel {
  background: var(--bg); border: var(--border-w) solid var(--border);
  border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4);
}
.ds-rules__panel .h6 { margin-top: 0; color: var(--fg-muted); }
.ds-rules__list { margin: 0; padding-left: 1.1rem; }
.ds-rules__list li { margin-bottom: var(--space-2); line-height: var(--lh-normal); }
.ds-rules__source { color: var(--fg-subtle); font-size: var(--fs-sm); margin-top: var(--space-3); }

.ds-foot {
  border-top: var(--border-w) solid var(--border);
  padding: var(--space-4); text-align: center;
  color: var(--fg-muted); font-size: var(--fs-sm);
}
`;

// ── build ──────────────────────────────────────────────────────────────────
function build({ quiet = false } = {}) {
  const log = quiet ? () => {} : (...a) => console.log(...a);
  log('Building EPFL design-system catalog → site/');
  const cards = readPreviews();
  const examples = readExamples();
  const rules = readRules();

  rmSync(SITE, { recursive: true, force: true });
  mkdirSync(SITE, { recursive: true });
  for (const dir of COPY_DIRS) {
    const src = join(ROOT, dir);
    if (existsSync(src)) cpSync(src, join(SITE, dir), { recursive: true });
    else console.warn(`  ⚠ missing dir: ${dir}`);
  }

  writeFileSync(join(SITE, 'catalog.css'), CATALOG_CSS);
  writeFileSync(join(SITE, 'index.html'), renderPage({ cards, examples, rules }));

  log(`  ✓ ${cards.length} component/token cards`);
  log(`  ✓ ${examples.length} example screens`);
  log(`  ✓ rules: ${rules.enforced.length} enforced, ${rules.brand.length} brand`);
  log('Done. Open site/index.html (or run: npm run serve:catalog).');
  return { cards, examples, rules };
}

export { ROOT, SITE, slug, readPreviews, readExamples, readRules, build };

// Run the build only when invoked directly (not when imported by screenshot.mjs).
if (process.argv[1] === fileURLToPath(import.meta.url)) build();
