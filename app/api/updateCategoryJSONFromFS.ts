// app/api/updateCategoryJSON.ts
import fs from 'fs';
import path from 'path';

export function updateCategoryJSONFromFS() {
  const base = path.join(process.cwd(), 'data', 'catwiseimages');
  const out = path.join(process.cwd(), 'data', 'categoryImages.json');

  if (!fs.existsSync(base)) return;

  const data = fs.readdirSync(base)
    .filter((d) => fs.statSync(path.join(base, d)).isDirectory())
    .map((slug) => ({
      slug,
      name: slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      images: fs.readdirSync(path.join(base, slug))
        .filter((f) => f.endsWith('.png'))
        .map((f) => `/catwiseimages/${slug}/${f}`),
    }));

  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  return data;
}
