import type { Metadata } from "next";
import Link from "next/link";
import HubLink from "../../hub-link";
import ColorRoles from "./sections/color-roles";
import ControlStates from "./sections/control-states";
import Components from "./sections/components";
import SpacingShape from "./sections/spacing-shape";
import UiStates from "./sections/ui-states";
import TypeRoles from "./sections/type-roles";
import { themeVars } from "./tokens";

export const metadata: Metadata = { title: "Calm · Design System" };

export default function CalmDesignSystem() {
  return (
    <div data-theme="calm" style={themeVars} className="min-h-screen bg-calm-bg font-calm-sans text-calm-body text-calm-text">
      <main className="mx-auto max-w-[1100px] px-calm-16 pb-calm-32 pt-calm-32 md:px-calm-32 md:pt-calm-32">
        <HubLink className="mb-calm-16" />
        <header>
          <p className="text-calm-label font-medium uppercase tracking-[0.18em] text-calm-muted">Design system · 1 of 3</p>
          <h1 className="mt-calm-12 font-calm-serif text-calm-display font-normal">Calm · Design System</h1>
          <p className="mt-calm-12 max-w-xl text-calm-muted">
            A UI library built from the{" "}
            <Link href="/mood-boards/calm" className="text-calm-text underline underline-offset-4">
              Calm mood board
            </Link>
            : matte, warm, and quiet.
          </p>
        </header>

        <ColorRoles />
        <TypeRoles />
        <SpacingShape />
        <Components />
        <ControlStates />
        <UiStates />
      </main>
    </div>
  );
}
