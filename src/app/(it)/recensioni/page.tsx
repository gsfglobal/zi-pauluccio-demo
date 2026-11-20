import { pageMeta } from "@/lib/meta";
import { ReviewsPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("reviews", "it", "Recensioni", "Valutazioni su Google, Tripadvisor e Facebook dell'osteria a Sant'Agata de' Goti, con collegamenti alle recensioni originali.");

export default function Page() {
  return <ReviewsPage lang="it" />;
}
