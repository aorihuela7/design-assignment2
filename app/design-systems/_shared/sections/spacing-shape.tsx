import type { DsTheme } from "../theme";
import Section from "../section";
import { MotionDemo } from "../ui";

const label = "text-ds-label ds-label text-ds-muted";
const panel = "rounded-ds-12 border-(length:--ds-rule-w) border-ds-rule bg-ds-surface p-ds-16 md:p-ds-24";

export default function SpacingShape({ theme }: { theme: DsTheme }) {
  return (
    <Section n={3} title="Spacing and shape">
      <div className="grid gap-ds-24 md:grid-cols-2">
        <div className={panel}>
          <p className={label}>Spacing scale</p>
          <ul className="mt-ds-16 space-y-ds-12">
            {theme.spacing.map((s) => (
              <li key={s} className="flex items-center gap-ds-16">
                <span className="w-12 ds-head">{s}<span className="normal-case">px</span></span>
                <span className="h-ds-8 bg-ds-text" style={{ width: s * 4 }} aria-hidden />
              </li>
            ))}
          </ul>
          <p className="mt-ds-16 text-ds-muted">{theme.spacingNote}</p>
        </div>

        <div className={panel}>
          <p className={label}>Corners</p>
          <ul className="mt-ds-16 flex gap-ds-16">
            {theme.radii.map((r) => (
              <li key={r.px} className={theme.radii.length > 1 ? "flex-1" : "w-40"}>
                <div className="h-16 border border-ds-ctl bg-ds-bg" style={{ borderRadius: r.px }} aria-hidden />
                <p className="mt-ds-8 ds-head">{r.px}<span className="normal-case">px</span></p>
                <p className="text-ds-muted">{r.use}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={panel}>
          <p className={label}>Borders and shadow</p>
          <div className="mt-ds-16 flex flex-wrap gap-ds-16">
            {theme.borders.map((b) => (
              <div key={b.title} className={`min-w-[140px] flex-1 rounded-ds-12 bg-ds-surface p-ds-16 ${b.cls}`}>
                <p className="ds-head text-ds-heading">{b.w.replace("px", "")}<span className="normal-case">px</span></p>
                <p className="mt-ds-4 text-ds-text">{b.title}</p>
                <p className="text-ds-muted">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-ds-16">{theme.shadowNote}</p>
        </div>

        <div className={panel}>
          <p className={label}>Motion</p>
          <p className="mt-ds-16 ds-head text-ds-heading">
            {theme.motion.duration}, {theme.motion.easing}
          </p>
          <p className="mt-ds-8 text-ds-muted">{theme.motion.note}</p>
          <div className="mt-ds-16">
            <MotionDemo duration={theme.motion.duration} />
          </div>
        </div>
      </div>
    </Section>
  );
}
