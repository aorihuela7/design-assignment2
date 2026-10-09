import { assertContrast, contrast, formatRatio, mix, type DsTheme } from "../_shared/theme";

// Editorial tokens: the palette and type pair of the Editorial mood board (/mood-boards/editorial).
const paper = "#F2EAD3";
const ink = "#111111";
const moodAccent = "#E4472B";

// Paper text on the mood board's red-orange fails 4.5:1, so darken it toward ink until it passes with a little margin.
function darkenAccent() {
  for (let t = 0; t <= 1; t += 0.01) {
    const c = mix(moodAccent, ink, t);
    if (contrast(paper, c) >= 4.6) return c;
  }
  return ink;
}
const accent = darkenAccent();

export const editorial: DsTheme = {
  id: "editorial",
  name: "Editorial",
  order: "2 of 3",
  mood: "/mood-boards/editorial",
  blurb: "ink, paper, and one loud action.",
  palette: {
    bg: paper,
    surface: "#FAF6E8",
    text: ink,
    muted: "#57513F",
    border: "#C9BE9F",
    accent,
    onAccent: paper,
    ctl: ink,
    rule: ink,
  },
  accentName: "red-orange",
  accentNote: `The mood board's red-orange ${moodAccent} gives paper text only ${formatRatio(contrast(paper, moodAccent))}, so it is darkened to ${accent} (${formatRatio(contrast(paper, accent))}).`,
  roleNotes: {
    bg: "The page: uncoated paper.",
    surface: "Cards, inputs, panels.",
    text: "Headlines, body, rules, and selected controls.",
    muted: "Labels and hints.",
    border: "Hairlines between rows, never text.",
    accent: "The primary action only.",
  },
  fonts: {
    head: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
    body: '"Helvetica Neue", Arial, sans-serif',
    headFamily: "Impact",
    bodyFamily: "Helvetica Neue",
    headTransform: "uppercase",
    headWeight: 400,
  },
  type: {
    display: { size: 72, line: 64, weight: 400 },
    heading: { size: 32, line: 34, weight: 400 },
    body: { size: 16, line: 26, weight: 400 },
    label: { size: 11, line: 14, weight: 700 },
  },
  typeUse: {
    display: "Page titles and big numbers, in capitals",
    heading: "Section and record titles, in capitals",
    body: "Reading text and controls",
    label: "Tiny captions, set in capitals",
  },
  typeIntro: "A heavy condensed sans for headlines, a plain sans for the rest. Huge next to tiny.",
  label: { weight: 700, tracking: "0.2em" },
  spacing: [4, 8, 12, 16, 24, 32],
  spacingNote: "Bars are drawn at four times size. More space between groups than inside them.",
  radii: [{ px: 0, use: "Everything: buttons, inputs, cards, modal" }],
  radiusScale: [0, 0, 0],
  rule: { width: "2px" },
  ctl: { width: "2px" },
  borders: [
    { w: "2px", title: "Text", desc: "Rules around panels, controls, and sections.", cls: "border-2 border-ds-text" },
    { w: "1px", title: "Border", desc: "Hairlines between rows.", cls: "border border-ds-border" },
  ],
  shadowNote: "No shadow, no gradient. A thick black rule does the work.",
  motion: { duration: "120ms", easing: "ease-out", note: "Quick, with no bounce or overshoot. Press the button to play it." },
  hub: { size: "11px", weight: "900", tracking: "0.2em", transform: "uppercase" },
};

assertContrast(editorial);
