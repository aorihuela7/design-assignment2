"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { Badge, Button, Chip, CloseButton, control, Field, join, keepFocusInside, Select, TextInput } from "../design-systems/_shared/ui";
import { Cover } from "./cover";
import LogModal, { type NewRecord } from "./log-modal";
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
            {[record.year, record.genre, record.pressing].filter(Boolean).join(" · ")}
          </span>
          {record.isNew && <Badge>New</Badge>}
          {selected && <span className="text-ds-label ds-label">✓ Open</span>}
        </span>
      </span>
    </button>
  );
}

/** Side panel on desktop, bottom sheet on mobile. A native modal dialog: Esc closes it and the page is inert. */
const PANEL =
  "m-0 mt-auto max-h-[85dvh] w-full max-w-none overflow-y-auto border-t-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-0 font-ds-body text-ds-body text-ds-text backdrop:bg-(--ds-backdrop) md:ml-auto md:mt-0 md:h-dvh md:max-h-dvh md:w-[28rem] md:border-l-(length:--ds-rule-w) md:border-t-0";

function DetailPanel({ record, dialogRef, onClose }: { record: VinylRecord | null; dialogRef: RefObject<HTMLDialogElement | null>; onClose: () => void }) {
  const close = () => dialogRef.current?.close();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="detail-title"
      onKeyDown={keepFocusInside}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && close()}
      className={PANEL}
    >
      {record && (
        <div className="p-ds-24">
          <div className="flex items-center justify-between gap-ds-16">
            <p className={label}>{[record.genre, record.pressing].filter(Boolean).join(" · ")}</p>
            <CloseButton onClick={close} />
          </div>
          <div className="mt-ds-12 max-w-[320px]">
            <Cover record={record} label />
          </div>
          <h2 id="detail-title" className="mt-ds-16 ds-head text-ds-heading font-normal">
            {record.title}
          </h2>
          <p>
            {record.artist} · {record.year}
          </p>
          {record.note && <p className="mt-ds-12 text-ds-muted">{record.note}</p>}
          <h3 className={`${label} mt-ds-24`}>Tracks</h3>
          {record.tracks.length > 0 ? (
            <ol className="mt-ds-8 divide-y divide-ds-border border-t border-ds-border">
              {record.tracks.map((t, i) => (
                <li key={t.title} className="flex items-baseline gap-ds-12 py-ds-8">
                  <span className="w-6 ds-head">{i + 1}</span>
                  <span className="flex-1">{t.title}</span>
                  <span className="text-ds-muted">{t.length}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-ds-8 text-ds-muted">No tracks listed yet.</p>
          )}
        </div>
      )}
    </dialog>
  );
}

export default function Collection() {
  const [records, setRecords] = useState<VinylRecord[]>(initialRecords);
  // Logged records live in memory only; a reload brings back the original twelve.
  const add = (r: NewRecord) =>
    setRecords((rs) => [
      { ...r, id: `logged-${rs.length}-${r.title}`, pressing: "", note: "", tracks: [], added: Math.max(...rs.map((x) => x.added)) + 1, isNew: true },
      ...rs,
    ]);
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
  // Detail panel: remember the card that opened it, and give focus back on close.
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openRecord = records.find((r) => r.id === openId) ?? null;
  const open = (el: HTMLButtonElement, id: string) => {
    openerRef.current = el;
    setOpenId(id);
    panelRef.current?.showModal();
  };
  const onPanelClose = () => {
    setOpenId(null);
    openerRef.current?.focus();
  };

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
        <LogModal onAdd={add} />
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
              <RecordCard record={r} selected={openId === r.id} onOpen={(el) => open(el, r.id)} />
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

      <DetailPanel record={openRecord} dialogRef={panelRef} onClose={onPanelClose} />
    </>
  );
}
