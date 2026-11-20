import { pageMeta } from "@/lib/meta";
import { GalleryPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("gallery", "it", "Gallery", "Interni, piatti e atmosfera dell'Antica Osteria Zi' Pauluccio a Sant'Agata de' Goti.");

export default function Page() {
  return <GalleryPage lang="it" />;
}
