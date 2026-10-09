import type { CSSProperties } from "react";
import HubLink from "./hub-link";

// The placeholders share the site's base look until each page gets its own theme.
const hubTheme = {
  "--hub-font": "var(--font-sans)",
  "--hub-size": "14px",
  "--hub-weight": "400",
  "--hub-tracking": "normal",
  "--hub-transform": "none",
  "--hub-fg": "var(--color-muted)",
  "--hub-fg-hover": "var(--color-ink)",
  "--hub-ring": "var(--color-ink)",
  "--hub-radius": "6px",
} as CSSProperties;

export default function Placeholder({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <main style={hubTheme} className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
      <HubLink />
      <p className="mt-6 text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">Coming soon.</p>
    </main>
  );
}
