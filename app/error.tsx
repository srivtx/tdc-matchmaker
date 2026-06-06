"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("TDC Matchmaker error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-950/30 border border-rose-800/30 flex items-center justify-center mx-auto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-rose-400">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white font-mono">Something went wrong</h2>
          <p className="text-xs text-zinc-500 mt-1">An unexpected error occurred. Your data is safe.</p>
        </div>
        <button
          onClick={reset}
          className="hud-button inline-flex !text-xs"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
