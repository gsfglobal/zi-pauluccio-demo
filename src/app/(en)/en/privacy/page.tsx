import { pageMeta } from "@/lib/meta";
import { LegalPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("privacy", "en", "Privacy notice", "How we handle personal data.");

export default function Page() {
  return <LegalPage lang="en" kind="privacy" />;
}
