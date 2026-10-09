import type { Metadata } from "next";
import Placeholder from "../placeholder";

export const metadata: Metadata = { title: "Vinyl Collection" };

export default function Page() {
  return <Placeholder eyebrow="Your site" title="Vinyl Collection" />;
}
