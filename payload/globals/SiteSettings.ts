import type { GlobalConfig } from "payload";
import { anyone, signedIn } from "../access";
import { refresh } from "../revalidate";

// One-off business details the owner can change without a developer.
// Every "Order on WhatsApp" / "Message us" button reads the number from here.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Business details",
  admin: { group: "Settings" },
  access: { read: anyone, update: signedIn },
  hooks: { afterChange: [() => refresh("settings")] },
  fields: [
    {
      name: "whatsapp",
      label: "WhatsApp number",
      type: "text",
      admin: { description: "International format, digits only, e.g. 2348012345678. Leave empty to send people to the Contact page instead." },
      validate: (value: string | null | undefined) =>
        !value || /^[1-9]\d{9,14}$/.test(value) || "Digits only, starting with the country code (234…), no + or spaces.",
    },
    { name: "email", label: "Contact email", type: "email" },
    {
      name: "instagram",
      label: "Instagram handle",
      type: "text",
      admin: { description: "Without the @, e.g. ologeofafrica" },
    },
  ],
};
