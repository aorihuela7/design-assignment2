"use client";

import { useId, useRef, useState } from "react";
import type { records } from "./records";
import type { ButtonHTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactNode, SelectHTMLAttributes } from "react";

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

const focusRing = "outline-offset-2 st-focus:outline-2 st-focus:outline-ds-text";
const fade = "transition-[color,background-color,border-color,transform] duration-(--ds-duration) ease-out motion-reduce:transition-none";
const control = `${focusRing} ${fade}`;

function join(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

/* Buttons */

const BUTTON = {
  primary:
    "font-(family-name:--ds-primary-font) [font-style:var(--ds-primary-style)] [text-transform:var(--ds-primary-transform)] border-(length:--ds-primary-bw) border-ds-accent bg-ds-primary-bg text-ds-primary-fg st-hover:bg-ds-primary-hover st-hover:shadow-(--ds-primary-glow) st-press:bg-ds-primary-pressed st-selected:bg-ds-primary-selected st-selected:text-ds-primary-selected-fg st-disabled:border-ds-border st-disabled:bg-ds-border st-disabled:text-ds-muted st-disabled:shadow-none",
  secondary:
    "border-(length:--ds-ctl-w) border-ds-ctl bg-ds-surface text-ds-text st-hover:bg-ds-bg st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-bg st-disabled:border-ds-border st-disabled:bg-ds-surface st-disabled:text-ds-muted",
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
        "inline-flex min-h-11 items-center justify-center gap-ds-8 whitespace-nowrap rounded-ds-12 px-ds-16 py-ds-8 text-ds-body font-medium st-press:scale-95 st-disabled:cursor-not-allowed",
        BUTTON[variant],
        focusRing,
        "transition-[color,background-color,border-color,transform,box-shadow] duration-(--ds-duration) ease-out motion-reduce:transition-none",
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
        "-mx-ds-4 inline-block rounded-ds-6 px-ds-4 text-ds-text underline decoration-ds-muted underline-offset-4 st-hover:bg-ds-bg st-hover:decoration-2 st-hover:decoration-ds-text st-press:translate-y-px st-press:bg-ds-border st-press:decoration-2 st-press:decoration-ds-text",
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
  "min-h-11 w-full rounded-ds-6 border-(length:--ds-ctl-w) border-ds-ctl bg-ds-surface px-ds-12 py-ds-8 text-ds-body text-ds-text placeholder:text-ds-muted st-hover:bg-ds-bg st-disabled:cursor-not-allowed st-disabled:border-ds-border st-disabled:bg-ds-surface st-disabled:text-ds-muted st-disabled:placeholder:opacity-60";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-ds-4 block text-ds-label ds-label text-ds-muted">{label}</span>
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
      <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-ds-12 top-1/2 h-2 w-3 -translate-y-1/2 text-ds-text" aria-hidden>
        <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* Checkbox and radio */

const BOX =
  "grid h-5 w-5 shrink-0 appearance-none place-content-center border-(length:--ds-ctl-w) border-ds-ctl bg-ds-surface st-hover:border-ds-text st-hover:bg-ds-bg st-press:scale-90 st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-surface st-disabled:cursor-not-allowed st-disabled:border-ds-border st-disabled:bg-ds-surface";

export function Checkbox({ label, state, hideLabel, ...props }: { label: string; state?: State; hideLabel?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const s = sample(state);
  return (
    <label className={join("inline-flex min-h-11 items-center gap-ds-12", state === "disabled" && "text-ds-muted")}>
      <input
        type="checkbox"
        defaultChecked={state === "selected"}
        {...props}
        {...s}
        className={join(
          BOX,
          "rounded-ds-6 before:text-[13px] before:leading-none before:text-ds-text before:opacity-0 before:content-['✓'] st-selected:before:opacity-100",
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
    <label className={join("inline-flex min-h-11 items-center gap-ds-12", state === "disabled" && "text-ds-muted")}>
      <input
        type="radio"
        defaultChecked={state === "selected"}
        {...props}
        {...s}
        className={join(
          BOX,
          "rounded-full before:h-2 before:w-2 before:rounded-full before:bg-ds-text before:opacity-0 before:content-[''] st-selected:before:opacity-100",
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
    <span className="inline-flex min-h-11 items-center gap-ds-12">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        onClick={() => setOn(!on)}
        {...s}
        className={join(
          "group relative h-7 w-12 shrink-0 rounded-ds-12 border-(length:--ds-ctl-w) border-ds-ctl bg-ds-surface st-hover:bg-ds-bg st-press:scale-95 st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-bg st-disabled:cursor-not-allowed st-disabled:border-ds-border st-disabled:bg-ds-surface",
          control,
          s.className,
        )}
      >
        <span
          className={join(
            "absolute left-1 top-1 h-5 w-5 rounded-ds-12 bg-ds-muted transition-transform duration-(--ds-duration) ease-out motion-reduce:transition-none group-st-hover:bg-ds-text group-st-selected:translate-x-5 group-st-selected:bg-ds-text",
          )}
        />
      </button>
      {!compact && (
        <span className={state === "disabled" ? "text-ds-muted" : undefined}>
          {label}: {isOn ? "On" : "Off"}
        </span>
      )}
    </span>
  );
}

/* Tabs */

const TAB =
  "relative min-h-11 overflow-hidden px-ds-12 py-ds-8 text-ds-body text-ds-muted after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent st-hover:bg-ds-bg st-hover:text-ds-text st-press:scale-95 st-press:bg-ds-border st-selected:font-medium st-selected:after:bg-ds-text st-selected:text-ds-text st-disabled:cursor-not-allowed st-disabled:text-ds-muted st-disabled:opacity-50";

export function Tab({ state, children }: { state?: State; children: ReactNode }) {
  const s = sample(state);
  return (
    <button type="button" role="tab" aria-selected={state === "selected"} {...s} className={join(TAB, "rounded-ds-6", control, s.className)}>
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
      <div role="tablist" aria-label="Period" className="flex border-b border-ds-border">
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
            className={join(TAB, "-mb-px rounded-ds-6", control)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-p${active}`} aria-labelledby={`${id}-t${active}`} className="pt-ds-16">
        {tabs[active].panel}
      </div>
    </div>
  );
}

/* Filter chips */

const CHIP =
  "inline-flex min-h-9 items-center gap-ds-4 rounded-ds-12 border-(length:--ds-ctl-w) border-ds-ctl bg-ds-surface px-ds-12 py-ds-4 text-ds-body st-hover:bg-ds-bg st-press:scale-95 st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-bg st-selected:font-medium st-disabled:cursor-not-allowed st-disabled:border-ds-border st-disabled:text-ds-muted";

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
    <div role="group" aria-label="Genre" className="flex flex-wrap gap-ds-8">
      {options.map((o) => (
        <Chip key={o} selected={active === o} onClick={() => setActive(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}

/* Badge */

/** A small badge. `mark` adds a decorative dot in a palette color (never the accent). */
export function Badge({ children, mark }: { children: ReactNode; mark?: string }) {
  return (
    <span className="inline-flex items-center gap-ds-4 rounded-ds-6 border border-ds-text px-ds-8 py-px text-ds-label ds-label">
      {mark && <span className="h-1.5 w-1.5 rounded-full" style={{ background: mark }} aria-hidden />}
      {children}
    </span>
  );
}

/* Dialogs: native <dialog>, so focus is trapped, Esc closes it, and focus returns to the opener. */

const DIALOG =
  "m-auto w-[min(92vw,28rem)] rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-0 font-ds-body text-ds-body text-ds-text backdrop:bg-(--ds-backdrop)";

/** Native showModal() makes the page inert, but Tab can still leave for the browser UI. Wrap it. */
function keepFocusInside(e: KeyboardEvent<HTMLDialogElement>) {
  if (e.key !== "Tab") return;
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>("button, input, select, textarea, a[href]")].filter((el) => !el.hasAttribute("disabled"));
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={join("-mr-ds-8 -mt-ds-4 grid h-11 w-11 place-items-center rounded-ds-12 st-hover:bg-ds-bg st-press:bg-ds-border", control)}
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
        compact ? "flex min-h-11 w-full items-center justify-between gap-ds-8 rounded-ds-6 border border-ds-border px-ds-12 py-ds-8 text-left st-hover:bg-ds-bg st-press:translate-y-px st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-bg" : "flex min-h-11 w-full items-center justify-between gap-ds-16 px-ds-16 py-ds-12 text-left border-l-2 border-transparent st-hover:bg-ds-bg st-press:translate-y-px st-press:bg-ds-border st-selected:border-ds-text st-selected:bg-ds-bg",
        control,
        s.className,
      )}
    >
      <span className="min-w-0">
        <span className={join("block ds-head", compact ? "text-ds-body" : "text-xl")}>{record.title}</span>
        {!compact && <span className="block text-ds-muted">{record.artist}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-ds-12">
        {!compact && <span className="text-ds-label ds-label text-ds-muted">{record.year}</span>}
        {on ? (
          <span aria-hidden>✓</span>
        ) : (
          <svg viewBox="0 0 8 12" className="h-3 w-2 text-ds-muted" aria-hidden>
            <path d="m1.5 1.5 5 4.5-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>
    </button>
  );
}

export function RecordList({ items, art, badgeMark }: { items: readonly RecordItem[]; art: ReactNode; badgeMark?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const current = active === null ? null : items[active];

  return (
    <>
      <ul className="divide-y divide-ds-border rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface">
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
      <dialog ref={ref} aria-labelledby="record-title" onClick={(e) => e.target === ref.current && ref.current?.close()} onKeyDown={keepFocusInside} className={DIALOG}>
        {current && (
          <div className="p-ds-24">
            <div className="flex items-start justify-between gap-ds-16">
              <h3 id="record-title" className="ds-head text-ds-heading font-normal">
                {current.title}
              </h3>
              <CloseButton onClick={() => ref.current?.close()} />
            </div>
            <div className="mt-ds-16 flex gap-ds-16">
              {art}
              <div>
                {current.isNew && <Badge mark={badgeMark}>New</Badge>}
                <p className="mt-ds-8">{current.artist}</p>
                <p className="text-ds-muted">
                  {current.year} · {current.genre}
                </p>
              </div>
            </div>
            <div className="mt-ds-24 flex justify-end">
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
      <dialog ref={ref} aria-labelledby="log-title" onClick={(e) => e.target === ref.current && ref.current?.close()} onKeyDown={keepFocusInside} className={DIALOG}>
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            ref.current?.close();
          }}
          className="p-ds-24"
        >
          <div className="flex items-start justify-between gap-ds-16">
            <h3 id="log-title" className="ds-head text-ds-heading font-normal">
              Log a record
            </h3>
            <CloseButton onClick={() => ref.current?.close()} />
          </div>
          <div className="mt-ds-16 space-y-ds-16">
            <Field label="Title">
              <TextInput placeholder="Evening Hours" autoFocus />
            </Field>
            <Field label="Artist">
              <TextInput placeholder="Mara Voss" />
            </Field>
          </div>
          <div className="mt-ds-24 flex justify-end gap-ds-12">
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
      <div className="h-ds-12 w-full overflow-hidden rounded-ds-6 border-(length:--ds-ctl-w) border-ds-ctl" aria-hidden>
        <div
          className="h-full bg-ds-text transition-[width] ease-out motion-reduce:transition-none"
          style={{ width: full ? "100%" : "25%", transitionDuration: duration }}
        />
      </div>
      <div className="mt-ds-16">
        <Button onClick={() => setFull(!full)}>Play motion</Button>
      </div>
    </div>
  );
}
