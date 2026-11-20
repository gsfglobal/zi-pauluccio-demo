import { pageMeta } from "@/lib/meta";
import { CuisinePage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("cuisine", "en", "Our cuisine", "Traditional Sannio cooking: Annurca apple ravioli, pancotto, pacca e fagioli, Annurca babà. The osteria's specialities.");

export default function Page() {
  return <CuisinePage lang="en" />;
}
