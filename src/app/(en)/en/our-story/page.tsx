import { pageMeta } from "@/lib/meta";
import { StoryPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("story", "en", "Our story", "The identity of Antica Osteria Zi' Pauluccio: setting, food philosophy and hospitality in the old town of Sant'Agata de' Goti.");

export default function Page() {
  return <StoryPage lang="en" />;
}
