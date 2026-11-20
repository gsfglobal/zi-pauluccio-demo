import { demoMode, type Lang } from "@/content/site";

/** Indicatore discreto per i dati da confermare, visibile solo in modalità demo. */
export function Verify({ lang, source, show = true }: { lang: Lang; source?: string; show?: boolean }) {
  if (!demoMode || !show) return null;
  const label =
    lang === "it"
      ? `Dato da confermare con il titolare${source ? ` (fonte: ${source})` : ""}`
      : `To be confirmed by the owner${source ? ` (source: ${source})` : ""}`;
  return (
    <span
      title={label}
      className="ml-1.5 inline-flex h-4 items-center gap-1 rounded-full border border-gold/60 bg-ivory/70 px-1.5 align-middle text-[0.6rem] font-semibold uppercase tracking-wider text-gold"
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="sr-only">{label}</span>
      <span aria-hidden>{lang === "it" ? "verifica" : "verify"}</span>
    </span>
  );
}
