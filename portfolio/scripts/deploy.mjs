// Copies the Vite build output to the repository root, where GitHub Pages
// serves the site, and removes stale hashed bundles left by earlier deploys.
// Cross-platform replacement for `cp -r dist/* ../`.
import { cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const portfolioDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(portfolioDir, 'dist');
const repoRoot = path.join(portfolioDir, '..');
const rootAssetsDir = path.join(repoRoot, 'assets');
const distAssetsDir = path.join(distDir, 'assets');

await cp(distDir, repoRoot, { recursive: true });

const current = new Set(await readdir(distAssetsDir));
let removed = 0;
for (const file of await readdir(rootAssetsDir)) {
  if (!current.has(file) && /\.(js|css|map)$/.test(file)) {
    await rm(path.join(rootAssetsDir, file));
    removed += 1;
  }
}

console.log(`Deployed ${distDir} -> ${repoRoot}; removed ${removed} stale asset file(s).`);
