import type { ReactNode } from "react";
import Section from "../section";
import { Button, Checkbox, Chip, Radio, Select, Tab, TextInput, TextLink, Toggle, type State } from "../ui";

const NAMES: Record<State, string> = {
  rest: "Rest",
  hover: "Hover",
  focus: "Focus",
  pressed: "Pressed",
  selected: "Selected",
  disabled: "Disabled",
};

const ALL: State[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

function Row({ name, states, render }: { name: string; states: State[]; render: (s: State) => ReactNode }) {
  return (
    <div className="grid gap-calm-12 border-t border-calm-border py-calm-16 first:border-t-0 md:grid-cols-[160px_1fr] md:gap-calm-24">
      <h3 className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted md:pt-calm-12">{name}</h3>
      <ul className="flex flex-wrap gap-x-calm-24 gap-y-calm-16">
        {states.map((s) => (
          <li key={s} className="flex min-w-[88px] flex-col items-start gap-calm-8">
            <div className="flex min-h-11 items-center">{render(s)}</div>
            <span className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{NAMES[s]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ControlStates() {
  return (
    <Section n={5} title="Control states">
      <p className="max-w-xl text-calm-muted">
        Each sample is a labeled, static picture of one state. The live controls in section 4 respond to the real thing: hover, Tab focus, and press.
      </p>
      <div className="mt-calm-24 rounded-calm-12 border border-calm-border bg-calm-surface px-calm-16 md:px-calm-24">
        <Row
          name="Primary button"
          states={ALL}
          render={(s) => (
            <Button variant="primary" state={s}>
              {s === "selected" ? "✓ Logged" : "Log"}
            </Button>
          )}
        />
        <Row
          name="Secondary button"
          states={ALL}
          render={(s) => (
            <Button state={s}>{s === "selected" ? "✓ Skipped" : "Skip"}</Button>
          )}
        />
        <Row name="Link" states={["rest", "hover", "focus", "pressed"]} render={(s) => <TextLink state={s}>See all →</TextLink>} />
        <Row
          name="Text input"
          states={["rest", "hover", "focus", "disabled"]}
          render={(s) => <TextInput state={s} aria-label="Search records" placeholder="Search records" className="w-44" />}
        />
        <Row
          name="Select"
          states={["rest", "hover", "focus", "disabled"]}
          render={(s) => (
            <div className="w-44">
              <Select state={s} aria-label="Sort" defaultValue="Recent">
                <option value="Recent">Sort: Recent</option>
              </Select>
            </div>
          )}
        />
        <Row name="Checkbox" states={ALL} render={(s) => <Checkbox state={s} label="Sealed" />} />
        <Row name="Radio" states={ALL} render={(s) => <Radio state={s} name={`r-${s}`} label="LP" />} />
        <Row name="Toggle" states={ALL} render={(s) => <Toggle state={s} label="Alerts" />} />
        <Row name="Tab" states={ALL} render={(s) => <Tab state={s}>Week</Tab>} />
        <Row name="Filter chip" states={ALL} render={(s) => <Chip state={s}>Jazz</Chip>} />
      </div>
    </Section>
  );
}
