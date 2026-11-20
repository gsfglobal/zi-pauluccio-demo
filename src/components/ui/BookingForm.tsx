"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { bookingEndpoint, demoMode, hours, phones, type Lang } from "@/content/site";
import { href } from "@/content/routes";
import { track } from "@/lib/analytics";

type Fields = { name: string; phone: string; email: string; date: string; time: string; people: string; notes: string; privacy: boolean; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "preview" | "sent" | "error" | "call";

const toMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
const toStr = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Orari prenotabili derivati dagli orari di apertura (pranzo dalle 12:00, cena dalle 19:00). */
function slotsFor(dateStr: string): string[] {
  if (!dateStr) return [];
  const d = new Date(`${dateStr}T12:00:00`);
  const idx = (d.getDay() + 6) % 7; // 0 = lunedì
  const out: string[] = [];
  hours.days[idx].slots.forEach((slot) => {
    const [o, c] = slot.split("–").map(toMin);
    const lunch = o < 17 * 60;
    const from = Math.max(o, lunch ? 12 * 60 : 19 * 60);
    const to = c - (lunch ? 30 : 60);
    for (let m = from; m <= to; m += 30) out.push(toStr(m));
  });
  return out;
}

function todayStr() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ lang }: { lang: Lang }) {
  const it = lang === "it";
  const [f, setF] = useState<Fields>({ name: "", phone: "", email: "", date: "", time: "", people: "2", notes: "", privacy: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const slots = useMemo(() => slotsFor(f.date), [f.date]);
  const closedDay = f.date !== "" && slots.length === 0;

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v, ...(k === "date" ? { time: "" } : {}) }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = it ? "Inserisci nome e cognome." : "Please enter your full name.";
    if (!/^\+?[\d\s().-]{7,}$/.test(f.phone.trim())) e.phone = it ? "Inserisci un numero di telefono valido." : "Please enter a valid phone number.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = it ? "Email non valida." : "Invalid email.";
    if (!f.date) e.date = it ? "Scegli una data." : "Choose a date.";
    else if (f.date < todayStr()) e.date = it ? "La data è già passata." : "This date has passed.";
    else if (closedDay) e.date = it ? "In questo giorno l'osteria è chiusa." : "The osteria is closed on this day.";
    if (!f.time && !closedDay) e.time = it ? "Scegli un orario." : "Choose a time.";
    const n = Number(f.people);
    if (!n || n < 1 || n > 30) e.people = it ? "Indica il numero di persone." : "Enter the number of guests.";
    if (!f.privacy) e.privacy = it ? "Serve il consenso per gestire la richiesta." : "Consent is required to handle your request.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (f.website) return; // honeypot anti-spam
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`bf-${first}`)?.focus();
      return;
    }
    track("booking_request", { people: Number(f.people) });
    if (demoMode) {
      setStatus("preview");
      return;
    }
    if (!bookingEndpoint) {
      setStatus("call");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, website: undefined, lang, source: "sito-web" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const field = "mt-2 w-full rounded-[2px] border border-espresso/15 bg-ivory px-4 py-3.5 text-base text-espresso outline-none transition-colors placeholder:text-ink-soft/50 focus:border-terracotta aria-[invalid=true]:border-wine";
  const label = "text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`bf-${k}-err`} className="mt-1.5 text-sm text-wine">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({ id: `bf-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `bf-${k}-err` : undefined });

  const dateLabel = f.date
    ? new Date(`${f.date}T12:00:00`).toLocaleDateString(it ? "it-IT" : "en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  if (status === "preview" || status === "sent" || status === "call") {
    return (
      <div className="rounded-[2px] border border-espresso/10 bg-ivory p-8 sm:p-10" role="status" aria-live="polite">
        <CalendarCheck className="text-terracotta" size={32} />
        <h3 className="mt-5 font-serif text-3xl sm:text-4xl">
          {status === "sent"
            ? it ? "Richiesta inviata" : "Request sent"
            : status === "call"
              ? it ? "Ci siamo quasi" : "Almost there"
              : it ? "Anteprima della tua richiesta" : "Your request preview"}
        </h3>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <dt className="text-ink-soft">{it ? "Nome" : "Name"}</dt>
          <dd>{f.name}</dd>
          <dt className="text-ink-soft">{it ? "Quando" : "When"}</dt>
          <dd className="first-letter:uppercase">{dateLabel} · {f.time}</dd>
          <dt className="text-ink-soft">{it ? "Persone" : "Guests"}</dt>
          <dd>{f.people}</dd>
        </dl>
        <p className="mt-6 rounded-[2px] bg-cream p-4 text-sm leading-relaxed text-ink-soft">
          {status === "preview" &&
            (it
              ? "Modalità dimostrativa: la richiesta NON è stata inviata a nessuno. Sul sito pubblicato arriverà all'osteria, che la confermerà per telefono o email in base alla disponibilità reale."
              : "Demo mode: this request was NOT sent to anyone. On the live site it will reach the osteria, which will confirm by phone or email based on real availability.")}
          {status === "sent" &&
            (it
              ? "La tua è una richiesta, non ancora una prenotazione confermata: l'osteria ti ricontatterà per confermare la disponibilità."
              : "This is a request, not yet a confirmed booking: the osteria will contact you to confirm availability.")}
          {status === "call" &&
            (it ? "Per confermare il tavolo, chiama l'osteria: ti risponderanno con la disponibilità." : "To confirm your table, please call the osteria.")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={phones.main.href} data-track="call_click" className="btn btn-primary">
            <Phone size={16} /> {phones.main.display}
          </a>
          <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost text-espresso">
            {it ? "Modifica richiesta" : "Edit request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="bf-note">
      <div className="sm:col-span-2">
        <label htmlFor="bf-name" className={label}>{it ? "Nome e cognome" : "Full name"} *</label>
        <input {...a11y("name")} autoComplete="name" className={field} value={f.name} onChange={(e) => set("name", e.target.value)} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="bf-phone" className={label}>{it ? "Telefono" : "Phone"} *</label>
        <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="bf-email" className={label}>Email</label>
        <input {...a11y("email")} type="email" autoComplete="email" className={field} value={f.email} onChange={(e) => set("email", e.target.value)} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="bf-date" className={label}>{it ? "Data" : "Date"} *</label>
        <input {...a11y("date")} type="date" min={todayStr()} className={field} value={f.date} onChange={(e) => set("date", e.target.value)} />
        {closedDay && !errors.date && <p className="mt-1.5 text-sm text-wine">{it ? "Il lunedì l'osteria è chiusa." : "The osteria is closed on Mondays."}</p>}
        {err("date")}
      </div>
      <div>
        <label htmlFor="bf-time" className={label}>{it ? "Orario" : "Time"} *</label>
        <select {...a11y("time")} className={field} value={f.time} onChange={(e) => set("time", e.target.value)} disabled={!slots.length}>
          <option value="">{f.date ? (slots.length ? (it ? "Scegli" : "Choose") : it ? "Chiuso" : "Closed") : it ? "Prima scegli la data" : "Pick a date first"}</option>
          {slots.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {err("time")}
      </div>
      <div>
        <label htmlFor="bf-people" className={label}>{it ? "Persone" : "Guests"} *</label>
        <input {...a11y("people")} type="number" min={1} max={30} inputMode="numeric" className={field} value={f.people} onChange={(e) => set("people", e.target.value)} />
        {Number(f.people) > 10 && <p className="mt-1.5 text-sm text-ink-soft">{it ? "Per gruppi numerosi ti consigliamo di chiamare." : "For large groups we suggest calling."}</p>}
        {err("people")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bf-notes" className={label}>{it ? "Note (allergie, occasioni, seggiolone…)" : "Notes (allergies, occasions, high chair…)"}</label>
        <textarea id="bf-notes" rows={3} className={field} value={f.notes} onChange={(e) => set("notes", e.target.value)} maxLength={600} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bf-website">Website</label>
        <input id="bf-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input {...a11y("privacy")} type="checkbox" checked={f.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-terracotta" />
          <span>
            {it ? "Ho letto l'" : "I have read the "}
            <Link href={href("privacy", lang)} className="underline underline-offset-2">{it ? "informativa privacy" : "privacy notice"}</Link>
            {it ? " e acconsento al trattamento dei dati per gestire la mia richiesta di prenotazione." : " and consent to my data being used to handle my booking request."} *
          </span>
        </label>
        {err("privacy")}
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="bf-note" className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <ShieldCheck size={16} className="mt-px shrink-0 text-olive" />
          {it
            ? "Questa è una richiesta: il tavolo è confermato solo dopo il riscontro dell'osteria."
            : "This is a request: your table is confirmed only once the osteria replies."}
        </p>
        <button type="submit" className="btn btn-primary shrink-0" disabled={status === "sending"}>
          {status === "sending" ? (it ? "Invio…" : "Sending…") : it ? "Invia la richiesta" : "Send request"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-wine sm:col-span-2">
          {it ? "Invio non riuscito. Chiama il " : "Sending failed. Please call "}
          <a href={phones.main.href} className="underline">{phones.main.display}</a>.
        </p>
      )}
    </form>
  );
}
