import { pageMeta } from "@/lib/meta";
import { HomePage } from "@/components/pages/HomePage";

export const metadata = pageMeta("home", "it", "Antica Osteria Zi' Pauluccio · Ristorante a Sant'Agata de' Goti", "Osteria di cucina tipica sannita nel centro storico di Sant'Agata de' Goti (BN), in Via Roma 27. Ravioli alla mela annurca, carni alla brace, cantina. Prenota il tuo tavolo.");

export default function Page() {
  return <HomePage lang="it" />;
}
