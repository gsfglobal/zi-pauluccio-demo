"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, track, writeConsent } from "@/lib/analytics";
import type { Lang } from "@/content/site";
import { href } from "@/content/routes";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

function loadAnalytics() {
  if (!GA_ID || document.getElementById("ga-src")) return;
  const s = document.createElement("script");
  s.id = "ga-src";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
}

/** Banner cookie: nessun tracciamento finché l'utente non accetta. "Rifiuta" ha lo stesso peso di "Accetta". */
export function CookieConsent({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const it = lang === "it";

  useEffect(() => {
    const c = readConsent();
    if (c === null) setOpen(true);
    if (c === "granted") loadAnalytics();

    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-open-consent]");
      if (t) setOpen(true);
      const tr = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (tr) track(tr.dataset.track!, { page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!open) return null;

  const choose = (v: "granted" | "denied") => {
    writeConsent(v);
    if (v === "granted") loadAnalytics();
    setOpen(false);
  };

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cc-title" className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-xl rounded-2xl border border-espresso/10 bg-ivory p-5 shadow-2xl shadow-espresso/20 lg:bottom-6 lg:left-6 lg:right-auto">
      <p id="cc-title" className="font-serif text-xl">{it ? "Un biscotto, prima del pranzo?" : "A cookie before lunch?"}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {it
          ? "Usiamo solo cookie tecnici. Con il tuo consenso attiviamo statistiche anonime per capire come migliorare il sito. Puoi cambiare idea in qualsiasi momento."
          : "We only use technical cookies. With your consent we enable anonymous statistics to improve the site. You can change your mind at any time."}{" "}
        <Link href={href("cookies", lang)} className="underline underline-offset-2">
          {it ? "Cookie policy" : "Cookie policy"}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => choose("denied")} className="btn btn-ghost flex-1 !min-h-10 !py-2 text-espresso">
          {it ? "Rifiuta" : "Decline"}
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary flex-1 !min-h-10 !py-2">
          {it ? "Accetta" : "Accept"}
        </button>
      </div>
    </div>
  );
}
