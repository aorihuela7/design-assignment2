import type { Metadata } from "next";
import ColorRoles from "../_shared/sections/color-roles";
import Components from "../_shared/sections/components";
import ControlStates from "../_shared/sections/control-states";
import SpacingShape from "../_shared/sections/spacing-shape";
import TypeRoles from "../_shared/sections/type-roles";
import DsShell from "../_shared/shell";
import { JbRecord } from "./record";
import { jukebox } from "./theme";

export const metadata: Metadata = { title: "Jukebox · Design System" };

export default function JukeboxDesignSystem() {
  return (
    <DsShell theme={jukebox}>
      <ColorRoles theme={jukebox} />
      <TypeRoles theme={jukebox} />
      <SpacingShape theme={jukebox} />
      <Components accentName={jukebox.accentName} primaryLabel={jukebox.primary?.label} art={(size) => <JbRecord size={size} />} />
      <ControlStates primaryLabel={jukebox.primary?.label} />
    </DsShell>
  );
}
