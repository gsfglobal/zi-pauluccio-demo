import { pageMeta } from "@/lib/meta";
import { HomePage } from "@/components/pages/HomePage";

export const metadata = pageMeta("home", "en", "Antica Osteria Zi' Pauluccio · Restaurant in Sant'Agata de' Goti", "Traditional Sannio cooking in the historic centre of Sant'Agata de' Goti, Campania, at Via Roma 27. Annurca apple ravioli, grilled meats, wine cellar. Book your table.");

export default function Page() {
  return <HomePage lang="en" />;
}
