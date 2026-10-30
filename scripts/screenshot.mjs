#!/usr/bin/env node
/**
 * screenshot.mjs — render every catalog specimen to a PNG with Playwright.
 *
 * Serves the generated `site/` over a tiny in-process static server, then loads
 * each `preview/*.html` at its `@dsCard` viewport and each skill example page
 * full-page, writing PNGs to `screenshots/`. Used by the PR workflow to upload a
 * visual artifact; also runnable locally.
 *
 *   node scripts/build-catalog.mjs && node scripts/screenshot.mjs
 *
 * Requires Playwright (dev dependency): npm i -D playwright && npx playwright install chromium
 */
import { createServer } from 'node:http';
import { readFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { readPreviews, readExamples, slug, SITE, ROOT } from './build-catalog.mjs';

const OUT = join(ROOT, 'screenshots');
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.json': 'application/json',
};

function serve(dir) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let p = normalize(decodeURIComponent(req.url.split('?')[0]));
        if (p.endsWith('/')) p += 'index.html';
        const file = join(dir, p);
        if (!file.startsWith(dir) || !existsSync(file)) { res.statusCode = 404; return res.end('not found'); }
        res.setHeader('content-type', MIME[extname(file)] || 'application/octet-stream');
        res.end(await readFile(file));
      } catch { res.statusCode = 500; res.end('error'); }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function shoot(browser, base, { url, file, viewport, fullPage, scale }) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: scale });
  try {
    await page.goto(`${base}${url}`, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(400); // let fonts settle
    await page.screenshot({ path: join(OUT, file), fullPage });
    console.log(`  ✓ ${file}`);
  } catch (err) {
    console.warn(`  ⚠ ${file}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(SITE)) {
    console.error('site/ missing — run: node scripts/build-catalog.mjs first');
    process.exit(1);
  }
  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch {
    console.error('Playwright not installed. Run: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const server = await serve(SITE);
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch();

  for (const c of readPreviews()) {
    await shoot(browser, base, {
      url: `/preview/${c.file}`,
      file: `${slug(c.group)}--${slug(c.name)}.png`,
      viewport: { width: c.w, height: c.h },
      fullPage: false,
      scale: 2,
    });
  }
  for (const e of readExamples()) {
    await shoot(browser, base, {
      url: `/skills/epfl-design/examples/${e.file}`,
      file: `example--${slug(e.file.replace(/\.html$/, ''))}.png`,
      viewport: { width: 1280, height: 900 },
      fullPage: true,
      scale: 1,
    });
  }

  await browser.close();
  server.close();
  console.log('Done → screenshots/');
}

main();
