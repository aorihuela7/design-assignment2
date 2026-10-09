# Project: Vinyl Collection — Design, Build, Ship, Assignment 2 (UI/UX & Visual Design)

## What this is
A static Next.js (App Router, TypeScript) + Tailwind site on Vercel. The homepage is a hub linking to:
- /mood-boards/{calm,editorial,jukebox}  (25–30 artifacts each: photos, type, color, texture, interface pieces)
- /design-systems/{calm,editorial,jukebox}  (UI library, each built from its mood board)
- /vinyl-collection  (my site, in the style I pick; tentative pick: Editorial)

## Hard rules
- Fully static: no database, accounts, external APIs, or data storage. Interactions are faked in the browser; nothing is saved.
- Do not add packages I haven't asked for. Push back on backends or extra libraries.
- Small, frequent commits with clear messages.
- Remove anything extra. If a word or image doesn't help, cut it.
- Never use localStorage or any persistence.

## Design rules (from class)
- Hierarchy: size, weight, contrast, position. To emphasize something, make the rest quieter.
- Type roles: Display, Heading, Body, Label (Caption optional). A display/serif face plus a neutral sans, used consistently.
- Color roles: Background, Surface, Text, Muted, Border, Accent. Accent is only for the primary action.
- Never communicate with color alone; add an icon or a word.
- Body text contrast at least 4.5:1. Show ratios in each design system.
- Align to shared edges; more space between groups than inside them.
- Responsive: check 390px and 1440px; all content visible at every size.
- Controls need Rest, Hover, Focus (visible ring, never outline:none without a replacement), Pressed, Selected, Disabled.
- Screens need Empty, Loading, Error, Success states.
- Tokens live in Tailwind `@theme`.
- Each style must look like its mood, not the agent's default.

## Each design system page has
1 Color roles (with contrast ratios) · 2 Type roles · 3 Spacing and shape (scale, corners, borders, shadow) · 4 Components (buttons, link, input, select, checkbox/radio, toggle, tabs, filter chips, card with a vinyl record, list rows, badge, modal/detail panel) · 5 Control states · 6 UI states

## Site requirements
Clear visual hierarchy, at least two faked interactions (e.g. genre filter + record detail panel), every control in its states, accent only on the primary action, responsive.

## Verification
After UI changes, open the site in a browser (Playwright MCP or /chrome) at 390px and 1440px, try each interaction and Tab focus, save screenshots, and list anything broken or violating the design system.

## More context
Full class notes: docs/class-notes.md (read only when needed).
