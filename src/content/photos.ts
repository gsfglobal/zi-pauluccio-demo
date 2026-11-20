/**
 * Fotografie pubblicate dall'osteria sul proprio profilo Instagram (@anticaosteriazipauluccio).
 * Usate nella demo come anteprima: PRIMA della pubblicazione serve l'autorizzazione del titolare
 * (e idealmente i file originali in alta risoluzione, queste sono 640 px).
 */
import ravioli from "@/assets/photos/ravioli.jpg";
import tavola from "@/assets/photos/tavola.jpg";
import vini from "@/assets/photos/vini.jpg";
import vongole from "@/assets/photos/vongole.jpg";
import carciofo from "@/assets/photos/carciofo.jpg";
import logoMark from "@/assets/photos/logo-mark.png";

/** Next.js restituisce un oggetto { src }, Vite (anteprima) una stringa. */
const url = (m: unknown): string => (typeof m === "string" ? m : (m as { src: string }).src);

const IG = "https://www.instagram.com/anticaosteriazipauluccio/p/";

export type Photo = { src: string; post: string };

export const photoByKind: Record<string, Photo> = {
  ravioli: { src: url(ravioli), post: `${IG}DW1_DFBgA5r/` },
  carciofo: { src: url(carciofo), post: `${IG}DWRNQKkDbXa/` },
  vongole: { src: url(vongole), post: `${IG}DbVQS_UAEWX/` },
  caciocavallo: { src: url(tavola), post: `${IG}Dd8p3W2IU4x/` },
  tavola: { src: url(tavola), post: `${IG}Dd8p3W2IU4x/` },
  sala: { src: url(tavola), post: `${IG}Dd8p3W2IU4x/` },
  vino: { src: url(vini), post: `${IG}DdL02yRgFCS/` },
};

/** Marchio circolare del logo ufficiale, ritagliato da un post dell'osteria. Da sostituire col vettoriale. */
export const logoMarkSrc = url(logoMark);
