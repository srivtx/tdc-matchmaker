# TDC Matchmaker Assignment Submission

## Write-Up: Project Architecture & Decisions

**Tech Choices**

I built this on Next.js with TypeScript because the developer experience is hard to beat. Tailwind handles all the styling through a custom design system — CSS variables driving both dark and light modes, glassmorphic panels that feel premium, everything scales nicely across the dashboard. Framer Motion makes the UI feel alive without being annoying — smooth page transitions, animated score bars, and a playful icon spin when toggling between themes. There's also subtle procedural sound via the Web Audio API, no external audio files needed, just a soft chime when switching modes and gentle feedback on button clicks. All the profile data comes from a seeded generator so it stays consistent but still feels like real people. Auth is simple localStorage, intentionally no database or backend for the MVP phase.

**Matching Logic**

The engine scores every opposite-gender profile on ten weighted dimensions. Values alignment carries the most weight because shared life goals actually matter in real matchmaking. Lifestyle compatibility, education, age, income, religion and caste, height, language overlap, location, and family background round out the rest. The scoring is genuinely gender-specific — for male clients it prioritizes younger age, lower income, and shorter height with strong kids alignment; for female clients it shifts toward profession compatibility, shared values, and relocation flexibility. Every match gets a clean percentage score with a plain-language explanation so matchmakers understand the why behind every suggestion. A radar chart and animated score breakdown are one click away from any match card if someone wants to dig deeper.

**AI Integration**

Groq powers the AI layer, serving responses in under a second with clean structured output. OpenRouter sits as an automatic fallback, and both hit the API directly from the browser so there's no server-side timeout drama. AI shows up in two places across the dashboard. First, the "Enhance with AI" button takes the top five matches, asks the LLM to write personalized one-line explanations for each, and injects them right onto the match cards with a sparkle icon. Second, inside the Send Match modal there's a small sparkle button that writes a custom email intro for that specific match — if the match already has an AI-generated explanation it uses that as context, otherwise it generates a fresh compatibility note first and then writes the email around it. Generated emails stay cached per match so reopening the modal shows the result instantly with no extra API call. If the model goes off script and returns unstructured text instead of proper JSON, a sentence extraction fallback scans for profile names in the raw response and pieces together whatever context it can. If nothing works at all, the original deterministic explanations stay right where they are.

**Assumptions Made**

Static JSON was the right call for an MVP with over a hundred profiles — no reason to over-engineer a database when the focus should be on the matching algorithm and the experience. Auth is mocked because the assignment asked for a login screen and a gated dashboard, not a production identity system. The dashboard leans read-heavy because matchmakers are scanning and matching, not editing profiles. And dark and light themes both got full attention because forcing one mode on everyone is just not it.

## How It Looks

<p align="center">
  <img src="howitlooks.png" alt="Dark Mode" width="48%" />
  <img src="howitlookslight.png" alt="Light Mode" width="48%" />
</p>

## Submission Links

| Item | Link |
|------|------|
| **Live Site** | https://tdc-matchmaker-silk.vercel.app |
| **GitHub Repo** | https://github.com/srivtx/tdc-matchmaker |
| **Demo Login** | `priya.sharma` / `tdc2024` |
