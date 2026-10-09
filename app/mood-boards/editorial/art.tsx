// Editorial artifacts drawn in SVG/CSS. Flat fills, square corners, thick black rules: no gradients, no shadows.

const E = { paper: "#f2ead3", ink: "#111111", red: "#e4472b", blue: "#1e3a6b" };
const DISPLAY = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
const PLAIN = "'Helvetica Neue', Arial, sans-serif";

export function SleeveRed() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: red field, black circle, NIGHT DRIVE in cream">
      <rect width="160" height="160" fill={E.red} />
      <circle cx="40" cy="150" r="96" fill={E.ink} />
      <text x="12" y="64" fontFamily={DISPLAY} fontSize="52" fill={E.paper}>NIGHT</text>
      <text x="12" y="116" fontFamily={DISPLAY} fontSize="52" fill={E.paper}>DRIVE</text>
      <text x="148" y="16" textAnchor="end" fontFamily={PLAIN} fontWeight="700" fontSize="7" letterSpacing="1.5" fill={E.ink}>STEREO</text>
      <rect x="1.5" y="1.5" width="157" height="157" fill="none" stroke={E.ink} strokeWidth="3" />
    </svg>
  );
}

export function SleeveBlue() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: red sun cut by stripes on blue, AFTER HOURS">
      <rect width="160" height="160" fill={E.blue} />
      <circle cx="80" cy="70" r="46" fill={E.red} />
      <rect x="30" y="78" width="100" height="4" fill={E.blue} />
      <rect x="30" y="90" width="100" height="6" fill={E.blue} />
      <rect x="30" y="104" width="100" height="8" fill={E.blue} />
      <text x="80" y="148" textAnchor="middle" fontFamily={DISPLAY} fontSize="26" fill={E.paper}>AFTER HOURS</text>
      <rect x="1.5" y="1.5" width="157" height="157" fill="none" stroke={E.ink} strokeWidth="3" />
    </svg>
  );
}

export function SleeveSquares() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: triangles and a zigzag, HEAT WAVE">
      <rect width="160" height="160" fill={E.paper} />
      <polygon points="16,16 84,16 16,84" fill={E.red} />
      <polygon points="144,128 84,128 144,68" fill={E.blue} />
      <polyline points="16,104 44,76 72,104 100,76 128,104 148,84" fill="none" stroke={E.ink} strokeWidth="7" strokeLinejoin="miter" />
      <text x="14" y="153" fontFamily={DISPLAY} fontSize="26" fill={E.ink}>HEAT WAVE</text>
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
      <text x="70" y="60" textAnchor="middle" fontFamily={DISPLAY} fontSize="24" fill={E.ink}>NIGHT DRIVE</text>
      <text x="70" y="98" textAnchor="middle" fontFamily={DISPLAY} fontSize="20" fill={E.ink}>33⅓ RPM</text>
      <text x="70" y="118" textAnchor="middle" fontFamily={PLAIN} fontWeight="700" fontSize="7" letterSpacing="2.5" fill={E.ink}>STEREO</text>
      <circle cx="70" cy="70" r="3.5" fill={E.ink} />
    </svg>
  );
}

export function SleeveStack() {
  const rows = [
    { c: E.red, t: E.ink, x: 10, w: 270, label: "NIGHT DRIVE" },
    { c: E.paper, t: E.ink, x: 0, w: 280, label: "AFTER HOURS" },
    { c: E.blue, t: E.paper, x: 22, w: 262, label: "HEAT WAVE" },
    { c: E.ink, t: E.paper, x: 4, w: 276, label: "SIDE TWO" },
    { c: E.paper, t: E.ink, x: 16, w: 268, label: "MIDNIGHT TV" },
    { c: E.red, t: E.ink, x: 0, w: 280, label: "NEON STATIC" },
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
