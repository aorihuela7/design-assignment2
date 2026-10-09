import type { Metadata } from "next";
import ColorRoles from "../_shared/sections/color-roles";
import SpacingShape from "../_shared/sections/spacing-shape";
import TypeRoles from "../_shared/sections/type-roles";
import DsShell from "../_shared/shell";
import { jukebox } from "./theme";

export const metadata: Metadata = { title: "Jukebox · Design System" };

export default function JukeboxDesignSystem() {
  return (
    <DsShell theme={jukebox}>
      <ColorRoles theme={jukebox} />
      <TypeRoles theme={jukebox} />
      <SpacingShape theme={jukebox} />
    </DsShell>
  );
}
