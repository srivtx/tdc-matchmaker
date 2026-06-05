"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { customers } from "@/data/profiles";
import { CustomerCard } from "@/components/CustomerCard";
import { Skeleton } from "@/components/Skeleton";
import { Search, Heart, Users, Sparkles, CalendarCheck, Send, Layers } from "lucide-react";
import { CustomerProfile, JourneyStage } from "@/lib/types";
import { PageTransition } from "@/components/PageTransition";

function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 800;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span className={className}>{display}</span>;
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<JourneyStage | "All">("All");
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerProfile[]>([]);

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/login"); return; }
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [isAuthenticated, router]);

  useEffect(() => {
    let result = customers.filter((c) => c.matchmakerId === "mm-1");
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.stage.toLowerCase().includes(q)
      );
    }
    if (stageFilter !== "All") {
      result = result.filter((c) => c.stage === stageFilter);
    }
    setFilteredCustomers(result);
  }, [search, stageFilter]);

  const stages = Array.from(new Set(customers.map((c) => c.stage)));
  const activeCustomers = customers.filter(c => c.matchmakerId === "mm-1" && !["Matched", "On Hold"].includes(c.stage)).length;
  const meetingScheduled = customers.filter(c => c.matchmakerId === "mm-1" && c.stage === "First Meeting Scheduled").length;
  const newLeads = customers.filter(c => c.matchmakerId === "mm-1" && ["New Lead", "Verification Pending"].includes(c.stage)).length;

  if (!isAuthenticated) return null;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="block-hero p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded border border-rose-800/30 bg-rose-950/30 text-rose-400 font-mono uppercase tracking-wider">
                  Active
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  {activeCustomers} customers in pipeline
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                {(() => {
                  const hour = new Date().getHours();
                  if (hour < 12) return 'Good morning';
                  if (hour < 17) return 'Good afternoon';
                  return 'Good evening';
                })()}, <span className="brand-gradient-text">Priya</span>
              </h1>
              <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
                Your matchmaking pipeline is active. {newLeads} new leads need attention,
                and {meetingScheduled} first meetings are on the calendar this week.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="p-3 rounded-lg bg-neutral-950/50 border border-white/5 text-center min-w-[80px]">
                <div className="text-lg font-bold text-white font-mono"><AnimatedCounter value={activeCustomers} /></div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Active</div>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-center min-w-[80px]">
                <div className="text-lg font-bold text-rose-400 font-mono"><AnimatedCounter value={meetingScheduled} /></div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Meetings</div>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/30 text-center min-w-[80px]">
                <div className="text-lg font-bold text-amber-400 font-mono"><AnimatedCounter value={newLeads} /></div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">New Leads</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, stage..."
              className="w-full bg-neutral-950 border border-white/10 rounded-md pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-white/20 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStageFilter("All")}
              className={`flex-shrink-0 px-2.5 py-1 text-[10px] rounded border font-mono transition-colors ${
                stageFilter === "All"
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
              }`}
            >
              All ({customers.filter(c => c.matchmakerId === "mm-1").length})
            </button>
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`flex-shrink-0 px-2.5 py-1 text-[10px] rounded border font-mono transition-colors ${
                  stageFilter === stage
                    ? "bg-white text-black border-white"
                    : "border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Your Customers
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 font-mono">
              {filteredCustomers.length} result{filteredCustomers.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-2">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[80px] w-full" />
              ))
            ) : filteredCustomers.length === 0 ? (
              <div className="block-brand p-12 text-center">
                <Users size={32} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">No customers match your filters</p>
                <p className="text-xs text-zinc-600 mt-1">Try clearing the search or changing the stage filter</p>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onClick={() => router.push(`/dashboard/${customer.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
