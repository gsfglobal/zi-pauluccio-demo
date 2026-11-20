"use client";

import { useId, useRef, useState } from "react";
import { menuFromReviews } from "@/content/dishes";
import type { Lang } from "@/content/site";

/** Anteprima del menu per categorie (tablist accessibile, frecce da tastiera). */
export function MenuTabs({ lang, limit }: { lang: Lang; limit?: number }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = menuFromReviews[active];
  const items = limit ? cat.items.slice(0, limit) : cat.items;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = menuFromReviews.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={lang === "it" ? "Categorie del menu" : "Menu categories"} className="-mx-1 flex gap-1 overflow-x-auto pb-2">
        {menuFromReviews.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => void (tabs.current[i] = el)}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              i === active ? "bg-espresso text-ivory" : "text-ink-soft hover:bg-espresso/5"
            }`}
          >
            {c.name[lang]}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`} className="mt-8">
        <p className="font-serif text-2xl italic text-terracotta">{cat.intro[lang]}</p>
        <ul key={cat.id} className="mt-6 divide-y divide-espresso/10 border-y border-espresso/10">
          {items.map((it, i) => (
            <li
              key={it.it}
              className="flex items-baseline justify-between gap-6 py-4 opacity-0 [animation:fadeUp_.7s_var(--ease-cine)_forwards]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="font-serif text-2xl leading-snug">
                {it[lang]}
                {it.ig && <span className="ml-2 align-middle text-sm text-gold" aria-label="Instagram">✦</span>}
              </span>
              <span className="hidden shrink-0 text-xs uppercase tracking-[0.18em] text-ink-soft/70 sm:inline">
                {lang === "it" ? "prezzo da menu" : "price on menu"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
