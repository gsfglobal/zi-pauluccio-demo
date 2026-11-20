import { hours, type Lang } from "@/content/site";
import { Verify } from "./Verify";

export function HoursList({ lang, tone = "dark" }: { lang: Lang; tone?: "dark" | "light" }) {
  const muted = tone === "light" ? "text-ivory/55" : "text-ink-soft";
  return (
    <div>
      <dl className="space-y-1.5 text-sm">
        {hours.days.map((d) => (
          <div key={d.schemaDay} className="flex justify-between gap-6">
            <dt className={muted}>{d.day[lang]}</dt>
            <dd className="text-right tabular-nums">{d.slots.length ? d.slots.join(" · ") : lang === "it" ? "Chiuso" : "Closed"}</dd>
          </div>
        ))}
      </dl>
      <p className={`mt-3 text-xs ${muted}`}>
        {lang === "it" ? "Orari indicativi" : "Indicative hours"}
        <Verify lang={lang} source="Tripadvisor" show={!hours.verified} />
      </p>
    </div>
  );
}
