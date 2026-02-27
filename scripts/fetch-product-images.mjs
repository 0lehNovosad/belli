/**
 * Scrape product image URLs from bellizoo.com.ua for each product slug.
 * Run: node scripts/fetch-product-images.mjs
 * Output: src/lib/api/product-images.json (slug -> imageUrl)
 */
import { writeFileSync } from 'fs';

const SLUGS = [
  'acana-suhiy-korm-dlya-sobak-adult-large-breed-17-kg',
  'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-2-kg',
  'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-6-kg',
  'acana-suhiy-korm-dlya-sobak-free-run-duck-2-kg',
  'acana-suhiy-korm-dlya-sobak-free-run-duck-6-kg',
  'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-2-kg',
  'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-6-kg',
  'acana-suhiy-korm-dlya-sobak-grasslands-recipe-2-kg',
  'acana-suhiy-korm-dlya-sobak-red-meat-recipe-2-kg',
  'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-2-kg',
  'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-6-kg',
  'almo-nature-daily-konserva-dlya-sobak-ndichka-400-g',
  'almo-nature-daily-konserva-dlya-sobak-kurka-400-g',
  'almo-nature-daily-konserva-dlya-sobak-kurka--goroh-100-g',
  'monge-suhiy-korm-dlya-cucenyat-bwild-low-grain-olenina-15-kg',
  'brit-care-hypoallergenic-junior-large-breed-yagnya-12kg',
  'optimeal-large-breed-suhiy-korm-dlya-sobak-kurka-4-kg',
  'taste-of-the-wild-high-prairie-canine-olenina-ta-bizon-5-6-kg',
  'schesir-konserva-dlya-sobak-kurka-z-ananasom-v-jele-150-g',
  'baskerville-hf-holistic-konserva-yagnya-ta-smorodina-400-g',
  'acana-suhiy-korm-dlya-kotv-bountiful-catch-4-5-kg',
  'acana-suhiy-korm-dlya-kotv-wild-prairie-1-8-kg',
  'acana-suhiy-korm-dlya-koshenyat-first-feast-kitten-1-8-kg',
  'almo-nature-daily-konserva-dlya-kotv-ndichka-400-g',
  'almo-nature-daily-konserva-dlya-kotv-kurka-85-g',
  'myau-vologiy-korm-dlya-kotv-ndichka-v-nizhnomu-sousi-100-g',
  'myau-vologiy-korm-dlya-kotv-krolik-ta-ndichka-v-ragu-100-g',
  'felix-vologiy-korm-dlya-kotv-sup-kurka-48-g',
  'myau-vologiy-korm-dlya-kotv-krolik-v-nizhnomu-sousi-100-g',
  'felix-vologiy-korm-dlya-kotv-sup-yalovichina-48-g',
  'aquaforest-sea-salt-25-kg-5x5-kg',
  'aquaforest-yod-iodum-50-ml',
  'pro-plan-fortiflora-plus-probiotik-dlya-sobak-2-g',
];

const BASE = 'https://bellizoo.com.ua';

function extractProductImage(html) {
  const re = /https:\/\/bellizoo\.com\.ua\/image\/cache\/import_files\/[^"'\s]+-(?:500x500|440x380|600x600)\.(?:png|jpg|jpeg|webp)/gi;
  const m = html.match(re);
  if (m && m[0]) return m[0];
  const fallback = /https:\/\/bellizoo\.com\.ua\/image\/cache\/import_files\/[^"'\s]+\.(?:png|jpg|jpeg|webp)/gi;
  const m2 = html.match(fallback);
  return m2 && m2[0] ? m2[0] : null;
}

async function fetchHtml(slug) {
  const res = await fetch(`${BASE}/${slug}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0' } });
  return res.text();
}

async function main() {
  const out = {};
  for (let i = 0; i < SLUGS.length; i++) {
    const slug = SLUGS[i];
    process.stderr.write(`[${i + 1}/${SLUGS.length}] ${slug} ... `);
    try {
      const html = await fetchHtml(slug);
      const url = extractProductImage(html);
      out[slug] = url || null;
      process.stderr.write(url ? 'OK\n' : 'no image\n');
    } catch (e) {
      process.stderr.write(`Error: ${e.message}\n`);
      out[slug] = null;
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  const path = 'src/lib/api/product-images.json';
  writeFileSync(path, JSON.stringify(out, null, 2), 'utf8');
}

main().catch(console.error);
