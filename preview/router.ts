import { useSyncExternalStore } from "react";
import { routes } from "@/content/routes";

/**
 * Router a hash per l'anteprima in un unico file (il visualizzatore degli artifact
 * accetta solo #nome semplici). "/menu/" -> "#menu", "/en/our-story/" -> "#en-our-story".
 */
const extra = ["/presentazione/"];
export const allPaths = [...Object.values(routes).flatMap((r) => [r.it, r.en]), ...extra];

export function pathToHash(path: string) {
  const clean = path.split("#")[0];
  const p = clean.endsWith("/") ? clean : `${clean}/`;
  const name = p.replace(/^\/|\/$/g, "").replace(/\//g, "-");
  return name || "home";
}

const byHash = new Map(allPaths.map((p) => [pathToHash(p), p]));

let current = "/";
function read() {
  const h = decodeURIComponent(window.location.hash.slice(1));
  if (!h) return "/";
  return byHash.get(h) ?? current; // ancora interna (es. #antipasti): resta sulla pagina
}

const listeners = new Set<() => void>();
if (typeof window !== "undefined") {
  current = read();
  window.addEventListener("hashchange", () => {
    const h = decodeURIComponent(window.location.hash.slice(1));
    const next = read();
    if (next !== current) {
      current = next;
      listeners.forEach((l) => l());
    } else if (h && !byHash.has(h)) {
      document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export function usePath() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => "/",
  );
}
