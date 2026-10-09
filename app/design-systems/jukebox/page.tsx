import type { Metadata } from "next";
import DsShell from "../_shared/shell";
import { jukebox } from "./theme";

export const metadata: Metadata = { title: "Jukebox · Design System" };

export default function JukeboxDesignSystem() {
  return <DsShell theme={jukebox} />;
}
