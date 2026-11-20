import { pageMeta } from "@/lib/meta";
import { ReviewsPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("reviews", "en", "Reviews", "Ratings on Google, Tripadvisor and Facebook, with links to the original reviews.");

export default function Page() {
  return <ReviewsPage lang="en" />;
}
