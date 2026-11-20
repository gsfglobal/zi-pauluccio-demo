import { pageMeta } from "@/lib/meta";
import { MenuPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("menu", "en", "Menu", "The osteria's menu in Sant'Agata de' Goti: starters, fresh pasta, grilled meats, desserts and Sannio wines.");

export default function Page() {
  return <MenuPage lang="en" />;
}
