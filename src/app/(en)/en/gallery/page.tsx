import { pageMeta } from "@/lib/meta";
import { GalleryPage } from "@/components/pages/InnerPages";

export const metadata = pageMeta("gallery", "en", "Gallery", "Interiors, dishes and atmosphere of Antica Osteria Zi' Pauluccio in Sant'Agata de' Goti.");

export default function Page() {
  return <GalleryPage lang="en" />;
}
