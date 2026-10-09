import { contrast, formatRatio, grade, palette } from "../tokens";
import Section from "../section";

type Pair = { label: string; fg: string; bg: string; line?: boolean };

const ROLES: { name: string; hex: string; use: string; pairs: Pair[]; note?: string }[] = [
  {
    name: "Background",
    hex: palette.bg,
    use: "The page behind everything.",
    pairs: [{ label: "Text on it", fg: palette.text, bg: palette.bg }],
  },
  {
    name: "Surface",
    hex: palette.surface,
    use: "Cards, inputs, panels.",
    pairs: [
      { label: "Text on it", fg: palette.text, bg: palette.surface },
      { label: "Muted on it", fg: palette.muted, bg: palette.surface },
    ],
  },
  {
    name: "Text",
    hex: palette.text,
    use: "Titles, body, and selected controls.",
    pairs: [{ label: "On Background", fg: palette.text, bg: palette.bg }],
  },
  {
    name: "Muted",
    hex: palette.muted,
    use: "Labels, hints, and control edges.",
    pairs: [
      { label: "On Background", fg: palette.muted, bg: palette.bg },
      { label: "On Surface", fg: palette.muted, bg: palette.surface },
    ],
  },
  {
    name: "Border",
    hex: palette.border,
    use: "Dividers and card edges, never text. Controls use Muted edges.",
    pairs: [{ label: "On Background", fg: palette.border, bg: palette.bg, line: true }],
  },
  {
    name: "Accent (moss)",
    hex: palette.accent,
    use: "The primary action only.",
    pairs: [
      { label: "Surface text on it", fg: palette.surface, bg: palette.accent },
      { label: "On Background", fg: palette.accent, bg: palette.bg },
    ],
  },
];

export default function ColorRoles() {
  return (
    <Section n={1} title="Color roles">
      <ul className="grid gap-calm-16 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <li key={role.name} className="overflow-hidden rounded-calm-12 border border-calm-border bg-calm-surface">
            <div className="m-calm-16 mb-0 h-20 rounded-calm-6 border border-calm-border" style={{ background: role.hex }} aria-hidden />
            <div className="p-calm-16 pt-calm-12">
              <p className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{role.name}</p>
              <p className="mt-calm-4 font-calm-serif text-calm-heading">{role.hex}</p>
              <p className="mt-calm-8 text-calm-muted">{role.use}</p>
              <ul className="mt-calm-16 space-y-calm-4 border-t border-calm-border pt-calm-12">
                {role.pairs.map((p) => {
                  const ratio = contrast(p.fg, p.bg);
                  const level = p.line ? "Line only" : grade(ratio);
                  const ok = level === "AAA" || level === "AA";
                  return (
                    <li key={p.label} className="flex flex-wrap items-baseline justify-between gap-x-calm-12">
                      <span>{p.label}</span>
                      <span className="whitespace-nowrap">
                        <span className="font-calm-serif">{formatRatio(ratio)}</span>{" "}
                        <span className="text-calm-muted">
                          <span aria-hidden>{ok ? "✓" : p.line ? "–" : "!"}</span> {level}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
