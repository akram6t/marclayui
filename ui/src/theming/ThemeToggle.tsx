"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export interface ThemeToggleProps {
  className?: string;
}

/** Raised clay pill that flips light/dark. Uses useTheme, so it must sit inside <MarclayProvider>. */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { mode, toggle } = useTheme();
  const next = mode === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={`mcl-theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="mcl-theme-toggle-icon" aria-hidden="true">
        {mode === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
