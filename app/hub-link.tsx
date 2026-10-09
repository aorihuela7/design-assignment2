import Link from "next/link";

/**
 * "← Hub" link shared by every page except the homepage. It has no colors or fonts of its own:
 * it reads the --hub-* variables that each page sets from its own theme (see .hub-link in globals.css),
 * so nothing leaks between routes.
 */
export default function HubLink({ className }: { className?: string }) {
  return (
    <nav aria-label="Back to hub" className={className}>
      <Link href="/" className="hub-link">
        <span aria-hidden>←</span> Hub
      </Link>
    </nav>
  );
}
