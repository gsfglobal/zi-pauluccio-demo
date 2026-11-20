import type { Metadata } from "next";
import { brand, demoMode, siteUrl, type Lang } from "@/content/site";
import { routes, type RouteKey } from "@/content/routes";

export function pageMeta(key: RouteKey, lang: Lang, title: string, description: string): Metadata {
  const path = routes[key][lang];
  const abs = (p: string) => `${siteUrl}${p}`;
  const fullTitle = key === "home" ? title : `${title} · ${brand.short}`;
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: abs(path),
      languages: { it: abs(routes[key].it), en: abs(routes[key].en), "x-default": abs(routes[key].it) },
    },
    openGraph: {
      type: "website",
      locale: lang === "it" ? "it_IT" : "en_GB",
      siteName: brand.name,
      title: fullTitle,
      description,
      url: abs(path),
      images: [{ url: abs("/og.png"), width: 1200, height: 630, alt: brand.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    // La demo non deve essere indicizzata né confusa con il sito ufficiale.
    robots: demoMode ? { index: false, follow: false } : { index: true, follow: true },
  };
}
