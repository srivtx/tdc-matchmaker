"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  show: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const config = {
  success: {
    icon: CheckCircle,
    ring: "rgba(34,197,94,0.25)",
    ringLight: "rgba(16,185,129,0.15)",
    iconColor: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-800/50",
    label: "SUCCESS",
    bar: "linear-gradient(90deg, #22c55e, transparent)",
  },
  error: {
    icon: XCircle,
    ring: "rgba(244,63,94,0.25)",
    ringLight: "rgba(225,29,116,0.15)",
    iconColor: "text-rose-400",
    bg: "bg-rose-950/30",
    border: "border-rose-800/50",
    label: "ERROR",
    bar: "linear-gradient(90deg, #f43f5e, transparent)",
  },
  info: {
    icon: Info,
    ring: "rgba(59,130,246,0.25)",
    ringLight: "rgba(14,165,233,0.15)",
    iconColor: "text-sky-400",
    bg: "bg-sky-950/30",
    border: "border-sky-800/50",
    label: "INFO",
    bar: "linear-gradient(90deg, #3b82f6, transparent)",
  },
  warning: {
    icon: AlertTriangle,
    ring: "rgba(251,191,36,0.25)",
    ringLight: "rgba(245,158,11,0.15)",
    iconColor: "text-amber-400",
    bg: "bg-amber-950/30",
    border: "border-amber-800/50",
    label: "NOTICE",
    bar: "linear-gradient(90deg, #fbbf24, transparent)",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-2.5 max-w-xs w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const { icon: Icon, ring, ringLight, iconColor, bg, border, label, bar } = config[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-auto"
              >
                <div
                  className={`relative overflow-hidden rounded-xl border backdrop-blur-2xl ${bg} ${border}`}
                  style={{
                    boxShadow: `0 0 0 1px ${ring} inset, 0 12px 32px -8px rgba(0,0,0,0.3)`,
                  }}
                >
                  <style>{`
                    .light .toast-${toast.id} {
                      box-shadow: 0 0 0 1px ${ringLight} inset, 0 4px 16px -4px rgba(0,0,0,0.06) !important;
                    }
                    .light .toast-${toast.id} .toast-title-text { color: #71717a; }
                    .light .toast-${toast.id} .toast-body-text { color: #52525b; }
                    .light .toast-${toast.id} .toast-close { color: #a1a1aa; }
                    .light .toast-${toast.id} .toast-close:hover { color: #52525b; }
                  `}</style>

                  <div className={`flex items-start gap-3 p-4 toast-${toast.id}`}>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}
                    >
                      <Icon size={15} className={iconColor} />
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-1 toast-title-text">
                        {label}
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed toast-body-text">
                        {toast.message}
                      </p>
                    </div>

                    <button
                      onClick={() => dismiss(toast.id)}
                      className="p-1 text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5 toast-close"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-[2px]"
                    style={{ background: bar }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
