import Link from "next/link";

export default function Placeholder({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
      <Link href="/" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
        ← Hub
      </Link>
      <p className="mt-10 text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">Coming soon.</p>
    </main>
  );
}
