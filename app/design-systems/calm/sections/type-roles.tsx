import { type } from "../tokens";
import Section from "../section";

const WEIGHT: Record<number, string> = { 400: "Regular", 500: "Medium" };

const ROLES = [
  { key: "display", name: "Display", use: "Big numbers and page titles", cls: "font-calm-serif text-calm-display font-normal", sample: "41 records" },
  { key: "heading", name: "Heading", use: "Section and record titles", cls: "font-calm-serif text-calm-heading font-normal", sample: "This Week" },
  { key: "body", name: "Body", use: "Reading text and controls", cls: "font-calm-sans text-calm-body font-normal", sample: "Played three albums this week." },
  { key: "label", name: "Label", use: "Small captions, set in capitals", cls: "font-calm-sans text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted", sample: "Last spun" },
] as const;

export default function TypeRoles() {
  return (
    <Section n={2} title="Type roles">
      <p className="max-w-xl text-calm-muted">A soft serif for names and numbers, a plain sans for everything else.</p>
      <ul className="mt-calm-24 divide-y divide-calm-border rounded-calm-12 border border-calm-border bg-calm-surface">
        {ROLES.map((r) => {
          const t = type[r.key];
          return (
            <li key={r.key} className="grid gap-calm-8 p-calm-16 md:grid-cols-[200px_1fr] md:gap-calm-24 md:p-calm-24">
              <div>
                <p className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{r.name}</p>
                <p className="mt-calm-4 text-calm-muted">
                  {t.font}
                  <br />
                  {t.size}/{t.line} · {WEIGHT[t.weight]}
                </p>
              </div>
              <div>
                <p className={r.cls}>{r.sample}</p>
                <p className="mt-calm-8 text-calm-muted">{r.use}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
