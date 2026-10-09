import type { ReactNode } from "react";
import { records } from "../records";
import Section from "../section";
import { Button, Checkbox, Chip, Radio, RecordRow, Select, Tab, TextInput, TextLink, Toggle, type State } from "../ui";

const ALL: State[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

const NAMES: Record<State, string> = {
  rest: "Rest",
  hover: "Hover",
  focus: "Focus",
  pressed: "Pressed",
  selected: "Selected",
  disabled: "Disabled",
};

const ROWS: { name: string; states: State[]; render: (s: State) => ReactNode }[] = [
  {
    name: "Primary button",
    states: ALL,
    render: (s) => (
      <Button variant="primary" state={s}>
        {s === "selected" ? "✓ Logged" : "Log"}
      </Button>
    ),
  },
  { name: "Secondary button", states: ALL, render: (s) => <Button state={s}>{s === "selected" ? "✓ Skipped" : "Skip"}</Button> },
  { name: "Link", states: ["rest", "hover", "focus", "pressed"], render: (s) => <TextLink state={s}>See all →</TextLink> },
  {
    name: "Text input",
    states: ["rest", "hover", "focus", "disabled"],
    render: (s) => <TextInput state={s} aria-label="Search records" placeholder="Search" className="w-full" />,
  },
  {
    name: "Select",
    states: ["rest", "hover", "focus", "disabled"],
    render: (s) => (
      <div className="w-full">
        <Select state={s} aria-label="Sort" defaultValue="Recent">
          <option value="Recent">Recent</option>
        </Select>
      </div>
    ),
  },
  { name: "Checkbox", states: ALL, render: (s) => <Checkbox state={s} label="Sealed copy" hideLabel /> },
  { name: "Radio", states: ALL, render: (s) => <Radio state={s} name={`r-${s}`} label="LP" hideLabel /> },
  { name: "Toggle", states: ALL, render: (s) => <Toggle state={s} label="Alerts" compact /> },
  { name: "Tab", states: ALL, render: (s) => <Tab state={s}>Week</Tab> },
  { name: "Filter chip", states: ALL, render: (s) => <Chip state={s}>Jazz</Chip> },
  {
    name: "List row",
    states: ["rest", "hover", "focus", "pressed", "selected"],
    render: (s) => <RecordRow record={records[2]} state={s} compact />,
  },
];

const label = "text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted";

export default function ControlStates() {
  return (
    <Section n={5} title="Control states">
      <p className="max-w-xl text-calm-muted">
        Each sample is a static picture of one state; a dash means the state does not apply. The live controls in section 4 respond to the real thing: hover, Tab focus, and press.
      </p>
      <div className="mt-calm-24 rounded-calm-12 border border-calm-border bg-calm-surface">
        <table className="block w-full border-collapse md:table md:table-fixed">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-calm-border">
              <th scope="col" className={`${label} p-calm-16 text-left`}>
                Control
              </th>
              {ALL.map((s) => (
                <th key={s} scope="col" className={`${label} px-calm-8 py-calm-16 text-left`}>
                  {NAMES[s]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {ROWS.map((row) => (
              <tr key={row.name} className="grid grid-cols-2 gap-x-calm-16 gap-y-calm-12 border-t border-calm-border p-calm-16 first:border-t-0 md:table-row md:p-0">
                <th scope="row" className={`${label} col-span-2 text-left md:table-cell md:w-40 md:p-calm-16 md:align-middle`}>
                  {row.name}
                </th>
                {ALL.map((s) =>
                  row.states.includes(s) ? (
                    <td key={s} className="flex flex-col items-start gap-calm-8 md:table-cell md:px-calm-8 md:py-calm-12 md:align-middle">
                      {row.render(s)}
                      <span className={`${label} md:hidden`}>{NAMES[s]}</span>
                    </td>
                  ) : (
                    <td key={s} className="hidden px-calm-8 text-calm-muted md:table-cell md:align-middle">
                      <span aria-hidden>—</span>
                      <span className="sr-only">Not applicable</span>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
