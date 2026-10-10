// The collection: invented records only (no real albums, bands, or covers). Nothing is saved.

export type Genre = "Jazz" | "Rock" | "Soul";
export type RecordType = "LP" | "EP" | "Single";
export type RecordSize = '12"' | '10"' | '7"';

export type VinylRecord = {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: Genre;
  /** The format is always exactly these two fields. */
  type: RecordType;
  size: RecordSize;
  note: string;
  tracks: { title: string; length: string }[];
  /** Order the record was added; higher is newer. */
  added: number;
  isNew?: boolean;
};

export const GENRES: Genre[] = ["Jazz", "Rock", "Soul"];
export const TYPES: RecordType[] = ["LP", "EP", "Single"];
export const SIZES: RecordSize[] = ['12"', '10"', '7"'];

/** The one way a format is written: TYPE · SIZE. */
export const formatOf = (r: Pick<VinylRecord, "type" | "size">) => `${r.type} · ${r.size}`;

/** The one metadata line, in a fixed order: YEAR · GENRE · TYPE · SIZE. */
export const metaOf = (r: Pick<VinylRecord, "year" | "genre" | "type" | "size">) => `${r.year} · ${r.genre} · ${formatOf(r)}`;

export const initialRecords: VinylRecord[] = [
  {
    id: "low-lamp",
    title: "Low Lamp",
    artist: "Ines Calder Trio",
    year: 1961,
    genre: "Jazz",
    type: "LP",
    size: '12"',
    note: "Brushes on the snare, one long piano solo. Best after midnight.",
    tracks: [
      { title: "Low Lamp", length: "6:12" },
      { title: "Quarter Past", length: "4:48" },
      { title: "Calder Blues", length: "7:05" },
      { title: "Window Seat", length: "5:21" },
    ],
    added: 1,
  },
  {
    id: "harbor-light",
    title: "Harbor Light",
    artist: "Wren & Co.",
    year: 1978,
    genre: "Rock",
    type: "LP",
    size: '12"',
    note: "Two guitars, a borrowed organ, and a chorus you hum for days.",
    tracks: [
      { title: "Harbor Light", length: "3:58" },
      { title: "Northbound", length: "4:20" },
      { title: "Tin Roof", length: "3:12" },
      { title: "Fog Signal", length: "5:40" },
      { title: "Last Ferry", length: "4:05" },
    ],
    added: 2,
  },
  {
    id: "salt-air",
    title: "Salt Air",
    artist: "Tomas Reyes",
    year: 1966,
    genre: "Soul",
    type: "EP",
    size: '7"',
    note: "Four songs on a small record: a horn line on side A, a slow burner on side B.",
    tracks: [
      { title: "Salt Air", length: "2:48" },
      { title: "Keep the Porch Light On", length: "3:10" },
      { title: "Salt Air (Instrumental)", length: "2:51" },
      { title: "Sweet Tide", length: "2:59" },
    ],
    added: 3,
  },
  {
    id: "evening-hours",
    title: "Evening Hours",
    artist: "Mara Voss Quintet",
    year: 1974,
    genre: "Jazz",
    type: "LP",
    size: '12"',
    note: "Recorded live in one night. The crowd noise is part of it.",
    tracks: [
      { title: "Opening Set", length: "8:02" },
      { title: "Evening Hours", length: "6:44" },
      { title: "Second Round", length: "5:30" },
      { title: "Voss at the Door", length: "4:15" },
      { title: "Closing Time", length: "7:18" },
    ],
    added: 4,
  },
  {
    id: "late-drive",
    title: "Late Drive",
    artist: "The Night Drivers",
    year: 1985,
    genre: "Rock",
    type: "LP",
    size: '12"',
    note: "Drum machines and a guitar turned all the way up. Car-stereo loud.",
    tracks: [
      { title: "Late Drive", length: "4:02" },
      { title: "Overpass", length: "3:45" },
      { title: "Radio Dial", length: "3:58" },
      { title: "Exit 9", length: "4:30" },
      { title: "Tail Lights", length: "5:12" },
      { title: "Home by Two", length: "3:20" },
    ],
    added: 5,
  },
  {
    id: "hot-pavement",
    title: "Hot Pavement",
    artist: "Della Price",
    year: 1969,
    genre: "Soul",
    type: "LP",
    size: '12"',
    note: "A big voice over a tight rhythm section. The B side is the keeper.",
    tracks: [
      { title: "Hot Pavement", length: "3:05" },
      { title: "Tell Me Twice", length: "2:58" },
      { title: "Corner Store", length: "3:22" },
      { title: "Price of Love", length: "4:01" },
    ],
    added: 6,
  },
  {
    id: "square-root",
    title: "Square Root",
    artist: "Otto Lind Quartet",
    year: 1959,
    genre: "Jazz",
    type: "LP",
    size: '10"',
    note: "Odd meters that somehow swing. Worn copy, plays clean.",
    tracks: [
      { title: "Square Root", length: "5:47" },
      { title: "Five by Four", length: "6:10" },
      { title: "Lind's Lament", length: "7:02" },
      { title: "Even Numbers", length: "4:36" },
      { title: "Coda", length: "2:14" },
    ],
    added: 7,
  },
  {
    id: "last-call-lounge",
    title: "Last Call Lounge",
    artist: "The Velvet Signals",
    year: 1971,
    genre: "Soul",
    type: "LP",
    size: '12"',
    note: "Four voices, one microphone, and strings that arrive late.",
    tracks: [
      { title: "Last Call", length: "3:40" },
      { title: "Velvet Line", length: "3:15" },
      { title: "Say It Slow", length: "4:22" },
      { title: "Signal Fire", length: "3:50" },
      { title: "Lights Up", length: "2:45" },
    ],
    added: 8,
  },
  {
    id: "static-sky",
    title: "Static Sky",
    artist: "Glass Antenna",
    year: 1983,
    genre: "Rock",
    type: "EP",
    size: '12"',
    note: "Four songs, all chorus. Short enough for one side of coffee.",
    tracks: [
      { title: "Static Sky", length: "4:11" },
      { title: "Antenna Up", length: "3:38" },
      { title: "Weather Report", length: "4:02" },
      { title: "Clear Night", length: "5:05" },
    ],
    added: 9,
  },
  {
    id: "side-two",
    title: "Side Two",
    artist: "June Okafor",
    year: 1964,
    genre: "Jazz",
    type: "LP",
    size: '10"',
    note: "A short record by a long-tone trumpet. Start with the second side.",
    tracks: [
      { title: "Long Tone", length: "5:15" },
      { title: "Okafor's Walk", length: "4:40" },
      { title: "Side Two", length: "6:02" },
      { title: "Blue Fifth", length: "3:58" },
    ],
    added: 10,
  },
  {
    id: "neon-static",
    title: "Neon Static",
    artist: "The Lowfields",
    year: 1987,
    genre: "Rock",
    type: "Single",
    size: '12"',
    note: "Bright and fast. The B side was meant to be the hit.",
    tracks: [
      { title: "Neon Static", length: "3:02" },
      { title: "Low Ceiling", length: "2:55" },
      { title: "Neon Static (Long)", length: "5:10" },
      { title: "Field Day", length: "3:18" },
    ],
    added: 11,
  },
  {
    id: "sunday-kitchen",
    title: "Sunday Kitchen",
    artist: "The Marlow Sisters",
    year: 1968,
    genre: "Soul",
    type: "LP",
    size: '12"',
    note: "Harmonies made for a slow morning and a second pot of coffee.",
    tracks: [
      { title: "Sunday Kitchen", length: "3:12" },
      { title: "Window Open", length: "2:50" },
      { title: "Marlow Lane", length: "3:44" },
      { title: "Good Bread", length: "2:39" },
      { title: "Evening Again", length: "4:08" },
    ],
    added: 12,
  },
];
