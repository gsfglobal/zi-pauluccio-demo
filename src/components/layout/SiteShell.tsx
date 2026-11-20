import type { ReactNode } from "react";
import type { Lang } from "@/content/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBookBar } from "./MobileBookBar";
import { CookieConsent } from "./CookieConsent";
import { JsonLd } from "./JsonLd";
import { Motion } from "@/components/ui/Motion";

export function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <meta name="theme-color" content="#29231d" />
        <JsonLd />
      </head>
      <body>
        <a href="#contenuto" className="sr-only z-[100] rounded bg-espresso px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {lang === "it" ? "Vai al contenuto" : "Skip to content"}
        </a>
        <Header lang={lang} />
        <main id="contenuto">{children}</main>
        <Footer lang={lang} />
        <MobileBookBar lang={lang} />
        <CookieConsent lang={lang} />
        <Motion />
      </body>
    </html>
  );
}
