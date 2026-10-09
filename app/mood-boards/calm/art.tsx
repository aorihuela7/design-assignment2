// Calm artifacts drawn in SVG/CSS. Flat fills and 1px lines only: no gradients, no shadows.

const C = {
  oat: "#f3ede2",
  surface: "#fbf8f2",
  sand: "#d9cbb0",
  clay: "#a8654a",
  moss: "#44603f",
  ink: "#2b2722",
  line: "#d8cfbf",
};

function Grooves({ cx, cy, from, to }: { cx: number; cy: number; from: number; to: number }) {
  const rings = [];
  for (let r = from; r <= to; r += 4) {
    rings.push(<circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.oat} strokeOpacity={0.18} />);
  }
  return <>{rings}</>;
}

export function Record({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Vinyl record">
      <circle cx="60" cy="60" r="58" fill={C.ink} />
      <Grooves cx={60} cy={60} from={24} to={54} />
      <circle cx="60" cy="60" r="19" fill={C.clay} />
      <circle cx="60" cy="60" r="2.5" fill={C.oat} />
    </svg>
  );
}

export function Sleeve() {
  return (
    <svg viewBox="0 0 160 160" className="w-full max-w-[160px]" role="img" aria-label="Record sleeve">
      <rect x="1" y="1" width="158" height="158" rx="12" fill={C.sand} stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="80" cy="66" r="34" fill="none" stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="80" cy="66" r="6" fill={C.ink} fillOpacity={0.35} />
      <text x="16" y="130" fontFamily="Iowan Old Style, Georgia, serif" fontSize="17" fill={C.ink}>
        Evening Hours
      </text>
      <text x="16" y="146" fontFamily="Helvetica Neue, system-ui, sans-serif" fontSize="9" letterSpacing="1.5" fill={C.ink} fillOpacity={0.7}>
        SIDE A · 33⅓ RPM
      </text>
    </svg>
  );
}

export function Turntable() {
  return (
    <svg viewBox="0 0 240 170" className="w-full max-w-[260px]" role="img" aria-label="Record on a turntable">
      <rect x="1" y="1" width="238" height="168" rx="12" fill={C.sand} stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="90" cy="85" r="68" fill={C.oat} stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="90" cy="85" r="62" fill={C.ink} />
      <Grooves cx={90} cy={85} from={26} to={58} />
      <circle cx="90" cy="85" r="20" fill={C.clay} />
      <circle cx="90" cy="85" r="2.5" fill={C.oat} />
      <circle cx="208" cy="34" r="8" fill={C.oat} stroke={C.ink} strokeOpacity={0.5} />
      <path d="M208 34 L208 100 L150 128" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="140" y="124" width="16" height="9" rx="2" transform="rotate(-30 148 128)" fill={C.ink} />
    </svg>
  );
}

export function Tonearm() {
  return (
    <svg viewBox="0 0 160 140" className="w-full max-w-[200px]" role="img" aria-label="Tonearm">
      <circle cx="124" cy="30" r="18" fill={C.sand} stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="124" cy="30" r="6" fill={C.ink} />
      <path d="M124 30 L124 90 L60 118" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="48" y="112" width="22" height="11" rx="2" transform="rotate(-25 59 118)" fill={C.ink} />
      <circle cx="124" cy="30" r="1.5" fill={C.oat} />
    </svg>
  );
}

export function Label() {
  return (
    <svg viewBox="0 0 140 140" className="w-full max-w-[140px]" role="img" aria-label="Record label">
      <circle cx="70" cy="70" r="68" fill={C.clay} />
      <circle cx="70" cy="70" r="60" fill="none" stroke={C.oat} strokeOpacity={0.6} />
      <text x="70" y="46" textAnchor="middle" fontFamily="Helvetica Neue, system-ui, sans-serif" fontSize="7" letterSpacing="2" fill={C.oat}>
        SIDE A
      </text>
      <text x="70" y="82" textAnchor="middle" fontFamily="Iowan Old Style, Georgia, serif" fontSize="15" fill={C.oat}>
        Evening Hours
      </text>
      <text x="70" y="108" textAnchor="middle" fontFamily="Helvetica Neue, system-ui, sans-serif" fontSize="7" letterSpacing="2" fill={C.oat}>
        33⅓ RPM
      </text>
    </svg>
  );
}

export function GrooveDetail() {
  return (
    <svg viewBox="0 0 160 100" className="w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Close view of record grooves">
      <rect width="160" height="100" fill={C.ink} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx="-40" cy="50" r={70 + i * 6} fill="none" stroke={C.oat} strokeOpacity={0.2} />
      ))}
    </svg>
  );
}

// Plaster, ceramic and linen are flat fills with SVG noise or hand-drawn weave lines.
export function Texture({ kind }: { kind: "linen" | "plaster" | "ceramic" }) {
  const id = `tex-${kind}`;
  if (kind === "linen") {
    return (
      <svg className="h-full min-h-32 w-full" role="img" aria-label="Matte linen texture">
        <defs>
          <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#e6dccb" />
            <path d="M0 1.5H6M0 4.5H6" stroke="#b9ab94" strokeWidth="0.6" strokeOpacity="0.7" />
            <path d="M1.5 0V6M4.5 0V6" stroke="#b9ab94" strokeWidth="0.6" strokeOpacity="0.45" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    );
  }
  const plaster = kind === "plaster";
  return (
    <svg className="h-full min-h-32 w-full" role="img" aria-label={plaster ? "Plaster at dusk texture" : "Unglazed ceramic texture"}>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={plaster ? 0.012 : 0.9} numOctaves={plaster ? 3 : 2} seed={plaster ? 4 : 9} />
          <feColorMatrix values={plaster ? "0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.3  0 0 0 1.1 -0.35" : "0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.24  0 0 0 1.4 -0.45"} />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={plaster ? "#c9b8a6" : "#d6c3a6"} />
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

export function Stylus() {
  return (
    <svg viewBox="0 0 240 130" className="w-full max-w-[300px]" role="img" aria-label="Stylus touching a record, side view">
      <rect x="1" y="102" width="238" height="16" rx="4" fill={C.sand} stroke={C.ink} strokeOpacity={0.35} />
      <rect x="16" y="92" width="208" height="8" rx="4" fill={C.ink} />
      <rect x="188" y="38" width="22" height="60" rx="4" fill={C.sand} stroke={C.ink} strokeOpacity={0.35} />
      <circle cx="199" cy="34" r="9" fill={C.oat} stroke={C.ink} strokeOpacity={0.5} />
      <path d="M199 34 L130 54 L106 66" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="86" y="64" width="26" height="12" rx="2" transform="rotate(-20 99 70)" fill={C.ink} />
      <path d="M94 76 L90 91" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="90" cy="91.5" r="1.5" fill={C.clay} />
    </svg>
  );
}
