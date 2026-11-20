import { pageMeta } from "@/lib/meta";
import { LegalPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("cookies", "it", "Cookie policy", "Informativa sull'uso dei cookie.");

export default function Page() {
  return <LegalPage lang="it" kind="cookies" />;
}
