"use client";

import { createContext, useContext } from "react";
import { SITE, type SiteSettings } from "@/lib/site";

// Business details from /admin, handed down from the root layout so client
// components (nav, FAQ, how-to-order) can build WhatsApp links.
const SiteContext = createContext<SiteSettings>(SITE);

export function SiteProvider({ value, children }: { value: SiteSettings; children: React.ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
