"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { COLOR_SWATCHES, PRESETS } from "./presets";

const MODE_OPTIONS = [
  { key: "light", label: "Light", icon: "☀️" },
  { key: "system", label: "System", icon: "🖥️" },
  { key: "dark", label: "Dark", icon: "🌙" },
] as const;

export interface ThemeMenuProps {
  className?: string;
}

/** Navbar theme button that opens a customization panel: mode, style preset
 *  and primary color swatches. Closes on Escape or outside click. */
export function ThemeMenu({ className = "" }: ThemeMenuProps) {
  const {
    mode,
    preference,
    setPreference,
    preset,
    setPreset,
    colors,
    setColors,
    resetColors,
  } = useTheme();
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
      // flip above the trigger when there isn't room below (mobile)
      const t = window.setTimeout(() => {
        const trig = triggerRef.current;
        const panel = panelRef.current;
        if (!trig || !panel) return;
        const r = trig.getBoundingClientRect();
        setFlipUp(window.innerHeight - r.bottom < panel.offsetHeight + 12);
      }, 0);
      return () => window.clearTimeout(t);
    }
    setFlipUp(false);
  }, [open]);

  const activeSwatch = colors.primary?.toLowerCase();

  return (
    <div ref={shellRef} className={`mcl-theme-menu-shell ${className}`.trim()}>
      <button
        ref={triggerRef}
        type="button"
        className="mcl-theme-toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Customize theme"
        title="Customize theme"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mcl-theme-toggle-icon" aria-hidden="true">
          {preference === "system" ? "🖥️" : mode === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Customize theme"
          className={`mcl-theme-menu${flipUp ? " mcl-theme-menu-up" : ""}`}
        >
          <div className="mcl-theme-menu-section">
            <span className="mcl-theme-menu-label">Mode · {mode}</span>
            <div className="mcl-theme-menu-chips">
              {MODE_OPTIONS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`mcl-theme-menu-chip${preference === m.key ? " mcl-theme-menu-chip-on" : ""}`}
                  aria-pressed={preference === m.key}
                  onClick={() => setPreference(m.key)}
                >
                  <span aria-hidden="true">{m.icon}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mcl-theme-menu-section">
            <span className="mcl-theme-menu-label">Style preset</span>
            <div className="mcl-theme-menu-chips">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`mcl-theme-menu-chip${preset === p.id ? " mcl-theme-menu-chip-on" : ""}`}
                  aria-pressed={preset === p.id}
                  onClick={() => setPreset(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mcl-theme-menu-section">
            <span className="mcl-theme-menu-label">Primary color</span>
            <div className="mcl-theme-menu-swatches">
              {COLOR_SWATCHES.map((s) => (
                <button
                  key={s.color}
                  type="button"
                  className={`mcl-theme-menu-swatch${activeSwatch === s.color.toLowerCase() ? " mcl-theme-menu-swatch-on" : ""}`}
                  style={{ background: s.color }}
                  title={s.name}
                  aria-label={`Primary ${s.name}`}
                  aria-pressed={activeSwatch === s.color.toLowerCase()}
                  onClick={() => setColors({ primary: s.color })}
                />
              ))}
            </div>
            <button type="button" className="mcl-theme-menu-reset" onClick={resetColors}>
              Reset colors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
