import Link from "next/link";
import { Phone } from "lucide-react";
import { phones, type Lang } from "@/content/site";
import { href } from "@/content/routes";

/** Barra di conversione fissa su mobile: chiamata e prenotazione sempre a portata di pollice. */
export function MobileBookBar({ lang }: { lang: Lang }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-ivory/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="flex gap-2">
        <a href={phones.main.href} data-track="call_click" className="btn btn-ghost flex-1 !px-3 text-espresso">
          <Phone size={16} /> {lang === "it" ? "Chiama" : "Call"}
        </a>
        <Link href={href("book", lang)} data-track="book_click" className="btn btn-primary flex-[1.6] !px-3">
          {lang === "it" ? "Prenota un tavolo" : "Book a table"}
        </Link>
      </div>
    </div>
  );
}
