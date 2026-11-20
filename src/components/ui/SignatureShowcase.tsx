"use client";

import { useEffect, useRef, useState } from "react";
import { signatures, sourceLabel } from "@/content/dishes";
import type { Lang } from "@/content/site";
import { ArtFrame } from "./ArtFrame";

/**
 * Vetrina delle specialità: su desktop l'immagine resta fissa (sticky) e cambia con una
 * transizione a maschera mentre si scorrono i piatti; su mobile diventa una sequenza di schede.
 */
export function SignatureShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden rounded-[2px]">
          {signatures.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-[clip-path,transform] duration-[1200ms] ease-[var(--ease-cine)]"
              style={{
                clipPath: i === active ? "inset(0 0 0 0)" : i < active ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
                transform: i === active ? "scale(1)" : "scale(1.08)",
                zIndex: i === active ? 2 : 1,
              }}
              aria-hidden={i !== active}
            >
              <ArtFrame kind={s.art} lang={lang} className="h-full w-full" />
            </div>
          ))}
          <div className="absolute right-5 top-5 z-10 font-serif text-xl text-ivory/90 tabular-nums">
            {String(active + 1).padStart(2, "0")} <span className="text-ivory/50">/ {String(signatures.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6">
        {signatures.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => void (blocks.current[i] = el)}
            data-index={i}
            className="flex min-h-0 flex-col justify-center py-8 lg:min-h-[72vh] lg:py-0"
          >
            <ArtFrame kind={s.art} lang={lang} mask className="mb-8 aspect-[4/3] w-full rounded-[2px] lg:hidden" />
            <div className={`transition-opacity duration-700 ${i === active ? "lg:opacity-100" : "lg:opacity-35"}`}>
              <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                <span className="font-serif text-lg normal-case tracking-normal tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-10 bg-gold/60" />
                {s.course[lang]}
              </p>
              <h3 className="mt-5 font-serif text-4xl leading-none sm:text-5xl lg:text-6xl">{s.name[lang]}</h3>
              <p className="lead mt-6 max-w-md">{s.description[lang]}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ink-soft/70">
                {s.post ? (
                  <a href={s.post} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {sourceLabel[s.source][lang]} ↗
                  </a>
                ) : (
                  sourceLabel[s.source][lang]
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
