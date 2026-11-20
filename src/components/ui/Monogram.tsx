import { logoMarkSrc } from "@/content/photos";

/** Marchio del logo ufficiale (ritagliato da Instagram, da sostituire con il file vettoriale). */
export function Monogram({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={logoMarkSrc} alt="" aria-hidden="true" className={`rounded-full ${className}`} />;
}
