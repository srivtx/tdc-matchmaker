import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "TDC Matchmaker | Internal Dashboard",
  description: "AI-powered matchmaking dashboard for The Date Crew — manage clients, score compatibility, and send match introductions.",
  other: {
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <div className="vignette" aria-hidden="true" />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <DynamicNav />
              <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
                {children}
              </main>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Nav } from "@/components/Nav";
function DynamicNav() {
  return <Nav />;
}
