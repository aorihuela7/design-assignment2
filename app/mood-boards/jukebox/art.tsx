// Jukebox artifacts drawn in SVG. Flat shapes, hard edges; the only effects are the scanline,
// grid and glow tiles that are about those effects.

const J = {
  night: "#0d0618",
  grape: "#1a0f2e",
  plum: "#2f1b52",
  edge: "#4a3480",
  magenta: "#ff2e93",
  cyan: "#19e3f0",
  volt: "#ffe600",
  warm: "#f6ebdd",
};
const NEON = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

export function Cassette() {
  return (
    <svg viewBox="0 0 200 130" className="w-full" role="img" aria-label="Cassette tape">
      <rect x="2" y="2" width="196" height="126" fill={J.plum} stroke={J.cyan} strokeWidth="3" />
      <rect x="18" y="12" width="164" height="52" fill={J.warm} />
      <rect x="18" y="22" width="164" height="8" fill={J.magenta} />
      <rect x="18" y="32" width="164" height="5" fill={J.volt} />
      <text x="26" y="56" fontFamily={MONO} fontSize="11" fontWeight="700" fill={J.night}>MIX 86 · SIDE A</text>
      <rect x="58" y="74" width="84" height="32" fill={J.night} stroke={J.warm} strokeWidth="2" />
      <circle cx="80" cy="90" r="11" fill={J.warm} />
      <circle cx="120" cy="90" r="11" fill={J.warm} />
      <circle cx="80" cy="90" r="4" fill={J.night} />
      <circle cx="120" cy="90" r="4" fill={J.night} />
      <polygon points="40,128 52,112 148,112 160,128" fill={J.grape} stroke={J.warm} strokeWidth="2" />
    </svg>
  );
}

export function Walkman() {
  return (
    <svg viewBox="0 0 130 190" className="w-full max-w-[150px]" role="img" aria-label="Portable cassette player">
      <path d="M100 6 C120 -2 126 20 112 34" fill="none" stroke={J.warm} strokeWidth="3" />
      <rect x="10" y="10" width="110" height="172" fill={J.cyan} stroke={J.night} strokeWidth="3" />
      <rect x="22" y="22" width="86" height="56" fill={J.night} />
      <circle cx="50" cy="50" r="12" fill="none" stroke={J.warm} strokeWidth="3" />
      <circle cx="80" cy="50" r="12" fill="none" stroke={J.warm} strokeWidth="3" />
      <text x="65" y="92" textAnchor="middle" fontFamily={MONO} fontSize="9" fontWeight="700" fill={J.night}>STEREO CASSETTE</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={22 + i * 22} y="104" width="18" height="18" fill={[J.magenta, J.volt, J.warm, J.night][i]} stroke={J.night} strokeWidth="2" />
      ))}
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => <circle key={`${r}${c}`} cx={32 + c * 13} cy={140 + r * 10} r="2.5" fill={J.night} />))}
    </svg>
  );
}

export function JukeboxArt() {
  return (
    <svg viewBox="0 0 140 190" className="w-full max-w-[170px]" role="img" aria-label="Jukebox with a glowing arch">
      <path d="M8 186 V70 A62 62 0 0 1 132 70 V186 Z" fill={J.plum} stroke={J.magenta} strokeWidth="3" />
      <path d="M22 180 V70 A48 48 0 0 1 118 70 V180 Z" fill={J.night} />
      <path d="M22 70 A48 48 0 0 1 118 70" fill="none" stroke={J.volt} strokeWidth="5" />
      <path d="M32 70 A38 38 0 0 1 108 70" fill="none" stroke={J.magenta} strokeWidth="5" />
      <path d="M42 70 A28 28 0 0 1 98 70" fill="none" stroke={J.cyan} strokeWidth="5" />
      <circle cx="70" cy="104" r="22" fill={J.grape} stroke={J.warm} strokeWidth="2" />
      <circle cx="70" cy="104" r="8" fill={J.magenta} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={34 + i * 14} y="140" width="8" height="28" fill={[J.volt, J.magenta, J.cyan, J.magenta, J.volt][i]} />
      ))}
      <rect x="4" y="180" width="132" height="8" fill={J.edge} />
    </svg>
  );
}

export function Boombox() {
  return (
    <svg viewBox="0 0 220 120" className="w-full" role="img" aria-label="Boombox">
      <path d="M52 24 V8 H168 V24" fill="none" stroke={J.warm} strokeWidth="5" />
      <rect x="4" y="24" width="212" height="92" fill={J.plum} stroke={J.volt} strokeWidth="3" />
      {[50, 170].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="72" r="30" fill={J.night} stroke={J.cyan} strokeWidth="3" />
          <circle cx={cx} cy="72" r="18" fill="none" stroke={J.edge} strokeWidth="3" />
          <circle cx={cx} cy="72" r="8" fill={J.magenta} />
        </g>
      ))}
      <rect x="86" y="38" width="48" height="32" fill={J.night} stroke={J.warm} strokeWidth="2" />
      <circle cx="102" cy="54" r="7" fill="none" stroke={J.warm} strokeWidth="2" />
      <circle cx="118" cy="54" r="7" fill="none" stroke={J.warm} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={88 + i * 12} y="84" width="9" height="9" fill={[J.magenta, J.volt, J.cyan, J.warm][i]} />
      ))}
    </svg>
  );
}

export function Equalizer() {
  const levels = [4, 7, 5, 9, 6, 10, 8, 5, 7, 3, 6, 4];
  return (
    <svg viewBox="0 0 200 120" className="w-full" role="img" aria-label="Equalizer bars">
      {levels.map((lv, i) =>
        Array.from({ length: 10 }, (_, k) => {
          const lit = k < lv;
          const color = k < 5 ? J.cyan : k < 8 ? J.volt : J.magenta;
          return <rect key={`${i}-${k}`} x={4 + i * 16} y={112 - k * 11} width="12" height="8" fill={lit ? color : J.plum} />;
        }),
      )}
    </svg>
  );
}

export function NeonRecord() {
  return (
    <svg viewBox="0 0 120 120" className="w-full max-w-[190px]" role="img" aria-label="Vinyl record with a yellow label">
      <circle cx="60" cy="60" r="58" fill={J.night} stroke={J.magenta} strokeWidth="2" />
      {[50, 42, 34, 28].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke={J.edge} strokeWidth="1.5" />
      ))}
      <circle cx="60" cy="60" r="22" fill={J.volt} />
      <polyline points="42,66 50,54 58,66 66,54 74,66 78,60" fill="none" stroke={J.magenta} strokeWidth="3" />
      <circle cx="60" cy="60" r="3" fill={J.night} />
    </svg>
  );
}

export function SleeveSun() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: striped sun over a horizon, SUNSET DRIVE">
      <defs>
        <mask id="jb-sun-mask">
          <rect width="160" height="160" fill="#fff" />
          <rect x="0" y="82" width="160" height="3" fill="#000" />
          <rect x="0" y="92" width="160" height="5" fill="#000" />
          <rect x="0" y="104" width="160" height="7" fill="#000" />
        </mask>
      </defs>
      <rect width="160" height="160" fill={J.grape} />
      <circle cx="80" cy="82" r="46" fill={J.volt} mask="url(#jb-sun-mask)" />
      <rect x="0" y="116" width="160" height="3" fill={J.cyan} />
      <polygon points="12,12 32,12 12,32" fill={J.cyan} />
      <polyline points="112,22 120,14 128,22 136,14 144,22" fill="none" stroke={J.magenta} strokeWidth="3" />
      <text x="80" y="147" textAnchor="middle" fontFamily={NEON} fontStyle="italic" fontWeight="900" fontSize="17" fill={J.magenta}>SUNSET DRIVE</text>
    </svg>
  );
}

export function SleeveBolt() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: yellow lightning bolt on magenta, STATIC SKY">
      <rect width="160" height="160" fill={J.magenta} />
      <polygon points="96,10 40,90 74,90 58,150 120,66 86,66" fill={J.volt} stroke={J.night} strokeWidth="4" strokeLinejoin="miter" />
      <polyline points="8,128 28,108 48,128 68,108" fill="none" stroke={J.cyan} strokeWidth="5" />
      <circle cx="132" cy="30" r="3" fill={J.night} />
      <circle cx="144" cy="30" r="3" fill={J.night} />
      <circle cx="138" cy="42" r="3" fill={J.night} />
      <text x="152" y="152" textAnchor="end" fontFamily={NEON} fontStyle="italic" fontWeight="900" fontSize="12" fill={J.night}>STATIC SKY</text>
    </svg>
  );
}

export function SleevePalm() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" role="img" aria-label="Original sleeve: palm silhouette against a magenta sun, PALM NIGHTS">
      <rect width="160" height="160" fill={J.volt} />
      <circle cx="104" cy="66" r="40" fill={J.magenta} />
      <path d="M52 150 C54 110 60 80 68 52" fill="none" stroke={J.night} strokeWidth="6" strokeLinecap="round" />
      {[
        "M68 52 C50 40 34 44 22 58",
        "M68 52 C52 32 36 28 24 30",
        "M68 52 C70 30 82 20 96 18",
        "M68 52 C84 40 100 44 112 58",
        "M68 52 C84 62 94 74 96 90",
        "M68 52 C56 62 48 76 48 90",
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke={J.night} strokeWidth="6" strokeLinecap="round" />
      ))}
      <rect x="0" y="136" width="160" height="24" fill={J.night} />
      <text x="80" y="153" textAnchor="middle" fontFamily={NEON} fontStyle="italic" fontWeight="900" fontSize="15" fill={J.volt}>PALM NIGHTS</text>
    </svg>
  );
}

export function Scanlines() {
  return (
    <svg className="h-full min-h-40 w-full" role="img" aria-label="Scanlines over color shapes">
      <defs>
        <pattern id="jb-scan" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill={J.night} fillOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={J.plum} />
      <circle cx="30%" cy="50%" r="44" fill={J.magenta} />
      <rect x="52%" y="22%" width="90" height="70" fill={J.cyan} />
      <rect width="100%" height="100%" fill="url(#jb-scan)" />
    </svg>
  );
}

export function VhsGrain() {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" className="h-full min-h-40 w-full" role="img" aria-label="VHS tape grain with a tracking glitch">
      <defs>
        <filter id="jb-vhs" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.9" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0 0.87  0 0 0 1.6 -0.62" />
        </filter>
      </defs>
      <rect width="240" height="150" fill={J.edge} />
      <rect width="240" height="150" filter="url(#jb-vhs)" />
      <rect x="0" y="96" width="240" height="7" fill={J.cyan} />
      <rect x="14" y="99" width="226" height="6" fill={J.magenta} />
      <text x="14" y="28" fontFamily={MONO} fontSize="14" fontWeight="700" fill={J.warm}>▶ PLAY</text>
      <text x="226" y="28" textAnchor="end" fontFamily={MONO} fontSize="14" fontWeight="700" fill={J.warm}>SP 0:42</text>
    </svg>
  );
}

export function SunsetStripes() {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" className="h-full min-h-40 w-full" role="img" aria-label="Striped sunset">
      <defs>
        <mask id="jb-sunset-mask">
          <rect width="240" height="150" fill="#fff" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="0" y={80 + i * 12} width="240" height={2 + i * 1.5} fill="#000" />
          ))}
        </mask>
      </defs>
      {["#1a0f2e", "#2f1b52", "#52206b", "#7a2380", "#a82a86"].map((c, i) => (
        <rect key={c} x="0" y={i * 30} width="240" height="30" fill={c} />
      ))}
      <circle cx="120" cy="92" r="52" fill={J.volt} mask="url(#jb-sunset-mask)" />
      <rect x="0" y="140" width="240" height="10" fill={J.night} />
    </svg>
  );
}

export function GridHorizon() {
  const verticals = [];
  for (let i = -9; i <= 9; i++) {
    verticals.push(<line key={i} x1={120 + i * 6} y1="64" x2={120 + i * 46} y2="150" stroke={J.magenta} strokeWidth="1.5" />);
  }
  const horizontals = [0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1="0" y1={64 + k * k * 2.6 + k * 2} x2="240" y2={64 + k * k * 2.6 + k * 2} stroke={J.magenta} strokeWidth="1.5" />);
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" className="h-full min-h-40 w-full" role="img" aria-label="Perspective grid receding to a horizon">
      <rect width="240" height="150" fill={J.night} />
      <rect x="0" y="63" width="240" height="2" fill={J.cyan} />
      {verticals}
      {horizontals}
    </svg>
  );
}

export function Memphis() {
  return (
    <svg viewBox="0 0 400 24" className="h-6 w-full max-w-[400px]" aria-hidden>
      <polyline points="0,18 12,6 24,18 36,6 48,18 60,6 72,18 84,6 96,18" fill="none" stroke={J.cyan} strokeWidth="3" />
      <polygon points="130,22 142,2 154,22" fill={J.volt} />
      {[190, 206, 222, 238].map((x) => (
        <circle key={x} cx={x} cy="12" r="4" fill={J.magenta} />
      ))}
      <polyline points="280,18 292,6 304,18 316,6 328,18 340,6 352,18 364,6 376,18" fill="none" stroke={J.magenta} strokeWidth="3" />
    </svg>
  );
}
