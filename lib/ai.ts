"use client";

import { MatchScore } from "./types";

const PROVIDERS = {
  groq: {
    name: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    key: () => process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
  },
  openrouter: {
    name: "openrouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    model: "openrouter/free",
    key: () => process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
  },
};

type Provider = keyof typeof PROVIDERS;

function buildPrompt(customerName: string, topMatches: MatchScore[]): string {
  return `Output EXACTLY this JSON format:
[{"id":0,"explanation":"one sentence"},{"id":1,"explanation":"one sentence"},...]

Customer: ${customerName}

${topMatches.map((m, i) =>
  `Match ${i}: ${m.profile.firstName}, ${m.profile.city}, ${m.profile.religion}, ${m.profile.caste}, kids: ${m.profile.wantKids}, relocate: ${m.profile.openToRelocate}, hobbies: ${m.profile.hobbies.join(", ")}`
).join("\n")}

Only output the JSON array. No other text.`;
}

function extractSentences(matches: MatchScore[], content: string): MatchScore[] {
  return matches.map((m) => {
    const name = m.profile.firstName;
    const regex = new RegExp(`(${name}[^.!?]*[.!?])`, "i");
    const found = content.match(regex);
    if (found && found[1].trim().length > 3) {
      return { ...m, explanation: found[1].trim(), aiEnhanced: true };
    }
    return m;
  });
}

async function callLLM(
  provider: Provider,
  prompt: string
): Promise<{ id: number; explanation: string }[] | null> {
  const cfg = PROVIDERS[provider];
  const apiKey = cfg.key();
  if (!apiKey || apiKey.length < 10) return null;

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: cfg.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content
    || data.choices?.[0]?.message?.reasoning;
  if (!content) return null;

  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return null;

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
}

export async function enhanceMatchWithAI(
  matches: MatchScore[],
  customerName: string
): Promise<MatchScore[]> {
  const prompt = buildPrompt(customerName, matches);
  const order: Provider[] = ["groq", "openrouter"];

  for (const provider of order) {
    console.log(`[ai] Trying ${provider}...`);
    const explanations = await callLLM(provider, prompt);

    if (explanations) {
      const result = matches.map((m, i) => {
        const enhanced = explanations.find(e => e.id === i);
        if (enhanced && enhanced.explanation) {
          return { ...m, explanation: enhanced.explanation, aiEnhanced: true };
        }
        return m;
      });

      const count = result.filter(m => m.aiEnhanced).length;
      if (count > 0) {
        console.log(`[ai] ${provider} succeeded with ${count} explanations`);
        return result;
      }
    }
    console.log(`[ai] ${provider} failed, trying next...`);
  }

  console.log("[ai] All providers failed, keeping deterministic explanations");
  return matches;
}
