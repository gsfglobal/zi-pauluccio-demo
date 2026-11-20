import type { MetadataRoute } from "next";
import { demoMode, siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (demoMode) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/presentazione/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
