import { pageMeta } from "@/lib/meta";
import { MenuPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("menu", "it", "Menu", "Il menu dell'osteria a Sant'Agata de' Goti: antipasti, pasta fresca, carni alla brace, dolci e vini del territorio sannita.");

export default function Page() {
  return <MenuPage lang="it" />;
}
