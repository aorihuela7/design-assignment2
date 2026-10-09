# Assignment 2: UI/UX & Visual Design

Design, Build, Ship · MPCS 51238 · Autumn 2026

Due Tuesday, October 13, at 5:30 PM

## Overview

This assignment is an accelerated journey into UI/UX and visual design. You'll explore three visual styles, pick one, and build a small static site in it. Everything lives in one Next.js project on Vercel, and the homepage is the hub.

Make every change by directing your agent, the way we discussed in class: look at the screen, then say what to change, using the names of UI elements and design principles.

## Steps

### 1. Decide What You're Making and Who It's For

Any small static site you'd use or enjoy. Some ideas:

- A reading log or watchlist
- A recipe book of what you actually cook
- A week of workouts or a training plan
- A festival or concert lineup
- A guide to your neighborhood's coffee shops
- A record collection
- A plant care schedule
- A trip itinerary
- Notes for a course you've taken
- A tribute to an album, a building, or an artist
- A board game shelf, and how to pick one tonight
- A trail or running route guide

No database, accounts, or APIs. Interactions are faked in the browser, and nothing is saved.

### 2. The Hub

The homepage is your hub, and it's the Vercel URL you submit. It has:

1. Links to your three mood boards
2. Links to your three design systems
3. A link to your site

### 3. Mood Boards

Make one per style, linked from the hub. Start from the styles we saw in class, or come up with your own. The three should feel different. Each has:

1. A name for the mood
2. About 25 to 30 artifacts: images you collect, or ones your agent generates

### 4. Design Systems

Make one from each mood board, linked from the hub. Each is a UI library: the components a site could use, built in that style, in every state. Each has:

1. Color roles: background, surface, text, muted text, border, and accent, with contrast ratios
2. Type roles: display, heading, body, and label, with sizes and weights, set in your own content
3. Spacing and shape: a spacing scale, corners, borders, and shadow
4. Components: primary and secondary buttons, a link, a text input, a select, checkboxes and radios, a toggle, tabs, filter chips, a card with one of your items, list rows, a badge, a modal or detail panel, and anything else your site needs
5. Control states: rest, hover, focus, pressed, selected, and disabled, where they apply
6. UI states: empty, loading, error, and success

### 5. Your Site

Build it at its own route, like /reading-log, in the style you picked, meeting the design requirements below. It has:

1. Thoughtful visual hierarchy
2. At least two interactions, faked in the browser, like a filter and a detail panel
3. Every control in its states
4. The accent kept for the primary action
5. Responsive design

### 6. Verify

Have your agent check your site in a real browser, using Playwright MCP or the Claude in Chrome extension ( /chrome ). Ask it to open the site on mobile (390px) and desktop (1440px), try every interaction, take screenshots, and tell you what's broken. Then look yourself, and try everything with the keyboard.

## Design Requirements

- **Visual hierarchy:** it's clear what to look at first.
- **Type:** a few sizes and weights, used the same way throughout, and text that's comfortable to read.
- **Color:** a small palette where each color has a purpose.
- **Accessibility:** text contrast is legible.
- **Layout:** elements are aligned intentionally, related elements are grouped, and it works on desktop and mobile.
- **Affordances:** interactions are obvious.
- **States:** controls respond when you hover, focus, or press them.
- **Visual style:** it looks like the style you picked, not the agent's default.
- **Simplicity:** nothing extra. If a word or an image doesn't help, remove it.

## Tech Stack

Next.js and Tailwind CSS, as a static site: no database, accounts, external APIs, or data storage. Put the code in your own GitHub repository and deploy it on Vercel's free Hobby plan. If the agent suggests a database, a backend, or a package you don't need, push back.

## Submission

Submit in Google Classroom:

1. **Vercel URL:** a live link to your hub.
2. **GitHub URL:** your repository, with a commit history that shows your progress.

## Assessment

A complete assignment has:

- A live Vercel URL that works, with your hub as the homepage
- Three mood boards, each with 25 to 30 artifacts
- Three design systems, each a UI library with its components in every state
- Your site, in the style you picked, with at least two interactions and the design requirements met
- Responsive design that works on mobile and desktop
- A GitHub repository with commits that show your progress
- You're ready to explain your work in class (below)

## Be Ready to Explain

In class, you'll talk through your work. Be ready to explain:

1. **Your style:** why it fits your site and the people who'd use it.
2. **Your design decisions:** what people see first, how they know what they can click, and what each state tells them.
3. **How you used the agent:** what you asked for, where you pushed back, and what you decided yourself.
