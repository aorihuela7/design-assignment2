import type { ReactNode } from "react";
import { records } from "../records";
import Section from "../section";
import { Badge, Button, Checkbox, ChipGroup, Field, LogModal, Radio, RecordList, Select, Tabs, TextInput, TextLink, Toggle } from "../ui";

function Group({ title, children, wide, top }: { title: string; children: ReactNode; wide?: boolean; top?: boolean }) {
  return (
    <div className={`rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-ds-16 md:p-ds-24 ${wide ? "md:col-span-2" : ""} ${top ? "self-start" : ""}`}>
      <h3 className="text-ds-label ds-label text-ds-muted">{title}</h3>
      <div className="mt-ds-16">{children}</div>
    </div>
  );
}

export default function Components({ art }: { art: (size: number) => ReactNode }) {
  const featured = records[0];
  return (
    <Section n={4} title="Components">
      <div className="grid gap-ds-24 md:grid-cols-2">
        <Group title="Buttons and link">
          <div className="flex flex-wrap items-center gap-ds-16">
            <Button variant="primary">Log</Button>
            <Button>Skip</Button>
            <TextLink>See all →</TextLink>
          </div>
          <p className="mt-ds-16 text-ds-muted">Moss marks the primary action. Everything else stays quiet.</p>
        </Group>

        <Group title="Text input and select">
          <div className="space-y-ds-16">
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
          <div className="space-y-ds-8">
            <div className="flex flex-wrap gap-x-ds-24">
              <Checkbox label="Sealed copy" defaultChecked />
              <Checkbox label="Mono pressing" />
            </div>
            <fieldset className="flex flex-wrap gap-x-ds-24">
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
              { name: "Year", panel: "26 records played this year." },
            ]}
          />
          <div className="mt-ds-24">
            <ChipGroup options={["All", "Jazz", "Rock", "Soul"]} />
          </div>
        </Group>

        <Group title="Card and badge" top>
          <p className="mb-ds-16 text-ds-muted">A card only shows a record. It is not a button, so it has no arrow and no hover.</p>
          <article className="flex gap-ds-16 rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-bg p-ds-16">
            {art(80)}
            <div className="min-w-0">
              <Badge>New</Badge>
              <h4 className="mt-ds-8 ds-head text-ds-heading font-normal">{featured.title}</h4>
              <p className="text-ds-muted">
                {featured.artist} · {featured.year}
              </p>
            </div>
          </article>
        </Group>

        <Group title="List rows">
          <RecordList items={records} art={art(88)} />
          <p className="mt-ds-16 text-ds-muted">Each row is a button: the arrow says it opens something, and the chosen row stays marked.</p>
        </Group>

        <Group title="Modal" wide>
          <p className="mb-ds-16 max-w-xl text-ds-muted">A detail panel that opens over the page. Esc, the close button, or a click outside closes it, and focus stays inside while it is open.</p>
          <LogModal />
        </Group>
      </div>
    </Section>
  );
}
