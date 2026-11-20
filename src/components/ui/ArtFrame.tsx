import type { Lang } from "@/content/site";
import { photoByKind } from "@/content/photos";

export type ArtKind =
  | "sala"
  | "ravioli"
  | "pancotto"
  | "fagioli"
  | "baba"
  | "cantina"
  | "borgo"
  | "esterno"
  | "ceramica"
  | "vino"
  | "brace"
  | "tavola"
  | "caciocavallo"
  | "carciofo"
  | "vongole";

const palettes: Record<ArtKind, [string, string, string]> = {
  sala: ["#6b3a26", "#2e231c", "#e8c99a"],
  ravioli: ["#c9a46a", "#7a4a2c", "#faf3e3"],
  pancotto: ["#6b6a3e", "#2f3020", "#efe3c4"],
  fagioli: ["#a75b3a", "#4a2418", "#f6e7cf"],
  baba: ["#8c3b2c", "#3d1714", "#f7dfb8"],
  cantina: ["#3c2a20", "#140f0c", "#c9a46a"],
  borgo: ["#c98f63", "#5b3b2a", "#fbeedc"],
  esterno: ["#b9a083", "#5d4a3a", "#fdf6ea"],
  ceramica: ["#e9dfcd", "#b9a789", "#3d5a78"],
  vino: ["#5b2525", "#1f0c0c", "#e3c38c"],
  brace: ["#7a3b1c", "#1c120d", "#f2b66d"],
  tavola: ["#8f6a48", "#3a2a1e", "#f5e6cc"],
  caciocavallo: ["#b9853f", "#4a2a14", "#fcefd2"],
  carciofo: ["#5d6a43", "#1f2614", "#eef0d8"],
  vongole: ["#6d7b80", "#20282b", "#eef3f2"],
};

function Drawing({ kind, c }: { kind: ArtKind; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "sala":
      return (
        <g {...s}>
          <path d="M40 470V210q0-120 160-120t160 120v260" />
          <path d="M70 470V220q0-95 130-95t130 95v250" opacity=".5" />
          <path d="M200 40v40" />
          <path d="M175 80h50l-10 26h-30z" />
          <circle cx="200" cy="118" r="5" fill={c} />
          <path d="M80 380h240M95 380l-15 90M305 380l15 90M130 380v-60h40v60M230 380v-60h40v60" />
          <path d="M120 372q20-14 40 0M240 372q20-14 40 0" opacity=".7" />
        </g>
      );
    case "ravioli":
    case "pancotto":
    case "fagioli":
    case "baba":
      return (
        <g {...s}>
          <ellipse cx="200" cy="260" rx="160" ry="160" />
          <ellipse cx="200" cy="260" rx="122" ry="122" opacity=".55" />
          <ellipse cx="200" cy="260" rx="148" ry="148" strokeDasharray="2 9" opacity=".7" />
          {kind === "ravioli" && (
            <>
              <rect x="128" y="200" width="62" height="62" rx="12" transform="rotate(-12 159 231)" />
              <rect x="205" y="196" width="62" height="62" rx="12" transform="rotate(9 236 227)" />
              <rect x="165" y="262" width="62" height="62" rx="12" transform="rotate(-4 196 293)" />
              <circle cx="150" cy="300" r="6" fill={c} opacity=".8" />
              <circle cx="258" cy="292" r="6" fill={c} opacity=".8" />
              <circle cx="232" cy="176" r="5" fill={c} opacity=".8" />
            </>
          )}
          {kind === "pancotto" && (
            <>
              <path d="M130 250q30-40 70-10t70-10" />
              <path d="M125 285q40 30 80 0t75 5" />
              <path d="M160 215q10-20 30-12M230 300q15 18 35 6" opacity=".8" />
              <path d="M150 260l20-6M210 265l26 4M190 230l14 10" />
            </>
          )}
          {kind === "fagioli" && (
            <>
              {[...Array(14)].map((_, i) => {
                const a = (i / 14) * Math.PI * 2;
                const r = 40 + (i % 3) * 22;
                return (
                  <ellipse
                    key={i}
                    cx={200 + Math.cos(a) * r}
                    cy={260 + Math.sin(a) * r}
                    rx="11"
                    ry="7"
                    transform={`rotate(${(a * 180) / Math.PI} ${200 + Math.cos(a) * r} ${260 + Math.sin(a) * r})`}
                  />
                );
              })}
            </>
          )}
          {kind === "baba" && (
            <>
              <path d="M150 300q0-90 50-90t50 90z" />
              <path d="M160 260q40 12 80 0M155 282q45 12 90 0" opacity=".6" />
              <circle cx="275" cy="300" r="18" />
              <path d="M275 282q4-10 12-12" />
            </>
          )}
        </g>
      );
    case "cantina":
      return (
        <g {...s}>
          <path d="M30 470V220q0-150 170-150t170 150v250" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3, 4].map((i) => <circle key={`${r}-${i}`} cx={100 + i * 50} cy={260 + r * 55} r="20" opacity={0.9 - r * 0.15} />),
          )}
          {[0, 1, 2].map((r) => (
            <path key={r} d={`M70 ${285 + r * 55}h260`} opacity=".4" />
          ))}
          <path d="M120 470q0-40 25-40t25 40M230 470q0-40 25-40t25 40" opacity=".6" />
        </g>
      );
    case "borgo":
      return (
        <g {...s}>
          <path d="M0 380q60-20 100-10t110-8 100 6 90-8" />
          <path d="M0 470V380M400 470V372" />
          <path d="M20 375V300h40v75M60 300l20-22 20 22v75M110 370v-95h48v95M158 275l24-30 24 30v95M210 360V250h40v110M250 250l18-50 18 50v110M300 365v-80h45v80M345 300l20-20 20 20v65" />
          <path d="M268 200v-30M262 176h12" />
          <path d="M30 320h10M120 300h10M130 330h10M220 280h10M310 310h10" opacity=".7" />
          <path d="M0 470q50-60 100-75t120-5 180-20" opacity=".5" />
        </g>
      );
    case "esterno":
      return (
        <g {...s}>
          <path d="M60 470V140h280v330" />
          <path d="M150 470V330q0-50 50-50t50 50v140" />
          <path d="M95 190h50v60H95zM255 190h50v60h-50z" />
          <path d="M60 140l140-50 140 50" opacity=".5" />
          <path d="M120 300h20M260 300h20" />
          <path d="M170 270q30-20 60 0" opacity=".7" />
          <path d="M20 470h360" />
        </g>
      );
    case "ceramica":
      return (
        <g {...s}>
          {[0, 1].map((r) =>
            [0, 1].map((col) => {
              const x = 100 + col * 200;
              const y = 150 + r * 200;
              return (
                <g key={`${r}-${col}`}>
                  <rect x={x - 90} y={y - 90} width="180" height="180" />
                  <circle cx={x} cy={y} r="28" />
                  <path d={`M${x} ${y - 90}q30 40 0 62q-30-22 0-62M${x} ${y + 90}q30-40 0-62q-30 22 0 62M${x - 90} ${y}q40 30 62 0q-22-30-62 0M${x + 90} ${y}q-40 30-62 0q22-30 62 0`} />
                </g>
              );
            }),
          )}
        </g>
      );
    case "vino":
      return (
        <g {...s}>
          <path d="M120 470V250q0-40 18-60v-90h24v90q18 20 18 60v220z" />
          <path d="M138 110h24" />
          <path d="M126 300h48v80h-48z" opacity=".7" />
          <path d="M240 260q0 60 45 60t45-60q0-30-8-60h-74q-8 30-8 60z" />
          <path d="M285 320v120M250 440h70" />
          <path d="M240 262q45 14 90 0" opacity=".6" />
        </g>
      );
    case "brace":
      return (
        <g {...s}>
          <path d="M40 330h320M40 360h320M40 390h320" opacity=".5" />
          {[...Array(9)].map((_, i) => (
            <path key={i} d={`M${60 + i * 35} 300v120`} opacity=".35" />
          ))}
          <path d="M110 300q60-50 140-10q-20 30-80 30t-60-20z" />
          <path d="M140 290l20-10M180 284l20-8M215 286l15-6" opacity=".7" />
          <path d="M150 200q10-30-10-60q40 25 30 60M220 210q15-25 0-50q35 20 25 50M260 230q10-20 0-35" opacity=".8" />
        </g>
      );
    case "caciocavallo":
      return (
        <g {...s}>
          <ellipse cx="200" cy="270" rx="120" ry="70" />
          <path d="M80 270v30q0 50 120 50t120-50v-30" />
          <path d="M120 262q40-40 80-10t80-6" />
          <path d="M140 280q30 18 60 4t70 6" opacity=".7" />
          {[150, 205, 255].map((x, i) => (
            <circle key={x} cx={x} cy={270 + (i % 2) * 8} r="9" fill={c} opacity=".75" />
          ))}
          <path d="M175 252l6 4M230 258l5-3M260 274l4 4M150 266l-4 3" opacity=".9" />
          <path d="M40 390l70-30 20 26-70 30zM290 386l70-24 14 28-72 24z" />
          <path d="M200 200q10-30-6-56M226 206q14-26 2-48" opacity=".6" />
        </g>
      );
    case "carciofo":
      return (
        <g {...s}>
          <ellipse cx="200" cy="300" rx="170" ry="110" strokeDasharray="2 9" opacity=".6" />
          <path d="M200 380q-90-40-90-120q0-60 90-90q90 30 90 90q0 80-90 120z" />
          <path d="M200 380q-55-50-55-120q0-45 55-70q55 25 55 70q0 70-55 120z" />
          <path d="M200 380q-22-60-22-120q0-30 22-48q22 18 22 48q0 60-22 120z" />
          <path d="M200 380v50q0 20 14 30" />
          <path d="M120 300l170-6M126 270l150-30" opacity=".35" />
          <path d="M300 200q20-30 50-20M310 214q30-6 40 14" opacity=".7" />
        </g>
      );
    case "vongole":
      return (
        <g {...s}>
          <ellipse cx="200" cy="260" rx="160" ry="160" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${150 + (i % 3) * 45} ${220 + Math.floor(i / 3) * 60}q20-24 40 0q-20 14-40 0z`} />
          ))}
          <path d="M120 300q80 40 160-10M130 320q70 30 150-6" opacity=".6" />
        </g>
      );
    case "tavola":
      return (
        <g {...s}>
          <path d="M20 330l60-120h240l60 120z" />
          <ellipse cx="160" cy="268" rx="45" ry="16" />
          <ellipse cx="250" cy="250" rx="38" ry="13" />
          <path d="M300 290v-55q0-18 12-24h8q12 6 12 24v55z" />
          <path d="M100 290l-20 30M120 245l50-12" opacity=".6" />
          <path d="M60 330v140M340 330v140" />
        </g>
      );
  }
}

const labels: Record<ArtKind, Record<Lang, string>> = {
  sala: { it: "la sala", en: "the dining room" },
  ravioli: { it: "ravioli alla mela annurca", en: "Annurca apple ravioli" },
  pancotto: { it: "pancotto", en: "pancotto" },
  fagioli: { it: "pacca e fagioli", en: "pacca e fagioli" },
  baba: { it: "babà all'annurca", en: "Annurca babà" },
  cantina: { it: "la cantina", en: "the cellar" },
  borgo: { it: "il borgo", en: "the old town" },
  esterno: { it: "l'ingresso su Via Roma", en: "the Via Roma entrance" },
  ceramica: { it: "dettagli in ceramica", en: "ceramic details" },
  vino: { it: "vino e calici", en: "wine and glasses" },
  brace: { it: "la brace", en: "the grill" },
  tavola: { it: "la tavola apparecchiata", en: "the laid table" },
  caciocavallo: { it: "caciocavallo al forno", en: "baked caciocavallo" },
  carciofo: { it: "carciofo alla brace", en: "ember-grilled artichoke" },
  vongole: { it: "spaghetti alle vongole", en: "spaghetti with clams" },
};

export function artLabel(kind: ArtKind, lang: Lang) {
  return labels[kind][lang];
}

type Props = {
  kind: ArtKind;
  lang: Lang;
  className?: string;
  showTag?: boolean;
  mask?: boolean;
  priority?: boolean;
};

/**
 * Segnaposto fotografico illustrato. Va sostituito con fotografie autorizzate del locale.
 * Viene sempre etichettato come "Foto da realizzare" per non essere confuso con una foto reale.
 */
export function ArtFrame({ kind, lang, className = "", showTag = true, mask = false }: Props) {
  const [a, b, line] = palettes[kind];
  const id = `g-${kind}`;
  const label = labels[kind][lang];
  const photo = photoByKind[kind];
  if (photo) {
    return (
      <figure
        className={`relative overflow-hidden bg-espresso ${className}`}
        data-reveal={mask ? "mask" : undefined}
      >
        <div data-mask-inner className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={label} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        {showTag && (
          <figcaption className="absolute bottom-3 left-3 z-10 rounded-full bg-espresso/60 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ivory/90 backdrop-blur-sm">
            {lang === "it" ? "Foto Instagram dell'osteria · da autorizzare" : "Osteria's Instagram photo · pending approval"}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <figure
      className={`grain relative overflow-hidden bg-espresso ${className}`}
      data-reveal={mask ? "mask" : undefined}
      role="img"
      aria-label={`${lang === "it" ? "Illustrazione segnaposto" : "Placeholder illustration"}: ${label}`}
    >
      <div data-mask-inner className="absolute inset-0">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id={id} cx="35%" cy="25%" r="95%">
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </radialGradient>
            <radialGradient id={`${id}-v`} cx="50%" cy="45%" r="70%">
              <stop offset="60%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity=".38" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#${id})`} />
          <g opacity=".85">
            <Drawing kind={kind} c={line} />
          </g>
          <rect width="400" height="500" fill={`url(#${id}-v)`} />
        </svg>
      </div>
      {showTag && (
        <figcaption className="absolute bottom-3 left-3 z-10 rounded-full bg-espresso/55 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ivory/90 backdrop-blur-sm">
          {lang === "it" ? "Foto da realizzare" : "Photo to be shot"} · {label}
        </figcaption>
      )}
    </figure>
  );
}
