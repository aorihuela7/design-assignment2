import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import HubLink from "../../hub-link";
import { FlatRecord, Halftone, InkPrint, PaperGrain, RecordLabel, SleeveBlue, SleeveRed, SleeveSquares, SleeveStack } from "./art";

export const metadata: Metadata = { title: "Editorial · Ink · Paper — Mood Board" };

// Literal class names so Tailwind can see them.
const BASE = { 1: "col-span-1", 2: "col-span-2" } as const;
const MD = { 3: "md:col-span-3", 6: "md:col-span-6" } as const;
const XL = {
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
  5: "xl:col-span-5",
  7: "xl:col-span-7",
  9: "xl:col-span-9",
} as const;

type Artifact = {
  name: string;
  base: keyof typeof BASE;
  md: keyof typeof MD;
  xl: keyof typeof XL;
  ref: string;
  bg?: string;
  bare?: boolean;
  node: ReactNode;
};

const swatch = (name: string, hex: string, ref: string, bg: string, light: boolean, xl: keyof typeof XL): Artifact => ({
  name,
  base: 1,
  md: 3,
  xl,
  ref,
  bare: true,
  node: (
    <div className={`flex h-full min-h-36 flex-col justify-end p-3 ${bg} ${light ? "text-paper" : "text-press"}`}>
      <p className="font-display text-3xl uppercase leading-none">{name}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]">{hex}</p>
    </div>
  ),
});

const label = "text-[10px] font-black uppercase tracking-[0.2em]";
const field = "border-[3px] border-press bg-paper px-3 py-2 text-xs font-bold uppercase tracking-[0.15em]";

const ARTIFACTS: Artifact[] = [
  swatch("Paper cream", "#F2EAD3", "Newsprint-warm stock, the page under everything.", "bg-paper", false, 3),
  swatch("Ink black", "#111111", "Heavy press black, for rules and headlines.", "bg-press", true, 2),
  swatch("Red-orange", "#E4472B", "One loud flat spot colour, kept for the LOG action.", "bg-signal", false, 3),
  swatch("Deep blue", "#1E3A6B", "The second ink on a neon-night sleeve.", "bg-navy", true, 2),
  {
    name: "Number",
    base: 1,
    md: 3,
    xl: 2,
    ref: "The speed, stamped on the sleeve.",
    node: (
      <p className="font-display text-5xl uppercase leading-[0.9]">
        33⅓
        <span className="block text-base tracking-widest">RPM</span>
      </p>
    ),
  },
  {
    name: "Display headline",
    base: 2,
    md: 6,
    xl: 9,
    ref: "A headline set to fill the sleeve edge to edge.",
    node: <p className="font-display text-[26vw] uppercase leading-[0.82] md:text-[10rem] xl:text-[14rem]">Night<br />Drive</p>,
  },
  {
    name: "Label type",
    base: 1,
    md: 3,
    xl: 3,
    ref: "The tiny print on the back, set in capitals.",
    node: <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.25em]">Side A · Stereo · Digital recording · 33⅓ RPM</p>,
  },
  {
    name: "Headline face",
    base: 2,
    md: 3,
    xl: 3,
    ref: "Heavy, condensed, loud: Impact on a system stack.",
    node: (
      <div>
        <p className="font-display text-8xl leading-none">Aa</p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em]">Impact · Regular</p>
      </div>
    ),
  },
  {
    name: "Body text",
    base: 2,
    md: 6,
    xl: 5,
    ref: "Liner notes, plain and small, in Helvetica Neue.",
    node: (
      <p className="max-w-prose text-sm leading-relaxed">
        Drum machines, a borrowed synth and one guitar turned all the way up. Written in a week, mixed in a weekend, played loud on a car stereo.
      </p>
    ),
  },
  {
    name: "Poster type",
    base: 2,
    md: 3,
    xl: 4,
    ref: "A tour poster: tiny label, huge headline, hard black.",
    bg: "bg-press text-paper",
    node: (
      <div className="w-full">
        <p className={`${label} text-signal`}>World tour · 1986</p>
        <p className="mt-2 font-display text-6xl uppercase leading-[0.85]">Night<br />Drive Live</p>
      </div>
    ),
  },
  { name: "Sleeve · Red", base: 1, md: 3, xl: 4, ref: "A circle against a flat field, cropped hard.", bare: true, node: <SleeveRed /> },
  { name: "Sleeve · Sunset", base: 1, md: 3, xl: 3, ref: "A sun sliced by stripes, the decade in one shape.", bare: true, node: <SleeveBlue /> },
  { name: "Sleeve · Zigzag", base: 1, md: 3, xl: 3, ref: "Flat triangles and a hard zigzag, no gradients.", bare: true, node: <SleeveSquares /> },
  { name: "Record label", base: 1, md: 3, xl: 2, ref: "A two-colour centre label, split flat.", node: <RecordLabel /> },
  { name: "Paper grain", base: 2, md: 3, xl: 3, ref: "Uncoated stock with fibres showing.", bare: true, node: <PaperGrain /> },
  { name: "Halftone dots", base: 2, md: 3, xl: 5, ref: "Dots growing across the page, as printed.", bare: true, node: <Halftone /> },
  { name: "Ink print", base: 2, md: 3, xl: 4, ref: "Solid black, one plate off register.", bare: true, node: <InkPrint /> },
  { name: "Record", base: 2, md: 3, xl: 3, ref: "A black disc, flattened to a few shapes.", node: <FlatRecord /> },
  { name: "Stack of sleeves", base: 2, md: 6, xl: 9, ref: "A pile of sleeves, spines out, waiting for the next side.", node: <SleeveStack /> },
  {
    name: "LOG button",
    base: 2,
    md: 3,
    xl: 4,
    ref: "The one red-orange block, the primary action.",
    node: (
      <button type="button" className="border-[3px] border-press bg-signal px-8 py-3 font-display text-2xl uppercase tracking-wider text-press hover:bg-press hover:text-paper">
        Log
      </button>
    ),
  },
  {
    name: "Chip",
    base: 1,
    md: 3,
    xl: 3,
    ref: "A tag in a bordered box; selected goes solid.",
    node: (
      <div className="flex flex-wrap gap-2">
        <span className="border-[3px] border-press bg-press px-3 py-1 text-xs font-black uppercase tracking-widest text-paper">✓ Rock</span>
        <span className="border-[3px] border-press px-3 py-1 text-xs font-black uppercase tracking-widest">Pop</span>
      </div>
    ),
  },
  {
    name: "Toggle",
    base: 1,
    md: 3,
    xl: 3,
    ref: "A square switch, on or off, no soft edges.",
    node: (
      <div className="flex items-center gap-3">
        <button type="button" role="switch" aria-checked="true" aria-label="Mono" className="relative h-7 w-14 border-[3px] border-press bg-press">
          <span className="absolute right-0.5 top-0.5 h-4 w-5 bg-paper" />
        </button>
        <span className={label}>On</span>
      </div>
    ),
  },
  {
    name: "Badge",
    base: 1,
    md: 3,
    xl: 2,
    ref: "A stamp on a fresh pressing.",
    node: <span className="bg-press px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-paper">New</span>,
  },
  {
    name: "Card",
    base: 2,
    md: 6,
    xl: 7,
    ref: "A record on the shelf: one block, one thick rule.",
    node: (
      <div className="flex w-full max-w-md items-stretch border-[3px] border-press">
        <div className="w-24 shrink-0 border-r-[3px] border-press bg-press p-2">
          <FlatRecord />
        </div>
        <div className="p-3">
          <p className={label}>LP · 1985</p>
          <p className="mt-1 font-display text-3xl uppercase leading-none">Night Drive</p>
          <p className="mt-2 text-xs uppercase tracking-widest">The Night Drivers</p>
        </div>
      </div>
    ),
  },
  {
    name: "List row",
    base: 2,
    md: 6,
    xl: 5,
    ref: "A tracklist ruled like a column of type.",
    node: (
      <ul className="w-full max-w-sm border-[3px] border-press">
        {[
          ["1", "Night Drive", "3:42"],
          ["2", "Heat Wave", "4:10"],
        ].map(([n, t, d]) => (
          <li key={n} className="flex items-baseline gap-3 border-b-[3px] border-press px-3 py-2 last:border-b-0">
            <span className="font-display text-2xl">{n}</span>
            <span className="flex-1 text-sm font-bold uppercase tracking-wider">{t}</span>
            <span className="text-xs">{d}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: "Input",
    base: 2,
    md: 3,
    xl: 5,
    ref: "A search slip, boxed and shouted.",
    node: <input aria-label="Search records" placeholder="Search records" className={`${field} w-full max-w-xs placeholder:text-press/70`} />,
  },
  {
    name: "Select",
    base: 1,
    md: 3,
    xl: 3,
    ref: "Sort the crate: one box, one arrow.",
    node: (
      <div className={`${field} flex w-full items-center justify-between gap-2`}>
        <span>Sort: Recent</span>
        <span aria-hidden>▼</span>
      </div>
    ),
  },
  {
    name: "Tabs",
    base: 2,
    md: 6,
    xl: 4,
    ref: "Three boxes, the chosen one filled black.",
    node: (
      <div className="flex border-[3px] border-press text-xs font-black uppercase tracking-widest" role="tablist">
        <span role="tab" aria-selected="true" className="bg-press px-3 py-2 text-paper">Week</span>
        <span role="tab" className="border-l-[3px] border-press px-3 py-2">Month</span>
        <span role="tab" className="border-l-[3px] border-press px-3 py-2">All</span>
      </div>
    ),
  },
];

const hubTheme = {
  "--hub-font": "var(--font-plain)",
  "--hub-size": "11px",
  "--hub-weight": "900",
  "--hub-tracking": "0.2em",
  "--hub-transform": "uppercase",
  "--hub-fg": "color-mix(in srgb, var(--color-press) 72%, var(--color-paper))",
  "--hub-fg-hover": "var(--color-press)",
  "--hub-ring": "var(--color-press)",
  "--hub-radius": "0",
} as CSSProperties;

export default function EditorialMoodBoard() {
  return (
    <main style={hubTheme} className="min-h-screen bg-paper font-plain text-press">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 md:px-10">
        <HubLink className="mb-1" />
        <header className="border-t-[10px] border-press pt-3 md:pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className={label}>Mood board · 2 of 3</p>
            <p className={label}>Vol. 02</p>
          </div>
          <h1 className="mt-3 font-display text-[19vw] font-normal uppercase leading-[0.84] md:text-[11rem] xl:text-[15rem]">
            Editorial · Ink · Paper
          </h1>
          <p className="mt-4 max-w-md border-l-[10px] border-signal pl-4 text-sm font-bold uppercase leading-snug tracking-widest md:ml-auto md:mr-0">
            A 1980s rock and pop record sleeve: loud, graphic, printed.
          </p>
        </header>

        <section aria-labelledby="early" className="mb-8 mt-10 grid border-[3px] border-press md:grid-cols-[2fr_3fr]">
          <h2 id="early" className="sr-only">Early decisions</h2>
          <div className="border-b-[3px] border-press p-4 md:border-b-0 md:border-r-[3px]">
            <p className={label}>Early decisions · Type</p>
            <p className="mt-2 font-display text-4xl uppercase leading-none">Impact</p>
            <p className="mt-1 text-sm">+ Helvetica Neue. Headlines huge, labels tiny.</p>
          </div>
          <div className="p-4">
            <p className={label}>Early decisions · Palette</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {[
                ["Paper", "bg-paper"],
                ["Ink", "bg-press"],
                ["Red-orange", "bg-signal"],
                ["Blue", "bg-navy"],
              ].map(([n, c]) => (
                <li key={n} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  <span className={`h-5 w-5 border-[3px] border-press ${c}`} aria-hidden />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">Red-orange only for the primary action.</p>
          </div>
        </section>

        <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-6 md:gap-4 xl:grid-cols-12">
          {ARTIFACTS.map((a) => (
            <li key={a.name} className={`${BASE[a.base]} ${MD[a.md]} ${XL[a.xl]}`}>
              <figure className="flex h-full flex-col border-[3px] border-press bg-paper">
                <div className={`flex-1 ${a.bare ? "" : `grid place-items-center p-4 ${a.bg ?? ""}`}`}>{a.node}</div>
                <figcaption className="border-t-[3px] border-press bg-paper px-3 py-2 text-press">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="bg-press px-1.5 py-0.5 text-paper">References</span>
                    {a.name}
                  </p>
                  <p className="mt-1 text-xs leading-snug">{a.ref}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
