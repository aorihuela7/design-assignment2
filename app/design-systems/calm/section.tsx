import type { ReactNode } from "react";

/** A numbered section of the design system page. */
export default function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="mt-calm-32 border-t border-calm-border pt-calm-24 md:mt-calm-32">
      <h2 id={`s${n}`} className="flex items-baseline gap-calm-12 text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">
        <span className="font-calm-serif text-calm-heading font-normal normal-case tracking-normal text-calm-text">{n}</span>
        {title}
      </h2>
      <div className="mt-calm-24">{children}</div>
    </section>
  );
}
