import type { DsTheme, RoleKey } from "../theme";
import Section from "../section";

const WEIGHT: Record<number, string> = { 400: "Regular", 500: "Medium", 700: "Bold", 900: "Black" };

const ROLES: { key: RoleKey; name: string; cls: string; sample: string; head: boolean }[] = [
  { key: "display", name: "Display", cls: "ds-head ds-glow text-ds-display font-normal", sample: "41 records", head: true },
  { key: "heading", name: "Heading", cls: "ds-head text-ds-heading font-normal", sample: "This Week", head: true },
  { key: "body", name: "Body", cls: "font-ds-body text-ds-body font-normal", sample: "Played three albums this week.", head: false },
  { key: "label", name: "Label", cls: "text-ds-label ds-label text-ds-muted", sample: "Last spun", head: false },
];

export default function TypeRoles({ theme }: { theme: DsTheme }) {
  return (
    <Section n={2} title="Type roles">
      <p className="max-w-xl text-ds-muted">{theme.typeIntro}</p>
      <ul className="mt-ds-24 divide-y divide-ds-border rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface">
        {ROLES.map((r) => {
          const t = theme.type[r.key];
          const weight = r.key === "label" ? theme.label.weight : r.head ? theme.fonts.headWeight : t.weight;
          return (
            <li key={r.key} className="grid gap-ds-8 p-ds-16 md:grid-cols-[200px_1fr] md:gap-ds-24 md:p-ds-24">
              <div>
                <p className="text-ds-label ds-label text-ds-muted">{r.name}</p>
                <p className="mt-ds-4 text-ds-muted">
                  {r.head ? theme.fonts.headFamily : r.key === "label" ? (theme.fonts.labelFamily ?? theme.fonts.bodyFamily) : theme.fonts.bodyFamily}
                  <br />
                  {t.size}/{t.line} · {WEIGHT[weight]}
                </p>
              </div>
              <div>
                <p className={r.cls}>{r.sample}</p>
                <p className="mt-ds-8 text-ds-muted">{theme.typeUse[r.key]}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
