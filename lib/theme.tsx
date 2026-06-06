"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { sounds } from "@/lib/sound";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggle: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "light", toggle: () => {} });

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
  localStorage.setItem("tdc-theme", theme);
}

function circularReveal(x: number, y: number, onReveal: () => void) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9998; pointer-events: none;
    background: var(--bg-primary);
    clip-path: circle(0 at ${x}px ${y}px);
    transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      onReveal();
      overlay.style.clipPath = `circle(150vmax at ${x}px ${y}px)`;
    });
  });

  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.2s ease";
    setTimeout(() => overlay.remove(), 200);
  }, 500);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tdc-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted]);

  const toggle = useCallback((event?: React.MouseEvent) => {
    sounds.toggle();
    const next = theme === "dark" ? "light" : "dark";

    if (event) {
      const x = event.clientX;
      const y = event.clientY;
      circularReveal(x, y, () => setTheme(next));
    } else {
      setTheme(next);
    }
  }, [theme]);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
