/**
 * Dati centrali dell'osteria.
 * Ogni dato marcato `verified: false` viene segnalato discretamente in modalità demo.
 * Fonte e data di verifica: vedi RESEARCH.md (20/11/2026).
 */

export const demoMode = (process.env.NEXT_PUBLIC_DEMO_MODE ?? "true") !== "false";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zipauluccio.it").replace(/\/$/, "");

export const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "";

export type Lang = "it" | "en";

/** Anno di fondazione dichiarato nella pagina Facebook ufficiale ("Nel 1927 ... nasce l'Antica osteria di Zi' Pauluccio"). */
export const founded = { year: 1927, verified: false, source: "Facebook dell'osteria" };

/** Eventi annunciati sul profilo Instagram dell'osteria. */
export const events = [
  {
    id: "capodanno-2026",
    date: { it: "31 dicembre", en: "31 December" },
    title: { it: "Veglione di Capodanno", en: "New Year's Eve dinner" },
    text: {
      it: "Buona cucina, musica dal vivo e il brindisi di mezzanotte nel cuore del borgo. Prenotazione obbligatoria.",
      en: "Good food, live music and the midnight toast in the heart of the old town. Booking required.",
    },
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/Df9je75AJda/",
  },
  {
    id: "serate-pesce",
    date: { it: "Venerdì d'estate", en: "Summer Fridays" },
    title: { it: "Serate di pesce", en: "Seafood nights" },
    text: {
      it: "Il mare incontra la tradizione: cene dedicate ai sapori del mare, interpretati dalla nostra cucina.",
      en: "The sea meets tradition: dinners devoted to the flavours of the sea, interpreted by our kitchen.",
    },
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/DbGqFCEg2Ht/",
  },
  {
    id: "ricorrenze",
    date: { it: "Su richiesta", en: "On request" },
    title: { it: "Feste e ricorrenze", en: "Celebrations" },
    text: {
      it: "Pranzi di famiglia, anniversari e giornate speciali da festeggiare a tavola, insieme.",
      en: "Family lunches, anniversaries and special days to celebrate together at the table.",
    },
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/DXmkJ22Dcog/",
  },
];

export const brand = {
  /** Grafia usata su Google, social e Restaurant Guru. Tripadvisor usa "Paoluccio". Da confermare. */
  name: "Antica Osteria Zi' Pauluccio",
  short: "Zi' Pauluccio",
  monogram: "ZP",
  nameVerified: false,
};

export const address = {
  street: "Via Roma, 27",
  postalCode: "82019",
  city: "Sant'Agata de' Goti",
  province: "BN",
  region: "Campania",
  country: "IT",
  verified: true,
};

export const phones = {
  main: { display: "+39 0823 717213", href: "tel:+390823717213", verified: true, source: "Instagram dell'osteria, 20/11/2026" },
  mobile: { display: "+39 324 955 6335", href: "tel:+393249556335", verified: true, source: "Instagram dell'osteria, 20/11/2026" },
};

/** WhatsApp resta disattivato finché il numero non viene confermato dal titolare. */
export const whatsapp: { enabled: boolean; number: string } = { enabled: false, number: "" };

export const email: { address: string; verified: boolean } = { address: "", verified: false };

export const social = {
  instagram: "https://www.instagram.com/anticaosteriazipauluccio/",
  facebook: "https://www.facebook.com/anticaosteriazipauluccio/",
  tripadvisor:
    "https://www.tripadvisor.it/Restaurant_Review-g1062580-d2351721-Reviews-Antica_Osteria_Zi_Paoluccio-Sant_Agata_de_Goti_Province_of_Benevento_Campania.html",
  google: "https://www.google.com/maps/search/?api=1&query=Antica+Osteria+Zi'+Pauluccio+Via+Roma+27+Sant'Agata+de'+Goti",
};

export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Via+Roma+27,+82019+Sant'Agata+de'+Goti+BN";

export type DayHours = { day: { it: string; en: string }; slots: string[]; schemaDay: string };

/** Fonte: Tripadvisor (profilo gestito dall'attività), rilevato 20/11/2026. Da confermare. */
export const hours: { verified: boolean; days: DayHours[] } = {
  verified: false,
  days: [
    { day: { it: "Lunedì", en: "Monday" }, slots: [], schemaDay: "Monday" },
    { day: { it: "Martedì", en: "Tuesday" }, slots: ["10:30–15:00", "18:30–23:00"], schemaDay: "Tuesday" },
    { day: { it: "Mercoledì", en: "Wednesday" }, slots: ["10:30–15:00", "18:30–23:00"], schemaDay: "Wednesday" },
    { day: { it: "Giovedì", en: "Thursday" }, slots: ["10:30–15:00", "18:30–23:00"], schemaDay: "Thursday" },
    { day: { it: "Venerdì", en: "Friday" }, slots: ["10:30–15:00", "18:30–23:00"], schemaDay: "Friday" },
    { day: { it: "Sabato", en: "Saturday" }, slots: ["10:30–15:00", "18:30–23:00"], schemaDay: "Saturday" },
    { day: { it: "Domenica", en: "Sunday" }, slots: ["10:00–16:00"], schemaDay: "Sunday" },
  ],
};

export type Rating = { platform: string; value: number; count: number; url: string; note: { it: string; en: string } };

/** Valori rilevati il 20/11/2026. Aggiornare prima della pubblicazione. */
export const ratings: Rating[] = [
  {
    platform: "Google",
    value: 4.5,
    count: 688,
    url: social.google,
    note: { it: "Dato aggregato da Google Maps", en: "Aggregated from Google Maps" },
  },
  {
    platform: "Tripadvisor",
    value: 4.2,
    count: 468,
    url: social.tripadvisor,
    note: {
      it: "Travellers' Choice 2026 · n. 3 di 64 a Sant'Agata de' Goti",
      en: "Travellers' Choice 2026 · #3 of 64 in Sant'Agata de' Goti",
    },
  },
  {
    platform: "Facebook",
    value: 4.4,
    count: 157,
    url: social.facebook,
    note: { it: "Dato riportato da Restaurant Guru", en: "As reported by Restaurant Guru" },
  },
];

export const ratingsCheckedOn = { it: "20 novembre 2026", en: "20 November 2026" };

export const legal = {
  /** Ragione sociale e P.IVA da richiedere al titolare. */
  company: "",
  vat: "",
};
