"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { customers, malePool, femalePool } from "@/data/profiles";
import { getMatchesForCustomer } from "@/lib/matching";
import { CustomerProfile, MatchScore, MatchmakerNote } from "@/lib/types";
import { BiodataPanel } from "@/components/BiodataPanel";
import { NotesPanel } from "@/components/NotesPanel";
import { MatchCard } from "@/components/MatchCard";
import { Skeleton } from "@/components/Skeleton";
import { MatchModal } from "@/components/MatchModal";
import { BreakdownModal } from "@/components/BreakdownModal";
import { PageTransition } from "@/components/PageTransition";
import { useToast } from "@/components/Toast";
import { ArrowLeft, Sparkles, Loader2, Heart } from "lucide-react";
import { enhanceMatchWithAI } from "@/lib/ai";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { show } = useToast();
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(true);
  const [aiEnhancing, setAiEnhancing] = useState(false);
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchScore | null>(null);
  const [breakdownMatch, setBreakdownMatch] = useState<MatchScore | null>(null);
  const [generatedEmails, setGeneratedEmails] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/login"); return; }
    const found = customers.find((c) => c.id === id);
    if (!found) { router.replace("/dashboard"); return; }
    setCustomer(found);

    setTimeout(() => {
      const pool = found.gender === "Male" ? femalePool : malePool;
      const results = getMatchesForCustomer(found, pool, 15);
      setMatches(results);
      setMatchLoading(false);
    }, 400);
    setLoading(false);
  }, [id, isAuthenticated, router]);

  const handleEnhanceWithAI = async () => {
    if (!customer || aiEnhanced) return;
    setAiEnhancing(true);

    try {
      const enhanced = await enhanceMatchWithAI(
        matches,
        `${customer.firstName} ${customer.lastName}`
      );

      const enhancedCount = enhanced.filter((m) => m.aiEnhanced).length;
      if (enhancedCount === 0) {
        show("warning", "AI unavailable — using standard scoring. Add Groq or OpenRouter API key.");
        setAiEnhancing(false);
        return;
      }

      setMatches(enhanced);
      setAiEnhanced(true);
      show("success", `AI-enhanced ${enhancedCount} match explanation${enhancedCount !== 1 ? "s" : ""}`);
    } catch {
      show("warning", "AI enhancement failed — using standard scoring");
    } finally {
      setAiEnhancing(false);
    }
  };

  const handleNotesChange = (notes: MatchmakerNote[]) => {
    if (!customer) return;
    setCustomer({ ...customer, notes });
    show("success", "Notes updated");
  };

  const handleSendMatch = (match: MatchScore) => {
    setSelectedMatch(match);
  };

  const handleConfirmSend = () => {
    if (!selectedMatch) return;
    show("success", `Match introduction sent to ${selectedMatch.profile.firstName}!`);
    setSelectedMatch(null);
  };

  if (!isAuthenticated || !customer) return null;

  const avgScore = matches.length > 0 ? Math.round(matches.reduce((a, m) => a + m.totalScore, 0) / matches.length) : 0;
  const excellentCount = matches.filter(m => m.totalScore >= 85).length;

  return (
    <PageTransition>
      <div className="space-y-5">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-mono group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
        </button>

        {/* Main 2-Column Layout */}
        <div className="flex gap-6 items-start">
          {/* Left Column — Profile + Notes */}
          <div className="flex-1 min-w-0 space-y-5">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <BiodataPanel customer={customer} />
            )}
            <NotesPanel customer={customer} onNotesChange={handleNotesChange} />
          </div>

          {/* Right Column — Matches (Sticky + Scrollable) */}
          <div className="hidden lg:block w-[340px] flex-shrink-0">
            <div className="sticky top-14">
              {/* Match Panel Header */}
              <div className="block-elevated rounded-b-none border-b-0 px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart size={13} className="text-rose-400" fill="currentColor" />
                    <h2 className="text-sm font-bold text-white font-mono">Matches</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                    <span>{matches.length} found</span>
                    {excellentCount > 0 && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <span className="text-emerald-400/70">{excellentCount} excellent</span>
                      </>
                    )}
                  </div>
                </div>

                {/* AI Enhance Button */}
                {!aiEnhanced ? (
                  <button
                    onClick={handleEnhanceWithAI}
                    disabled={aiEnhancing}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] rounded-lg border border-rose-800/40 bg-rose-950/20 text-rose-400 hover:border-rose-600/50 hover:bg-rose-950/40 transition-all font-mono disabled:opacity-50"
                  >
                    {aiEnhancing ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Sparkles size={12} />
                    )}
                    {aiEnhancing ? "Enhancing..." : "Enhance with AI"}
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] rounded-lg border border-emerald-800/40 bg-emerald-950/20 text-emerald-400 font-mono">
                    <Sparkles size={12} />
                    AI Enhanced
                  </div>
                )}
              </div>

              {/* Scrollable Match List */}
              <div className="border border-white/[0.08] border-t-0 rounded-b-lg bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
                <div className="max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar p-3 space-y-3">
                  {matchLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-[220px] w-full" />
                    ))
                  ) : matches.length === 0 ? (
                    <div className="py-10 text-center">
                      <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center mx-auto mb-3">
                        <Heart size={16} className="text-zinc-600" />
                      </div>
                      <p className="text-xs text-zinc-500">No matches found</p>
                      <p className="text-[10px] text-zinc-600 mt-1">No opposite-gender profiles in the match pool</p>
                    </div>
                  ) : (
                    matches.map((match, i) => (
                      <MatchCard
                        key={match.profile.id}
                        match={match}
                        rank={i + 1}
                        onSendMatch={() => handleSendMatch(match)}
                        onViewDetails={() => setBreakdownMatch(match)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Match Section — Only visible on small screens */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={13} className="text-rose-400" fill="currentColor" />
              <h2 className="text-sm font-bold text-white font-mono">Suggested Matches</h2>
              <span className="text-[10px] text-zinc-500 font-mono">{matches.length}</span>
            </div>
            {!aiEnhanced && (
              <button
                onClick={handleEnhanceWithAI}
                disabled={aiEnhancing}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] rounded-lg border border-rose-800/50 bg-rose-950/30 text-rose-400 font-mono disabled:opacity-50"
              >
                {aiEnhancing ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
                {aiEnhancing ? "..." : "AI Enhance"}
              </button>
            )}
          </div>
          <div className="space-y-3">
            {matchLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[220px] w-full" />
              ))
            ) : matches.length === 0 ? (
              <div className="py-10 text-center bg-neutral-950/30 rounded-lg border border-white/5">
                <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center mx-auto mb-3">
                  <Heart size={16} className="text-zinc-600" />
                </div>
                <p className="text-xs text-zinc-500">No matches found</p>
                <p className="text-[10px] text-zinc-600 mt-1">No opposite-gender profiles in the match pool</p>
              </div>
            ) : (
              matches.map((match, i) => (
                <MatchCard
                  key={match.profile.id}
                  match={match}
                  rank={i + 1}
                  onSendMatch={() => handleSendMatch(match)}
                  onViewDetails={() => setBreakdownMatch(match)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {selectedMatch && (
        <MatchModal
          profile={selectedMatch.profile}
          customerName={`${customer.firstName} ${customer.lastName}`}
          matchExplanation={selectedMatch.aiEnhanced ? selectedMatch.explanation : undefined}
          cachedEmail={generatedEmails[selectedMatch.profile.id]}
          onEmailGenerated={(text) => setGeneratedEmails(prev => ({ ...prev, [selectedMatch.profile.id]: text }))}
          onIntroGenerated={(intro) => setMatches(prev => prev.map(m =>
            m.profile.id === selectedMatch.profile.id ? { ...m, explanation: intro, aiEnhanced: true } : m
          ))}
          onClose={() => setSelectedMatch(null)}
          onConfirm={handleConfirmSend}
        />
      )}

      {breakdownMatch && (
        <BreakdownModal
          match={breakdownMatch}
          customerName={`${customer.firstName} ${customer.lastName}`}
          onClose={() => setBreakdownMatch(null)}
        />
      )}
    </PageTransition>
  );
}
