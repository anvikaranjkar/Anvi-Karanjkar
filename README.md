# Anvi Karanjkar — Portfolio

An interactive portfolio with an automatically rotating 3×3 Rubik's Cube in classic Macintosh colours and separate pages for projects, experience and education, contact links, and games.

## Experience

- The cube spins continuously; drag it with a mouse or finger to take control, then release it to resume spinning.
- Use the four arrow controls to rotate and scramble it.
- Select a lettered centre cap to open Projects, Experience, Contact, or Games.
- Leave the page idle to let spiderwebs form and spiders arrive; click or touch the page to clear them.
- Switch between light and dark modes from the header.
- Play Final Farewell, Circuit Breaker, Memory Match, and Pixel Hunt from the Games page.

## Add or update content

All portfolio entries live in `app/data/portfolio.ts`. Copy an existing item in the matching list and change its values.

```ts
// Project
{ name: "Project name", year: "2026", description: "One factual sentence.", href: "https://..." }

// Experience or education
["2026 — present", "Role or qualification", "Organisation"]

// Game
{ name: "Game name", type: "Game type", description: "One factual sentence.", href: "https://..." }

// Contact
["Platform", "Visible label", "https://..."]
```

Keep each entry factual and concise, save the file, then run the production checks below.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Production

```bash
npm run build
```

`npm run build` targets the Cloudflare Workers-compatible vinext runtime used by OpenAI Sites. `vercel.json` directs Vercel to run the standard `next build` command with the Next.js framework preset.

## Content and accessibility

The portfolio content is sourced from Anvi’s profile PDF and existing website. Interactions support keyboard, touch and pointer input, focus states are visible, and reduced-motion preferences are respected.
