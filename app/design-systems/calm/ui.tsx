"use client";

import { useId, useRef, useState } from "react";
import { Record } from "../../mood-boards/calm/art";
import type { records } from "./records";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

// The Calm control library. Every control styles its states with the st-* variants, which match the
// real :hover / :focus-visible / :active / :disabled and also a data-state attribute. A labeled static
// sample passes `state`; a live control passes nothing and responds to the real thing.

export type State = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

/** Props that make a sample static: forced state, skipped by Tab, ignoring the pointer. */
function sample(state?: State) {
  if (!state) return {};
  return {
    "data-state": state,
    tabIndex: -1,
    disabled: state === "disabled",
    className: "pointer-events-none",
  };
}

const focusRing = "outline-offset-2 st-focus:outline-2 st-focus:outline-calm-text";
const fade = "transition-colors duration-200 ease-out motion-reduce:transition-none";
const control = `${focusRing} ${fade}`;

function join(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

/* Buttons */

const BUTTON = {
  primary:
    "bg-calm-accent text-calm-surface st-hover:bg-calm-accent-hover st-press:bg-calm-accent-pressed st-selected:bg-calm-accent-hover st-disabled:bg-calm-border st-disabled:text-calm-muted",
  secondary:
    "border border-calm-muted bg-calm-surface text-calm-text st-hover:bg-calm-bg st-press:bg-calm-border st-selected:border-calm-text st-selected:bg-calm-text st-selected:text-calm-surface st-disabled:border-calm-border st-disabled:bg-calm-surface st-disabled:text-calm-muted",
} as const;

export function Button({
  variant = "secondary",
  state,
  className,
  children,
  ...props
}: { variant?: keyof typeof BUTTON; state?: State; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const s = sample(state);
  return (
    <button
      type="button"
      {...props}
      {...s}
      className={join(
        "inline-flex min-h-11 items-center justify-center gap-calm-8 whitespace-nowrap rounded-calm-12 px-calm-16 py-calm-8 text-calm-body font-medium st-disabled:cursor-not-allowed",
        BUTTON[variant],
        control,
        className,
        s.className,
      )}
    >
      {children}
    </button>
  );
}

export function TextLink({ state, children, href = "#" }: { state?: State; children: ReactNode; href?: string }) {
  const static_ = state !== undefined;
  return (
    <a
      href={href}
      data-state={state}
      tabIndex={static_ ? -1 : undefined}
      onClick={(e) => e.preventDefault()}
      className={join(
        "-mx-calm-4 inline-block rounded-calm-6 px-calm-4 text-calm-text underline decoration-calm-muted underline-offset-4 st-hover:bg-calm-bg st-hover:decoration-2 st-hover:decoration-calm-text st-press:bg-calm-border st-press:decoration-2 st-press:decoration-calm-text",
        control,
        static_ && "pointer-events-none",
      )}
    >
      {children}
    </a>
  );
}

/* Text input and select */

const FIELD =
  "min-h-11 w-full rounded-calm-6 border border-calm-muted bg-calm-surface px-calm-12 py-calm-8 text-calm-body text-calm-text placeholder:text-calm-muted st-hover:bg-calm-bg st-disabled:cursor-not-allowed st-disabled:border-calm-border st-disabled:bg-calm-bg st-disabled:text-calm-muted";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-calm-4 block text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{label}</span>
      {children}
    </label>
  );
}

export function TextInput({ state, className, ...props }: { state?: State } & InputHTMLAttributes<HTMLInputElement>) {
  const s = sample(state);
  return <input type="text" {...props} {...s} className={join(FIELD, control, className, s.className)} />;
}

export function Select({ state, children, ...props }: { state?: State; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  const s = sample(state);
  return (
    <div className="relative">
      <select {...props} {...s} className={join(FIELD, "appearance-none pr-10", control, s.className)}>
        {children}
      </select>
      <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-calm-12 top-1/2 h-2 w-3 -translate-y-1/2 text-calm-text" aria-hidden>
        <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* Checkbox and radio */

const BOX =
  "grid h-5 w-5 shrink-0 appearance-none place-content-center border border-calm-muted bg-calm-surface st-hover:bg-calm-bg st-press:bg-calm-border st-selected:border-calm-text st-selected:bg-calm-text st-disabled:cursor-not-allowed st-disabled:border-calm-border st-disabled:bg-calm-bg";

export function Checkbox({ label, state, hideLabel, ...props }: { label: string; state?: State; hideLabel?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const s = sample(state);
  return (
    <label className={join("inline-flex min-h-11 items-center gap-calm-12", state === "disabled" && "text-calm-muted")}>
      <input
        type="checkbox"
        defaultChecked={state === "selected"}
        {...props}
        {...s}
        className={join(
          BOX,
          "rounded-calm-6 before:text-[13px] before:leading-none before:text-calm-surface before:opacity-0 before:content-['✓'] st-selected:before:opacity-100",
          control,
          s.className,
        )}
      />
      <span className={hideLabel ? "sr-only" : undefined}>{label}</span>
    </label>
  );
}

export function Radio({ label, state, hideLabel, ...props }: { label: string; state?: State; hideLabel?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const s = sample(state);
  return (
    <label className={join("inline-flex min-h-11 items-center gap-calm-12", state === "disabled" && "text-calm-muted")}>
      <input
        type="radio"
        defaultChecked={state === "selected"}
        {...props}
        {...s}
        className={join(
          BOX,
          "rounded-calm-12 before:h-2 before:w-2 before:rounded-calm-12 before:bg-calm-surface before:opacity-0 before:content-[''] st-selected:before:opacity-100",
          control,
          s.className,
        )}
      />
      <span className={hideLabel ? "sr-only" : undefined}>{label}</span>
    </label>
  );
}

/* Toggle */

export function Toggle({ label, defaultOn = false, state, compact }: { label: string; defaultOn?: boolean; state?: State; compact?: boolean }) {
  const [on, setOn] = useState(defaultOn || state === "selected");
  const s = sample(state);
  const isOn = state ? state === "selected" : on;
  return (
    <span className="inline-flex min-h-11 items-center gap-calm-12">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        onClick={() => setOn(!on)}
        {...s}
        className={join(
          "group relative h-7 w-12 shrink-0 rounded-calm-12 border border-calm-muted bg-calm-surface st-hover:bg-calm-bg st-press:bg-calm-border st-selected:border-calm-text st-selected:bg-calm-text st-disabled:cursor-not-allowed st-disabled:border-calm-border st-disabled:bg-calm-bg",
          control,
          s.className,
        )}
      >
        <span
          className={join(
            "absolute left-1 top-1 h-5 w-5 rounded-calm-12 bg-calm-muted transition-transform duration-200 ease-out motion-reduce:transition-none group-st-selected:translate-x-5 group-st-selected:bg-calm-surface",
          )}
        />
      </button>
      {!compact && (
        <span className={state === "disabled" ? "text-calm-muted" : undefined}>
          {label}: {isOn ? "On" : "Off"}
        </span>
      )}
    </span>
  );
}

/* Tabs */

const TAB =
  "min-h-11 border-b-2 border-transparent px-calm-12 py-calm-8 text-calm-body text-calm-muted st-hover:text-calm-text st-press:bg-calm-border st-selected:border-calm-text st-selected:font-medium st-selected:text-calm-text st-disabled:cursor-not-allowed st-disabled:text-calm-muted st-disabled:opacity-50";

export function Tab({ state, children }: { state?: State; children: ReactNode }) {
  const s = sample(state);
  return (
    <button type="button" role="tab" aria-selected={state === "selected"} {...s} className={join(TAB, "rounded-t-calm-6", control, s.className)}>
      {children}
    </button>
  );
}

export function Tabs({ tabs }: { tabs: { name: string; panel: string }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function move(to: number) {
    const next = (to + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Period" className="flex border-b border-calm-border">
        {tabs.map((t, i) => (
          <button
            key={t.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-p${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") move(i + 1);
              if (e.key === "ArrowLeft") move(i - 1);
              if (e.key === "Home") move(0);
              if (e.key === "End") move(tabs.length - 1);
            }}
            className={join(TAB, "-mb-px rounded-t-calm-6", control)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-p${active}`} aria-labelledby={`${id}-t${active}`} className="pt-calm-16">
        {tabs[active].panel}
      </div>
    </div>
  );
}

/* Filter chips */

const CHIP =
  "inline-flex min-h-9 items-center gap-calm-4 rounded-calm-12 border border-calm-muted bg-calm-surface px-calm-12 py-calm-4 text-calm-body st-hover:bg-calm-bg st-press:bg-calm-border st-selected:border-calm-text st-selected:bg-calm-text st-selected:text-calm-surface st-disabled:cursor-not-allowed st-disabled:border-calm-border st-disabled:text-calm-muted";

export function Chip({ selected, state, children, ...props }: { selected?: boolean; state?: State; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const s = sample(state);
  const on = selected ?? state === "selected";
  return (
    <button type="button" aria-pressed={on} {...props} {...s} className={join(CHIP, control, s.className)}>
      {on && <span aria-hidden>✓</span>}
      {children}
    </button>
  );
}

export function ChipGroup({ options }: { options: string[] }) {
  const [active, setActive] = useState(options[0]);
  return (
    <div role="group" aria-label="Genre" className="flex flex-wrap gap-calm-8">
      {options.map((o) => (
        <Chip key={o} selected={active === o} onClick={() => setActive(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}

/* Badge */

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-calm-6 border border-calm-text px-calm-8 py-px text-calm-label font-medium uppercase tracking-[0.18em]">
      {children}
    </span>
  );
}

/* Dialogs: native <dialog>, so focus is trapped, Esc closes it, and focus returns to the opener. */

const DIALOG =
  "m-auto w-[min(92vw,28rem)] rounded-calm-12 border border-calm-border bg-calm-surface p-0 font-calm-sans text-calm-body text-calm-text backdrop:bg-calm-text/40";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={join("-mr-calm-8 -mt-calm-4 grid h-11 w-11 place-items-center rounded-calm-12 st-hover:bg-calm-bg st-press:bg-calm-border", control)}
    >
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden>
        <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </button>
  );
}

/* List rows: each row is a button that selects the record and opens its detail panel. */

type RecordItem = (typeof records)[number];

export function RecordRow({ record, selected, state, compact, onSelect }: { record: RecordItem; selected?: boolean; state?: State; compact?: boolean; onSelect?: () => void }) {
  const s = sample(state);
  const on = selected ?? state === "selected";
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-current={on ? "true" : undefined}
      onClick={onSelect}
      {...s}
      className={join(
        compact ? "flex min-h-11 w-full items-center justify-between gap-calm-8 rounded-calm-6 border border-calm-border px-calm-12 py-calm-8 text-left st-hover:bg-calm-bg st-press:bg-calm-border st-selected:bg-calm-text st-selected:text-calm-surface" : "flex min-h-11 w-full items-center justify-between gap-calm-16 px-calm-16 py-calm-12 text-left st-hover:bg-calm-bg st-press:bg-calm-border st-selected:bg-calm-text st-selected:text-calm-surface",
        control,
        s.className,
      )}
    >
      <span className="min-w-0">
        <span className={join("block font-calm-serif", compact ? "text-calm-body" : "text-calm-heading")}>{record.title}</span>
        {!compact && <span className={join("block", on ? "text-calm-border" : "text-calm-muted")}>{record.artist}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-calm-12">
        {!compact && <span className={join("text-calm-label font-medium uppercase tracking-[0.18em]", on ? "text-calm-border" : "text-calm-muted")}>{record.year}</span>}
        {on ? (
          <span aria-hidden>✓</span>
        ) : (
          <svg viewBox="0 0 8 12" className="h-3 w-2 text-calm-muted" aria-hidden>
            <path d="m1.5 1.5 5 4.5-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>
    </button>
  );
}

export function RecordList({ items }: { items: readonly RecordItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const current = active === null ? null : items[active];

  return (
    <>
      <ul className="divide-y divide-calm-border rounded-calm-12 border border-calm-border bg-calm-surface">
        {items.map((r, i) => (
          <li key={r.title} className="first:[&>button]:rounded-t-[11px] last:[&>button]:rounded-b-[11px]">
            <RecordRow
              record={r}
              selected={active === i}
              onSelect={() => {
                setActive(i);
                ref.current?.showModal();
              }}
            />
          </li>
        ))}
      </ul>
      <dialog ref={ref} aria-labelledby="record-title" onClick={(e) => e.target === ref.current && ref.current?.close()} className={DIALOG}>
        {current && (
          <div className="p-calm-24">
            <div className="flex items-start justify-between gap-calm-16">
              <h3 id="record-title" className="font-calm-serif text-calm-heading font-normal">
                {current.title}
              </h3>
              <CloseButton onClick={() => ref.current?.close()} />
            </div>
            <div className="mt-calm-16 flex gap-calm-16">
              <Record size={88} />
              <div>
                {current.isNew && <Badge>New</Badge>}
                <p className="mt-calm-8">{current.artist}</p>
                <p className="text-calm-muted">
                  {current.year} · {current.genre}
                </p>
              </div>
            </div>
            <div className="mt-calm-24 flex justify-end">
              <Button onClick={() => ref.current?.close()}>Close</Button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

/* Modal: log a record */

export function LogModal() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button variant="primary" onClick={() => ref.current?.showModal()}>
        Log a record
      </Button>
      <dialog ref={ref} aria-labelledby="log-title" onClick={(e) => e.target === ref.current && ref.current?.close()} className={DIALOG}>
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            ref.current?.close();
          }}
          className="p-calm-24"
        >
          <div className="flex items-start justify-between gap-calm-16">
            <h3 id="log-title" className="font-calm-serif text-calm-heading font-normal">
              Log a record
            </h3>
            <CloseButton onClick={() => ref.current?.close()} />
          </div>
          <div className="mt-calm-16 space-y-calm-16">
            <Field label="Title">
              <TextInput placeholder="Evening Hours" autoFocus />
            </Field>
            <Field label="Artist">
              <TextInput placeholder="Mara Voss" />
            </Field>
          </div>
          <div className="mt-calm-24 flex justify-end gap-calm-12">
            <Button onClick={() => ref.current?.close()}>Cancel</Button>
            <Button variant="primary" type="submit">
              Log
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
}

/* Motion demo: a button, so it works with mouse, touch, and keyboard. */

export function MotionDemo({ duration }: { duration: string }) {
  const [full, setFull] = useState(false);
  return (
    <div>
      <div className="h-calm-12 w-full overflow-hidden rounded-calm-6 border border-calm-muted" aria-hidden>
        <div
          className="h-full bg-calm-text transition-[width] ease-out motion-reduce:transition-none"
          style={{ width: full ? "100%" : "25%", transitionDuration: duration }}
        />
      </div>
      <div className="mt-calm-16">
        <Button onClick={() => setFull(!full)}>Play motion</Button>
      </div>
    </div>
  );
}
