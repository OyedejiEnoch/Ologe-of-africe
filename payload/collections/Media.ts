import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

// Photos and short product videos. Images are capped at 2400px and converted
// to WebP on upload, with smaller renditions for grids and the admin list.
// Videos are stored as uploaded (keep them short: phone-filmed 360° clips).
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo or video", plural: "Photos & videos" },
  admin: { group: "Shop", defaultColumns: ["filename", "alt", "mimeType", "updatedAt"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  upload: {
    // Local fallback folder, used only when R2 is not configured.
    staticDir: "media",
    mimeTypes: ["image/*", "video/mp4", "video/webm", "video/quicktime"],
    resizeOptions: { width: 2400, height: 2400, fit: "inside", withoutEnlargement: true },
    formatOptions: { format: "webp", options: { quality: 86 } },
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, fit: "inside", formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "card", width: 1000, height: 1000, fit: "inside", formatOptions: { format: "webp", options: { quality: 84 } } },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Describe the photo",
      admin: { description: "What someone would see, e.g. “Gold round sunglasses on a white ground”. Read aloud by screen readers and used by Google." },
    },
  ],
};
