import type { Metadata } from "next";
import { themeVars } from "../design-systems/_shared/theme";
import { editorial } from "../design-systems/editorial/theme";
import HubLink from "../hub-link";
import Collection from "./collection";

export const metadata: Metadata = { title: "Vinyl Collection" };

// The site uses the Editorial design system. Its tokens apply only inside this wrapper.
export default function VinylCollectionPage() {
  return (
    <div data-theme="editorial" style={themeVars(editorial)} className="min-h-screen bg-ds-bg font-ds-body text-ds-body text-ds-text">
      <main className="mx-auto max-w-[1280px] px-ds-16 pb-ds-32 pt-ds-24 md:px-ds-32">
        <HubLink className="mb-ds-16" />
        <Collection />
      </main>
    </div>
  );
}
