"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { brand, demoMode, phones, type Lang } from "@/content/site";
import { alternateOf, href, mainNav, navLabels } from "@/content/routes";
import { Monogram } from "@/components/ui/Monogram";

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other: Lang = lang === "it" ? "en" : "it";
  const solid = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {demoMode && (
        <div className="bg-wine px-4 py-1.5 text-center text-[0.68rem] font-medium tracking-wide text-ivory/90">
          {lang === "it"
            ? "Proposta dimostrativa · non è il sito ufficiale del ristorante · contenuti e foto da approvare"
            : "Demo proposal · not the restaurant's official website · content and photos pending approval"}
        </div>
      )}
      <div
        className={`transition-[background-color,box-shadow,color] duration-500 ${
          solid ? "bg-ivory/92 text-espresso shadow-[0_1px_0_rgba(41,35,29,0.08)] backdrop-blur-md" : "bg-transparent text-ivory"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-6 lg:h-20" aria-label={lang === "it" ? "Principale" : "Main"}>
          <Link href={href("home", lang)} className="flex items-center gap-3" aria-label={`${brand.name} — home`}>
            <Monogram className="h-9 w-9 lg:h-10 lg:w-10" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] opacity-70">Antica Osteria</span>
              <span className="font-serif text-xl lg:text-[1.45rem]">{brand.short}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 xl:flex">
            {mainNav.map((k) => {
              const active = pathname === href(k, lang);
              return (
                <li key={k}>
                  <Link
                    href={href(k, lang)}
                    className={`link-underline py-1 text-[0.8rem] font-medium tracking-wide ${active ? "bg-[length:100%_1px]" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {navLabels[k][lang]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href={alternateOf(pathname, other)}
              hrefLang={other}
              className="rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-widest opacity-80 hover:opacity-100"
              aria-label={other === "en" ? "English version" : "Versione italiana"}
            >
              {other}
            </Link>
            <a
              href={phones.main.href}
              data-track="call_click"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-current/30 md:inline-flex"
              aria-label={`${lang === "it" ? "Chiama" : "Call"} ${phones.main.display}`}
            >
              <Phone size={16} />
            </a>
            <Link href={href("book", lang)} data-track="book_click" className="btn btn-primary hidden !min-h-10 !py-2 sm:inline-flex">
              {lang === "it" ? "Prenota un tavolo" : "Book a table"}
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? (lang === "it" ? "Chiudi menu" : "Close menu") : lang === "it" ? "Apri menu" : "Open menu"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 bg-espresso text-ivory transition-[clip-path] duration-700 ease-[var(--ease-cine)] xl:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col justify-between pb-10 pt-32">
          <ul className="space-y-2">
            {(["home", ...mainNav] as const).map((k, i) => (
              <li key={k} style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }} className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                <Link href={href(k, lang)} tabIndex={open ? 0 : -1} className="font-serif text-4xl leading-tight">
                  {navLabels[k][lang]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link href={href("book", lang)} tabIndex={open ? 0 : -1} className="btn btn-primary">
              {lang === "it" ? "Prenota un tavolo" : "Book a table"}
            </Link>
            <a href={phones.main.href} tabIndex={open ? 0 : -1} className="btn btn-light">
              <Phone size={16} /> {phones.main.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
