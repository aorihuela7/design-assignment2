import type { Metadata } from "next";
import { Record } from "../../mood-boards/calm/art";
import ColorRoles from "../_shared/sections/color-roles";
import Components from "../_shared/sections/components";
import ControlStates from "../_shared/sections/control-states";
import SpacingShape from "../_shared/sections/spacing-shape";
import TypeRoles from "../_shared/sections/type-roles";
import UiStates from "../_shared/sections/ui-states";
import DsShell from "../_shared/shell";
import { calm, calmDecorative } from "./theme";

export const metadata: Metadata = { title: "Calm · Design System" };

export default function CalmDesignSystem() {
  return (
    <DsShell theme={calm}>
      <ColorRoles theme={calm} />
      <TypeRoles theme={calm} />
      <SpacingShape theme={calm} />
      <Components accentName={calm.accentName} badgeMark={calmDecorative.clay} art={(size) => <Record size={size} />} />
      <ControlStates />
      <UiStates />
    </DsShell>
  );
}
