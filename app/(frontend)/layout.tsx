import type { Metadata } from "next";
import "@fontsource-variable/noto-serif-display/wght.css";
import "@fontsource-variable/noto-serif-display/wght-italic.css";
import "@fontsource-variable/geist/wght.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Motion from "@/components/Motion";
import { SiteProvider } from "@/components/SiteContext";
import { getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "OLOGE of Africa — Fashion Meets Grace",
  description:
    "OLOGE of Africa — a house of fashion for every lover of style. Jewellery, accessories, eyewear, shoes, bags and fascinators, born of a father's love and a lifetime of effortless grace.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSettings();
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteProvider value={site}>
          <SmoothScroll />
          <Nav />
          {children}
          <Motion />
        </SiteProvider>
      </body>
    </html>
  );
}
