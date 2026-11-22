// Payload: the owner's admin (/admin) and the content API (/api), running
// inside this Next.js app. Data lives in MongoDB Atlas; uploads go to a
// Cloudflare R2 bucket through the S3 adapter. Without R2 settings (local
// work) uploads fall back to the ./media folder on disk.
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { s3Storage } from "@payloadcms/storage-s3";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Products } from "./payload/collections/Products";
import { Orders } from "./payload/collections/Orders";
import { Enquiries } from "./payload/collections/Enquiries";
import { Subscribers } from "./payload/collections/Subscribers";
import { SiteSettings } from "./payload/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const r2 = {
  accountId: process.env.R2_ACCOUNT_ID,
  bucket: process.env.R2_BUCKET,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  // Public bucket URL (r2.dev subdomain or a custom domain such as
  // https://media.ologeofafrica.com). When set, the site loads images straight
  // from R2 instead of streaming them through the app.
  publicUrl: process.env.R2_PUBLIC_URL?.replace(/\/$/, ""),
};
const r2Enabled = Boolean(r2.accountId && r2.bucket && r2.accessKeyId && r2.secretAccessKey);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · OLÒGE of Africa",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    theme: "light",
    components: {
      views: {
        dashboard: { Component: "/payload/components/Dashboard#Dashboard" },
      },
      graphics: {
        Logo: "/payload/components/Logo#Logo",
        Icon: "/payload/components/Logo#Icon",
      },
    },
  },
  collections: [Products, Orders, Enquiries, Subscribers, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: mongooseAdapter({ url: process.env.DATABASE_URL || "" }),
  sharp,
  graphQL: { disable: true },
  plugins: [
    s3Storage({
      enabled: r2Enabled,
      collections: {
        media: r2.publicUrl
          ? {
              prefix: "media",
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                `${r2.publicUrl}/${prefix ? `${prefix}/` : ""}${filename}`,
            }
          : { prefix: "media" },
      },
      bucket: r2.bucket || "",
      config: {
        endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
        region: "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: r2.accessKeyId || "",
          secretAccessKey: r2.secretAccessKey || "",
        },
      },
    }),
  ],
});
