import { contrast, formatRatio, grade, type DsTheme } from "../theme";
import Section from "../section";

type Pair = { label: string; fg: string; bg: string; line?: boolean };

export default function ColorRoles({ theme }: { theme: DsTheme }) {
  const p = theme.palette;
  const n = theme.roleNotes;
  const roles: { name: string; hex: string; use: string; pairs: Pair[] }[] = [
    { name: "Background", hex: p.bg, use: n.bg, pairs: [{ label: "Text on it", fg: p.text, bg: p.bg }] },
    {
      name: "Surface",
      hex: p.surface,
      use: n.surface,
      pairs: [
        { label: "Text on it", fg: p.text, bg: p.surface },
        { label: "Muted on it", fg: p.muted, bg: p.surface },
      ],
    },
    { name: "Text", hex: p.text, use: n.text, pairs: [{ label: "On Background", fg: p.text, bg: p.bg }] },
    {
      name: "Muted",
      hex: p.muted,
      use: n.muted,
      pairs: [
        { label: "On Background", fg: p.muted, bg: p.bg },
        { label: "On Surface", fg: p.muted, bg: p.surface },
      ],
    },
    { name: "Border", hex: p.border, use: n.border, pairs: [{ label: "On Background", fg: p.border, bg: p.bg, line: true }] },
    {
      name: `Accent (${theme.accentName})`,
      hex: p.accent,
      use: n.accent,
      pairs: [
        { label: "Text on it", fg: p.onAccent, bg: p.accent },
        { label: "On Background", fg: p.accent, bg: p.bg },
      ],
    },
  ];

  return (
    <Section n={1} title="Color roles">
      <ul className="grid gap-ds-16 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <li key={role.name} className="overflow-hidden rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface">
            <div className="m-ds-16 mb-0 h-20 rounded-ds-6 border border-ds-border" style={{ background: role.hex }} aria-hidden />
            <div className="p-ds-16 pt-ds-12">
              <p className="text-ds-label ds-label text-ds-muted">{role.name}</p>
              <p className="mt-ds-4 ds-head text-ds-heading">{role.hex}</p>
              <p className="mt-ds-8 text-ds-muted">{role.use}</p>
              <ul className="mt-ds-16 space-y-ds-4 border-t border-ds-border pt-ds-12">
                {role.pairs.map((pair) => {
                  const ratio = contrast(pair.fg, pair.bg);
                  const level = pair.line ? "Line only" : grade(ratio);
                  const ok = level === "AAA" || level === "AA";
                  return (
                    <li key={pair.label} className="flex flex-wrap items-baseline justify-between gap-x-ds-12">
                      <span>{pair.label}</span>
                      <span className="whitespace-nowrap">
                        <span className="ds-head">{formatRatio(ratio)}</span>{" "}
                        <span className="text-ds-muted">
                          <span aria-hidden>{ok ? "✓" : pair.line ? "–" : "!"}</span> {level}
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
      {theme.accentNote && <p className="mt-ds-16 max-w-xl text-ds-muted">{theme.accentNote}</p>}
      {theme.decorative && (
        <div className="mt-ds-24">
          <h3 className="text-ds-label ds-label text-ds-muted">Decorative · never text, never the primary action</h3>
          <ul className="mt-ds-12 grid gap-ds-16 sm:grid-cols-2 lg:grid-cols-3">
            {theme.decorative.map((d) => (
              <li key={d.name} className="flex items-center gap-ds-16 rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-ds-16">
                <div className="h-12 w-16 shrink-0 rounded-ds-6 border border-ds-border" style={{ background: d.hex }} aria-hidden />
                <div>
                  <p className="text-ds-label ds-label text-ds-muted">{d.name}</p>
                  <p className="ds-head">{d.hex}</p>
                  <p className="text-ds-muted">Illustration only</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
