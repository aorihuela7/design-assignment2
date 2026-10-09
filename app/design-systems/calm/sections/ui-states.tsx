import type { ReactNode } from "react";
import Section from "../section";
import { Button } from "../ui";

const ICON = "h-8 w-8 text-calm-text";

const STATES: { name: string; title: string; body: string; icon: ReactNode; action?: ReactNode; role?: "status" | "alert" }[] = [
  {
    name: "Empty",
    title: "No records yet",
    body: "Log your first record to start the collection.",
    icon: (
      <svg viewBox="0 0 32 32" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="13" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    action: (
      <Button variant="primary" state="rest">
        Log a record
      </Button>
    ),
  },
  {
    name: "Loading",
    role: "status",
    title: "Loading…",
    body: "Fetching your records.",
    icon: (
      <svg viewBox="0 0 32 32" className={`${ICON} motion-safe:animate-spin`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="13" strokeOpacity="0.5" />
        <path d="M16 3a13 13 0 0 1 13 13" />
      </svg>
    ),
  },
  {
    name: "Error",
    role: "alert",
    title: "Couldn’t load",
    body: "Something went wrong on our side.",
    icon: (
      <svg viewBox="0 0 32 32" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="13" />
        <path d="M16 9v9M16 22v1" strokeLinecap="round" />
      </svg>
    ),
    action: <Button state="rest">Try again</Button>,
  },
  {
    name: "Success",
    role: "status",
    title: "Saved",
    body: "Evening Hours is in your collection.",
    icon: (
      <svg viewBox="0 0 32 32" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="13" />
        <path d="m10 16.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function UiStates() {
  return (
    <Section n={6} title="UI states">
      <p className="max-w-xl text-calm-muted">Every screen can be empty, loading, broken, or done. Each state has an icon and a word, never color alone.</p>
      <ul className="mt-calm-24 grid gap-calm-16 sm:grid-cols-2 lg:grid-cols-4">
        {STATES.map((s) => (
          <li key={s.name} className="rounded-calm-12 border border-calm-border bg-calm-surface p-calm-24">
            <div role={s.role} className="flex h-full flex-col">
              <p className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{s.name}</p>
              <div className="mt-calm-16">{s.icon}</div>
              <h3 className="mt-calm-12 font-calm-serif text-calm-heading font-normal">{s.title}</h3>
              <p className="mt-calm-4 text-calm-muted">{s.body}</p>
              {s.action && <div className="mt-calm-16">{s.action}</div>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
