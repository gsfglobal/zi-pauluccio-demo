# Antica Osteria Zi' Pauluccio — sito demo

Proposta commerciale per l'Antica Osteria Zi' Pauluccio (Via Roma 27, Sant'Agata de' Goti).
**Non è il sito ufficiale**: finché `NEXT_PUBLIC_DEMO_MODE=true` il sito mostra un banner, segnala i dati da verificare, non invia prenotazioni e non viene indicizzato.

Ricerca, fonti e dati da confermare: vedi [`RESEARCH.md`](./RESEARCH.md).

## Stack

Next.js 15 (App Router, export statico) · TypeScript · Tailwind CSS 4 · Three.js + React Three Fiber + Drei · GSAP + ScrollTrigger · Lenis · Lucide · font self-hosted (Cormorant Garamond, Manrope).

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:3000
npm run lint
npm run typecheck
npm run build      # genera la cartella out/ (sito statico)
npm start          # serve out/ su http://localhost:3000
```

Anteprima in un unico file HTML (per il visualizzatore degli artifact di Claude, che non supporta percorsi assoluti né il router di Next.js):

```bash
npm run build:preview   # genera out-preview/index.html (navigazione a #hash: #menu, #en-menu, #presentazione…)
```

Il contenuto di `out/` si pubblica su qualunque hosting statico (Netlify, Vercel, Cloudflare Pages, hosting tradizionale).

## Configurazione (`.env`, vedi `.env.example`)

| Variabile | Uso |
|---|---|
| `NEXT_PUBLIC_DEMO_MODE` | `true` = demo (default). `false` = sito di produzione |
| `NEXT_PUBLIC_SITE_URL` | Dominio definitivo per canonical, sitemap, Open Graph |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | URL che riceve le richieste di prenotazione (POST JSON). Vuoto = il modulo invita a telefonare |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4, caricato **solo dopo consenso** |

### Prenotazioni — cosa manca

Il modulo **non è un sistema di prenotazione confermata**: invia una *richiesta* che l'osteria deve confermare. Per attivarlo serve un endpoint, a scelta:

1. **Formspree / Getform** (più semplice): creare il form, incollare l'URL in `NEXT_PUBLIC_BOOKING_ENDPOINT`, le richieste arrivano via email.
2. **Funzione serverless** (Netlify/Vercel) + Resend per l'email: validazione lato server, rate limit, nessun dato salvato in chiaro.
3. Se l'osteria adotta un gestionale (TheFork Manager, Plateform, ecc.) sostituire il modulo con il loro widget ufficiale.

Il modulo ha già validazione, honeypot anti-spam, consenso privacy obbligatorio, blocco del lunedì e orari calcolati sugli orari di apertura.

## Dove modificare i contenuti

- `src/content/site.ts` — nome, indirizzo, telefoni, WhatsApp, email, orari, valutazioni, ragione sociale. Il flag `verified` toglie il badge "verifica".
- `src/content/dishes.ts` — specialità, menu per categorie (oggi: piatti citati nelle recensioni, **senza prezzi**), parole ricorrenti.
- `src/content/routes.ts` — URL italiani e inglesi.
- `src/components/pages/*` — testi delle pagine (IT/EN affiancati).

## Immagini

| Tipo | Stato |
|---|---|
| Fotografie ufficiali autorizzate | **Nessuna** — da realizzare |
| Asset creati appositamente | Scena 3D (piatto, ravioli, mele annurca, tagliere), illustrazione statica dell'hero, monogramma provvisorio "ZP", og.png |
| Immagini dimostrative | Illustrazioni `ArtFrame` etichettate "Foto da realizzare" |
| Da sostituire | Tutte le `ArtFrame`, il monogramma (con il logo ufficiale) |

Nessuna foto è stata presa da Tripadvisor, Instagram, Facebook o da altri ristoranti.

## 3D

- `src/components/three/HeroScene.tsx` — scena R3F con texture procedurali (nessun file esterno da scaricare).
- Fallback statico automatico con: `prefers-reduced-motion`, meno di 4 core, meno di 4 GB di RAM, risparmio dati, WebGL assente.
- Il rendering si ferma quando la hero esce dallo schermo.
- Per presentazioni: `?3d=1` forza il 3D, `?3d=0` forza la versione statica.

## Pubblicazione su GitHub Pages

`./deploy-gh-pages.sh` compila con il percorso `/zi-pauluccio-demo` e pubblica sul branch `gh-pages` → https://gsfglobal.github.io/zi-pauluccio-demo/

## Pagine

IT: `/` `/la-nostra-storia/` `/menu/` `/la-nostra-cucina/` `/gallery/` `/recensioni/` `/contatti/` `/prenota/` `/privacy/` `/cookie-policy/`
EN: `/en/` `/en/our-story/` `/en/menu/` `/en/our-cuisine/` `/en/gallery/` `/en/reviews/` `/en/contact/` `/en/book/` `/en/privacy/` `/en/cookie-policy/`
Riservata (noindex, non linkata): `/presentazione/`

## Verifiche eseguite (20/11/2026)

- `npm run lint` — 0 errori, 0 warning
- `npm run typecheck` — 0 errori
- `npm run build` — 26 pagine statiche generate
- Test in Chrome headless (desktop 1440 e mobile 390): scena 3D renderizzata, nessun errore JS, nessun overflow orizzontale su mobile, 20 link interni con risposta 200, modulo (errori, lunedì chiuso, orari, anteprima demo), lightbox (apertura, frecce, Esc), filtri galleria, cambio lingua, menu mobile, metadata/hreflang/JSON-LD.
- **Non eseguiti**: Lighthouse, test su dispositivi fisici, test con screen reader.

## Prima della pubblicazione

Vedi la checklist in `RESEARCH.md` §10. Poi: `NEXT_PUBLIC_DEMO_MODE=false`, dominio, endpoint prenotazioni, validazione privacy/cookie da un consulente.
