import Link from "next/link";
import type { ReactNode } from "react";
import HubLink from "../../hub-link";
import type { DsTheme } from "./theme";
import { themeVars } from "./theme";

/** The themed wrapper, hub link, and header shared by every design system page. */
export default function DsShell({ theme, children }: { theme: DsTheme; children?: ReactNode }) {
  return (
    <div data-theme={theme.id} style={themeVars(theme)} className="min-h-screen bg-ds-bg font-ds-body text-ds-body text-ds-text">
      <main className="mx-auto max-w-[1100px] px-ds-16 pb-ds-32 pt-ds-32 md:px-ds-32 md:pt-ds-32">
        <HubLink className="mb-ds-16" />
        <header>
          <p className="text-ds-label ds-label text-ds-muted">Design system · {theme.order}</p>
          <h1 className="mt-ds-12 ds-head text-ds-display font-normal">{theme.name} · Design System</h1>
          <p className="mt-ds-12 max-w-xl text-ds-muted">
            A UI library built from the{" "}
            <Link href={theme.mood} className="text-ds-text underline underline-offset-4">
              {theme.name} mood board
            </Link>
            : {theme.blurb}
          </p>
        </header>
        {children}
      </main>
    </div>
  );
}
