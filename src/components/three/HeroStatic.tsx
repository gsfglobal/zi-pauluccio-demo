/** Alternativa statica alla scena 3D (dispositivi poco potenti, movimento ridotto, WebGL assente). */
export function HeroStatic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="Ravioli alla mela annurca su piatto in ceramica, tagliere d'ulivo e mele annurca">
      <defs>
        <radialGradient id="hs-board" cx="48%" cy="45%" r="60%">
          <stop offset="0" stopColor="#c49a6c" />
          <stop offset=".75" stopColor="#a5784e" />
          <stop offset="1" stopColor="#6e472b" />
        </radialGradient>
        <radialGradient id="hs-plate" cx="45%" cy="38%" r="65%">
          <stop offset="0" stopColor="#fbf4e6" />
          <stop offset="1" stopColor="#e4d6bd" />
        </radialGradient>
        <radialGradient id="hs-apple" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#d24a3c" />
          <stop offset=".6" stopColor="#a3212a" />
          <stop offset="1" stopColor="#5f1218" />
        </radialGradient>
        <linearGradient id="hs-pasta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5dca5" />
          <stop offset="1" stopColor="#d7ab64" />
        </linearGradient>
        <filter id="hs-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#140c07" floodOpacity=".55" />
        </filter>
      </defs>
      <g filter="url(#hs-shadow)">
        <ellipse cx="300" cy="300" rx="270" ry="185" fill="#6e472b" />
        <ellipse cx="300" cy="288" rx="270" ry="185" fill="url(#hs-board)" />
      </g>
      {[40, 80, 120, 160, 200, 240].map((r) => (
        <ellipse key={r} cx="310" cy="282" rx={r} ry={r * 0.68} fill="none" stroke="#6b4426" strokeOpacity=".18" />
      ))}
      <path d="M90 380 l120 -20 l40 70 l-130 30z" fill="#ece2cf" opacity=".9" />
      <path d="M100 392 l116 -19" stroke="#a75b3a" strokeWidth="5" />
      <g filter="url(#hs-shadow)">
        <ellipse cx="300" cy="270" rx="170" ry="115" fill="url(#hs-plate)" />
      </g>
      <ellipse cx="300" cy="270" rx="150" ry="100" fill="none" stroke="#a75b3a" strokeWidth="3" />
      <ellipse cx="300" cy="270" rx="160" ry="107" fill="none" stroke="#2f4a6b" strokeWidth="3" strokeDasharray="10 8" />
      <ellipse cx="300" cy="272" rx="120" ry="78" fill="#f6ecda" />
      <ellipse cx="300" cy="275" rx="78" ry="48" fill="#d4973a" opacity=".55" />
      {[
        [255, 255, -10],
        [335, 252, 8],
        [298, 300, -3],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-34" y="-24" width="68" height="48" rx="12" fill="url(#hs-pasta)" stroke="#c99c55" strokeDasharray="3 3" />
          <ellipse cx="0" cy="-4" rx="20" ry="12" fill="#fbe8bd" opacity=".7" />
        </g>
      ))}
      {[
        [240, 300],
        [360, 290],
        [310, 232],
        [270, 228],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="9" height="8" fill={i % 2 ? "#f3e7c7" : "#a8232a"} transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
      <path d="M222 242 q18 -16 36 2 q-18 12 -36 -2z" fill="#5f6d45" />
      <path d="M352 310 q18 -14 34 4 q-18 10 -34 -4z" fill="#5f6d45" />
      <g filter="url(#hs-shadow)">
        <ellipse cx="500" cy="330" rx="52" ry="46" fill="url(#hs-apple)" />
        <ellipse cx="452" cy="385" rx="42" ry="37" fill="url(#hs-apple)" />
      </g>
      <path d="M500 290 q4 -16 14 -20" stroke="#4a3320" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M452 352 q3 -12 11 -15" stroke="#4a3320" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M150 140 q120 -30 250 -10" stroke="#4a3320" strokeWidth="3" fill="none" />
      {[170, 210, 250, 290, 330, 370].map((x, i) => (
        <path key={x} d={`M${x} ${136 - (i % 2) * 2} q${i % 2 ? 22 : -22} ${i % 2 ? -18 : 18} 44 ${i % 2 ? -6 : 6}`} stroke="#7c8563" strokeWidth="9" strokeLinecap="round" fill="none" />
      ))}
    </svg>
  );
}
