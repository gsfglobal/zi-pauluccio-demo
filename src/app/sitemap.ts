import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { routes } from "@/content/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).flatMap((r) =>
    (["it", "en"] as const).map((lang) => ({
      url: `${siteUrl}${r[lang]}`,
      changeFrequency: "monthly" as const,
      priority: r.it === "/" ? 1 : 0.7,
      alternates: { languages: { it: `${siteUrl}${r.it}`, en: `${siteUrl}${r.en}` } },
    })),
  );
}
