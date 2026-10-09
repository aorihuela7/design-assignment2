import { motion, radii, spacing } from "../tokens";
import Section from "../section";

const label = "text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted";

export default function SpacingShape() {
  return (
    <Section n={3} title="Spacing and shape">
      <div className="grid gap-calm-24 md:grid-cols-2">
        <div className="rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16 md:p-calm-24">
          <p className={label}>Spacing scale</p>
          <ul className="mt-calm-16 space-y-calm-12">
            {spacing.map((s) => (
              <li key={s} className="flex items-center gap-calm-16">
                <span className="w-12 font-calm-serif">{s}px</span>
                <span className="h-calm-8 bg-calm-text" style={{ width: s * 4 }} aria-hidden />
              </li>
            ))}
          </ul>
          <p className="mt-calm-16 text-calm-muted">Bars are drawn at four times size. More space between groups than inside them.</p>
        </div>

        <div className="rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16 md:p-calm-24">
          <p className={label}>Corners</p>
          <ul className="mt-calm-16 flex gap-calm-16">
            {radii.map((r) => (
              <li key={r} className="flex-1">
                <div className="h-16 border border-calm-muted bg-calm-bg" style={{ borderRadius: r }} aria-hidden />
                <p className="mt-calm-8 font-calm-serif">{r}px</p>
                <p className="text-calm-muted">{r === 0 ? "Dividers" : r === 6 ? "Inputs, checkbox" : "Buttons, chips, cards"}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16 md:p-calm-24">
          <p className={label}>Borders and shadow</p>
          <div className="mt-calm-16 flex gap-calm-16">
            <div className="flex-1 rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16">
              <p className="font-calm-serif text-calm-heading">1px</p>
              <p className="text-calm-muted">Border color for cards and dividers.</p>
            </div>
            <div className="flex-1 rounded-calm-12 border border-calm-muted bg-calm-surface p-calm-16">
              <p className="font-calm-serif text-calm-heading">1px</p>
              <p className="text-calm-muted">Muted for control edges.</p>
            </div>
          </div>
          <p className="mt-calm-16">No shadow. A thin line does the work.</p>
        </div>

        <div className="rounded-calm-12 border border-calm-border bg-calm-surface p-calm-16 md:p-calm-24">
          <p className={label}>Motion</p>
          <p className="mt-calm-16 font-calm-serif text-calm-heading">
            {motion.duration}, {motion.easing}
          </p>
          <p className="mt-calm-8 text-calm-muted">No bounce, no overshoot. Hover the bar to see it.</p>
          <div className="group mt-calm-16 h-calm-12 w-full overflow-hidden rounded-calm-6 border border-calm-muted">
            <div className="h-full w-1/4 bg-calm-text transition-[width] duration-200 ease-out group-hover:w-full motion-reduce:transition-none" />
          </div>
        </div>
      </div>
    </Section>
  );
}
