"use client";

import { useState } from "react";
import { Badge, Button, control, join } from "../design-systems/_shared/ui";
import { Cover } from "./cover";
import { initialRecords, type VinylRecord } from "./records";

const label = "text-ds-label ds-label text-ds-muted";

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

      <ul className="mt-ds-32 grid grid-cols-2 gap-ds-16 md:grid-cols-3 lg:grid-cols-4">
        {records.map((r) => (
          <li key={r.id}>
            <RecordCard record={r} selected={false} onOpen={() => {}} />
          </li>
        ))}
      </ul>
    </>
  );
}
