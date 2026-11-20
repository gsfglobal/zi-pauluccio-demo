import { pageMeta } from "@/lib/meta";
import { ContactPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("contact", "it", "Contatti e orari", "Via Roma 27, Sant'Agata de' Goti (BN). Telefono, orari, mappa e come raggiungere l'osteria nel centro storico.");

export default function Page() {
  return <ContactPage lang="it" />;
}
