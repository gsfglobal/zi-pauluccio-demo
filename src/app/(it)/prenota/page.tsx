import { pageMeta } from "@/lib/meta";
import { BookPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("book", "it", "Prenota un tavolo", "Prenota il tuo tavolo all'Antica Osteria Zi' Pauluccio a Sant'Agata de' Goti: chiama o invia una richiesta online.");

export default function Page() {
  return <BookPage lang="it" />;
}
