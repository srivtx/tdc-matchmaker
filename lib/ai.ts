"use client";

import { MatchScore } from "./types";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";

export async function enhanceMatchWithAI(
  matches: MatchScore[],
  customerName: string,
  apiKey: string
): Promise<MatchScore[]> {
  if (!apiKey || apiKey === "sk-or-v1-your-key-here") {
    console.log("[ai] No valid API key, skipping");
    return matches;
  }

  try {
    const topMatches = matches.slice(0, 5);
    const prompt = `You are a matchmaking assistant for an Indian matrimonial service. For each match below, write one SHORT sentence (max 15 words) explaining why they are compatible.

Customer: ${customerName}

${topMatches.map((m, i) =>
  `Match ${i}: ${m.profile.firstName}, ${m.profile.city}, ${m.profile.religion}, ${m.profile.caste}, wants kids: ${m.profile.wantKids}, relocate: ${m.profile.openToRelocate}, hobbies: ${m.profile.hobbies.join(", ")}`
).join("\n")}

Return ONLY a JSON array of objects with "id" (match index starting from 0) and "explanation" fields. No other text.`;

    console.log("[ai] Calling OpenRouter...");
    const res = await fetch(OPENROUTER_BASE, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://tdc-matchmaker.vercel.app",
        "X-Title": "TDC Matchmaker",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log("[ai] Response status:", res.status);
    if (!res.ok) {
      console.error("[ai] API error:", res.status, await res.text());
      return matches;
    }

    const data = await res.json();
    console.log("[ai] Raw response:", JSON.stringify(data).slice(0, 200));
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.log("[ai] No content in response");
      return matches;
    }

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.log("[ai] No JSON in content:", content);
      return matches;
    }

    const explanations: { id: number; explanation: string }[] = JSON.parse(jsonMatch[0]);
    console.log("[ai] Parsed explanations:", explanations);

    return matches.map((m, i) => {
      const enhanced = explanations.find(e => e.id === i);
      if (enhanced && enhanced.explanation) {
        return {
          ...m,
          explanation: enhanced.explanation,
          aiEnhanced: true,
        };
      }
      return m;
    });
  } catch (e) {
    console.error("[ai] Exception:", e);
    return matches;
  }
}
