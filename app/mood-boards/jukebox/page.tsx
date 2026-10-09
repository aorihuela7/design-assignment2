import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import HubLink from "../../hub-link";
import {
  Boombox,
  Cassette,
  Equalizer,
  GridHorizon,
  JukeboxArt,
  Memphis,
  NeonRecord,
  Scanlines,
  SleeveBolt,
  SleevePalm,
  SleeveSun,
  SunsetStripes,
  VhsGrain,
  Walkman,
} from "./art";

export const metadata: Metadata = { title: "Jukebox · Neon · Night — Mood Board" };

type Artifact = {
  name: string;
  ref: string;
  bare?: boolean;
  glow?: boolean;
  node: ReactNode;
};

const mono = "font-mono text-[11px] uppercase tracking-[0.18em]";

const swatch = (name: string, hex: string, ref: string, bg: string, dark: boolean, h: string): Artifact => ({
  name,
  ref,
  bare: true,
  node: (
    <div className={`flex ${h} flex-col justify-end p-3 ${bg} ${dark ? "text-night" : "text-warm"}`}>
      <p className="font-neon text-lg font-black uppercase italic leading-none">{name}</p>
      <p className={`mt-1 ${mono}`}>{hex}</p>
    </div>
  ),
});

const ARTIFACTS: Artifact[] = [
  swatch("Night violet", "#0D0618", "The room with the lights off.", "bg-night", false, "h-36"),
  swatch("Neon magenta", "#FF2E93", "A bar sign buzzing in the window.", "bg-magenta", true, "h-28"),
  swatch("Cyan", "#19E3F0", "The cold half of every neon pair.", "bg-cyan", true, "h-40"),
  swatch("Electric yellow", "#FFE600", "A jukebox bulb, a lightning bolt.", "bg-volt", true, "h-28"),
  swatch("Warm white", "#F6EBDD", "Printed lyrics under a lamp: all body text.", "bg-warm", true, "h-32"),
  {
    name: "Outline headline",
    ref: "Hollow letters, like a tube sign before it's lit.",
    node: <p className="font-neon text-4xl font-black uppercase italic leading-none text-transparent md:text-6xl [-webkit-text-stroke:2px_var(--color-cyan)]">Rock</p>,
  },
  {
    name: "Offset headline",
    ref: "Two layers misprinted on purpose.",
    node: <p className="font-neon text-4xl font-black uppercase italic leading-none text-volt md:text-6xl [text-shadow:4px_4px_0_var(--color-magenta)]">Pop</p>,
  },
  {
    name: "Mono label",
    ref: "The tiny type on a cassette spine.",
    node: <p className={`${mono} leading-loose text-warm`}>Side A // 45 rpm<br />Dolby NR · Type II<br />Track 01 / 10</p>,
  },
  {
    name: "Headline face",
    ref: "Arial Black in bold italic capitals: heavy and fast.",
    node: (
      <div>
        <p className="font-neon text-7xl font-black uppercase italic leading-none">Aa</p>
        <p className={`mt-2 ${mono} text-warm`}>Arial Black · Italic</p>
      </div>
    ),
  },
  {
    name: "Body text",
    ref: "Liner notes in warm white, small and plain.",
    node: <p className="text-sm leading-relaxed text-warm">Synths on the left, drums on the right, and the whole thing recorded in one long night. Turn it up and watch the lights.</p>,
  },
  { name: "Scanlines", ref: "A CRT screen with the lines showing.", bare: true, node: <Scanlines /> },
  { name: "VHS grain", ref: "A tape that's been rewound too many times.", bare: true, node: <VhsGrain /> },
  { name: "Striped sunset", ref: "A sun sliced by stripes, the decade's signature.", bare: true, node: <SunsetStripes /> },
  { name: "Perspective grid", ref: "A synthwave floor running to the horizon.", bare: true, node: <GridHorizon /> },
  { name: "Cassette", ref: "A mixtape with a handwritten label.", node: <Cassette /> },
  { name: "Walkman", ref: "A portable player, headphone cord and all.", node: <Walkman /> },
  { name: "Jukebox", ref: "An arch of colored light in a dark diner.", node: <JukeboxArt /> },
  { name: "Boombox", ref: "Two big speakers and a handle for the street.", node: <Boombox /> },
  { name: "Equalizer", ref: "Bars climbing with the bass.", node: <Equalizer /> },
  { name: "Record", ref: "Black vinyl with a bright yellow label.", node: <NeonRecord /> },
  { name: "Sleeve · Sun", ref: "A striped sun over the horizon line.", bare: true, node: <SleeveSun /> },
  { name: "Sleeve · Bolt", ref: "One yellow bolt on a hot pink field.", bare: true, node: <SleeveBolt /> },
  { name: "Sleeve · Palm", ref: "A palm silhouette against a pink sun.", bare: true, node: <SleevePalm /> },
  {
    name: "LOG +1 button",
    ref: "The one neon-outline action; it lights up on hover.",
    node: (
      <button
        type="button"
        className="cut bg-magenta p-0.5 font-neon text-lg font-black uppercase italic tracking-wide text-magenta transition-[filter] hover:[filter:drop-shadow(0_0_6px_rgb(255_46_147/0.9))_drop-shadow(0_0_16px_rgb(255_46_147/0.6))] active:translate-y-px"
      >
        <span className="cut-in block bg-night px-6 py-3">Log +1</span>
      </button>
    ),
  },
  {
    name: "Chip",
    ref: "A genre tag; the chosen one is outlined in cyan.",
    node: (
      <div className="flex flex-wrap gap-2">
        <span className="border-2 border-cyan px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-warm">✓ Rock</span>
        <span className="border-2 border-edge px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-warm">Pop</span>
      </div>
    ),
  },
  {
    name: "Card",
    ref: "A record on the shelf, boxed in magenta.",
    glow: true,
    node: (
      <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
        <div className="w-20 shrink-0">
          <NeonRecord />
        </div>
        <div className="min-w-0">
          <p className={`${mono} text-warm`}>Side A · 1986</p>
          <p className="mt-1 font-neon text-xl font-black uppercase italic leading-tight">Midnight TV</p>
          <p className="mt-1 text-sm text-warm">Laser Hearts</p>
        </div>
      </div>
    ),
  },
  {
    name: "Toggle",
    ref: "A switch that clicks on like a sign.",
    node: (
      <div className="flex items-center gap-3">
        <button type="button" role="switch" aria-checked="true" aria-label="Loud" className="relative h-7 w-14 border-2 border-cyan bg-night">
          <span className="absolute right-1 top-1 h-4 w-5 bg-cyan" />
        </button>
        <span className={`${mono} text-warm`}>On</span>
      </div>
    ),
  },
  {
    name: "Score counter",
    ref: "Plays so far, arcade style, one digit per box.",
    node: (
      <div>
        <p className={`${mono} text-warm`}>Plays</p>
        <div className="mt-2 flex gap-1.5" role="img" aria-label="42 plays">
          {["0", "0", "4", "2"].map((d, i) => (
            <span key={i} className="grid h-12 w-9 place-items-center border-2 border-volt bg-night font-mono text-3xl font-bold text-volt" aria-hidden>
              {d}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

const hubTheme = {
  "--hub-font": "var(--font-mono)",
  "--hub-size": "11px",
  "--hub-weight": "500",
  "--hub-tracking": "0.18em",
  "--hub-transform": "uppercase",
  "--hub-fg": "color-mix(in srgb, var(--color-warm) 78%, var(--color-night))",
  "--hub-fg-hover": "var(--color-warm)",
  "--hub-ring": "var(--color-cyan)",
  "--hub-radius": "0",
} as CSSProperties;

export default function JukeboxMoodBoard() {
  return (
    <main style={hubTheme} className="theme-night min-h-screen bg-night font-plain text-warm">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 md:px-10 md:pt-12">
        <HubLink className="mb-2" />
        <header>
          <p className={`${mono} text-warm`}>Mood board · 3 of 3</p>
          <h1 className="glow-text mt-4 break-words font-neon text-[15vw] font-black uppercase italic leading-[0.95] text-magenta md:text-8xl xl:text-[10rem]">
            Jukebox <span className="text-cyan">·</span> Neon <span className="text-cyan">·</span> Night
          </h1>
          <p className="mt-5 max-w-xl text-lg text-warm">A 1980s rock and pop night: neon signs, cassettes, and a jukebox glowing in the dark.</p>
          <div className="mt-6">
            <Memphis />
          </div>
        </header>

        <section aria-labelledby="early" className="cut mb-8 mt-10 bg-edge p-0.5">
          <div className="cut-in grid gap-6 bg-grape p-5 md:grid-cols-2">
            <h2 id="early" className="sr-only">Early decisions</h2>
            <div>
              <p className={`${mono} text-warm`}>Early decisions · Type</p>
              <p className="mt-2 font-neon text-2xl font-black uppercase italic">
                Arial Black <span className="font-mono text-base font-normal normal-case not-italic text-warm">+ ui-monospace</span>
              </p>
              <p className="mt-1 text-sm text-warm">Italic capitals for headlines, mono for labels.</p>
            </div>
            <div>
              <p className={`${mono} text-warm`}>Early decisions · Palette</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {[
                  ["Night", "bg-night"],
                  ["Magenta", "bg-magenta"],
                  ["Cyan", "bg-cyan"],
                  ["Yellow", "bg-volt"],
                  ["Warm white", "bg-warm"],
                ].map(([n, c]) => (
                  <li key={n} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-warm">
                    <span className={`h-4 w-4 border border-warm ${c}`} aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-warm">Neon for headlines, borders and accents. Text stays warm white.</p>
            </div>
          </div>
        </section>

        <ul className="columns-2 gap-4 md:columns-3 xl:columns-4">
          {ARTIFACTS.map((a) => (
            <li key={a.name} className="mb-4 break-inside-avoid">
              <div className={a.glow ? "glow-box" : ""}>
                <figure className={`cut p-0.5 ${a.glow ? "bg-magenta" : "bg-edge"}`}>
                  <div className="cut-in flex flex-col bg-grape">
                    <div className={a.bare ? "" : "p-4"}>{a.node}</div>
                    <figcaption className="border-t-2 border-edge px-3 py-2">
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
                        <span className="border border-cyan px-1.5 py-0.5">References</span>
                        {a.name}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-warm">{a.ref}</p>
                    </figcaption>
                  </div>
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
