import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "@fontsource-variable/hanken-grotesk/wght-italic.css";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "OLOGE of Africa — Fashion Meets Grace",
  description:
    "OLOGE of Africa — a house of fashion for every lover of style. Accessories, eyewear, shoes, bags and fascinators, born of a father's love and a lifetime of effortless grace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
