#!/usr/bin/env node
/**
 * dev.mjs — live catalog dev server (zero dependencies, Node built-ins only).
 *
 * Builds site/, serves it, watches the source dirs, rebuilds on change, and
 * live-reloads the browser via Server-Sent Events. No install required.
 *
 *   npm run dev          →   http://localhost:8080   (or PORT=3000 npm run dev)
 *
 * Edit any preview/ or skills/epfl-design/ file and the page reloads automatically.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, watch } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { build, SITE, ROOT } from './build-catalog.mjs';

const PORT = Number(process.env.PORT) || 8080;
const WATCH_DIRS = ['preview', 'skills/epfl-design'];
const WATCH_FILES = ['scripts/build-catalog.mjs'];

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.json': 'application/json',
};

// Injected only into the top index document — iframes reload with the parent,
// so we avoid opening ~20 EventSource connections (browsers cap ~6 per host).
const RELOAD_SNIPPET = `
<script>
  // injected by scripts/dev.mjs — live reload
  try { new EventSource('/__reload').onmessage = () => location.reload(); } catch (e) {}
</script>
`;

const clients = new Set(); // open SSE responses

function rebuild(reason) {
  try {
    build({ quiet: true });
    console.log(`  ↻ rebuilt${reason ? ` (${reason})` : ''}`);
    for (const res of clients) res.write('data: reload\n\n');
  } catch (err) {
    console.error(`  ✗ build failed: ${err.message}`);
  }
}

function debounce(fn, ms) {
  let t, lastArg;
  return (arg) => { lastArg = arg; clearTimeout(t); t = setTimeout(() => fn(lastArg), ms); };
}

const server = createServer(async (req, res) => {
  const path = req.url.split('?')[0];

  if (path === '/__reload') {
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let p = normalize(decodeURIComponent(path));
  if (p.endsWith('/')) p += 'index.html';
  const file = join(SITE, p);
  if (!file.startsWith(SITE) || !existsSync(file)) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  res.setHeader('content-type', MIME[extname(file)] || 'application/octet-stream');
  let body = await readFile(file);
  if (p === '/index.html') {
    const html = body.toString('utf8');
    body = Buffer.from(
      html.includes('</body>') ? html.replace('</body>', `${RELOAD_SNIPPET}</body>`) : html + RELOAD_SNIPPET,
      'utf8',
    );
  }
  res.end(body);
});

function watchSources() {
  const onChange = debounce(rebuild, 150);
  for (const d of WATCH_DIRS) {
    const dir = join(ROOT, d);
    if (existsSync(dir)) watch(dir, { recursive: true }, (_e, f) => onChange(`${d}/${f ?? ''}`));
  }
  for (const f of WATCH_FILES) {
    const fp = join(ROOT, f);
    if (existsSync(fp)) watch(fp, () => onChange(f));
  }
}

rebuild('initial');
watchSources();
server.listen(PORT, () => {
  console.log(`\n  EPFL catalog dev server → http://localhost:${PORT}`);
  console.log('  Watching preview/ and skills/epfl-design/ — save to live-reload.');
  console.log('  Ctrl-C to stop.\n');
});
