# TDC Matchmaker Assignment Submission

## Write-Up: Project Architecture & Decisions

**Tech Choices**
We built the application using Next.js 14 (App Router) and React for robust performance and a modern development experience. Tailwind CSS was utilized extensively to create an ultra-premium, responsive, glassmorphic UI. This allowed for rapid, highly-customized styling that perfectly aligned with a luxury matchmaking brand aesthetic. To elevate the user experience, we integrated Framer Motion for fluid micro-animations and smooth page transitions. Given the MVP constraints, we opted for local state management and a mocked authentication context.

**Matching Logic**
The matching algorithm was designed to reflect realistic, gender-specific preferences often present in the matchmaking space. For male clients, the algorithm heavily weights prospects who are younger, earn relatively less, are shorter, and share strict alignment on family planning (children). For female clients, the system's priorities shift toward professional compatibility, deeper alignment on core life values, and flexibility regarding relocation. These base rules calculate a weighted compatibility score out of 100, ensuring highly relevant initial match pools.

**AI Integration**
To move beyond arbitrary numeric scoring, we integrated the OpenAI API via a Next.js serverless route to analyze matches contextually. When a matchmaker triggers the "Enhance with AI" feature, the system evaluates the nuanced compatibilities between the client and the prospect (e.g., overlapping hobbies, complementary professions, lifestyle fit). The LLM generates a concise, personalized explanation justifying exactly why they are a strong fit. This provides the matchmaker with instant qualitative reasoning alongside the quantitative score.

**Assumptions Made**
Given the MVP scope and the 100-profile requirement, we assumed a static JSON datastore was sufficient to simulate a production database, allowing us to focus heavily on the algorithm and UI rather than backend boilerplate. We mocked the authentication flow to demonstrate the gated dashboard UX without requiring real JWT/OAuth configurations. Finally, we assumed the matchmaker required a read-heavy dashboard, prioritizing high information density (like the comprehensive biodata panel) over complex profile-editing tools for this initial release iteration.

---

## 🚨 Remaining Action Items Checklist

To successfully complete the assignment, the following steps must be executed:

- [ ] **GitHub Repository:** Initialize a local git repository, commit the project, and push it to a new public repository on your GitHub account.
- [ ] **Live Hosted Link:** Connect your GitHub repository to **Vercel** and deploy the application so it is accessible via a public URL.
- [ ] **Final Email Submission:** Draft and send the email to `tech@thedatecrew.com`. 
  - **Subject:** `Full Stack Developer Internship - [Your Name] - Assignment`
  - **Body:** Include the Live Vercel Link, the GitHub Repo Link, the Demo Credentials (`priya.sharma` / `tdc2024`), and copy-paste the "Write-Up" section from above into the email.
