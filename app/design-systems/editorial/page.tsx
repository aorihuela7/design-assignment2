import type { Metadata } from "next";
import ColorRoles from "../_shared/sections/color-roles";
import SpacingShape from "../_shared/sections/spacing-shape";
import TypeRoles from "../_shared/sections/type-roles";
import DsShell from "../_shared/shell";
import { editorial } from "./theme";

export const metadata: Metadata = { title: "Editorial · Design System" };

export default function EditorialDesignSystem() {
  return (
    <DsShell theme={editorial}>
      <ColorRoles theme={editorial} />
      <TypeRoles theme={editorial} />
      <SpacingShape theme={editorial} />
    </DsShell>
  );
}
