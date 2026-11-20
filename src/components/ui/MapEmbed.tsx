"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { address, brand, directionsUrl, type Lang } from "@/content/site";

/**
 * Mappa a caricamento consapevole: Google Maps (che imposta cookie di terze parti)
 * viene caricata solo su richiesta dell'utente. Prima viene mostrata una mappa illustrata.
 */
export function MapEmbed({ lang }: { lang: Lang }) {
  const [load, setLoad] = useState(false);
  const it = lang === "it";
  const q = encodeURIComponent(`${brand.name}, ${address.street}, ${address.postalCode} ${address.city}`);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-stone sm:aspect-[16/10]">
      {load ? (
        <iframe
          title={it ? "Mappa: come raggiungerci" : "Map: how to reach us"}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect width="800" height="500" fill="#e6dccb" />
            <path d="M0 420 Q200 380 400 400 T800 360" fill="none" stroke="#c9d1c0" strokeWidth="38" />
            <path d="M0 420 Q200 380 400 400 T800 360" fill="none" stroke="#b7c3ad" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M120 250 Q 400 215 690 238" fill="none" stroke="#faf7f0" strokeWidth="16" strokeLinecap="round" />
            <path d="M260 90 L300 470M520 70 L480 460M640 120 L700 330" stroke="#f3ede2" strokeWidth="8" strokeLinecap="round" />
            {[...Array(26)].map((_, i) => (
              <rect key={i} x={140 + (i % 13) * 42} y={i < 13 ? 196 : 262} width="30" height="22" rx="2" fill="#d6c7ae" />
            ))}
            <text x="150" y="182" fontFamily="var(--font-sans)" fontSize="13" letterSpacing="3" fill="#8a7a66">VIA ROMA</text>
            <text x="30" y="456" fontFamily="var(--font-sans)" fontSize="12" letterSpacing="3" fill="#8f9b86">ISCLERO</text>
          </svg>
          <div className="absolute left-[53%] top-[47%] -translate-x-1/2 -translate-y-full">
            <span className="absolute left-1/2 top-full h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-terracotta/40" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-terracotta text-ivory shadow-xl -rotate-45">
              <MapPin size={20} className="rotate-45" />
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => setLoad(true)} className="btn btn-ghost flex-1 bg-ivory/90 text-espresso">
              {it ? "Carica Google Maps" : "Load Google Maps"}
            </button>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" className="btn btn-primary flex-1">
              <Navigation size={16} /> {it ? "Come raggiungerci" : "Get directions"}
            </a>
          </div>
          <p className="absolute left-4 top-4 max-w-[70%] rounded bg-ivory/85 px-3 py-2 text-[0.7rem] leading-snug text-ink-soft">
            {it ? "Mappa illustrativa. Google Maps si carica solo su tua richiesta." : "Illustrative map. Google Maps loads only when you ask."}
          </p>
        </>
      )}
    </div>
  );
}
