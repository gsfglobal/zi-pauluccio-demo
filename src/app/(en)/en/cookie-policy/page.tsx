import { pageMeta } from "@/lib/meta";
import { LegalPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("cookies", "en", "Cookie policy", "How we use cookies.");

export default function Page() {
  return <LegalPage lang="en" kind="cookies" />;
}
