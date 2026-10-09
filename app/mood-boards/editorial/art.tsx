// Editorial artifacts drawn in SVG/CSS. Flat fills, square corners, thick black rules: no gradients, no shadows.

const E = { paper: "#f2ead3", ink: "#111111", red: "#e4472b", blue: "#1e3a6b" };
const DISPLAY = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
const PLAIN = "'Helvetica Neue', Arial, sans-serif";

export function SleeveRed() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: red field, black circle, BLUE HOUR in cream">
      <rect width="160" height="160" fill={E.red} />
      <circle cx="40" cy="150" r="96" fill={E.ink} />
      <text x="12" y="64" fontFamily={DISPLAY} fontSize="56" fill={E.paper}>BLUE</text>
      <text x="12" y="116" fontFamily={DISPLAY} fontSize="56" fill={E.paper}>HOUR</text>
      <text x="148" y="16" textAnchor="end" fontFamily={PLAIN} fontWeight="700" fontSize="7" letterSpacing="1.5" fill={E.ink}>STEREO</text>
      <rect x="1.5" y="1.5" width="157" height="157" fill="none" stroke={E.ink} strokeWidth="3" />
    </svg>
  );
}

export function SleeveBlue() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: blue column, red half circle, NIGHT SHIFT">
      <rect width="160" height="160" fill={E.paper} />
      <rect width="56" height="160" fill={E.blue} />
      <path d="M56 36 A44 44 0 0 1 56 124 Z" fill={E.red} />
      <rect x="76" y="14" width="70" height="10" fill={E.ink} />
      <rect x="76" y="30" width="46" height="10" fill={E.ink} />
      <text x="70" y="132" fontFamily={DISPLAY} fontSize="32" fill={E.ink}>NIGHT</text>
      <text x="70" y="154" fontFamily={DISPLAY} fontSize="24" fill={E.ink}>SHIFT</text>
      <rect x="1.5" y="1.5" width="157" height="157" fill="none" stroke={E.ink} strokeWidth="3" />
    </svg>
  );
}

export function SleeveSquares() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: nested squares, SQUARE ROOT">
      <rect width="160" height="160" fill={E.blue} />
      <rect x="20" y="16" width="120" height="120" fill={E.paper} />
      <rect x="40" y="36" width="80" height="80" fill={E.red} />
      <rect x="60" y="56" width="40" height="40" fill={E.ink} />
      <text x="80" y="152" textAnchor="middle" fontFamily={PLAIN} fontWeight="700" fontSize="8" letterSpacing="3" fill={E.paper}>SQUARE ROOT</text>
      <rect x="1.5" y="1.5" width="157" height="157" fill="none" stroke={E.ink} strokeWidth="3" />
    </svg>
  );
}

export function FlatRecord() {
  return (
    <svg viewBox="0 0 120 120" className="w-full max-w-[200px]" role="img" aria-label="Record in a flat illustration">
      <circle cx="60" cy="60" r="58" fill={E.ink} />
      <path d="M60 60 L60 8 A52 52 0 0 1 104 32 Z" fill={E.paper} fillOpacity="0.18" />
      <circle cx="60" cy="60" r="38" fill="none" stroke={E.paper} strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="24" fill={E.red} />
      <circle cx="60" cy="60" r="3" fill={E.ink} />
    </svg>
  );
}

export function RecordLabel() {
  return (
    <svg viewBox="0 0 140 140" className="w-full max-w-[170px]" role="img" aria-label="Record label, red and cream">
      <circle cx="70" cy="70" r="66" fill={E.paper} stroke={E.ink} strokeWidth="4" />
      <path d="M4 70 A66 66 0 0 1 136 70 Z" fill={E.red} />
      <line x1="4" y1="70" x2="136" y2="70" stroke={E.ink} strokeWidth="4" />
      <text x="70" y="34" textAnchor="middle" fontFamily={PLAIN} fontWeight="700" fontSize="8" letterSpacing="2.5" fill={E.ink}>SIDE A</text>
      <text x="70" y="60" textAnchor="middle" fontFamily={DISPLAY} fontSize="24" fill={E.ink}>BLUE HOUR</text>
      <text x="70" y="98" textAnchor="middle" fontFamily={DISPLAY} fontSize="20" fill={E.ink}>33⅓ RPM</text>
      <text x="70" y="118" textAnchor="middle" fontFamily={PLAIN} fontWeight="700" fontSize="7" letterSpacing="2.5" fill={E.ink}>STEREO</text>
      <circle cx="70" cy="70" r="3.5" fill={E.ink} />
    </svg>
  );
}

export function SleeveStack() {
  const rows = [
    { c: E.red, t: E.ink, x: 10, w: 270, label: "BLUE HOUR" },
    { c: E.paper, t: E.ink, x: 0, w: 280, label: "NIGHT SHIFT" },
    { c: E.blue, t: E.paper, x: 22, w: 262, label: "SQUARE ROOT" },
    { c: E.ink, t: E.paper, x: 4, w: 276, label: "SIDE TWO" },
    { c: E.paper, t: E.ink, x: 16, w: 268, label: "LATE SET" },
    { c: E.red, t: E.ink, x: 0, w: 280, label: "ONE FOR ALICE" },
  ];
  return (
    <svg viewBox="0 0 300 136" className="w-full max-w-[460px]" role="img" aria-label="A stack of record sleeves seen from the side">
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={r.x + 3} y={4 + i * 21} width={r.w} height="21" fill={r.c} stroke={E.ink} strokeWidth="3" />
          <text x={r.x + 12} y={19 + i * 21} fontFamily={PLAIN} fontWeight="700" fontSize="8" letterSpacing="2" fill={r.t}>
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function PaperGrain() {
  return (
    <svg className="h-full min-h-32 w-full" role="img" aria-label="Paper grain texture">
      <defs>
        <filter id="ed-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.32  0 0 0 0 0.18  0 0 0 1.3 -0.4" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={E.paper} />
      <rect width="100%" height="100%" filter="url(#ed-grain)" />
    </svg>
  );
}

export function Halftone() {
  const dots = [];
  const cols = 20;
  const rows = 9;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      dots.push(<circle key={`${x}-${y}`} cx={8 + x * 12 + (y % 2) * 6} cy={8 + y * 12} r={0.6 + (x / (cols - 1)) * 5} fill={E.ink} />);
    }
  }
  return (
    <svg viewBox="0 0 252 116" preserveAspectRatio="xMidYMid slice" className="h-full min-h-32 w-full" role="img" aria-label="Halftone dots, small to large">
      <rect width="252" height="116" fill={E.paper} />
      {dots}
    </svg>
  );
}

export function InkPrint() {
  return (
    <svg viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice" className="h-full min-h-32 w-full" role="img" aria-label="Black ink print, slightly off register, with speckle">
      <defs>
        <filter id="ed-speckle" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.83  0 0 0 14 -8.8" />
        </filter>
      </defs>
      <rect width="240" height="120" fill={E.paper} />
      <rect x="14" y="12" width="226" height="108" fill={E.red} />
      <rect x="0" y="0" width="226" height="108" fill={E.ink} />
      <rect x="0" y="0" width="226" height="108" filter="url(#ed-speckle)" />
    </svg>
  );
}
