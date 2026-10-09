import type { ReactNode } from "react";
import { Record } from "../../../mood-boards/calm/art";
import { records } from "../records";
import Section from "../section";
import { Badge, Button, Checkbox, ChipGroup, Field, LogModal, Radio, Select, Tabs, TextInput, TextLink, Toggle } from "../ui";

function Group({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16 md:p-calm-24 ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{title}</h3>
      <div className="mt-calm-16">{children}</div>
    </div>
  );
}

export default function Components() {
  const featured = records[0];
  return (
    <Section n={4} title="Components">
      <div className="grid gap-calm-24 md:grid-cols-2">
        <Group title="Buttons and link">
          <div className="flex flex-wrap items-center gap-calm-16">
            <Button variant="primary">Log</Button>
            <Button>Skip</Button>
            <TextLink>See all →</TextLink>
          </div>
          <p className="mt-calm-16 text-calm-muted">Moss marks the primary action. Everything else stays quiet.</p>
        </Group>

        <Group title="Text input and select">
          <div className="space-y-calm-16">
            <Field label="Search records">
              <TextInput placeholder="Title or artist" />
            </Field>
            <Field label="Sort">
              <Select defaultValue="Recent">
                <option value="Recent">Sort: Recent</option>
                <option value="Title">Sort: Title</option>
                <option value="Year">Sort: Year</option>
              </Select>
            </Field>
          </div>
        </Group>

        <Group title="Checkbox, radio, toggle">
          <div className="space-y-calm-8">
            <div className="flex flex-wrap gap-x-calm-24">
              <Checkbox label="Sealed copy" defaultChecked />
              <Checkbox label="Mono pressing" />
            </div>
            <fieldset className="flex flex-wrap gap-x-calm-24">
              <legend className="sr-only">Format</legend>
              <Radio name="format" label="LP" defaultChecked />
              <Radio name="format" label="EP" />
              <Radio name="format" label="7-inch" />
            </fieldset>
            <Toggle label="New arrivals" defaultOn />
          </div>
        </Group>

        <Group title="Tabs and filter chips">
          <Tabs
            tabs={[
              { name: "Week", panel: "3 records played this week." },
              { name: "Month", panel: "11 records played this month." },
              { name: "All", panel: "41 records in the collection." },
            ]}
          />
          <div className="mt-calm-24">
            <ChipGroup options={["All", "Jazz", "Rock", "Soul"]} />
          </div>
        </Group>

        <Group title="Card and badge">
          <article className="flex gap-calm-16 rounded-calm-12 border border-calm-border bg-calm-bg p-calm-16">
            <Record size={80} />
            <div className="min-w-0">
              <Badge>New</Badge>
              <h4 className="mt-calm-8 font-calm-serif text-calm-heading font-normal">{featured.title}</h4>
              <p className="text-calm-muted">
                {featured.artist} · {featured.year}
              </p>
            </div>
          </article>
        </Group>

        <Group title="List rows">
          <ul className="divide-y divide-calm-border rounded-calm-12 border border-calm-border bg-calm-bg">
            {records.map((r) => (
              <li key={r.title} className="flex items-baseline justify-between gap-calm-16 px-calm-16 py-calm-12">
                <div className="min-w-0">
                  <p className="font-calm-serif text-calm-heading">{r.title}</p>
                  <p className="text-calm-muted">{r.artist}</p>
                </div>
                <p className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">{r.year}</p>
              </li>
            ))}
          </ul>
        </Group>

        <Group title="Modal" wide>
          <p className="mb-calm-16 max-w-xl text-calm-muted">A detail panel that opens over the page. Esc, the close button, or a click outside closes it, and focus stays inside while it is open.</p>
          <LogModal />
        </Group>
      </div>
    </Section>
  );
}
