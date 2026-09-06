#!/usr/bin/env node
// Sitemap generator for the portfolio site.
// Reads src/data/site.js and writes public/sitemap.xml.
// Run manually: node scripts/generate-sitemap.js

import { site } from "../src/data/site.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const today = new Date().toISOString().split("T")[0];

function buildUrlEntry(page) {
  const loc = `${site.url}${page.path}`.replace(/\/$/, "");
  const priority = page.priority?.toFixed(2) ?? "0.50";
  const changefreq = page.changefreq ?? "monthly";
  const lastmod = page.lastmod ?? today;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${site.pages.map(buildUrlEntry).join("\n")}
</urlset>
`;

const outPath = path.resolve(__dirname, "..", "public", "sitemap.xml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml, "utf8");

console.log(`sitemap written to ${outPath} (${site.pages.length} URL(s))`);
