"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Chip, control, Field, join, Select, TextInput } from "../design-systems/_shared/ui";
import { Cover } from "./cover";
import { GENRES, initialRecords, type Genre, type VinylRecord } from "./records";

const label = "text-ds-label ds-label text-ds-muted";

const SORTS = {
  added: { name: "Recently added", fn: (a: VinylRecord, b: VinylRecord) => b.added - a.added },
  title: { name: "Title A–Z", fn: (a: VinylRecord, b: VinylRecord) => a.title.localeCompare(b.title) },
  artist: { name: "Artist A–Z", fn: (a: VinylRecord, b: VinylRecord) => a.artist.localeCompare(b.artist) },
  newest: { name: "Year, newest first", fn: (a: VinylRecord, b: VinylRecord) => b.year - a.year },
  oldest: { name: "Year, oldest first", fn: (a: VinylRecord, b: VinylRecord) => a.year - b.year },
} as const;
type SortKey = keyof typeof SORTS;

function EmptyIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="4" />
    </svg>
  );
}

/** A record card. The whole card is a button that opens the detail panel. */
function RecordCard({ record, selected, onOpen }: { record: VinylRecord; selected: boolean; onOpen: (el: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-current={selected ? "true" : undefined}
      onClick={(e) => onOpen(e.currentTarget)}
      className={join(
        "group flex h-full w-full flex-col border-(length:--ds-rule-w) border-ds-rule bg-ds-surface text-left st-hover:bg-ds-bg st-press:translate-y-px st-selected:bg-ds-bg",
        control,
      )}
    >
      <Cover record={record} />
      <span className="flex flex-1 flex-col gap-ds-4 border-t border-ds-border p-ds-12">
        <span className="ds-head text-xl group-st-hover:underline group-st-hover:decoration-2 group-st-hover:underline-offset-4">{record.title}</span>
        <span className="text-ds-muted">{record.artist}</span>
        <span className="mt-auto flex flex-wrap items-center gap-x-ds-8 gap-y-ds-4 pt-ds-8">
          <span className={label}>
            {record.year} · {record.genre} · {record.pressing}
          </span>
          {record.isNew && <Badge>New</Badge>}
          {selected && <span className="text-ds-label ds-label">✓ Open</span>}
        </span>
      </span>
    </button>
  );
}

export default function Collection() {
  const [records] = useState<VinylRecord[]>(initialRecords);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | "All">("All");
  const [sort, setSort] = useState<SortKey>("added");

  // Search first, so each chip can show how many records it would leave.
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? records.filter((r) => r.title.toLowerCase().includes(q) || r.artist.toLowerCase().includes(q)) : records;
  }, [records, query]);
  const counts = { All: searched.length, ...Object.fromEntries(GENRES.map((g) => [g, searched.filter((r) => r.genre === g).length])) } as Record<Genre | "All", number>;
  const visible = useMemo(
    () => (genre === "All" ? searched : searched.filter((r) => r.genre === genre)).toSorted(SORTS[sort].fn),
    [searched, genre, sort],
  );
  const clear = () => {
    setQuery("");
    setGenre("All");
  };

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-x-ds-24 gap-y-ds-16 border-b-(length:--ds-rule-w) border-ds-rule pb-ds-24">
        <h1>
          <span className="block ds-head text-ds-heading font-normal">Vinyl collection</span>
          <span className="mt-ds-4 block ds-head text-ds-display font-normal" aria-live="polite">
            {records.length} records
          </span>
        </h1>
        <Button variant="primary">Log a record</Button>
      </header>

      <section aria-label="Find a record" className="mt-ds-24">
        <div className="flex flex-col gap-ds-16 md:flex-row md:items-end">
          <div className="md:w-96">
            <Field label="Search">
              <TextInput enterKeyHint="search" placeholder="Title or artist" value={query} onChange={(e) => setQuery(e.target.value)} />
            </Field>
          </div>
          <div className="md:ml-auto md:w-60">
            <Field label="Sort">
              <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </div>
        <div className="mt-ds-16 flex flex-wrap items-center justify-between gap-ds-12">
          <div role="group" aria-label="Genre" className="flex flex-wrap gap-ds-8">
            {(["All", ...GENRES] as const).map((g) => (
              <Chip key={g} selected={genre === g} onClick={() => setGenre(g)}>
                {g}
                <span className="text-ds-muted">{counts[g]}</span>
                <span className="sr-only"> records</span>
              </Chip>
            ))}
          </div>
          <p className={label} aria-live="polite">
            Showing {visible.length} of {records.length}
          </p>
        </div>
      </section>

      {visible.length > 0 ? (
        <ul className="mt-ds-24 grid grid-cols-2 gap-ds-16 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((r) => (
            <li key={r.id}>
              <RecordCard record={r} selected={false} onOpen={() => {}} />
            </li>
          ))}
        </ul>
      ) : (
        <div role="status" className="mt-ds-24 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-ds-24">
          <EmptyIcon />
          <h2 className="mt-ds-12 ds-head text-ds-heading font-normal">No records match</h2>
          <p className="mt-ds-4 text-ds-muted">
            Nothing for {query.trim() ? `“${query.trim()}”` : "this search"}
            {genre !== "All" && ` in ${genre}`}.
          </p>
          <div className="mt-ds-16">
            <Button onClick={clear}>Clear filters</Button>
          </div>
        </div>
      )}
    </>
  );
}
