import { useEffect } from "react";
import type { Lang } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Motion } from "@/components/ui/Motion";
import { HomePage } from "@/components/pages/HomePage";
import { BookPage, ContactPage, CuisinePage, GalleryPage, LegalPage, MenuPage, ReviewsPage, StoryPage } from "@/components/pages/InnerPages";
import Presentazione from "@/app/(it)/presentazione/page";
import { routes, type RouteKey } from "@/content/routes";
import { usePath } from "./router";

function pageFor(path: string): { lang: Lang; el: React.ReactNode; title: string } {
  if (path === "/presentazione/") return { lang: "it", el: <Presentazione />, title: "Presentazione" };
  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const lang of ["it", "en"] as Lang[]) {
      if (routes[key][lang] !== path) continue;
      const map: Record<RouteKey, React.ReactNode> = {
        home: <HomePage lang={lang} />,
        story: <StoryPage lang={lang} />,
        menu: <MenuPage lang={lang} />,
        cuisine: <CuisinePage lang={lang} />,
        gallery: <GalleryPage lang={lang} />,
        reviews: <ReviewsPage lang={lang} />,
        contact: <ContactPage lang={lang} />,
        book: <BookPage lang={lang} />,
        privacy: <LegalPage lang={lang} kind="privacy" />,
        cookies: <LegalPage lang={lang} kind="cookies" />,
      };
      return { lang, el: map[key], title: key };
    }
  }
  return { lang: "it", el: <HomePage lang="it" />, title: "home" };
}

export function App() {
  const path = usePath();
  const { lang, el } = pageFor(path);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Header lang={lang} />
      <main id="contenuto" key={path}>
        {el}
      </main>
      <Footer lang={lang} />
      <MobileBookBar lang={lang} />
      <CookieConsent lang={lang} />
      <Motion />
    </>
  );
}
