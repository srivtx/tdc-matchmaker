# TDC Matchmaker Assignment Submission

## Write-Up: Project Architecture & Decisions

**Tech Choices**
I built the application using Next.js 14 (App Router) and TypeScript for type-safe, modern development. Tailwind CSS with a custom design system (CSS variables, dark/light theme, glassmorphic panels) provided a premium aesthetic aligned with a luxury matchmaking brand. Framer Motion drives all micro-animations, page transitions, and the score bar/radar chart reveals. Static JSON data with a deterministic generator (seeded LCG) produced 135 realistic profiles — 15 customers and 120 pool candidates. Auth is mocked via localStorage context to keep the MVP lightweight and deployable without a database.

**Matching Logic**
The engine scores every opposite-gender pool profile across 10 weighted dimensions: Values Alignment (18%), Lifestyle Compatibility (14%), Education (12%), Age (12%), Income (10%), Religion & Caste (10%), Height (6%), Language Overlap (6%), Location (6%), and Family Compatibility (6%). Scoring is gender-specific — for male customers, the age, income, and height dimensions prioritize younger, lower-earning, shorter matches; for female customers, education, values, and lifestyle dimensions carry more weight alongside professional compatibility. Each match receives a 0–100 score with a human-readable deterministic explanation.

**AI Integration**
I used Groq's API (llama-3.3-70b-versatile) as the primary AI provider for match explanations — delivering responses in ~0.5 seconds. OpenRouter's free tier serves as an automatic fallback if Groq is unavailable. Both are called directly from the client to avoid serverless function timeouts. When a matchmaker clicks "Enhance with AI", the system sends the top 5 matches to the LLM with a structured prompt, receives JSON explanations, and injects them into the match cards with a sparkle indicator. If JSON parsing fails (e.g. truncated response from a chatty model), a sentence extraction fallback salvages relevant text by matching profile names against the raw output. If all providers fail, the deterministic engine's explanations remain untouched.

**Assumptions Made**
I assumed a static JSON datastore was sufficient for the MVP's 100+ profile requirement, letting me focus on the matching algorithm and UI rather than database infrastructure. I mocked authentication with localStorage persistence to demonstrate the gated dashboard experience without requiring real OAuth or JWT configuration. The matchmaker dashboard is read-heavy by design — prioritizing dense information display (biodata panels, score breakdowns, radar charts) over profile-editing tools. Both themes (dark and light) are fully supported via CSS custom properties with hand-crafted overrides for every Tailwind utility used.

---

## Submission Links

| Item | Link |
|------|------|
| **Live Site** | https://tdc-matchmaker-silk.vercel.app |
| **GitHub Repo** | https://github.com/srivtx/tdc-matchmaker |
| **Demo Login** | `priya.sharma` / `tdc2024` |
