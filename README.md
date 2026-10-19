# HelpDesk.Miami Portal

A full-stack educational portal for IT Support training (A - Z), built with Next.js (App Router), React, and Tailwind CSS.

## Features

- Modern responsive UI with navigation, hero banner, and interactive search/filtering
- Categorized video and PDF galleries for:
  - Tier 1 Fundamentals
  - Networking
  - Systems Administration
  - Security
- Integrated **Siucloud AI Advisor** widget for customized learning path recommendations
- Member dashboard to:
  - Track completed guides
  - View AI-recommended next steps
  - Filter resources by category
- API routes for AI recommendations and gallery resource delivery

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

### 3) Production build

```bash
npm run build
npm run start
```

## Siucloud AI Agent Endpoint Configuration

By default, the portal uses an internal fallback recommendation engine.

To connect your own Copilot/AI endpoint, set:

```bash
SIUCLOUD_AI_ENDPOINT="https://your-ai-endpoint.example.com/recommend"
```

You can place this in `.env.local`.

Expected request payload:

```json
{
  "goals": "I want to become a network specialist",
  "knowledge": "Tier 1 support and basic TCP/IP",
  "role": "Helpdesk Technician"
}
```

Expected response payload:

```json
{
  "track": "Network Support Specialist",
  "summary": "...",
  "nextSteps": ["...", "..."]
}
```

## Adding New Media Resources

Update `/home/runner/work/helpdesk.miami/helpdesk.miami/lib/data.ts` and append entries to `mediaLibrary`:

```ts
{
  id: "unique-id",
  title: "Resource Title",
  category: "Networking", // Tier 1 Fundamentals | Networking | Systems Administration | Security
  type: "video", // or "pdf"
  url: "https://...",
  description: "Short summary"
}
```

Guidelines:
- Use embeddable URLs for `video` entries
- Use direct-download/public URLs for `pdf` entries
- Keep `id` values unique

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – create production build
- `npm run start` – run production server
- `npm run lint` – run ESLint checks
