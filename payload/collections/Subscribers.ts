import type { CollectionConfig } from "payload";
import { nobody, signedIn } from "../access";

// Sign-ups from "The list" newsletter band. Created only by the subscribe
// server action. Export from /admin for email campaigns.
export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Subscriber", plural: "Mailing list" },
  admin: { useAsTitle: "email", group: "Customers", defaultColumns: ["email", "source", "createdAt"] },
  access: { read: signedIn, create: nobody, update: signedIn, delete: signedIn },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "source", type: "text", defaultValue: "home", admin: { readOnly: true } },
  ],
};
