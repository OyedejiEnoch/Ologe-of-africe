import type { CollectionConfig, FieldHook } from "payload";
import { signedIn } from "../access";
import { refresh } from "../revalidate";
import { CATEGORY_KEYS, CATEGORY_LABEL } from "../../lib/catalog";

const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Fill the web address from the name + variant when the owner leaves it empty.
const autoSlug: FieldHook = ({ value, data }) => {
  if (typeof value === "string" && value.trim()) return slugify(value);
  const base = [data?.name, data?.variant].filter(Boolean).join(" ");
  return base ? slugify(base) : value;
};

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  admin: {
    useAsTitle: "name",
    group: "Shop",
    defaultColumns: ["image", "name", "variant", "category", "price", "status", "featured"],
    listSearchableFields: ["name", "variant", "slug"],
    description: "Every piece on the site. Hidden products stay saved but don’t appear in the shop.",
  },
  access: {
    // Visitors only ever see live pieces; signed-in admins see everything.
    read: ({ req }) => (req.user ? true : { status: { not_equals: "hidden" } }),
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  defaultSort: "order",
  hooks: {
    afterChange: [() => refresh("products")],
    afterDelete: [() => refresh("products")],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%", description: "e.g. Round Brow-Bar Sunglasses" } },
        { name: "variant", type: "text", admin: { width: "50%", description: "Colour or finish, e.g. Gold · black lens" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          options: CATEGORY_KEYS.map((key) => ({ label: CATEGORY_LABEL[key], value: key })),
          admin: { width: "34%" },
        },
        {
          name: "wearer",
          label: "Worn by",
          type: "select",
          defaultValue: "both",
          options: [
            { label: "Her", value: "her" },
            { label: "Him", value: "him" },
            { label: "Both", value: "both" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "price",
          label: "Price (₦)",
          type: "number",
          min: 0,
          admin: { width: "33%", description: "Leave empty to show “Price on request”." },
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences on what the piece is and how it wears." },
    },
    {
      name: "image",
      label: "Main photo",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: { mimeType: { contains: "image" } },
      admin: { description: "The piece on a white or transparent ground, shown in grids." },
    },
    {
      name: "gallery",
      label: "More photos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      filterOptions: { mimeType: { contains: "image" } },
      admin: { description: "Other angles, details, or the piece being worn." },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "video" } },
      admin: { description: "Optional short clip (MP4), e.g. a slow turn of the piece in daylight." },
    },
    // Sidebar
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "available",
      options: [
        { label: "Available", value: "available" },
        { label: "Sold out", value: "sold-out" },
        { label: "Hidden", value: "hidden" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      label: "Show on the home page",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      label: "Sort order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers show first." },
    },
    {
      name: "slug",
      label: "Web address",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug] },
      admin: {
        position: "sidebar",
        description: "Filled in from the name. Changing it breaks old links.",
      },
    },
  ],
};
