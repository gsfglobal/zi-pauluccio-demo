import { pageMeta } from "@/lib/meta";
import { StoryPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("story", "it", "La nostra storia", "L'identità dell'Antica Osteria Zi' Pauluccio: ambiente, filosofia gastronomica e ospitalità nel centro storico di Sant'Agata de' Goti.");

export default function Page() {
  return <StoryPage lang="it" />;
}
