// Calm design tokens: the single source for the palette, type, spacing and shape.
// The values are the Calm mood board's (/mood-boards/calm). Contrast ratios are computed here.

export const palette = {
  bg: "#F3EDE2",
  surface: "#FBF8F2",
  text: "#2B2722",
  muted: "#6B6358",
  border: "#D8CFBF",
  accent: "#44603F",
} as const;

function channel(v: number) {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** WCAG 2.x contrast ratio between two hex colors. */
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Truncated, never rounded up, so "4.5:1" is only shown when it truly passes. */
export function formatRatio(ratio: number) {
  return `${(Math.floor(ratio * 10) / 10).toFixed(1)}:1`;
}

export function grade(ratio: number): "AAA" | "AA" | "Large text and UI only" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "Large text and UI only";
  return "Fail";
}

function mix(a: string, b: string, t: number) {
  const x = parseInt(a.slice(1), 16);
  const y = parseInt(b.slice(1), 16);
  const part = (shift: number) => Math.round(((x >> shift) & 255) * (1 - t) + ((y >> shift) & 255) * t);
  return `#${[16, 8, 0].map((s) => part(s).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

// The primary button darkens toward Text on hover and press.
export const accentHover = mix(palette.accent, palette.text, 0.25);
export const accentPressed = mix(palette.accent, palette.text, 0.5);

// The build fails if a text role stops meeting 4.5:1.
for (const [name, fg, bg] of [
  ["Text on Background", palette.text, palette.bg],
  ["Text on Surface", palette.text, palette.surface],
  ["Muted on Background", palette.muted, palette.bg],
  ["Muted on Surface", palette.muted, palette.surface],
  ["Surface on Accent", palette.surface, palette.accent],
] as const) {
  if (contrast(fg, bg) < 4.5) throw new Error(`Calm: ${name} is below 4.5:1`);
}

export const spacing = [4, 8, 12, 16, 24, 32] as const;
export const radii = [0, 6, 12] as const;
export const motion = { duration: "200ms", easing: "ease-out" } as const;

export const type = {
  display: { size: 48, line: 52, weight: 400, font: "Iowan Old Style" },
  heading: { size: 28, line: 34, weight: 400, font: "Iowan Old Style" },
  body: { size: 16, line: 26, weight: 400, font: "Helvetica Neue" },
  label: { size: 12, line: 16, weight: 500, font: "Helvetica Neue" },
} as const;

const serif = '"Iowan Old Style", Georgia, serif';
const sans = '"Helvetica Neue", system-ui, sans-serif';

/** CSS variables for the [data-theme="calm"] wrapper. */
export const themeVars = {
  "--calm-bg": palette.bg,
  "--calm-surface": palette.surface,
  "--calm-text": palette.text,
  "--calm-muted": palette.muted,
  "--calm-border": palette.border,
  "--calm-accent": palette.accent,
  "--calm-accent-hover": accentHover,
  "--calm-accent-pressed": accentPressed,
  "--calm-font-serif": serif,
  "--calm-font-sans": sans,
  "--calm-radius-0": `${radii[0]}px`,
  "--calm-radius-6": `${radii[1]}px`,
  "--calm-radius-12": `${radii[2]}px`,
  ...Object.fromEntries(spacing.map((s) => [`--calm-space-${s}`, `${s}px`])),
  ...Object.fromEntries(
    Object.entries(type).flatMap(([role, t]) => [
      [`--calm-${role}-size`, `${t.size}px`],
      [`--calm-${role}-line`, `${t.line}px`],
    ]),
  ),
} as Record<string, string>;
