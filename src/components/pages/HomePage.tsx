import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { address, brand, directionsUrl, events, founded, phones, ratings, type Lang } from "@/content/site";
import { href } from "@/content/routes";
import { reviewThemes } from "@/content/dishes";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { SplitWords } from "@/components/ui/SplitWords";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SignatureShowcase } from "@/components/ui/SignatureShowcase";
import { MenuTabs } from "@/components/ui/MenuTabs";
import { Gallery } from "@/components/ui/Gallery";
import { RatingCards, Stars } from "@/components/ui/RatingCards";
import { BookingForm } from "@/components/ui/BookingForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { HoursList } from "@/components/ui/HoursList";
import { Verify } from "@/components/ui/Verify";

/* 01 — Cinematic Hero ------------------------------------------------ */
function Hero({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const g = ratings[0];
  const t = ratings[1];
  return (
    <section className="grain relative isolate min-h-[100svh] overflow-hidden bg-espresso text-ivory" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#5a3524_0%,#2b211b_55%,#1d1712_100%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
          <g fill="none" stroke="#f5efe4" strokeWidth="1.2">
            <path d="M760 900V420q0-260 300-260t300 260v480" />
            <path d="M820 900V430q0-210 240-210t240 210v470" />
            <path d="M0 760h1440M0 820h1440" strokeDasharray="2 10" />
          </g>
        </svg>
      </div>

      <div className="relative grid min-h-[100svh] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-end px-[clamp(1.25rem,4vw,3rem)] pb-10 pt-36 lg:col-span-6 lg:justify-center lg:pb-24 lg:pl-[max(3rem,calc((100vw-1320px)/2+3rem))]">
          <Link
            href={href("book", lang)}
            data-track="book_click"
            className="mb-8 inline-flex items-center gap-3 self-start rounded-full border border-gold/40 bg-ivory/5 py-1.5 pl-1.5 pr-4 text-xs text-ivory/85 backdrop-blur transition-colors hover:border-gold"
            data-reveal
          >
            <span className="rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-espresso">{events[0].date[lang]}</span>
            {events[0].title[lang]} · {it ? "prenota ora" : "book now"} <ArrowRight size={14} />
          </Link>
          <p className="eyebrow !text-gold" data-reveal>
            {it ? `Dal ${founded.year} · Sant'Agata de' Goti` : `Since ${founded.year} · Sant'Agata de' Goti`}
          </p>
          <SplitWords
            as="h1"
            trigger="now"
            text={it ? "Il Sannio, a tavola." : "The Sannio, at the table."}
            italic={it ? ["tavola"] : ["table"]}
            className="display mt-6 !text-[clamp(3.2rem,8.4vw,7.6rem)]"
          />
          <span id="hero-title" className="sr-only">{brand.name}</span>
          <p className="lead mt-7 max-w-md !text-ivory/75" data-reveal data-delay="0.5">
            {it
              ? "Nel cuore di Sant'Agata de' Goti, i sapori della tradizione incontrano il piacere di stare insieme."
              : "In the heart of Sant'Agata de' Goti, traditional flavours meet the pleasure of sharing a table."}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal data-delay="0.65">
            <Link href={href("book", lang)} data-track="book_click" className="btn btn-primary">
              {it ? "Prenota il tuo tavolo" : "Book your table"}
            </Link>
            <Link href={href("cuisine", lang)} className="btn btn-light">
              {it ? "Scopri la nostra cucina" : "Discover our cuisine"}
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ivory/70" data-reveal data-delay="0.8">
            <span className="flex items-center gap-2">
              <Stars value={g.value} className="text-gold" /> <b className="font-semibold text-ivory">{g.value.toLocaleString("it-IT")}</b> Google
            </span>
            <span className="flex items-center gap-2">
              <Stars value={t.value} className="text-gold" /> <b className="font-semibold text-ivory">{t.value.toLocaleString("it-IT")}</b> Tripadvisor · Travellers&apos; Choice 2026
            </span>
          </div>
        </div>

        <div className="relative h-[52svh] lg:col-span-6 lg:h-auto">
          <HeroVisual />
          <p className="pointer-events-none absolute bottom-6 right-6 hidden max-w-[16rem] text-right font-serif text-lg italic leading-snug text-ivory/55 lg:block">
            {it ? "Ravioli alla mela annurca, il piatto più amato dagli ospiti." : "Annurca apple ravioli, our guests' favourite."}
          </p>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/45 lg:flex">
        {it ? "Scorri" : "Scroll"}
        <span className="relative h-10 w-px overflow-hidden bg-ivory/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}

/* 02 — L'anima dell'osteria ----------------------------------------- */
function Soul({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const pillars = it
    ? [
        ["Accoglienza", "Chi ci sceglie racconta di un servizio attento e familiare, come a casa di amici."],
        ["Tradizione", "Ricette del territorio sannita, cucinate con semplicità e prodotti locali."],
        ["La cantina", "Sotto la sala, una cantina profonda che gli ospiti consigliano di visitare."],
      ]
    : [
        ["Hospitality", "Guests describe attentive, family-style service — like dining at a friend's home."],
        ["Tradition", "Recipes of the Sannio territory, cooked simply with local produce."],
        ["The cellar", "Below the dining room, a deep cellar that guests recommend visiting."],
      ];
  return (
    <section className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <ArtFrame kind="sala" lang={lang} mask className="aspect-[4/5] w-full rounded-[2px] lg:w-[92%]" />
          <div className="absolute -bottom-10 right-0 hidden w-[42%] border-[10px] border-ivory shadow-2xl lg:block">
            <ArtFrame kind="ceramica" lang={lang} mask showTag={false} className="aspect-square w-full" />
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <SectionHeading
            eyebrow={it ? "02 · L'anima dell'osteria" : "02 · The soul of the osteria"}
            title={it ? "Un'osteria di pietra e legno, su Via Roma." : "An osteria of stone and wood, on Via Roma."}
            italic={it ? ["pietra", "legno,"] : ["stone", "wood,"]}
            lead={
              it
                ? `Dal ${founded.year}, lungo l'asse principale del borgo, l'Antica Osteria accoglie in una sala raccolta e curata nei dettagli. Un luogo dove il tempo rallenta e la tavola torna a essere un rito.`
                : `Since ${founded.year}, on the old town's main street, the Antica Osteria has welcomed guests in an intimate, carefully kept dining room. A place where time slows and the table becomes a ritual again.`
            }
          />
          <ul className="mt-12 space-y-7">
            {pillars.map(([h, p], i) => (
              <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-espresso/10 pt-6" data-reveal data-delay={String(i * 0.1)}>
                <span className="font-serif text-xl text-gold tabular-nums">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl">{h}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{p}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href={href("story", lang)} className="mt-10 inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.16em] text-terracotta" data-reveal>
            <span className="link-underline">{it ? "La nostra storia" : "Our story"}</span> <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 03 — Il gusto della tradizione ------------------------------------ */
function Tradition({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const items = [
    { kind: "pancotto" as const, title: it ? "Il pancotto" : "Pancotto", text: it ? "Pane, verdure e olio: la cucina povera che diventa memoria." : "Bread, greens and oil: humble cooking turned memory." },
    { kind: "ravioli" as const, title: it ? "La pasta fresca" : "Fresh pasta", text: it ? "Ravioli, cavatelli, tortelli: tirati e conditi con sughi lenti." : "Ravioli, cavatelli, tortelli — dressed with slow sauces." },
    { kind: "caciocavallo" as const, title: it ? "Il caciocavallo" : "Caciocavallo", text: it ? "Di grotta, al forno, con pomodorini arrostiti e bruschette per la scarpetta." : "Cave-aged, baked, with roasted tomatoes and bruschetta for mopping up." },
    { kind: "carciofo" as const, title: it ? "La brace" : "The grill", text: it ? "Il carciofo cotto lentamente, la tagliata, la salsiccia di Castelpoto." : "Slow-cooked artichoke, sliced steak, Castelpoto sausage." },
  ];
  return (
    <section className="bg-cream py-28 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={it ? "03 · Il gusto della tradizione" : "03 · The taste of tradition"}
            title={it ? "Ricette che sanno di casa e di territorio." : "Recipes that taste of home and land."}
            italic={it ? ["casa"] : ["home"]}
          />
          <p className="lead max-w-sm" data-reveal>
            {it
              ? "Una cucina sincera, che parte dai prodotti del Sannio e dalle ricette di famiglia. I piatti che trovi qui sono quelli che gli ospiti citano di più."
              : "Honest cooking rooted in Sannio produce and family recipes. The dishes here are the ones guests mention most."}
          </p>
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((d, i) => (
            <li key={d.title} className={i % 2 ? "lg:mt-16" : ""}>
              <ArtFrame kind={d.kind} lang={lang} mask className="aspect-[3/4] w-full rounded-[2px]" />
              <h3 className="mt-6 font-serif text-3xl" data-reveal>{d.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft" data-reveal>{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 04 — Signature dishes ---------------------------------------------- */
function Signatures({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow={it ? "04 · Le specialità" : "04 · Signature dishes"}
          title={it ? "Quattro piatti che gli ospiti tornano a cercare." : "Four dishes guests come back for."}
          italic={it ? ["tornano"] : ["back"]}
        />
        <div className="mt-16 lg:mt-24">
          <SignatureShowcase lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* 05 — Il nostro menu ------------------------------------------------ */
function MenuPreview({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-cream py-28 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={it ? "05 · Il nostro menu" : "05 · Our menu"}
            title={it ? "Dalla terra, alla tavola." : "From the land, to the table."}
            italic={it ? ["tavola."] : ["table."]}
            lead={
              it
                ? "Un'anteprima per categorie. Il menu cambia con le stagioni: chiedi in sala i piatti del giorno."
                : "A preview by category. The menu follows the seasons — ask for today's dishes."
            }
          />
          <Link href={href("menu", lang)} data-track="menu_view" className="btn btn-ghost mt-10 text-espresso" data-reveal>
            {it ? "Visualizza il menu completo" : "View the full menu"}
          </Link>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <MenuTabs lang={lang} limit={5} />
          <p className="mt-6 text-xs leading-relaxed text-ink-soft">
            {it
              ? "✦ Presentati sul profilo Instagram dell'osteria; gli altri sono citati nelle recensioni. Prezzi, allergeni e disponibilità sul menu ufficiale."
              : "✦ Featured on the osteria's Instagram; the others are mentioned in reviews. Prices, allergens and availability on the official menu."}
            <Verify lang={lang} source="Instagram e recensioni" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* 06 — Una tavola nel cuore del borgo -------------------------------- */
function Borgo({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const facts = it
    ? [
        ["Tufo", "Il borgo sorge su uno sperone di tufo affacciato sulla valle dell'Isclero."],
        ["Bandiera Arancione", "Riconoscimento del Touring Club Italiano dal 2004."],
        ["Via Roma", "Circa un chilometro di storia: è qui, al civico 27, che ti aspettiamo."],
      ]
    : [
        ["Tufa", "The town rises on a tufa spur overlooking the Isclero valley."],
        ["Orange Flag", "Awarded by the Touring Club Italiano since 2004."],
        ["Via Roma", "About a kilometre of history — and at number 27, your table."],
      ];
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-ivory">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-parallax="0.25" className="absolute -inset-y-[15%] inset-x-0">
          <ArtFrame kind="borgo" lang={lang} showTag={false} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/10" />
      </div>
      <div className="container-x flex min-h-[110svh] flex-col justify-end pb-24 pt-40">
        <SectionHeading
          tone="light"
          eyebrow={it ? "06 · Una tavola nel cuore del borgo" : "06 · A table in the heart of the old town"}
          title={it ? "Sant'Agata de' Goti, la perla del Sannio." : "Sant'Agata de' Goti, pearl of the Sannio."}
          italic={it ? ["perla"] : ["pearl"]}
          lead={
            it
              ? "Case sospese sulla rupe, campanili e cupole maiolicate, vicoli di pietra. Pranzare o cenare qui è parte del viaggio."
              : "Houses perched on the cliff, bell towers and majolica domes, stone alleys. Lunch or dinner here is part of the journey."
          }
        />
        <ul className="mt-14 grid gap-8 border-t border-ivory/15 pt-10 sm:grid-cols-3">
          {facts.map(([h, p], i) => (
            <li key={h} data-reveal data-delay={String(i * 0.1)}>
              <p className="font-serif text-3xl text-gold">{h}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{p}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40">
          {it ? "Fonti: Touring Club Italiano, FAI · Foto panoramica da realizzare" : "Sources: Touring Club Italiano, FAI · Panoramic photo to be shot"}
        </p>
      </div>
    </section>
  );
}

/* 07 — La nostra cantina --------------------------------------------- */
function Cellar({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="grain relative overflow-hidden bg-wine py-28 text-ivory lg:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow={it ? "07 · La nostra cantina" : "07 · Our cellar"}
            title={it ? "Sotto i nostri piedi, il vino." : "Beneath our feet, the wine."}
            italic={it ? ["vino."] : ["wine."]}
            lead={
              it
                ? "Gli ospiti la descrivono come una cantina profondissima, da visitare. Il territorio è quello dell'Aglianico e della Falanghina, con la DOC Sant'Agata dei Goti: il calice giusto per ogni piatto."
                : "Guests describe it as a remarkably deep cellar, worth a visit. This is Aglianico and Falanghina country, with its own Sant'Agata dei Goti DOC: the right glass for every dish."
            }
          />
          <p className="mt-8 text-sm text-ivory/60" data-reveal>
            {it ? "Carta dei vini in arrivo con le etichette selezionate dall'osteria." : "Wine list coming soon with the osteria's selected labels."}
            <Verify lang={lang} />
          </p>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ArtFrame kind="vino" lang={lang} mask className="aspect-[5/4] w-full rounded-[2px]" />
        </div>
      </div>
    </section>
  );
}

/* Serate ed eventi (dal profilo Instagram) ---------------------------- */
function Events({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={it ? "Serate ed eventi" : "Evenings & events"}
          title={it ? "Ci sono sere che meritano una tavola speciale." : "Some evenings deserve a special table."}
          italic={it ? ["speciale."] : ["special"]}
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {events.map((e, i) => (
            <li key={e.id} data-reveal data-delay={String(i * 0.1)}>
              <article className={`flex h-full flex-col justify-between gap-10 rounded-[2px] p-8 ${i === 0 ? "bg-espresso text-ivory" : "border border-espresso/10 bg-ivory"}`}>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${i === 0 ? "text-gold" : "text-terracotta"}`}>{e.date[lang]}</p>
                  <h3 className="mt-4 font-serif text-4xl leading-none">{e.title[lang]}</h3>
                  <p className={`mt-4 text-[0.95rem] leading-relaxed ${i === 0 ? "text-ivory/70" : "text-ink-soft"}`}>{e.text[lang]}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href={href("book", lang)} data-track="book_click" className={`btn ${i === 0 ? "btn-primary" : "btn-ghost text-espresso"} !min-h-10 !py-2`}>
                    {i === 2 ? (it ? "Chiedi info" : "Enquire") : it ? "Prenota" : "Book"}
                  </Link>
                  <a href={e.post} target="_blank" rel="noopener noreferrer" className={`text-xs uppercase tracking-[0.16em] link-underline ${i === 0 ? "text-ivory/60" : "text-ink-soft"}`}>
                    Instagram ↗
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 08 — Gallery -------------------------------------------------------- */
function GalleryPreview({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={it ? "08 · Gallery" : "08 · Gallery"}
            title={it ? "Uno sguardo dentro l'osteria." : "A glimpse inside the osteria."}
            italic={it ? ["sguardo"] : ["glimpse"]}
          />
          <Link href={href("gallery", lang)} className="btn btn-ghost self-start text-espresso lg:self-auto" data-reveal>
            {it ? "Apri la galleria" : "Open the gallery"}
          </Link>
        </div>
        <Gallery lang={lang} limit={5} filters={false} />
      </div>
    </section>
  );
}

/* 09 — Le parole degli ospiti ---------------------------------------- */
function Guests({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-cream py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow={it ? "09 · Le parole degli ospiti" : "09 · In our guests' words"}
          title={it ? "Più di mille recensioni raccontano l'osteria." : "Over a thousand reviews tell the story."}
          italic={it ? ["mille"] : ["thousand"]}
        />
        <div className="mt-16">
          <RatingCards lang={lang} />
        </div>
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="eyebrow" data-reveal>{it ? "Le parole che ritornano" : "Words that keep coming back"}</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3" data-reveal>
            {reviewThemes.map((t) => (
              <li
                key={t.label.it}
                className="font-serif italic text-espresso"
                style={{ fontSize: `${0.95 + t.weight * 0.28}rem`, opacity: 0.45 + t.weight * 0.11 }}
              >
                {t.label[lang]}
              </li>
            ))}
          </ul>
          <Link href={href("reviews", lang)} className="mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta" data-reveal>
            <span className="link-underline">{it ? "Tutte le recensioni" : "All reviews"}</span> <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 10 — Prenota un tavolo --------------------------------------------- */
export function BookingSection({ lang, id = "prenota", numbered = true }: { lang: Lang; id?: string; numbered?: boolean }) {
  const it = lang === "it";
  const n = numbered ? "10 · " : "";
  return (
    <section id={id} className="bg-ivory py-28 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={`${n}${it ? "Prenota un tavolo" : "Book a table"}`}
            title={it ? "Il tuo posto ti aspetta." : "Your seat is waiting."}
            italic={it ? ["aspetta."] : ["waiting."]}
            lead={it ? "Il modo più rapido è una telefonata. Oppure lasciaci una richiesta: ti ricontattiamo per confermare." : "The quickest way is a phone call. Or leave us a request and we'll get back to confirm."}
          />
          <div className="mt-10 space-y-6" data-reveal>
            <a href={phones.main.href} data-track="call_click" className="group flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-ivory transition-transform duration-500 group-hover:scale-105">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-ink-soft">{it ? "Chiama l'osteria" : "Call the osteria"}</span>
                <span className="font-serif text-2xl">{phones.main.display}</span>
                <Verify lang={lang} source={phones.main.source} show={!phones.main.verified} />
              </span>
            </a>
            <div className="border-t border-espresso/10 pt-6">
              <HoursList lang={lang} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <div className="rounded-[2px] bg-cream p-6 sm:p-10">
            <BookingForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 — Dove siamo ----------------------------------------------------- */
export function WhereSection({ lang, numbered = true }: { lang: Lang; numbered?: boolean }) {
  const it = lang === "it";
  const n = numbered ? "11 · " : "";
  return (
    <section className="bg-cream py-28 lg:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={`${n}${it ? "Dove siamo" : "Find us"}`}
            title={it ? "Nel centro storico, su Via Roma." : "In the old town, on Via Roma."}
            italic={it ? ["Via", "Roma."] : ["Via", "Roma."]}
          />
          <address className="mt-8 flex gap-3 not-italic" data-reveal>
            <MapPin className="mt-1 shrink-0 text-terracotta" size={20} />
            <span className="font-serif text-2xl leading-snug">
              {address.street}
              <br />
              {address.postalCode} {address.city} ({address.province})
            </span>
          </address>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft" data-reveal>
            {it
              ? "Il centro storico è in parte pedonale: consigliamo di parcheggiare fuori dal borgo e proseguire a piedi lungo Via Roma."
              : "The historic centre is partly pedestrian: we suggest parking outside the old town and walking along Via Roma."}
            <Verify lang={lang} />
          </p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" className="btn btn-primary mt-8" data-reveal>
            {it ? "Come raggiungerci" : "Get directions"}
          </a>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <MapEmbed lang={lang} />
        </div>
      </div>
    </section>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Soul lang={lang} />
      <Tradition lang={lang} />
      <Signatures lang={lang} />
      <MenuPreview lang={lang} />
      <Borgo lang={lang} />
      <Cellar lang={lang} />
      <Events lang={lang} />
      <GalleryPreview lang={lang} />
      <Guests lang={lang} />
      <BookingSection lang={lang} />
      <WhereSection lang={lang} />
    </>
  );
}
