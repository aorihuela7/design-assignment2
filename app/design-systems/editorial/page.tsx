import type { Metadata } from "next";
import DsShell from "../_shared/shell";
import { editorial } from "./theme";

export const metadata: Metadata = { title: "Editorial · Design System" };

export default function EditorialDesignSystem() {
  return <DsShell theme={editorial} />;
}
