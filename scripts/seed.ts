// One-time import of the starter catalog (lib/catalog.ts) into Payload:
// uploads each product photo through the Media pipeline (to R2 when
// configured) and creates the product. Safe to re-run: products whose web
// address already exists are skipped.
//
//   npm run seed
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";
import { PRODUCTS } from "../lib/catalog";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

async function run() {
  const payload = await getPayload({ config });
  let created = 0;
  let skipped = 0;

  for (const [index, product] of PRODUCTS.entries()) {
    const exists = await payload.count({ collection: "products", where: { slug: { equals: product.slug } } });
    if (exists.totalDocs > 0) {
      skipped++;
      continue;
    }

    const file = path.join(process.cwd(), "public", product.image);
    const data = fs.readFileSync(file);
    const media = await payload.create({
      collection: "media",
      data: { alt: `${product.name}, ${product.variant}` },
      file: {
        data,
        name: path.basename(file),
        mimetype: MIME[path.extname(file).toLowerCase()] ?? "image/jpeg",
        size: data.length,
      },
    });

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        variant: product.variant,
        slug: product.slug,
        category: product.category,
        wearer: product.wearer ?? "both",
        price: product.price ?? undefined,
        description: product.description,
        image: media.id,
        featured: Boolean(product.featured),
        status: "available",
        order: index * 10,
      },
    });
    created++;
    console.log(`  + ${product.name} (${product.variant})`);
  }

  console.log(`Seed done: ${created} created, ${skipped} already there.`);
}

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
