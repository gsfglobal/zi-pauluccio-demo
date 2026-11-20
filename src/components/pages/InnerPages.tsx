import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { address, brand, demoMode, directionsUrl, email, founded, legal, phones, social, whatsapp, type Lang } from "@/content/site";
import { href } from "@/content/routes";
import { menuFromReviews, reviewThemes, signatures, sourceLabel } from "@/content/dishes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { Gallery } from "@/components/ui/Gallery";
import { RatingCards } from "@/components/ui/RatingCards";
import { HoursList } from "@/components/ui/HoursList";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Verify } from "@/components/ui/Verify";
import { BookingForm } from "@/components/ui/BookingForm";
import { BookingSection, WhereSection } from "./HomePage";

function BookBand({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <section className="bg-terracotta py-20 text-ivory">
      <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <p className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl" data-reveal>
          {it ? "Ti è venuta fame? " : "Feeling hungry? "}
          <span className="italic">{it ? "Il tavolo è a un passo." : "Your table is one step away."}</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row" data-reveal>
          <Link href={href("book", lang)} data-track="book_click" className="btn btn-light">
            {it ? "Prenota un tavolo" : "Book a table"}
          </Link>
          <a href={phones.main.href} data-track="call_click" className="btn btn-light">
            <Phone size={16} /> {phones.main.display}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function StoryPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const needed = it
    ? ["Chi ha fondato l'osteria nel 1927", "Chi era Zi' Pauluccio e perché il locale porta il suo nome", "Le persone di oggi: cucina e sala", "La storia della cantina e dell'edificio", "Ricette di famiglia da raccontare"]
    : ["Who founded the osteria in 1927", "Who Zi' Pauluccio was and why the osteria bears his name", "Today's team: kitchen and dining room", "The story of the cellar and the building", "Family recipes worth telling"];
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={it ? `La nostra storia · dal ${founded.year}` : `Our story · since ${founded.year}`}
        title={it ? "Un'osteria, come una volta." : "An osteria, the way it used to be."}
        italic={it ? ["una", "volta."] : ["used", "to", "be."]}
        intro={
          it
            ? `Nel ${founded.year}, nel borgo di Sant'Agata de' Goti, nasce l'Antica Osteria di Zi' Pauluccio. Da allora è un luogo di accoglienza, cucina del territorio e convivialità.`
            : `In ${founded.year}, in the old town of Sant'Agata de' Goti, the Antica Osteria di Zi' Pauluccio was born. Ever since, it has been a place of hospitality, local cooking and conviviality.`
        }
        art="sala"
      />
      <section className="bg-ivory py-28 lg:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={it ? "L'identità" : "Identity"}
              title={it ? "Il nome di famiglia, la tavola di tutti." : "A family name, a table for everyone."}
              italic={it ? ["famiglia,"] : ["family"]}
            />
            <div className="lead mt-8 space-y-5" data-reveal>
              <p>
                {it
                  ? "\"Zi'\", nel parlare campano, è lo zio: la figura di casa che apre la porta e fa sedere tutti. È lo spirito con cui gli ospiti descrivono l'osteria — un ambiente rustico e curato, un servizio familiare, piatti semplici fatti bene."
                  : "\"Zi'\", in Campanian dialect, means uncle: the family figure who opens the door and finds everyone a seat. It's how guests describe the osteria — rustic and well-kept, family-style service, simple dishes done well."}
              </p>
              <p>
                {it
                  ? "Pietra, legno, luce calda, una cantina profonda sotto la sala: l'osteria custodisce l'atmosfera delle case del borgo."
                  : "Stone, wood, warm light, a deep cellar below the dining room: the osteria keeps the atmosphere of the old town's houses."}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ArtFrame kind="vino" lang={lang} mask className="aspect-[4/5] w-full rounded-[2px]" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-28 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          {(it
            ? [
                ["Ambiente", "Una sala raccolta su Via Roma, con pochi tavoli ben disposti. Gli ospiti ne apprezzano la cura dei dettagli."],
                ["Filosofia", "Cucina del territorio sannita, materie prime locali e ricette della tradizione, senza artifici."],
                ["Ospitalità", "Un servizio attento e cordiale: è il complimento che ritorna più spesso nelle recensioni."],
              ]
            : [
                ["Setting", "An intimate dining room on Via Roma with a few well-placed tables. Guests appreciate the attention to detail."],
                ["Philosophy", "Sannio cooking, local ingredients and traditional recipes, without artifice."],
                ["Hospitality", "Attentive, warm service — the compliment that recurs most in reviews."],
              ]
          ).map(([h, p], i) => (
            <div key={h} className="border-t border-espresso/15 pt-8" data-reveal data-delay={String(i * 0.1)}>
              <p className="font-serif text-xl text-gold">0{i + 1}</p>
              <h2 className="mt-3 font-serif text-4xl">{h}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {demoMode && (
        <section className="bg-ivory py-24">
          <div className="container-x">
            <div className="rounded-[2px] border border-dashed border-gold p-8 sm:p-12" data-reveal>
              <p className="eyebrow">{it ? "Da scrivere insieme" : "To be written together"}</p>
              <h2 className="mt-4 font-serif text-4xl">{it ? "La storia vera, raccontata da chi l'ha vissuta." : "The real story, told by those who lived it."}</h2>
              <p className="mt-4 max-w-2xl text-ink-soft">
                {it
                  ? "Dalla pagina Facebook sappiamo che l'osteria nasce nel 1927; il resto della storia non è pubblico e non vogliamo inventarlo. Con un'intervista al titolare completeremo questa pagina con:"
                  : "The osteria's Facebook page says it was founded in 1927; the rest of the story isn't public and we won't invent it. An interview with the owner will complete this page with:"}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {needed.map((n) => (
                  <li key={n} className="flex gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
      <BookBand lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function MenuPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow="Menu"
        title={it ? "Il menu dell'osteria." : "The osteria's menu."}
        italic={it ? ["osteria."] : ["osteria's"]}
        intro={
          it
            ? "Antipasti, pasta fresca, brace, dolci della casa e vini del territorio. Il menu segue le stagioni."
            : "Starters, fresh pasta, grill, homemade desserts and local wines. The menu follows the seasons."
        }
      />
      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <div className="mb-16 rounded-[2px] bg-cream p-6 text-sm leading-relaxed text-ink-soft sm:p-8" data-reveal>
            <strong className="font-semibold text-espresso">{it ? "Nota: " : "Note: "}</strong>
            {it
              ? "il menu è stato rinnovato a settembre 2026. Qui trovi i piatti presentati sul profilo Instagram dell'osteria (segnati con ✦) e quelli citati nelle recensioni degli ospiti. Prezzi, allergeni e disponibilità verranno inseriti dal menu fornito dall'osteria."
              : "the menu was renewed in September 2026. Here you'll find dishes presented on the osteria's Instagram (marked ✦) and dishes mentioned in guest reviews. Prices, allergens and availability will be added from the osteria's own menu."}
            <Verify lang={lang} source="Instagram, Tripadvisor, Sluurpy" />
          </div>
          <nav aria-label={it ? "Categorie" : "Categories"} className="sticky top-[5.5rem] z-20 -mx-4 mb-12 flex gap-1 overflow-x-auto bg-ivory/90 px-4 py-3 backdrop-blur lg:top-[6.5rem]">
            {menuFromReviews.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full border border-espresso/15 px-4 py-2 text-sm hover:border-espresso">
                {c.name[lang]}
              </a>
            ))}
          </nav>
          <div className="grid gap-x-20 gap-y-20 lg:grid-cols-2">
            {menuFromReviews.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-40" aria-labelledby={`h-${c.id}`}>
                <div className="flex items-baseline justify-between border-b border-espresso/20 pb-4" data-reveal>
                  <h2 id={`h-${c.id}`} className="font-serif text-5xl">{c.name[lang]}</h2>
                  <p className="font-serif italic text-terracotta">{c.intro[lang]}</p>
                </div>
                <ul className="divide-y divide-espresso/10">
                  {c.items.map((item) => (
                    <li key={item.it} className="flex items-baseline justify-between gap-6 py-5" data-reveal>
                      <span className="font-serif text-2xl">
                        {item[lang]}
                        {item.ig && (
                          <span className="ml-2 align-middle text-sm text-gold" title={it ? "Presentato sul profilo Instagram dell'osteria" : "Featured on the osteria's Instagram"}>
                            ✦
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft/70">€ —</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-20 text-sm text-ink-soft" data-reveal>
            {it
              ? "Allergie o intolleranze? Comunicale in sala o nelle note della prenotazione: l'elenco degli allergeni è disponibile su richiesta."
              : "Allergies or intolerances? Let the staff know or add them to your booking notes: the allergen list is available on request."}
          </p>
        </div>
      </section>
      <BookBand lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function CuisinePage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={it ? "La nostra cucina" : "Our cuisine"}
        title={it ? "I sapori del Sannio, senza scorciatoie." : "Sannio flavours, no shortcuts."}
        italic={it ? ["Sannio,"] : ["Sannio"]}
        intro={
          it
            ? "Una cucina che parte dai prodotti locali — la mela annurca, i legumi, le carni, i formaggi — e dalle ricette che le famiglie si tramandano."
            : "Cooking that starts from local produce — Annurca apples, legumes, meats, cheeses — and from recipes handed down through families."
        }
        art="ravioli"
      />
      <section className="bg-ivory py-28 lg:py-36">
        <div className="container-x space-y-28 lg:space-y-40">
          {signatures.map((s, i) => (
            <article key={s.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <ArtFrame kind={s.art} lang={lang} mask className="aspect-[4/5] w-full rounded-[2px]" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="eyebrow" data-reveal>{String(i + 1).padStart(2, "0")} · {s.course[lang]}</p>
                <h2 className="mt-5 font-serif text-5xl leading-none sm:text-6xl" data-reveal>{s.name[lang]}</h2>
                <p className="lead mt-6" data-reveal>{s.description[lang]}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink-soft/70" data-reveal>
                  {s.post ? (
                    <a href={s.post} target="_blank" rel="noopener noreferrer" className="link-underline">{sourceLabel[s.source][lang]} ↗</a>
                  ) : (
                    sourceLabel[s.source][lang]
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-cream py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={it ? "Il territorio nel piatto" : "The land on the plate"}
              title={it ? "La mela annurca, piccola regina campana." : "The Annurca, Campania's little queen apple."}
              italic={it ? ["annurca,"] : ["Annurca,"]}
            />
          </div>
          <div className="lead space-y-5 lg:col-span-6 lg:col-start-7" data-reveal>
            <p>
              {it
                ? "Piccola, rossa e profumata, la Melannurca Campana IGP è una delle firme della cucina dell'osteria: nel ripieno dei ravioli e nel liquore che bagna il babà, è l'ingrediente che gli ospiti ricordano."
                : "Small, red and fragrant, the Melannurca Campana PGI is one of the osteria's signatures: in the ravioli filling and in the liqueur soaking the babà, it's the flavour guests remember."}
            </p>
            <p>
              {it
                ? "Accanto a lei, i legumi della tradizione contadina, le verdure di stagione come friarielli e scarola, la salsiccia rossa di Castelpoto e i formaggi del territorio."
                : "Alongside it: the legumes of peasant tradition, seasonal greens like friarielli and escarole, Castelpoto red sausage and local cheeses."}
            </p>
          </div>
        </div>
      </section>
      <BookBand lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function GalleryPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow="Gallery"
        title={it ? "Dentro l'osteria." : "Inside the osteria."}
        italic={it ? ["osteria."] : ["osteria."]}
        intro={
          it
            ? "Interni, piatti, dettagli e il borgo intorno. Le immagini definitive arriveranno da un servizio fotografico dedicato."
            : "Interiors, dishes, details and the town around us. Final images will come from a dedicated photo shoot."
        }
      />
      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <Gallery lang={lang} />
        </div>
      </section>
      <BookBand lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function ReviewsPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const praise = it
    ? ["Ambiente rustico, caldo e curato", "Personale gentile e attento", "Cucina tradizionale con prodotti locali", "Prezzi giudicati onesti", "Ravioli all'annurca, pacca e fagioli, carni e babà tra i piatti più amati"]
    : ["Rustic, warm, well-kept setting", "Friendly, attentive staff", "Traditional cooking with local produce", "Prices seen as fair", "Annurca ravioli, pacca e fagioli, grilled meats and babà among the favourites"];
  const improve = it
    ? ["Sapidità non sempre costante", "In alcune visite, attese lunghe tra le portate", "Cotture delle carni da tenere sotto controllo"]
    : ["Seasoning not always consistent", "On some visits, long waits between courses", "Meat cooking to keep an eye on"];
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={it ? "Recensioni" : "Reviews"}
        title={it ? "La parola a chi si è seduto a tavola." : "In the words of those who've dined with us."}
        italic={it ? ["tavola."] : ["dined"]}
        intro={
          it
            ? "Valutazioni verificate sulle principali piattaforme, con i collegamenti diretti alle recensioni originali."
            : "Verified ratings on the main platforms, with direct links to the original reviews."
        }
      />
      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <RatingCards lang={lang} />
        </div>
      </section>
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">{it ? "Cosa apprezzano gli ospiti" : "What guests love"}</p>
            <ul className="mt-8 space-y-4">
              {praise.map((p) => (
                <li key={p} className="flex gap-4 border-b border-espresso/10 pb-4 font-serif text-2xl">
                  <span className="text-gold">✦</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="eyebrow">{it ? "Su cosa lavoriamo" : "What we're working on"}</p>
            <ul className="mt-8 space-y-4">
              {improve.map((p) => (
                <li key={p} className="flex gap-4 border-b border-espresso/10 pb-4 text-lg text-ink-soft">
                  <span className="text-ink-soft/50">—</span> {p}
                </li>
              ))}
            </ul>
            {demoMode && (
              <p className="mt-6 text-xs leading-relaxed text-ink-soft">
                {it
                  ? "Sezione facoltativa: mostrare con trasparenza i punti critici aumenta la fiducia. Da decidere con il titolare."
                  : "Optional section: openly acknowledging criticism builds trust. To be decided with the owner."}
              </p>
            )}
          </div>
        </div>
        <div className="container-x mt-20 text-center">
          <p className="eyebrow" data-reveal>{it ? "Le parole che ritornano" : "Words that keep coming back"}</p>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3" data-reveal>
            {reviewThemes.map((t) => (
              <li key={t.label.it} className="font-serif italic" style={{ fontSize: `${0.95 + t.weight * 0.28}rem`, opacity: 0.45 + t.weight * 0.11 }}>
                {t.label[lang]}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-xl text-sm text-ink-soft">
            {it
              ? "Sintesi delle recensioni pubbliche. Non riportiamo testi di recensioni senza autorizzazione: leggile direttamente sulle piattaforme."
              : "A summary of public reviews. We don't reproduce review texts without permission — read them directly on each platform."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-espresso">Tripadvisor</a>
            <a href={social.google} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-espresso">Google</a>
          </div>
        </div>
      </section>
      <BookBand lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function ContactPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={it ? "Contatti" : "Contact"}
        title={it ? "Ci trovi su Via Roma, al 27." : "Find us at Via Roma 27."}
        italic={it ? ["Via", "Roma,"] : ["Via", "Roma"]}
        intro={it ? "Chiamaci per prenotare o per qualsiasi informazione. Ti aspettiamo nel cuore del borgo." : "Call us to book or for any information. We're waiting for you in the heart of the old town."}
      />
      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-4" data-reveal>
            <div>
              <p className="eyebrow">{it ? "Telefono" : "Phone"}</p>
              <ul className="mt-4 space-y-3">
                {[phones.main, phones.mobile].map((p) => (
                  <li key={p.href} className="flex items-center gap-3">
                    <Phone size={18} className="text-terracotta" />
                    <a href={p.href} data-track="call_click" className="link-underline font-serif text-2xl">{p.display}</a>
                    <Verify lang={lang} source={p.source} show={!p.verified} />
                  </li>
                ))}
              </ul>
              {!whatsapp.enabled && demoMode && (
                <p className="mt-3 text-xs text-ink-soft">{it ? "WhatsApp: da attivare dopo la verifica del numero." : "WhatsApp: to be enabled once the number is confirmed."}</p>
              )}
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <p className="mt-4 flex items-center gap-3 text-ink-soft">
                <Mail size={18} className="text-terracotta" />
                {email.address ? <a href={`mailto:${email.address}`}>{email.address}</a> : it ? "Da comunicare" : "To be provided"}
                <Verify lang={lang} show={!email.verified} />
              </p>
            </div>
            <div>
              <p className="eyebrow">{it ? "Indirizzo" : "Address"}</p>
              <p className="mt-4 flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-terracotta" />
                <span className="font-serif text-2xl leading-snug">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city} ({address.province})
                </span>
              </p>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
                <span className="link-underline">{it ? "Come raggiungerci" : "Get directions"}</span> <ArrowRight size={14} />
              </a>
            </div>
            <div>
              <p className="eyebrow">{it ? "Orari" : "Opening hours"}</p>
              <div className="mt-4">
                <HoursList lang={lang} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <MapEmbed lang={lang} />
            <div className="mt-10 rounded-[2px] bg-cream p-6 sm:p-10">
              <h2 className="font-serif text-3xl">{it ? "Richiedi un tavolo" : "Request a table"}</h2>
              <p className="mt-2 text-sm text-ink-soft">{it ? "Ti ricontattiamo per confermare la disponibilità." : "We'll get back to you to confirm availability."}</p>
              <div className="mt-8">
                <BookingForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
export function BookPage({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={it ? "Prenota" : "Book"}
        title={it ? "Riserva il tuo tavolo." : "Reserve your table."}
        italic={it ? ["tavolo."] : ["table."]}
        intro={it ? "Pranzo o cena, in coppia, in famiglia o con gli amici. Chiamaci o inviaci una richiesta." : "Lunch or dinner, for two, with family or friends. Call us or send a request."}
      />
      <BookingSection lang={lang} id="modulo" numbered={false} />
      <WhereSection lang={lang} numbered={false} />
    </>
  );
}

/* ------------------------------------------------------------------ */
export function LegalPage({ lang, kind }: { lang: Lang; kind: "privacy" | "cookies" }) {
  const it = lang === "it";
  const owner = legal.company || brand.name;
  const blocks =
    kind === "privacy"
      ? it
        ? [
            ["Titolare del trattamento", `${owner}, ${address.street}, ${address.postalCode} ${address.city} (${address.province}).${legal.vat ? ` P.IVA ${legal.vat}.` : " Dati societari da completare."}`],
            ["Dati raccolti", "Tramite il modulo di richiesta prenotazione: nome, telefono, email (facoltativa), data, orario, numero di persone e note. Le note possono contenere informazioni su allergie: inseriscile solo se necessario."],
            ["Finalità e base giuridica", "Gestire la richiesta di prenotazione e ricontattarti per confermarla (esecuzione di misure precontrattuali richieste dall'interessato, art. 6.1.b GDPR)."],
            ["Conservazione", "I dati sono conservati per il tempo necessario a gestire la prenotazione e comunque non oltre 12 mesi, salvo obblighi di legge."],
            ["Destinatari", "Fornitori tecnici che ospitano il sito e inoltrano le richieste, nominati responsabili del trattamento. I dati non vengono venduti né usati per marketing senza consenso."],
            ["I tuoi diritti", "Accesso, rettifica, cancellazione, limitazione, opposizione e portabilità (artt. 15-22 GDPR), oltre al reclamo al Garante per la protezione dei dati personali."],
          ]
        : [
            ["Data controller", `${owner}, ${address.street}, ${address.postalCode} ${address.city} (${address.province}).${legal.vat ? ` VAT ${legal.vat}.` : " Company details to be completed."}`],
            ["Data collected", "Through the booking request form: name, phone, email (optional), date, time, number of guests and notes. Notes may include allergy information: only add it if needed."],
            ["Purpose and legal basis", "Handling your booking request and contacting you to confirm it (pre-contractual measures requested by you, Art. 6.1.b GDPR)."],
            ["Retention", "Data is kept as long as needed to handle the booking and no longer than 12 months, unless required by law."],
            ["Recipients", "Technical providers hosting the site and forwarding requests, appointed as processors. Data is never sold or used for marketing without consent."],
            ["Your rights", "Access, rectification, erasure, restriction, objection and portability (Arts. 15-22 GDPR), and the right to complain to the Italian Data Protection Authority."],
          ]
      : it
        ? [
            ["Cookie tecnici", "Necessari al funzionamento del sito, ad esempio per ricordare la tua scelta sui cookie. Non richiedono consenso."],
            ["Cookie statistici", "Google Analytics 4 con IP anonimizzato, attivato solo se accetti dal banner. Puoi revocare il consenso in qualsiasi momento da \"Preferenze cookie\" nel footer."],
            ["Contenuti di terze parti", "La mappa di Google Maps viene caricata solo se clicchi su \"Carica Google Maps\": da quel momento Google può impostare i propri cookie."],
            ["Font", "I caratteri tipografici sono ospitati direttamente sul sito: nessuna richiesta a server esterni."],
          ]
        : [
            ["Technical cookies", "Needed for the site to work, e.g. to remember your cookie choice. No consent required."],
            ["Analytics cookies", "Google Analytics 4 with anonymised IP, enabled only if you accept in the banner. You can withdraw consent at any time via \"Cookie settings\" in the footer."],
            ["Third-party content", "Google Maps loads only if you click \"Load Google Maps\": from then on Google may set its own cookies."],
            ["Fonts", "Typefaces are self-hosted: no requests to external servers."],
          ];
  return (
    <>
      <section className="bg-espresso pb-16 pt-40 text-ivory lg:pt-48">
        <div className="container-x">
          <p className="eyebrow !text-gold">{it ? "Informazioni legali" : "Legal information"}</p>
          <h1 className="display mt-6">{kind === "privacy" ? (it ? "Informativa privacy" : "Privacy notice") : "Cookie policy"}</h1>
        </div>
      </section>
      <section className="bg-ivory py-20">
        <div className="container-x max-w-3xl">
          {demoMode && (
            <p className="mb-10 rounded-[2px] border border-dashed border-gold p-5 text-sm text-ink-soft">
              {it
                ? "Bozza da far validare a un consulente privacy prima della pubblicazione."
                : "Draft to be validated by a privacy consultant before going live."}
            </p>
          )}
          <div className="space-y-10">
            {blocks.map(([h, p]) => (
              <div key={h}>
                <h2 className="font-serif text-3xl">{h}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
