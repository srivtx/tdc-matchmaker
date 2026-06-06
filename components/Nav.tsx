"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Heart, LogOut, LayoutDashboard, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggle } = useTheme();

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--nav-bg)] backdrop-blur-2xl" style={{ borderColor: 'var(--nav-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 group flex-shrink-0 mr-auto">
          <div
            className="w-7 h-7 rounded-[5px] flex items-center justify-center transition-transform duration-100 group-active:scale-95"
            style={{ background: "var(--brand-gradient)" }}
          >
            <Heart size={13} style={{ color: '#fff', fill: '#fff' }} />
          </div>
          <span className="font-semibold text-xs tracking-tight font-mono hidden sm:inline">
            TDC<span style={{ color: 'var(--text-tertiary)' }}>|MATCHMAKER</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium transition-all duration-100 rounded-md whitespace-nowrap font-mono active:translate-y-px ${
              pathname.startsWith("/dashboard")
                ? "bg-[var(--bg-surface)] border border-[var(--border-hover)]"
                : "border border-transparent hover:bg-[var(--bg-surface)]"
            }`}
            style={{ color: pathname.startsWith("/dashboard") ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
          >
            <LayoutDashboard size={14} />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--border-default)' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="p-1.5 rounded-md transition-all duration-200 hover:bg-[var(--bg-surface)]"
            style={{ color: 'var(--text-tertiary)' }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.3), rgba(244,114,182,0.1))" }}>
              <span className="text-rose-400">{user?.name?.[0]}</span>
            </div>
            <span className="text-[10px] font-mono hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="p-1.5 hover:text-rose-400 transition-colors rounded-md hover:bg-[var(--bg-surface)]"
            style={{ color: 'var(--text-tertiary)' }}
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
