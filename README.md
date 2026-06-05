<p align="center">
  <img src="public/assets/starheart.jpg" alt="TDC Matchmaker" width="320" />
</p>

<h1 align="center">TDC Matchmaker</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/AI-OpenRouter-f472b6?style=flat" />
</p>

Internal matchmaking dashboard for [The Date Crew](https://thedatecrew.com) — pipeline management, biodata profiles, AI-powered matching, and match introductions.

## Quick Start

```bash
npm install
npm run dev
```

**Demo login:** `priya.sharma` / `tdc2024`

## AI Matching

Add a free [OpenRouter API key](https://openrouter.ai) to enable AI-enhanced match explanations:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
```

Without a key, the engine uses a 10-dimension deterministic scoring system covering age, income, height, education, values, lifestyle, religion/caste, language, location, and family compatibility.

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · OpenRouter

## License

MIT
