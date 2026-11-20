import { pageMeta } from "@/lib/meta";
import { LegalPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("privacy", "it", "Informativa privacy", "Informativa sul trattamento dei dati personali.");

export default function Page() {
  return <LegalPage lang="it" kind="privacy" />;
}
