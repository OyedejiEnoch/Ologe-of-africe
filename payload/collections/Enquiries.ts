import type { CollectionConfig } from "payload";
import { nobody, signedIn } from "../access";

// Messages from the Contact form. Created only by the submitEnquiry server
// action; the owner reads and answers them from /admin.
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    useAsTitle: "name",
    group: "Customers",
    defaultColumns: ["name", "whatsapp", "email", "status", "createdAt"],
  },
  access: { read: signedIn, create: nobody, update: signedIn, delete: signedIn },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "34%" } },
        { name: "whatsapp", label: "WhatsApp", type: "text", admin: { width: "33%" } },
        { name: "email", type: "email", admin: { width: "33%" } },
      ],
    },
    { name: "message", type: "textarea", required: true },
    { name: "product", label: "About this piece", type: "relationship", relationTo: "products" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
