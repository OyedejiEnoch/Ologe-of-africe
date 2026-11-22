// Lists media not used by any product (main photo, gallery or video).
// Run with DELETE_ORPHANS=1 to remove them.
import { getPayload } from "payload";
import config from "../payload.config";

const payload = await getPayload({ config });
const media = await payload.find({ collection: "media", limit: 1000, pagination: false, depth: 0 });
const products = await payload.find({ collection: "products", limit: 1000, pagination: false, depth: 0 });
const used = new Set<string>();
for (const p of products.docs as any[]) {
  [p.image, p.video, ...(p.gallery ?? [])].filter(Boolean).forEach((id: any) => used.add(String(typeof id === "object" ? id.id : id)));
}
const orphans = (media.docs as any[]).filter((m) => !used.has(String(m.id)));
console.log(`media ${media.totalDocs}, products ${products.totalDocs}, unused ${orphans.length}`);
for (const m of orphans) console.log(`  unused: ${m.filename} (${m.url})`);
if (process.env.DELETE_ORPHANS === "1") {
  for (const m of orphans) await payload.delete({ collection: "media", id: m.id });
  console.log(`deleted ${orphans.length}`);
}
const sample = (media.docs as any[])[0];
console.log("sample url:", sample?.url);
process.exit(0);
