import { pageMeta } from "@/lib/meta";
import { CuisinePage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("cuisine", "it", "La nostra cucina", "Cucina tipica sannita: ravioli alla mela annurca, pancotto, pacca e fagioli, babà all'annurca. Le specialità dell'osteria a Sant'Agata de' Goti.");

export default function Page() {
  return <CuisinePage lang="it" />;
}
