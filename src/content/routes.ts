import type { Lang } from "./site";

export type RouteKey =
  | "home"
  | "story"
  | "menu"
  | "cuisine"
  | "gallery"
  | "reviews"
  | "contact"
  | "book"
  | "privacy"
  | "cookies";

export const routes: Record<RouteKey, Record<Lang, string>> = {
  home: { it: "/", en: "/en/" },
  story: { it: "/la-nostra-storia/", en: "/en/our-story/" },
  menu: { it: "/menu/", en: "/en/menu/" },
  cuisine: { it: "/la-nostra-cucina/", en: "/en/our-cuisine/" },
  gallery: { it: "/gallery/", en: "/en/gallery/" },
  reviews: { it: "/recensioni/", en: "/en/reviews/" },
  contact: { it: "/contatti/", en: "/en/contact/" },
  book: { it: "/prenota/", en: "/en/book/" },
  privacy: { it: "/privacy/", en: "/en/privacy/" },
  cookies: { it: "/cookie-policy/", en: "/en/cookie-policy/" },
};

export const navLabels: Record<RouteKey, Record<Lang, string>> = {
  home: { it: "Home", en: "Home" },
  story: { it: "La nostra storia", en: "Our story" },
  menu: { it: "Menu", en: "Menu" },
  cuisine: { it: "La nostra cucina", en: "Our cuisine" },
  gallery: { it: "Gallery", en: "Gallery" },
  reviews: { it: "Recensioni", en: "Reviews" },
  contact: { it: "Contatti", en: "Contact" },
  book: { it: "Prenota", en: "Book" },
  privacy: { it: "Privacy", en: "Privacy" },
  cookies: { it: "Cookie policy", en: "Cookie policy" },
};

export const mainNav: RouteKey[] = ["story", "cuisine", "menu", "gallery", "reviews", "contact"];

export function href(key: RouteKey, lang: Lang) {
  return routes[key][lang];
}

export function alternateOf(path: string, target: Lang): string {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].it === normalized || routes[key].en === normalized) return routes[key][target];
  }
  return routes.home[target];
}
