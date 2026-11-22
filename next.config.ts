import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const r2Host = (() => {
  try {
    return process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2Host ? [{ protocol: "https", hostname: r2Host, pathname: "/**" }] : [],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
