import type { Metadata } from "next";
import Link from "next/link";
import { Box, Gauge, Globe2, MousePointerClick, Search, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Presentazione del progetto · riservata",
  robots: { index: false, follow: false },
};

const features = [
  { icon: Box, t: "Hero 3D cinematografica", d: "Il piatto più amato dagli ospiti — i ravioli alla mela annurca — ricostruito in 3D su ceramica artigianale e tagliere d'ulivo. Reagisce al mouse e allo scroll; sui telefoni meno potenti passa automaticamente a una versione statica." },
  { icon: MousePointerClick, t: "Prenotazioni al centro", d: "Pulsante \"Prenota\" sempre visibile, barra fissa su mobile con Chiama e Prenota, modulo di richiesta con orari calcolati sui giorni di apertura e blocco del lunedì." },
  { icon: Smartphone, t: "Pensato per il telefono", d: "La maggior parte di chi cerca \"dove mangiare a Sant'Agata de' Goti\" lo fa dallo smartphone, spesso già in paese: chiamata e indicazioni stradali in un tocco." },
  { icon: Search, t: "SEO locale", d: "Schema Restaurant con orari e indirizzo, metadati unici per pagina, sitemap, URL parlanti, versione inglese con hreflang. Obiettivo: le ricerche \"ristorante Sant'Agata de' Goti\", \"osteria Sant'Agata de' Goti\", \"cucina tipica sannita\"." },
  { icon: Globe2, t: "Italiano e inglese", d: "Tutte le pagine principali tradotte con cura per i turisti stranieri che visitano il borgo." },
  { icon: Gauge, t: "Veloce e conforme", d: "Sito statico, font ospitati in locale, nessun cookie di terze parti senza consenso, Google Maps caricata solo su richiesta, supporto a \"movimento ridotto\"." },
];

const needed = [
  "Conferma della grafia del nome (Paoluccio / Pauluccio) e logo vettoriale",
  "Telefono principale, numero WhatsApp ed email per le richieste",
  "Orari aggiornati e periodi di chiusura",
  "Menu attuale con prezzi e allergeni; carta dei vini",
  "Storia dell'osteria e nomi dello staff da citare",
  "Autorizzazione per le foto Instagram e servizio fotografico: sala, cantina, piatti, ingresso su Via Roma",
  "Ragione sociale e P.IVA; validazione privacy",
  "Dominio e scelta del sistema di ricezione richieste (email o gestionale)",
];

export default function Presentazione() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-espresso pb-20 pt-40 text-ivory lg:pt-48">
        <div className="container-x">
          <p className="eyebrow !text-gold">Documento riservato · non indicizzato</p>
          <h1 className="display mt-6 max-w-4xl">Un sito all&apos;altezza della vostra tavola.</h1>
          <p className="lead mt-8 max-w-2xl !text-ivory/70">
            Questa è una proposta dimostrativa per l&apos;Antica Osteria Zi&apos; Pauluccio. Non è un sito commissionato né approvato
            dall&apos;attività: serve a mostrare come potrebbe presentarsi online, partendo da ciò che gli ospiti già raccontano.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">Apri la demo</Link>
            <Link href="/en/" className="btn btn-light">Versione inglese</Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-x">
          <p className="eyebrow">Cosa c&apos;è dentro</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-[2px] border border-espresso/10 bg-cream p-8">
                <Icon className="text-terracotta" size={26} />
                <h2 className="mt-5 font-serif text-3xl">{t}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Perché conviene</p>
            <h2 className="h-section mt-5">La reputazione c&apos;è già. Manca la vetrina.</h2>
            <div className="lead mt-6 space-y-4">
              <p>Oltre 1.300 recensioni tra Google, Tripadvisor e Facebook, il terzo posto su 64 ristoranti in paese e il Travellers&apos; Choice 2026: l&apos;osteria è già scelta e apprezzata.</p>
              <p>Oggi però chi la cerca trova solo schede di portali terzi. Un sito proprio permette di raccontare le specialità, ricevere richieste di prenotazione dirette e farsi trovare anche dai turisti stranieri.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Prima della pubblicazione servono</p>
            <ol className="mt-8 space-y-3">
              {needed.map((n, i) => (
                <li key={n} className="flex gap-4 border-b border-espresso/10 pb-3">
                  <span className="font-serif text-xl tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{n}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">Come leggere la demo</p>
          <ul className="mt-8 space-y-4 text-ink-soft">
            <li><b className="text-espresso">Etichetta &quot;verifica&quot;:</b> dato trovato online ma da confermare (telefono, orari, piatti).</li>
            <li><b className="text-espresso">&quot;Foto Instagram dell&apos;osteria&quot;:</b> foto pubblicate da voi su Instagram, usate solo per l&apos;anteprima: le pubblichiamo solo con la vostra autorizzazione, meglio se con gli originali in alta risoluzione.</li>
            <li><b className="text-espresso">&quot;Foto da realizzare&quot;:</b> illustrazioni segnaposto dove non c&apos;è ancora una foto. Non usiamo foto di altri ristoranti.</li>
            <li><b className="text-espresso">Modulo di prenotazione:</b> mostra il flusso completo ma in demo non invia nulla.</li>
            <li><b className="text-espresso">Recensioni:</b> solo valutazioni aggregate con link alle fonti, nessun testo inventato o copiato.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
