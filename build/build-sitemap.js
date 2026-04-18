import fs from 'fs';
import path from 'path';
import { getDirname } from './get-dirname.js';

const __dirname = getDirname(import.meta.url);

const SITE_URL = 'https://konstaui.com';
const PAGES_DIR = path.resolve(__dirname, '../src/pages');
const OUT_FILE = path.resolve(__dirname, '../public/sitemap.xml');

const PAGE_EXTENSIONS = new Set(['.js', '.jsx', '.md', '.mdx']);
const IGNORED_FILES = new Set(['_app', '_document', '_error', '404', '500']);

function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...walk(full, `${base}/${entry.name}`));
      continue;
    }

    const ext = path.extname(entry.name);
    if (!PAGE_EXTENSIONS.has(ext)) continue;

    const name = entry.name.slice(0, -ext.length);
    if (IGNORED_FILES.has(name) || name.startsWith('_')) continue;

    const route = name === 'index' ? base || '/' : `${base}/${name}`;
    routes.push(route);
  }

  return routes;
}

const routes = walk(PAGES_DIR).sort();
const lastmod = new Date().toISOString().split('T')[0];

const urls = routes
  .map((route) => {
    const loc = `${SITE_URL}${route === '/' ? '' : route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(OUT_FILE, xml);
console.log(`[build-sitemap] wrote ${routes.length} urls to ${path.relative(process.cwd(), OUT_FILE)}`);
