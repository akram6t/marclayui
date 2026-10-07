"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type ToastVariant = "info" | "success" | "danger" | "warning";

export interface ToastOptions {
  title?: React.ReactNode;
  message?: React.ReactNode;
  variant?: ToastVariant;
  /** ms before auto-dismiss; 0 keeps it until closed manually. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (t: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export type ToastPlacement = "top-right" | "top-center" | "bottom-right" | "bottom-left";

export interface ToastProviderProps {
  children: React.ReactNode;
  placement?: ToastPlacement;
}

export function ToastProvider({ children, placement = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timersRef = useRef<Map<number, number>>(new Map());

  const dismiss = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (o: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((list) => [...list, { ...o, id }].slice(-4));
      const d = o.duration ?? 4200;
      if (d > 0) {
        const timer = window.setTimeout(() => dismiss(id), d);
        timersRef.current.set(id, timer);
      }
    },
    [dismiss]
  );

  // clear pending auto-dismiss timers when the provider unmounts
  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={`mcl-toasts mcl-toasts-${placement}`} aria-live="polite">
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  return (
    <div className={`mcl-toast mcl-toast-${item.variant ?? "info"}`} role="status">
      <span className="mcl-toast-dot" aria-hidden="true" />
      <div className="mcl-toast-content">
        {item.title && <div className="mcl-toast-title">{item.title}</div>}
        {item.message && <div className="mcl-toast-message">{item.message}</div>}
      </div>
      <button type="button" className="mcl-toast-close" onClick={onClose} aria-label="Dismiss notification">
        ✕
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>.");
  return ctx;
}
