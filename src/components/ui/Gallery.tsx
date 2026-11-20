"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Lang } from "@/content/site";
import { ArtFrame, artLabel, type ArtKind } from "./ArtFrame";

export type GalleryItem = { kind: ArtKind; category: "interni" | "piatti" | "dettagli" | "esterni" | "atmosfera"; span: string };

export const galleryItems: GalleryItem[] = [
  { kind: "sala", category: "interni", span: "md:col-span-7 aspect-[7/6]" },
  { kind: "ravioli", category: "piatti", span: "md:col-span-5 aspect-[5/6]" },
  { kind: "vino", category: "interni", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "carciofo", category: "piatti", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "vongole", category: "piatti", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "esterno", category: "esterni", span: "md:col-span-5 aspect-square" },
  { kind: "baba", category: "piatti", span: "md:col-span-7 aspect-[7/5]" },
  { kind: "ceramica", category: "dettagli", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "cantina", category: "interni", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "pancotto", category: "piatti", span: "md:col-span-4 aspect-[4/5]" },
  { kind: "borgo", category: "esterni", span: "md:col-span-6 aspect-[3/2]" },
  { kind: "brace", category: "atmosfera", span: "md:col-span-6 aspect-[3/2]" },
];

const catLabels: Record<GalleryItem["category"] | "tutte", Record<Lang, string>> = {
  tutte: { it: "Tutte", en: "All" },
  interni: { it: "Interni", en: "Interiors" },
  piatti: { it: "Piatti", en: "Dishes" },
  dettagli: { it: "Dettagli", en: "Details" },
  esterni: { it: "Esterni", en: "Outside" },
  atmosfera: { it: "Atmosfera", en: "Atmosphere" },
};

/** Galleria con griglia editoriale asimmetrica, filtri e lightbox accessibile (tastiera, Esc, frecce). */
export function Gallery({ lang, limit, filters = true }: { lang: Lang; limit?: number; filters?: boolean }) {
  const [filter, setFilter] = useState<keyof typeof catLabels>("tutte");
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const list = galleryItems.filter((g) => filter === "tutte" || g.category === filter).slice(0, limit);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <div>
      {filters && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={lang === "it" ? "Filtra la galleria" : "Filter gallery"}>
          {(Object.keys(catLabels) as (keyof typeof catLabels)[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === c ? "border-espresso bg-espresso text-ivory" : "border-espresso/15 hover:border-espresso/40"
              }`}
            >
              {catLabels[c][lang]}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
        {list.map((g, i) => (
          <li key={`${g.kind}-${i}`} className={`${filter === "tutte" ? g.span : "md:col-span-4 aspect-[4/5]"} group relative`} data-reveal data-delay={String((i % 3) * 0.08)}>
            <button
              type="button"
              className="absolute inset-0 z-10 cursor-zoom-in"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`${lang === "it" ? "Apri" : "Open"}: ${artLabel(g.kind, lang)}`}
            />
            <ArtFrame kind={g.kind} lang={lang} className="h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-cine)] group-hover:scale-[1.02]" />
          </li>
        ))}
      </ul>

      {open !== null && list[open] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={artLabel(list[open].kind, lang)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-sm [animation:lbIn_.5s_var(--ease-cine)]"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <ArtFrame key={open} kind={list[open].kind} lang={lang} className="aspect-[4/5] max-h-[82vh] w-auto max-w-full [animation:lbImg_.7s_var(--ease-cine)] sm:h-[82vh]" />
          <button ref={closeBtn} type="button" onClick={close} className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-ivory" aria-label={lang === "it" ? "Chiudi" : "Close"}>
            <X />
          </button>
          <button type="button" onClick={() => step(-1)} className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory" aria-label={lang === "it" ? "Precedente" : "Previous"}>
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => step(1)} className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory" aria-label={lang === "it" ? "Successiva" : "Next"}>
            <ChevronRight />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-ivory/70 tabular-nums">
            {open + 1} / {list.length}
          </p>
          <style>{`@keyframes lbIn{from{opacity:0}to{opacity:1}}@keyframes lbImg{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </div>
  );
}
