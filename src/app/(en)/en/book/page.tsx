import { pageMeta } from "@/lib/meta";
import { BookPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("book", "en", "Book a table", "Book your table at Antica Osteria Zi' Pauluccio in Sant'Agata de' Goti: call or send a request online.");

export default function Page() {
  return <BookPage lang="en" />;
}
