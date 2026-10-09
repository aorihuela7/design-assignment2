// Shared design system helpers. A theme (see calm/theme.ts, editorial/theme.ts) holds the values;
// themeVars() turns it into the CSS variables set on that route's [data-theme] wrapper only.

export type Palette = {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  /** Text color on the accent (primary button). */
  onAccent: string;
  /** Edge color of controls (input, checkbox, chip...). */
  ctl: string;
  /** Color of rules around panels and sections. */
  rule: string;
};

export type RoleKey = "display" | "heading" | "body" | "label";

export type DsTheme = {
  id: string;
  name: string;
  order: string;
  mood: string;
  blurb: string;
  palette: Palette;
  accentName: string;
  /** Extra note on the Accent card, e.g. when it was darkened for contrast. */
  accentNote?: string;
  roleNotes: { bg: string; surface: string; text: string; muted: string; border: string; accent: string };
  fonts: {
    head: string;
    body: string;
    headFamily: string;
    bodyFamily: string;
    headTransform: "none" | "uppercase";
    headWeight: number;
  };
  type: Record<RoleKey, { size: number; line: number; weight: number }>;
  typeUse: Record<RoleKey, string>;
  typeIntro: string;
  label: { weight: number; tracking: string };
  spacing: readonly number[];
  spacingNote: string;
  radii: { px: number; use: string }[];
  /** Radius for the three utility steps rounded-ds-0 / -6 / -12. */
  radiusScale: [number, number, number];
  rule: { width: string };
  ctl: { width: string };
  borders: { w: string; title: string; desc: string; cls: string }[];
  shadowNote: string;
  motion: { duration: string; easing: string; note: string };
  hub: { size: string; weight: string; tracking: string; transform: string };
};

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

/** Rounded to one decimal. The pass/fail grade always uses the unrounded ratio. */
export function formatRatio(ratio: number) {
  return `${ratio.toFixed(1)}:1`;
}

export function grade(ratio: number): "AAA" | "AA" | "Large text and UI only" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "Large text and UI only";
  return "Fail";
}

export function mix(a: string, b: string, t: number) {
  const x = parseInt(a.slice(1), 16);
  const y = parseInt(b.slice(1), 16);
  const part = (shift: number) => Math.round(((x >> shift) & 255) * (1 - t) + ((y >> shift) & 255) * t);
  return `#${[16, 8, 0].map((s) => part(s).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

/** The primary button darkens toward Text on hover and press. */
export function accentStates(p: Palette) {
  return { hover: mix(p.accent, p.text, 0.25), pressed: mix(p.accent, p.text, 0.5) };
}

/** The build fails if a text role stops meeting 4.5:1. */
export function assertContrast(theme: DsTheme) {
  const p = theme.palette;
  for (const [name, fg, bg] of [
    ["Text on Background", p.text, p.bg],
    ["Text on Surface", p.text, p.surface],
    ["Muted on Background", p.muted, p.bg],
    ["Muted on Surface", p.muted, p.surface],
    ["Text on Accent", p.onAccent, p.accent],
  ] as const) {
    if (contrast(fg, bg) < 4.5) throw new Error(`${theme.name}: ${name} is below 4.5:1`);
  }
}

/** CSS variables for the theme wrapper, so nothing applies outside it. */
export function themeVars(t: DsTheme): Record<string, string> {
  const p = t.palette;
  const a = accentStates(p);
  const vars: Record<string, string> = {
    "--ds-bg": p.bg,
    "--ds-surface": p.surface,
    "--ds-text": p.text,
    "--ds-muted": p.muted,
    "--ds-border": p.border,
    "--ds-accent": p.accent,
    "--ds-accent-hover": a.hover,
    "--ds-accent-pressed": a.pressed,
    "--ds-on-accent": p.onAccent,
    "--ds-ctl": p.ctl,
    "--ds-rule": p.rule,
    "--ds-rule-w": t.rule.width,
    "--ds-ctl-w": t.ctl.width,
    "--ds-font-head": t.fonts.head,
    "--ds-font-body": t.fonts.body,
    "--ds-head-transform": t.fonts.headTransform,
    "--ds-head-weight": String(t.fonts.headWeight),
    "--ds-label-weight": String(t.label.weight),
    "--ds-label-tracking": t.label.tracking,
    "--ds-radius-0": `${t.radiusScale[0]}px`,
    "--ds-radius-6": `${t.radiusScale[1]}px`,
    "--ds-radius-12": `${t.radiusScale[2]}px`,
    "--ds-duration": t.motion.duration,
    "--hub-font": "var(--ds-font-body)",
    "--hub-size": t.hub.size,
    "--hub-weight": t.hub.weight,
    "--hub-tracking": t.hub.tracking,
    "--hub-transform": t.hub.transform,
    "--hub-fg": "var(--ds-muted)",
    "--hub-fg-hover": "var(--ds-text)",
    "--hub-ring": "var(--ds-text)",
    "--hub-radius": "var(--ds-radius-6)",
  };
  for (const s of t.spacing) vars[`--ds-space-${s}`] = `${s}px`;
  for (const [role, v] of Object.entries(t.type)) {
    vars[`--ds-${role}-size`] = `${v.size}px`;
    vars[`--ds-${role}-line`] = `${v.line}px`;
  }
  return vars;
}
