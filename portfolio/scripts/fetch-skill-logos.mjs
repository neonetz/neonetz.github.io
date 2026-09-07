// Downloads brand SVGs for skill logos from Simple Icons (https://simpleicons.org,
// icons are CC0; brand marks remain property of their owners). Assets are bundled
// into public/skills so the particle stage never depends on a third-party CDN at runtime.
// Re-run after adding new skills: node scripts/fetch-skill-logos.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'skills');
const CDN = 'https://cdn.simpleicons.org';

// file = output name in public/skills; slugs = Simple Icons candidates, first hit wins
const LOGOS = [
  { file: 'go', slugs: ['go'] },
  { file: 'wails', slugs: ['wails'] },
  { file: 'react', slugs: ['react'] },
  { file: 'tailwindcss', slugs: ['tailwindcss'] },
  { file: 'sqlite', slugs: ['sqlite'] },
  { file: 'python', slugs: ['python'] },
  { file: 'opencv', slugs: ['opencv'] },
  { file: 'mediapipe', slugs: ['mediapipe'] },
  { file: 'odoo', slugs: ['odoo'] },
  { file: 'postgresql', slugs: ['postgresql'] },
  { file: 'flask', slugs: ['flask'] },
  { file: 'tensorflow', slugs: ['tensorflowlite', 'tensorflow'] },
  { file: 'firebase', slugs: ['firebase'] },
];

await mkdir(OUT_DIR, { recursive: true });

let found = 0;
for (const { file, slugs } of LOGOS) {
  let saved = false;
  for (const slug of slugs) {
    try {
      const res = await fetch(`${CDN}/${slug}`);
      if (!res.ok) continue;
      const svg = await res.text();
      await writeFile(path.join(OUT_DIR, `${file}.svg`), svg);
      console.log(`ok    ${file}.svg <- ${slug}`);
      saved = true;
      found += 1;
      break;
    } catch (err) {
      console.warn(`net   ${slug}: ${err.message}`);
    }
  }
  if (!saved) console.log(`MISS  ${file} (no logo found, particle stage will use letter fallback)`);
}

console.log(`\n${found}/${LOGOS.length} logos saved to ${OUT_DIR}`);
