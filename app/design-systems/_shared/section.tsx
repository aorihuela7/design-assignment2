import type { ReactNode } from "react";

/** A numbered section of the design system page. */
export default function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="mt-ds-32 border-t-(length:--ds-rule-w) border-ds-rule pt-ds-24">
      <h2 id={`s${n}`} className="flex items-baseline gap-ds-12 text-ds-label ds-label text-ds-muted">
        <span className="ds-head text-ds-heading font-normal normal-case tracking-normal text-ds-text">{n}</span>
        {title}
      </h2>
      <div className="mt-ds-24">{children}</div>
    </section>
  );
}
