import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          850: "#1f1f1f",
          950: "#0a0a0a",
        },
        rose: {
          450: "#f472b6",
        },
        accent: {
          DEFAULT: "#ffffff",
          muted: "#a1a1aa",
          dim: "#52525b",
        },
        surface: {
          DEFAULT: "#0c0c0c",
          elevated: "rgba(255,255,255,0.03)",
        },
        danger: "#ef4444",
        warn: "#f59e0b",
        success: "#22c55e",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
    },
  },
  plugins: [],
};
export default config;
