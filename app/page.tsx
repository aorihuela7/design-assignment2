import Link from "next/link";

const STYLES = [
  { slug: "calm", name: "Calm" },
  { slug: "editorial", name: "Editorial" },
  { slug: "jukebox", name: "Jukebox" },
];

const SECTIONS = [
  { title: "Mood Boards", links: STYLES.map((s) => ({ href: `/mood-boards/${s.slug}`, name: s.name })) },
  { title: "Design Systems", links: STYLES.map((s) => ({ href: `/design-systems/${s.slug}`, name: s.name })) },
  { title: "Your Site", links: [{ href: "/vinyl-collection", name: "Vinyl Collection" }] },
];

export default function Hub() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 md:px-10 md:pt-20">
      <h1 className="font-serif text-5xl leading-tight md:text-7xl">UI/UX &amp; Visual Design</h1>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {SECTIONS.map((section) => (
          <section key={section.title} aria-labelledby={section.title}>
            <h2 id={section.title} className="border-b border-line pb-3 text-xs uppercase tracking-widest text-muted">
              {section.title}
            </h2>
            <ul className="mt-2">
              {section.links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} className="flex items-center justify-between rounded-calm py-4 font-serif text-2xl hover:text-muted">
                    {l.name}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
