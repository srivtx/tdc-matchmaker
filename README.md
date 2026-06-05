<p align="center">
  <img src="public/assets/chain.jpg" alt="TDC Matchmaker" width="600" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/AI-OpenRouter-f472b6?style=flat-square" alt="AI Powered" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
</p>

<h3 align="center">Internal Matchmaking Dashboard for The Date Crew</h3>

---

## Overview

TDC Matchmaker is an internal tool built for The Date Crew's matchmaking team. It helps matchmakers manage their client pipeline, view detailed biodata profiles, run AI-enhanced compatibility matching against a pool of candidates, and send match introductions — all from a single dashboard.

## Features

- **Login & Auth** — Session-based authentication for matchmakers with persistent login
- **Customer Pipeline** — Track 15+ clients across 10 journey stages with real-time filtering and search
- **Full Biodata View** — 25+ profile fields including education, career, family background, religion, caste, lifestyle preferences, and more
- **Smart Matching Engine** — 10-dimension weighted compatibility scoring with gender-specific logic
- **AI-Enhanced Insights** — OpenRouter-powered match explanations with graceful fallback to deterministic scoring
- **Match Actions** — Send match introductions with email preview and confirmation
- **Matchmaker Notes** — Per-customer note-taking for meeting and call records
- **Breakdown View** — Animated radar charts and score bars for deep compatibility analysis
- **Dark & Light Themes** — Full theme toggle with hand-crafted variables for both modes
- **120 Dummy Profiles** — Realistic Indian matrimonial profiles for match simulation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| AI | OpenRouter (free tier) |
| Data | Static JSON (deterministic generation) |

## Getting Started

```bash
git clone <repo-url>
cd tdc-matchmaker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with the demo credentials below.

## Demo Credentials

| Username | Password |
|----------|----------|
| `priya.sharma` | `tdc2024` |

## Environment Variables

```env
# Required for AI-powered match explanations (optional — app works without it)
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Get a free key at [openrouter.ai](https://openrouter.ai) → Settings → API Keys. The matching engine falls back to deterministic scoring if no key is provided.

## Matching Algorithm

The engine scores every opposite-gender pool profile across 10 weighted dimensions:

- **Values Alignment** (18%) — Kids preference, diet, drink, smoke
- **Lifestyle Compatibility** (14%) — Pets, relocation, hobbies overlap
- **Education** (12%) — Degree tier + college match
- **Age** (12%) — Gender-aware ideal gap scoring
- **Income** (10%) — Compatible income bracket ratios
- **Religion & Caste** (10%) — Shared background bonus
- **Height** (6%) — Gender-aware height difference
- **Language** (6%) — Shared language ratio
- **Location** (6%) — Same city or relocation flexibility
- **Family** (6%) — Family type, marital status, siblings

## Project Structure

```
tdc-matchmaker/
├── app/
│   ├── api/match/route.ts      # Server-side AI proxy (fallback)
│   ├── dashboard/
│   │   ├── page.tsx             # Customer list + pipeline stats
│   │   └── [id]/page.tsx        # Biodata + matches + AI enhance
│   ├── login/page.tsx           # Matchmaker login
│   ├── globals.css              # Design system (595 lines)
│   └── layout.tsx               # Root layout + providers
├── components/
│   ├── BiodataPanel.tsx         # Full profile with sections
│   ├── MatchCard.tsx            # Match with score bar + actions
│   ├── BreakdownModal.tsx       # Radar chart + score breakdown
│   ├── MatchModal.tsx           # Email preview + send confirmation
│   ├── NotesPanel.tsx           # Per-customer note management
│   ├── ScoreRing.tsx            # SVG donut score gauge
│   ├── RadarChart.tsx           # 10-axis animated radar chart
│   ├── CustomerCard.tsx         # Dashboard customer row
│   ├── StatusBadge.tsx          # Journey stage indicator
│   └── Toast.tsx                # Notification system
├── lib/
│   ├── matching.ts              # 10-dimension scoring engine
│   ├── ai.ts                    # Client-side OpenRouter integration
│   ├── auth.tsx                 # Auth context + localStorage
│   ├── theme.tsx                # Dark/light theme provider
│   └── types.ts                 # TypeScript definitions
└── data/
    ├── profiles.ts              # 15 customers + 120 pool profiles
    └── matchmakers.ts           # Auth credentials
```

## License

MIT
