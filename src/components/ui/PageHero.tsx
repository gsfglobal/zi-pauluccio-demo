import type { ReactNode } from "react";
import { SplitWords } from "./SplitWords";
import { ArtFrame, type ArtKind } from "./ArtFrame";
import type { Lang } from "@/content/site";

type Props = {
  lang: Lang;
  eyebrow: string;
  title: string;
  italic?: string[];
  intro: string;
  art?: ArtKind;
  children?: ReactNode;
};

/** Testata delle pagine interne: fascia scura con titolo animato e immagine laterale. */
export function PageHero({ lang, eyebrow, title, italic, intro, art, children }: Props) {
  return (
    <section className="grain relative overflow-hidden bg-espresso pb-20 pt-40 text-ivory lg:pb-28 lg:pt-48">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-terracotta/25 blur-[120px]" />
      <div className="container-x relative grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-gold" data-reveal>
            {eyebrow}
          </p>
          <SplitWords as="h1" trigger="now" text={title} italic={italic} className="display mt-6" />
          <p className="lead mt-8 max-w-xl !text-ivory/70" data-reveal data-delay="0.4">
            {intro}
          </p>
          {children && (
            <div className="mt-10" data-reveal data-delay="0.55">
              {children}
            </div>
          )}
        </div>
        {art && (
          <div className="lg:col-span-5">
            <ArtFrame kind={art} lang={lang} mask className="aspect-[4/5] w-full rounded-[2px] lg:aspect-[4/5]" />
          </div>
        )}
      </div>
    </section>
  );
}
