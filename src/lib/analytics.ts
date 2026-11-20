"use client";

/**
 * Analytics rispettosi del consenso.
 * Nessuno script di terze parti viene caricato finché l'utente non accetta i cookie statistici.
 * Eventi di conversione: book_click, call_click, whatsapp_click, menu_view, directions_click, booking_request.
 */

export type Consent = "granted" | "denied" | null;
const KEY = "zp-consent-v1";

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* storage non disponibile: il banner verrà riproposto */
  }
  window.dispatchEvent(new CustomEvent("zp:consent", { detail: v }));
}

type Gtag = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  if (readConsent() !== "granted") return;
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (w.gtag) w.gtag("event", event, params);
  else (w.dataLayer ??= []).push({ event, ...params });
}
