"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button, CloseButton, DIALOG, Field, keepFocusInside, Radio, Select, TextInput } from "../design-systems/_shared/ui";
import { GENRES, SIZES, TYPES, type Genre, type RecordSize, type RecordType } from "./records";

export type NewRecord = { title: string; artist: string; year: number; genre: Genre; type: RecordType; size: RecordSize };

const THIS_YEAR = new Date().getFullYear();
const label = "text-ds-label ds-label text-ds-muted";

type Key = "title" | "artist" | "year" | "genre" | "type" | "size";
type Values = Record<Key, string>;
const EMPTY: Values = { title: "", artist: "", year: "", genre: "", type: "", size: "" };
const ORDER: Key[] = ["title", "artist", "year", "genre", "type", "size"];

function validate(v: Values): Partial<Record<Key, string>> {
  const errors: Partial<Record<Key, string>> = {};
  if (!v.title.trim()) errors.title = "Needs a title.";
  if (!v.artist.trim()) errors.artist = "Needs an artist.";
  const y = Number(v.year);
  if (!/^\d{4}$/.test(v.year) || y < 1900 || y > THIS_YEAR) errors.year = `Needs a year from 1900 to ${THIS_YEAR}.`;
  if (!v.genre) errors.genre = "Choose a genre.";
  if (!v.type) errors.type = "Choose a type.";
  if (!v.size) errors.size = "Choose a size.";
  return errors;
}

/** An inline error: an icon and words, never color alone. */
function Problem({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-ds-4 flex items-start gap-ds-4 text-ds-text">
      <svg viewBox="0 0 16 16" className="mt-[5px] h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4.5v4.5M8 11v.5" strokeLinecap="round" />
      </svg>
      {text}
    </p>
  );
}

/** The primary action and its modal. Nothing is saved: the record lives in memory until reload. */
export default function LogModal({ onAdd }: { onAdd: (r: NewRecord) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  // Errors appear once the user tries to save; a filled-in field that is still wrong also shows its error on blur.
  const [attempted, setAttempted] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = validate(values);
  const valid = Object.keys(errors).length === 0;
  const show = (k: Key) => (attempted || (touched[k] && values[k] !== "") ? errors[k] : undefined);
  const set = (k: Key) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const touch = (k: Key) => () => setTouched((t) => ({ ...t, [k]: true }));
  const close = () => ref.current?.close();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (!valid) {
      // Save looks and reads as disabled (aria-disabled), but pressing it explains what is missing.
      setAttempted(true);
      const first = ORDER.find((k) => errors[k]);
      ref.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setSaving(true);
    setTimeout(() => {
      onAdd({
        title: values.title.trim(),
        artist: values.artist.trim(),
        year: Number(values.year),
        genre: values.genre as Genre,
        type: values.type as RecordType,
        size: values.size as RecordSize,
      });
      close();
    }, 900);
  }

  function reset() {
    setValues(EMPTY);
    setTouched({});
    setAttempted(false);
    setSaving(false);
    triggerRef.current?.focus();
  }

  const field = (k: Key) => ({
    "data-field": k,
    value: values[k],
    onChange: set(k),
    onBlur: touch(k),
    "aria-invalid": show(k) ? true : undefined,
    "aria-describedby": show(k) ? `log-${k}-problem` : undefined,
  });

  // A plain render function, not a component: a component defined here would remount on every keystroke.
  function choice(k: "type" | "size", legend: string, options: string[]) {
    return (
      <fieldset aria-describedby={show(k) ? `log-${k}-problem` : undefined}>
        <legend className={label}>{legend}</legend>
        <div className="flex flex-wrap gap-x-ds-24">
          {options.map((o, i) => (
            <Radio
              key={o}
              name={`log-${k}`}
              label={o}
              value={o}
              checked={values[k] === o}
              onChange={set(k)}
              data-field={i === 0 ? k : undefined}
              aria-invalid={show(k) ? true : undefined}
            />
          ))}
        </div>
        <Problem id={`log-${k}-problem`} text={show(k)} />
      </fieldset>
    );
  }

  return (
    <>
      <Button ref={triggerRef} variant="primary" onClick={() => ref.current?.showModal()}>
        Log a record
      </Button>
      <dialog
        ref={ref}
        aria-labelledby="log-title"
        onKeyDown={keepFocusInside}
        onClose={reset}
        onClick={(e) => e.target === ref.current && close()}
        className={DIALOG}
      >
        <div className="p-ds-24">
          <div className="flex items-start justify-between gap-ds-16">
            <h2 id="log-title" className="ds-head text-ds-heading font-normal">
              Log a record
            </h2>
            <CloseButton onClick={close} />
          </div>

          <form onSubmit={submit} noValidate className="mt-ds-16">
            <fieldset disabled={saving} className="space-y-ds-16">
              <div>
                <Field label="Title">
                  <TextInput {...field("title")} autoFocus />
                </Field>
                <Problem id="log-title-problem" text={show("title")} />
              </div>
              <div>
                <Field label="Artist">
                  <TextInput {...field("artist")} />
                </Field>
                <Problem id="log-artist-problem" text={show("artist")} />
              </div>
              <div className="grid grid-cols-2 gap-ds-16">
                <div>
                  <Field label="Year">
                    <TextInput {...field("year")} inputMode="numeric" maxLength={4} placeholder="YYYY" />
                  </Field>
                  <Problem id="log-year-problem" text={show("year")} />
                </div>
                <div>
                  <Field label="Genre">
                    <Select {...field("genre")}>
                      <option value="" disabled>
                        Choose
                      </option>
                      {GENRES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Problem id="log-genre-problem" text={show("genre")} />
                </div>
              </div>
              {choice("type", "Type", TYPES)}
              {choice("size", "Size", SIZES)}
            </fieldset>

            {!valid && !saving && <p className={`${label} mt-ds-24`}>Fill in every field to save</p>}
            <div className={`${!valid && !saving ? "mt-ds-12" : "mt-ds-24"} flex flex-wrap items-center justify-end gap-ds-12`}>
              <Button onClick={close} disabled={saving}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" aria-disabled={!valid || saving} aria-busy={saving}>
                {saving ? (
                  <>
                    <svg viewBox="0 0 32 32" className="h-4 w-4 motion-safe:animate-spin" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <circle cx="16" cy="16" r="12" strokeOpacity="0.4" />
                      <path d="M16 4a12 12 0 0 1 12 12" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
            <p role="status" className="sr-only">
              {saving ? "Saving" : ""}
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
