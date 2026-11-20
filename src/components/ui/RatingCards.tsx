import { ArrowUpRight, Star } from "lucide-react";
import { ratings, ratingsCheckedOn, type Lang } from "@/content/site";

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star size={16} className="absolute inset-0 text-current opacity-25" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={16} className="fill-current text-current" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function RatingCards({ lang, tone = "dark" }: { lang: Lang; tone?: "dark" | "light" }) {
  const it = lang === "it";
  const card = tone === "light" ? "border-ivory/15 bg-ivory/[0.04] text-ivory" : "border-espresso/10 bg-ivory text-espresso";
  const muted = tone === "light" ? "text-ivory/60" : "text-ink-soft";
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {ratings.map((r, i) => (
          <li key={r.platform} data-reveal data-delay={String(i * 0.1)}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col justify-between gap-6 rounded-[2px] border p-6 transition-colors duration-500 hover:border-gold ${card}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">{r.platform}</span>
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <p className="font-serif text-6xl leading-none tabular-nums">
                  {r.value.toLocaleString(lang === "it" ? "it-IT" : "en-GB", { minimumFractionDigits: 1 })}
                  <span className={`ml-1 text-2xl ${muted}`}>/5</span>
                </p>
                <Stars value={r.value} className="mt-3 text-gold" />
                <p className={`mt-3 text-sm ${muted}`}>
                  {r.count.toLocaleString(lang === "it" ? "it-IT" : "en-GB")} {it ? "recensioni" : "reviews"} · {r.note[lang]}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-xs ${muted}`}>
        {it ? `Valutazioni rilevate il ${ratingsCheckedOn.it}. Clicca per leggere le recensioni originali.` : `Ratings checked on ${ratingsCheckedOn.en}. Click to read the original reviews.`}
      </p>
    </div>
  );
}
