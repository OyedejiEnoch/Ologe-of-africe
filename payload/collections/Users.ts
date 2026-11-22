import type { CollectionConfig } from "payload";
import { signedIn } from "../access";

// The people who can sign in to /admin (the owner and anyone she adds).
// The first account is created on the /admin "create first user" screen.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Team member", plural: "Team" },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Settings",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: signedIn,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [{ name: "name", type: "text" }],
};
