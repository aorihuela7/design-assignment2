import { editorial } from "../design-systems/editorial/theme";
import type { VinylRecord } from "./records";

// Original Editorial covers drawn from each record's own data: one of four compositions picked by a
// hash of its id, set with its title and artist. Ink and paper only; the accent stays on the primary action.

const p = editorial.palette;

/** FNV-1a: a small, well-mixed hash so the four compositions spread across the collection. */
function hash(s: string) {
  let h = 2166136261;
  for (const ch of `cover${s}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
}

/** Split a title into at most two lines and pick a size that fits the width. */
function lines(title: string, width: number, max: number) {
  const words = title.toUpperCase().split(" ");
  let rows = [words.join(" ")];
  if (words.length > 1) {
    let best = 1;
    let bestLen = Infinity;
    for (let i = 1; i < words.length; i++) {
      const len = Math.max(words.slice(0, i).join(" ").length, words.slice(i).join(" ").length);
      if (len < bestLen) [best, bestLen] = [i, len];
    }
    rows = [words.slice(0, best).join(" "), words.slice(best).join(" ")];
  }
  const longest = Math.max(...rows.map((r) => r.length));
  return { rows, size: Math.min(max, width / (longest * 0.5)) };
}

const HEAD = { fontFamily: "var(--ds-font-head)" };
const PLAIN = { fontFamily: "var(--ds-font-body)", fontWeight: 700, letterSpacing: 1.5 };

function Title({ title, x, y, width, max, fill, anchor = "start" }: { title: string; x: number; y: number; width: number; max: number; fill: string; anchor?: "start" | "end" }) {
  const { rows, size } = lines(title, width, max);
  return (
    <text x={x} y={y - (rows.length - 1) * size * 0.92} fill={fill} fontSize={size} textAnchor={anchor} style={HEAD}>
      {rows.map((r, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * 0.92}>
          {r}
        </tspan>
      ))}
    </text>
  );
}

export function Cover({ record, label }: { record: Pick<VinylRecord, "id" | "title" | "artist">; label?: boolean }) {
  const h = hash(record.id);
  const variant = h % 4;
  const artist = record.artist.toUpperCase();
  const a11y = label ? { role: "img", "aria-label": `Cover of ${record.title}` } : { "aria-hidden": true };

  return (
    <svg viewBox="0 0 200 200" className="block h-auto w-full" {...a11y}>
      {variant === 0 && (
        <>
          <rect width="200" height="200" fill={p.text} />
          <circle cx={56 + (h % 50)} cy="74" r="44" fill={p.bg} />
          <Title title={record.title} x={14} y={180} width={172} max={30} fill={p.bg} />
          <text x="186" y="18" textAnchor="end" fill={p.bg} fontSize="8" style={PLAIN}>{artist}</text>
        </>
      )}
      {variant === 1 && (
        <>
          <rect width="200" height="200" fill={p.bg} />
          <rect width="64" height="200" fill={p.text} />
          <path d="M64 32 A44 44 0 0 1 64 120 Z" fill={p.border} />
          <Title title={record.title} x={186} y={182} width={110} max={30} fill={p.text} anchor="end" />
          <text x="186" y="18" textAnchor="end" fill={p.text} fontSize="8" style={PLAIN}>{artist}</text>
        </>
      )}
      {variant === 2 && (
        <>
          <rect width="200" height="200" fill={p.border} />
          <rect x="24" y="28" width="104" height="104" fill={p.bg} />
          <rect x={44 + (h % 16)} y="48" width="56" height="56" fill={p.text} />
          <Title title={record.title} x={14} y={187} width={172} max={26} fill={p.text} />
          <text x="186" y="18" textAnchor="end" fill={p.text} fontSize="8" style={PLAIN}>{artist}</text>
        </>
      )}
      {variant === 3 && (
        <>
          <rect width="200" height="200" fill={p.bg} />
          <rect x="14" y="16" width="172" height="8" fill={p.text} />
          <Title title={record.title} x={14} y={124} width={172} max={46} fill={p.text} />
          <rect x="14" y="160" width="172" height="2" fill={p.text} />
          <text x="14" y="180" fill={p.text} fontSize="8" style={PLAIN}>{artist}</text>
        </>
      )}
      <rect x="0.5" y="0.5" width="199" height="199" fill="none" stroke={p.border} />
    </svg>
  );
}
