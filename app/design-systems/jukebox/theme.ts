import { assertContrast, mix, type DsTheme } from "../_shared/theme";

// Jukebox tokens: the palette and type pair of the Jukebox mood board (/mood-boards/jukebox).
const night = "#0D0618";
const magenta = "#FF2E93";

export const jukebox: DsTheme = {
  id: "jukebox",
  name: "Jukebox",
  order: "3 of 3",
  mood: "/mood-boards/jukebox",
  blurb: "a neon sign in the dark, one glowing action.",
  palette: {
    bg: night,
    surface: "#1A0F2E",
    text: "#F6EBDD",
    muted: "#A898C0",
    border: "#4A3480",
    accent: magenta,
    onAccent: night,
    ctl: "#7E6AAD",
    rule: "#4A3480",
  },
  accentName: "neon magenta",
  decorative: [
    { name: "Cyan", hex: "#19E3F0" },
    { name: "Electric yellow", hex: "#FFE600" },
  ],
  roleNotes: {
    bg: "The room with the lights off.",
    surface: "Panels, cards, inputs.",
    text: "All reading text, and selected controls. Warm white, never neon.",
    muted: "Labels and hints.",
    border: "Panels and dividers, never text.",
    accent: "The primary action only: its outline, its text, its glow.",
  },
  fonts: {
    head: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
    body: '"Helvetica Neue", Arial, sans-serif',
    label: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    headFamily: "Arial Black, italic",
    bodyFamily: "Helvetica Neue",
    labelFamily: "ui-monospace",
    headTransform: "uppercase",
    headWeight: 900,
    headStyle: "italic",
  },
  displayGlow: "0 0 6px rgb(255 46 147 / 0.9), 0 0 26px rgb(255 46 147 / 0.55)",
  primary: {
    bg: "transparent",
    fg: magenta,
    hoverBg: mix(magenta, night, 0.88),
    pressedBg: mix(magenta, night, 0.8),
    selectedBg: magenta,
    selectedFg: night,
    borderWidth: "2px",
    hoverGlow: "0 0 10px rgb(255 46 147 / 0.75), 0 0 24px rgb(255 46 147 / 0.4)",
    label: "Log +1",
    headType: true,
  },
  backdrop: "rgb(0 0 0 / 0.7)",
  type: {
    display: { size: 52, line: 56, weight: 900 },
    heading: { size: 26, line: 30, weight: 900 },
    body: { size: 16, line: 26, weight: 400 },
    label: { size: 12, line: 16, weight: 500 },
  },
  typeUse: {
    display: "Page titles and big numbers; the only text that glows",
    heading: "Section and record titles",
    body: "Reading text and controls, with no glow or outline",
    label: "Small captions, monospaced capitals",
  },
  typeIntro: "Bold italic capitals for headlines, a plain sans for reading, mono for labels.",
  label: { weight: 500, tracking: "0.18em" },
  spacing: [4, 8, 12, 16, 24, 32],
  spacingNote: "Bars are drawn at four times size. More space between groups than inside them.",
  radii: [
    { px: 0, use: "Inputs, checkbox, rows" },
    { px: 4, use: "Buttons, chips, cards" },
  ],
  radiusScale: [0, 0, 4],
  rule: { width: "1px" },
  ctl: { width: "2px" },
  borders: [
    { w: "2px", title: "Control", desc: "Edges of inputs, chips, toggles.", cls: "border-2 border-ds-ctl" },
    { w: "1px", title: "Border", desc: "Panels and dividers.", cls: "border border-ds-border" },
  ],
  shadowNote: "No drop shadows. The one glow is neon: on Display text and the primary button.",
  motion: { duration: "150ms", easing: "ease-out", note: "No bounce. Off when your system asks for reduced motion." },
  hub: { size: "11px", weight: "500", tracking: "0.18em", transform: "uppercase" },
};

assertContrast(jukebox);
