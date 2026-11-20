import { pageMeta } from "@/lib/meta";
import { ContactPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("contact", "en", "Contact & hours", "Via Roma 27, Sant'Agata de' Goti. Phone, opening hours, map and directions.");

export default function Page() {
  return <ContactPage lang="en" />;
}
