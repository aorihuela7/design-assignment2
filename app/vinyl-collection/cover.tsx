import { editorial } from "../design-systems/editorial/theme";
import type { VinylRecord } from "./records";

// Original Editorial covers drawn from each record's own data. Purely graphic: the title and artist live
// next to the cover as real text. The red-orange accent is never used here; it belongs to the primary action.

const p = editorial.palette;

/** Cover inks: Editorial palette colors only. Deep blue is the Editorial mood board's second ink (--color-navy). */
const INK = {
  ink: { hex: p.text, name: "ink" },
  paper: { hex: p.bg, name: "paper" },
  sand: { hex: p.border, name: "sand" },
  blue: { hex: "#1E3A6B", name: "deep blue" },
  olive: { hex: p.muted, name: "olive" },
} as const;
type Ink = keyof typeof INK;

/** Field, main shape, second shape. */
const COLORWAYS: [Ink, Ink, Ink][] = [
  ["paper", "ink", "sand"],
  ["ink", "paper", "blue"],
  ["sand", "ink", "paper"],
  ["blue", "paper", "ink"],
  ["paper", "blue", "ink"],
  ["olive", "paper", "sand"],
  ["ink", "sand", "paper"],
];

const COMPOSITIONS = 8;

/**
 * Both choices come from the order the record was added (its `added` number), so they hold for logged records too:
 * - Composition steps by 3 out of 8, so records next to each other in the default grid (side by side, above and
 *   below, diagonal, at 2, 3, or 4 columns) never share one.
 * - Colorway steps by 5 out of 7. Records that share a composition are 8 apart, so they always get different
 *   colorways: no two of the first 56 records look the same.
 */
export function coverFor(record: Pick<VinylRecord, "added">) {
  return { composition: (record.added * 3) % COMPOSITIONS, colorway: (record.added * 5) % COLORWAYS.length };
}

/** "a sand circle", "an ink circle", "an olive block". */
const a = (word: string) => `${/^[aeiou]/.test(word) ? "an" : "a"} ${word}`;

export function Cover({ record }: { record: Pick<VinylRecord, "added" | "title" | "artist" | "year"> }) {
  const { composition, colorway } = coverFor(record);
  const [fk, mk, sk] = COLORWAYS[colorway];
  const [f, m, s] = [INK[fk].hex, INK[mk].hex, INK[sk].hex];
  const [fn, mn, sn] = [INK[fk].name, INK[mk].name, INK[sk].name];
  const d = record.year % 10; // A little geometry from the year, so covers sharing a composition still differ.

  let shapes;
  let described;
  switch (composition) {
    case 0: {
      const w = 56 + (d % 4) * 8;
      shapes = (
        <>
          <rect width={w} height="200" fill={m} />
          <circle cx={w} cy={88 + (d % 3) * 12} r="46" fill={s} />
        </>
      );
      described = `${a(mn)} block split by ${a(sn)} circle on ${fn}`;
      break;
    }
    case 1:
      shapes = <circle cx={88 + (d % 5) * 6} cy="100" r="70" fill={m} />;
      described = `a large ${mn} circle on ${fn}`;
      break;
    case 2:
      shapes = (
        <>
          <rect x="25" y="25" width="150" height="150" fill={m} />
          <rect x="52" y="52" width="96" height="96" fill={s} />
          <rect x={78 + (d % 3) * 4} y="78" width="44" height="44" fill={f} />
        </>
      );
      described = `concentric ${mn} and ${sn} squares on ${fn}`;
      break;
    case 3:
      shapes = (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="0" y={20 + i * 34} width="200" height={6 + ((d + i * 3) % 5) * 4} fill={i === 2 ? s : m} />
          ))}
        </>
      );
      described = `horizontal ${mn} bars with one ${sn} bar on ${fn}`;
      break;
    case 4: {
      const corner = d % 4;
      const cx = corner === 1 || corner === 2 ? 200 : 0;
      const cy = corner >= 2 ? 200 : 0;
      shapes = (
        <>
          <circle cx={cx} cy={cy} r="150" fill={m} />
          <rect x={cx === 0 ? 142 : 22} y={cy === 0 ? 142 : 22} width="36" height="36" fill={s} />
        </>
      );
      described = `${a(mn)} quarter circle and a small ${sn} square on ${fn}`;
      break;
    }
    case 5:
      shapes = (
        <>
          <rect x="20" y="132" width="160" height="48" fill={m} />
          <rect x="20" y={84} width={112 + (d % 3) * 8} height="48" fill={s} />
          <rect x="20" y="36" width={64 + (d % 4) * 8} height="48" fill={m} />
        </>
      );
      described = `stacked ${mn} and ${sn} blocks on ${fn}`;
      break;
    case 6:
      shapes = (
        <>
          <rect x="0" y="124" width="200" height="18" fill={s} />
          <path d={`M${40 + d * 2} 124 A60 60 0 0 1 ${160 + d * 2} 124 Z`} fill={m} />
        </>
      );
      described = `${a(mn)} half disc on ${a(sn)} band over ${fn}`;
      break;
    default:
      shapes = (
        <>
          <polygon points="0,200 200,0 200,200" fill={m} />
          <circle cx={58 + (d % 3) * 6} cy="58" r="26" fill={s} />
        </>
      );
      described = `${a(mn)} diagonal half and ${a(sn)} circle on ${fn}`;
  }

  return (
    <svg viewBox="0 0 200 200" className="block h-auto w-full" role="img" aria-label={`Cover of ${record.title}: ${described}`}>
      <rect width="200" height="200" fill={f} />
      {shapes}
      <rect x="0.5" y="0.5" width="199" height="199" fill="none" stroke={p.border} />
    </svg>
  );
}
