# HelpDesk.Miami Portal

A full-stack SMB-focused educational portal for IT support and internal operations training, built with Next.js (App Router), React, and Tailwind CSS.

## Features

- SMB-tailored landing page with clear training tracks for:
  - Onboarding
  - Cybersecurity Awareness
  - Cloud/SaaS Tools
  - Troubleshooting
- Interactive media hub with:
  - Embedded video lesson modal with chapter markers
  - Built-in PDF viewer modal with full-screen and download options
  - Instant filtering by role, skill level, duration, and document type
- Highlighted **Siucloud AI Advisor** widget for customized learning path recommendations
- SMB dashboard to:
  - Track completed resources
  - View learning map states (Completed, In Progress, Recommended Next Step)
  - See AI-recommended next steps
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
  category: "Cloud & SaaS Tools", // SMB Onboarding | Cybersecurity Awareness | Cloud & SaaS Tools | Troubleshooting
  type: "video", // or "pdf"
  url: "https://...",
  description: "Short summary",
  role: "IT Support", // SMB Employee | IT Support | IT Manager | Security Champion
  skillLevel: "Intermediate", // Beginner | Intermediate | Advanced
  durationMinutes: 12,
  documentType: "Lesson" // Lesson | Checklist | Guide | Runbook | Policy
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
