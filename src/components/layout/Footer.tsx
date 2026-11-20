import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { address, brand, demoMode, directionsUrl, legal, phones, social, type Lang } from "@/content/site";
import { href, mainNav, navLabels } from "@/content/routes";
import { Monogram } from "@/components/ui/Monogram";
import { HoursList } from "@/components/ui/HoursList";
import { Verify } from "@/components/ui/Verify";

export function Footer({ lang }: { lang: Lang }) {
  const it = lang === "it";
  return (
    <footer className="grain relative overflow-hidden bg-espresso text-ivory">
      <div className="container-x relative pb-32 pt-24 lg:pb-14">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-ivory/10 pb-16 lg:flex-row lg:items-end">
          <p className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
            {it ? "Vi aspettiamo a tavola, " : "We'll keep a seat for you, "}
            <span className="italic text-gold">{it ? "nel cuore del borgo." : "in the heart of the old town."}</span>
          </p>
          <Link href={href("book", lang)} data-track="book_click" className="btn btn-primary shrink-0">
            {it ? "Prenota il tuo tavolo" : "Book your table"}
          </Link>
        </div>

        <div className="grid gap-12 pt-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Monogram className="h-12 w-12 text-gold" />
              <div className="leading-none">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-ivory/60">Antica Osteria</p>
                <p className="font-serif text-2xl">{brand.short}</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              {it
                ? "Cucina del territorio sannita nel centro storico di Sant'Agata de' Goti."
                : "Cooking of the Sannio territory in the historic centre of Sant'Agata de' Goti."}
            </p>
            <div className="mt-6 flex gap-3">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold">
                <InstagramIcon size={17} />
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold">
                <FacebookIcon size={17} />
              </a>
              <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center rounded-full border border-ivory/20 px-4 text-xs font-semibold tracking-wide hover:border-gold hover:text-gold">
                Tripadvisor
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow !text-gold">{it ? "Esplora" : "Explore"}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/75">
              {mainNav.map((k) => (
                <li key={k}>
                  <Link href={href(k, lang)} className="link-underline hover:text-ivory">
                    {navLabels[k][lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow !text-gold">{it ? "Contatti" : "Contact"}</p>
            <ul className="mt-5 space-y-4 text-sm text-ivory/80">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" className="link-underline">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city} ({address.province})
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <a href={phones.main.href} data-track="call_click" className="link-underline">{phones.main.display}</a>
                  <Verify lang={lang} source={phones.main.source} show={!phones.main.verified} />
                  <br />
                  <a href={phones.mobile.href} data-track="call_click" className="link-underline">{phones.mobile.display}</a>
                  <Verify lang={lang} source={phones.mobile.source} show={!phones.mobile.verified} />
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow !text-gold">{it ? "Orari" : "Opening hours"}</p>
            <div className="mt-5">
              <HoursList lang={lang} tone="light" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}
            {legal.company ? ` · ${legal.company}` : ""}
            {legal.vat ? ` · P.IVA ${legal.vat}` : demoMode ? (it ? " · Ragione sociale e P.IVA da inserire" : " · Company details to be added") : ""}
          </p>
          <div className="flex gap-6">
            <Link href={href("privacy", lang)} className="link-underline hover:text-ivory">Privacy</Link>
            <Link href={href("cookies", lang)} className="link-underline hover:text-ivory">Cookie policy</Link>
            <button type="button" data-open-consent className="link-underline hover:text-ivory">
              {it ? "Preferenze cookie" : "Cookie settings"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
