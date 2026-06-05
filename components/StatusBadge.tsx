"use client";

import { JourneyStage } from "@/lib/types";
import { useTheme } from "@/lib/theme";

const darkColors: Record<JourneyStage, string> = {
  "New Lead": "bg-cyan-950/50 text-cyan-400 border-cyan-800",
  "Profile Created": "bg-blue-950/50 text-blue-400 border-blue-800",
  "Verification Pending": "bg-amber-950/50 text-amber-400 border-amber-800",
  "Verified": "bg-emerald-950/50 text-emerald-400 border-emerald-800",
  "Preferences Set": "bg-violet-950/50 text-violet-400 border-violet-800",
  "Actively Matching": "bg-rose-950/50 text-rose-400 border-rose-800",
  "First Meeting Scheduled": "bg-orange-950/50 text-orange-400 border-orange-800",
  "In Discussion": "bg-sky-950/50 text-sky-400 border-sky-800",
  "On Hold": "bg-neutral-800/50 text-neutral-400 border-neutral-700",
  "Matched": "bg-emerald-950/50 text-emerald-400 border-emerald-800",
};

const lightColors: Record<JourneyStage, string> = {
  "New Lead": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Profile Created": "bg-blue-50 text-blue-700 border-blue-200",
  "Verification Pending": "bg-amber-50 text-amber-700 border-amber-200",
  "Verified": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Preferences Set": "bg-violet-50 text-violet-700 border-violet-200",
  "Actively Matching": "bg-rose-50 text-rose-700 border-rose-200",
  "First Meeting Scheduled": "bg-orange-50 text-orange-700 border-orange-200",
  "In Discussion": "bg-sky-50 text-sky-700 border-sky-200",
  "On Hold": "bg-neutral-100 text-neutral-500 border-neutral-200",
  "Matched": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const stageLED: Record<JourneyStage, string> = {
  "New Lead": "status-led-off",
  "Profile Created": "status-led-amber",
  "Verification Pending": "status-led-amber",
  "Verified": "status-led-green",
  "Preferences Set": "status-led-green",
  "Actively Matching": "status-led-rose",
  "First Meeting Scheduled": "status-led-rose",
  "In Discussion": "status-led-amber",
  "On Hold": "status-led-off",
  "Matched": "status-led-green",
};

export function StatusBadge({ stage }: { stage: JourneyStage }) {
  const { theme } = useTheme();
  const colors = theme === "light" ? lightColors[stage] : darkColors[stage];

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded border font-medium ${colors}`}>
      <span className={`status-led ${stageLED[stage]}`} />
      {stage}
    </span>
  );
}
