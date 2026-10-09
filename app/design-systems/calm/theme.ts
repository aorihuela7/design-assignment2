import { assertContrast, type DsTheme } from "../_shared/theme";

// Calm tokens: the palette and type pair of the Calm mood board (/mood-boards/calm).
export const calm: DsTheme = {
  id: "calm",
  name: "Calm",
  order: "1 of 3",
  mood: "/mood-boards/calm",
  blurb: "matte, warm, and quiet.",
  palette: {
    bg: "#F3EDE2",
    surface: "#FBF8F2",
    text: "#2B2722",
    muted: "#6B6358",
    border: "#D8CFBF",
    accent: "#44603F",
    onAccent: "#FBF8F2",
    ctl: "#6B6358",
    rule: "#D8CFBF",
  },
  accentName: "moss",
  roleNotes: {
    bg: "The page behind everything.",
    surface: "Cards, inputs, panels.",
    text: "Titles, body, and selected controls.",
    muted: "Labels, hints, and control edges.",
    border: "Dividers and card edges, never text. Controls use Muted edges.",
    accent: "The primary action only.",
  },
  fonts: {
    head: '"Iowan Old Style", Georgia, serif',
    body: '"Helvetica Neue", system-ui, sans-serif',
    headFamily: "Iowan Old Style",
    bodyFamily: "Helvetica Neue",
    headTransform: "none",
    headWeight: 400,
  },
  type: {
    display: { size: 48, line: 52, weight: 400 },
    heading: { size: 28, line: 34, weight: 400 },
    body: { size: 16, line: 26, weight: 400 },
    label: { size: 12, line: 16, weight: 500 },
  },
  typeUse: {
    display: "Big numbers and page titles",
    heading: "Section and record titles",
    body: "Reading text and controls",
    label: "Small captions, set in capitals",
  },
  typeIntro: "A soft serif for names and numbers, a plain sans for everything else.",
  label: { weight: 500, tracking: "0.18em" },
  spacing: [4, 8, 12, 16, 24, 32],
  spacingNote: "Bars are drawn at four times size. More space between groups than inside them.",
  radii: [
    { px: 0, use: "Dividers" },
    { px: 6, use: "Inputs, checkbox" },
    { px: 12, use: "Buttons, chips, cards" },
  ],
  radiusScale: [0, 6, 12],
  rule: { width: "1px" },
  ctl: { width: "1px" },
  borders: [
    { w: "1px", title: "Border", desc: "Cards and dividers.", cls: "border border-ds-border" },
    { w: "1px", title: "Muted", desc: "Control edges.", cls: "border border-ds-ctl" },
  ],
  shadowNote: "No shadow. A thin line does the work.",
  motion: { duration: "200ms", easing: "ease-out", note: "No bounce, no overshoot. Press the button to play it." },
  hub: { size: "var(--ds-body-size)", weight: "400", tracking: "normal", transform: "none" },
};

assertContrast(calm);
