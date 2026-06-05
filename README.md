<p align="center">
  <img src="public/assets/starheart.jpg" alt="TDC Matchmaker" width="280" />
</p>

<h1 align="center">tdc-matchmaker</h1>
<h3 align="center"><i>The substrate matchmaking pipelines grow on.</i></h3>

<p align="center">An internal matchmaking dashboard for The Date Crew. Smart scoring over brute force. AI insights over guesswork.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/AI-OpenRouter-f472b6?style=flat" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat" />
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &nbsp;·&nbsp;
  <a href="#matching">Matching Engine</a> &nbsp;·&nbsp;
  <a href="#ai">AI Integration</a> &nbsp;·&nbsp;
  <a href="#stack">Stack</a>
</p>

---

## Quick Start

```bash
npm install
npm run dev
```

**Demo login:** `priya.sharma` / `tdc2024`

## Matching Engine

10-dimension weighted scoring with gender-specific logic. Each profile is evaluated across age, income, height, education, values alignment, lifestyle compatibility, religion/caste, language overlap, location, and family background — producing a percentage score with human-readable explanations.

## AI Integration

Add a free [OpenRouter API key](https://openrouter.ai) to enable AI-enhanced match explanations:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
```

The LLM generates personalized one-sentence explanations for each top match. Falls back gracefully to deterministic scoring when no key is set.

## Stack

Next.js 14 · TypeScript 5 · Tailwind CSS 3 · Framer Motion · Lucide · OpenRouter

## License

MIT
