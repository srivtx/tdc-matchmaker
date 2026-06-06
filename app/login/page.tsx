"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { Heart, Eye, EyeOff, AlertCircle, Sparkles, Users, Target, Sun, Moon, Check } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [copied, setCopied] = useState<"user" | "pass" | null>(null);

  if (isAuthenticated) {
    router.replace("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle — top right */}
      <button
        onClick={toggle}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg border transition-all duration-200 hover:scale-105"
        style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)', background: 'var(--bg-surface)' }}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      {/* Ambient floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/[0.03] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-3xl animate-float" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-rose-400/[0.02] rounded-full blur-3xl animate-float" style={{ animationDelay: '-13s' }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 animate-heartbeat shadow-lg shadow-rose-500/20"
            style={{ background: "var(--brand-gradient)" }}
          >
            <Heart size={28} style={{ color: '#fff', fill: '#fff' }} />
          </div>
          <h1 className="text-xl font-bold text-white font-mono tracking-tight">
            TDC<span className="text-zinc-500">|MATCHMAKER</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto">
            Where meaningful connections begin
          </p>
        </div>

        <div className="block-elevated p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/40 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/40 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-xs text-rose-400"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="hud-button-primary w-full !py-3 !text-sm font-mono font-semibold disabled:opacity-50 transition-shadow hover:shadow-lg hover:shadow-rose-500/20"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5">
            <p
              className="text-[10px] text-zinc-600 text-center font-mono select-all cursor-pointer"
              onMouseUp={async () => {
                const sel = window.getSelection()?.toString().trim();
                if (sel === "priya.sharma") { await navigator.clipboard.writeText("priya.sharma"); setCopied("user"); }
                else if (sel === "tdc2024") { await navigator.clipboard.writeText("tdc2024"); setCopied("pass"); }
                else if (sel.includes("priya") || sel.includes("tdc")) {
                  await navigator.clipboard.writeText("priya.sharma / tdc2024");
                  setCopied("user");
                }
                setTimeout(() => setCopied(null), 2000);
              }}
            >
              Demo credentials: priya.sharma / tdc2024
              {copied && (
                <span className="ml-2 text-emerald-400 inline-flex items-center gap-1">
                  <Check size={10} /> Copied
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: Users, label: "15+ Clients", desc: "Active pipeline" },
            { icon: Target, label: "Precision", desc: "Smart matching" },
            { icon: Sparkles, label: "AI-Powered", desc: "Smart insights" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                className="text-center p-3 rounded-lg bg-neutral-950/40 border border-white/5 hover-glow"
              >
                <Icon size={16} className="text-zinc-600 mx-auto mb-1.5" />
                <div className="text-[10px] font-semibold text-zinc-400 font-mono">{f.label}</div>
                <div className="text-[10px] text-zinc-600 mt-0.5">{f.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
