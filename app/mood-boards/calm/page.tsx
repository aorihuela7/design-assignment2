import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import HubLink from "../../hub-link";
import { calm, calmDecorative } from "../../design-systems/calm/theme";
import { GrooveDetail, Label, Record, Sleeve, Stylus, Texture, Tonearm, Turntable } from "./art";

export const metadata: Metadata = { title: "Calm · Matte · Warm — Mood Board" };

const SPAN = {
  s: "col-span-1",
  m: "col-span-2",
  l: "col-span-2 xl:col-span-3",
} as const;

type Artifact = {
  name: string;
  size: keyof typeof SPAN;
  ref: string;
  bare?: boolean;
  node: ReactNode;
};

const p = calm.palette;

// The Calm palette as the mood board names it. Values come from the Calm theme tokens.
const PALETTE = [
  { name: "Oat", hex: p.bg, light: false },
  { name: "Sand", hex: p.border, light: false },
  { name: "Clay", hex: calmDecorative.clay, light: true },
  { name: "Honey", hex: calmDecorative.honey, light: false },
  { name: "Moss", hex: p.accent, light: true },
  { name: "Ink", hex: p.text, light: true },
];
const hexOf = (name: string) => PALETTE.find((c) => c.name === name)!.hex;

// Maps the theme onto the color names this page's classes use (bg-oat, text-ink, ...), on this page only.
const themeVars = {
  "--color-oat": p.bg,
  "--color-surface": p.surface,
  "--color-ink": p.text,
  "--color-muted": p.muted,
  "--color-line": p.border,
  "--color-sand": p.border,
  "--color-moss": p.accent,
  "--color-clay": calmDecorative.clay,
} as CSSProperties;

const swatch = (name: string, ref: string): Artifact => ({
  name,
  size: "s",
  ref,
  bare: true,
  node: (
    <div className="flex h-full min-h-24 items-end border-b border-line p-3" style={{ background: hexOf(name) }}>
      <p className={`text-sm ${PALETTE.find((c) => c.name === name)!.light ? "text-surface" : "text-ink"}`}>
        {name}
        <span className="block text-xs">{hexOf(name).toUpperCase()}</span>
      </p>
    </div>
  ),
});

const row = "flex items-center gap-3 text-sm";
const chip = "rounded-full border border-line px-3 py-1 text-sm";

const ARTIFACTS: Artifact[] = [
  swatch("Oat", "Undyed paper sleeves, the page behind everything."),
  swatch("Sand", "A worn cardboard jacket in lamplight."),
  swatch("Clay", "The centre label of an old pressing. Decorative only."),
  swatch("Honey", "A lamp's warm spot on the wall. Decorative only."),
  swatch("Moss", "One quiet green, kept for the primary action."),
  swatch("Ink", "Vinyl in a dim room, and the text on it."),
  {
    name: "Record title",
    size: "m",
    ref: "Liner-note titling, soft and unhurried.",
    node: <p className="font-serif text-4xl">Evening Hours</p>,
  },
  {
    name: "Number",
    size: "s",
    ref: "The speed printed on the label.",
    node: <p className="font-serif text-4xl">33⅓ <span className="text-lg">rpm</span></p>,
  },
  {
    name: "Sans specimen",
    size: "m",
    ref: "Back-of-sleeve credits, plain and legible.",
    node: (
      <div>
        <p className="text-5xl font-light">Aa</p>
        <p className="mt-2 text-sm text-muted">Helvetica Neue · Regular, Medium</p>
      </div>
    ),
  },
  {
    name: "Italic",
    size: "m",
    ref: "A track name written by hand.",
    node: <p className="font-serif text-2xl italic">Nocturne in E-flat</p>,
  },
  {
    name: "Body",
    size: "l",
    ref: "Liner notes read slowly with the lights low.",
    node: (
      <p className="max-w-prose text-base leading-relaxed">
        Side B starts, and the room gets quieter. Nothing to finish tonight: a lamp, a chair, and a record turning at its own pace.
      </p>
    ),
  },
  {
    name: "Words",
    size: "s",
    ref: "The mood in three words.",
    node: <p className="font-serif text-xl leading-snug">Low light. Warm wood. Side B.</p>,
  },
  {
    name: "Matte linen",
    size: "m",
    ref: "A couch throw beside the speakers.",
    bare: true,
    node: <Texture kind="linen" />,
  },
  {
    name: "Plaster at dusk",
    size: "m",
    ref: "The wall behind the shelf as the sun drops.",
    bare: true,
    node: <Texture kind="plaster" />,
  },
  {
    name: "Unglazed ceramic",
    size: "m",
    ref: "A mug that holds the last of the tea.",
    bare: true,
    node: <Texture kind="ceramic" />,
  },
  {
    name: "Record sleeve",
    size: "m",
    ref: "A cardboard jacket with a circle cut-out.",
    node: <Sleeve />,
  },
  {
    name: "Turntable",
    size: "l",
    ref: "A record spinning, the arm just lowered.",
    node: <Turntable />,
  },
  {
    name: "Tonearm",
    size: "m",
    ref: "The small moment before the first note.",
    node: <Tonearm />,
  },
  {
    name: "Record label",
    size: "s",
    ref: "Clay centre, thin ring, small type.",
    node: <Label />,
  },
  {
    name: "Grooves",
    size: "m",
    ref: "Fine lines catching a little light.",
    bare: true,
    node: <GrooveDetail />,
  },
  {
    name: "Log button",
    size: "s",
    ref: "The single moss action on the page.",
    node: (
      <button type="button" className="rounded-calm bg-moss px-5 py-2.5 text-sm font-medium text-surface focus-visible:outline-2">
        Log
      </button>
    ),
  },
  {
    name: "Chip",
    size: "s",
    ref: "A small, selectable genre tag.",
    node: (
      <div className="flex flex-wrap gap-2">
        <span className={`${chip} border-ink bg-ink text-surface`}>✓ Rock</span>
        <span className={chip}>Pop</span>
      </div>
    ),
  },
  {
    name: "Badge",
    size: "s",
    ref: "A small “New” on a fresh arrival.",
    node: <span className="rounded-full border border-ink px-2.5 py-0.5 text-xs uppercase tracking-wider">New</span>,
  },
  {
    name: "Card",
    size: "l",
    ref: "A record on the shelf, titled and counted.",
    node: (
      <div className="flex w-full max-w-xs items-center gap-4 rounded-calm border border-line bg-oat p-4">
        <Record size={64} />
        <div>
          <p className="font-serif text-lg">Evening Hours</p>
          <p className="text-sm text-muted">Mara Voss · 1974</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted">12 tracks</p>
        </div>
      </div>
    ),
  },
  {
    name: "Toggle",
    size: "s",
    ref: "A switch that clicks like a lamp pull.",
    node: (
      <div className={row}>
        <button type="button" role="switch" aria-checked="true" aria-label="Side B" className="relative h-6 w-11 rounded-full border border-ink bg-ink">
          <span className="absolute right-0.5 top-0.5 h-4.5 w-4.5 rounded-full bg-surface" />
        </button>
        <span>On</span>
      </div>
    ),
  },
  {
    name: "Input",
    size: "m",
    ref: "A search slip tucked into the crate.",
    node: (
      <input
        aria-label="Search records"
        placeholder="Search records"
        className="w-full max-w-xs rounded-calm border border-line bg-oat px-3 py-2 text-sm placeholder:text-muted"
      />
    ),
  },
  {
    name: "Select",
    size: "l",
    ref: "Sort the shelf, nothing more.",
    node: (
      <div className="flex w-full max-w-xs items-center justify-between rounded-calm border border-line bg-oat px-3 py-2 text-sm">
        <span>Sort: Recent</span>
        <span aria-hidden>▾</span>
      </div>
    ),
  },
  {
    name: "Tabs",
    size: "l",
    ref: "Week, month, all: a quiet underline.",
    node: (
      <div className="flex gap-5 text-sm" role="tablist">
        <span role="tab" aria-selected="true" className="border-b-2 border-ink pb-1 font-medium">Week</span>
        <span role="tab" className="pb-1 text-muted">Month</span>
        <span role="tab" className="pb-1 text-muted">All</span>
      </div>
    ),
  },
  {
    name: "List row",
    size: "l",
    ref: "A tracklist, one line per song.",
    node: (
      <ul className="w-full max-w-xs divide-y divide-line rounded-calm border border-line bg-oat text-sm">
        <li className="flex justify-between px-3 py-2"><span>1 · Low Lamp</span><span className="text-muted">3:42</span></li>
        <li className="flex justify-between px-3 py-2"><span>2 · Slow Tea</span><span className="text-muted">4:10</span></li>
      </ul>
    ),
  },
  {
    name: "Stylus",
    size: "l",
    ref: "The needle meeting the groove, from the side.",
    node: <Stylus />,
  },
];

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

export default function CalmMoodBoard() {
  return (
    <div style={{ ...themeVars, ...hubTheme }} className="min-h-screen bg-oat font-sans text-ink">
    <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 md:px-10 md:pt-10">
      <HubLink className="mb-6 md:mb-10" />
      <header className="mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-widest text-muted">Mood board · 1 of 3</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">Calm · Matte · Warm</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">A quiet evening listening to records, winding down.</p>
      </header>

      <section aria-labelledby="early" className="mb-10 grid gap-6 rounded-calm border border-line bg-surface p-5 md:grid-cols-2 md:p-6">
        <h2 id="early" className="sr-only">Early decisions</h2>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Early decisions · Type</p>
          <p className="mt-2 font-serif text-2xl">Iowan Old Style <span className="font-sans text-base text-muted">+ Helvetica Neue</span></p>
          <p className="mt-1 text-sm text-muted">Serif for record titles and numbers, sans for the rest.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Early decisions · Palette</p>
          <ul className="mt-3 flex flex-wrap gap-4">
            {PALETTE.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-sm">
                <span className="h-5 w-5 rounded-full border border-line" style={{ background: c.hex }} aria-hidden />
                {c.name}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-muted">Moss only for the primary action. Clay and Honey are decorative.</p>
        </div>
      </section>

      <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 xl:grid-cols-6">
        {ARTIFACTS.map((a) => (
          <li key={a.name} className={`${SPAN[a.size]}`}>
            <figure className="flex h-full flex-col overflow-hidden rounded-calm border border-line bg-surface">
              <div className={`flex-1 ${a.bare ? "" : "grid place-items-center p-4"}`}>{a.node}</div>
              <figcaption className="border-t border-line px-3 py-2">
                <p className="text-[11px] uppercase tracking-widest text-muted">
                  {a.name} · References
                </p>
                <p className="mt-0.5 text-sm">{a.ref}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </main>
    </div>
  );
}
