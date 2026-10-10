"use client";

import { useState } from "react";
import { Button } from "../design-systems/_shared/ui";
import { initialRecords, type VinylRecord } from "./records";

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
    </>
  );
}
