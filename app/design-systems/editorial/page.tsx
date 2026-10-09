import type { Metadata } from "next";
import ColorRoles from "../_shared/sections/color-roles";
import ControlStates from "../_shared/sections/control-states";
import SpacingShape from "../_shared/sections/spacing-shape";
import Components from "../_shared/sections/components";
import TypeRoles from "../_shared/sections/type-roles";
import UiStates from "../_shared/sections/ui-states";
import DsShell from "../_shared/shell";
import { EdRecord } from "./record";
import { editorial } from "./theme";

export const metadata: Metadata = { title: "Editorial · Design System" };

export default function EditorialDesignSystem() {
  return (
    <DsShell theme={editorial}>
      <ColorRoles theme={editorial} />
      <TypeRoles theme={editorial} />
      <SpacingShape theme={editorial} />
      <Components accentName={editorial.accentName} art={(size) => <EdRecord size={size} />} />
      <ControlStates />
      <UiStates />
    </DsShell>
  );
}
