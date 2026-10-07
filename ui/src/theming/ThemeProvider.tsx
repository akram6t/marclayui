"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { alpha, darken, lighten, readableInk } from "../utils/color";
import { PRESET_STORAGE_KEY, type PresetName } from "./presets";
export type ThemeMode = "light" | "dark";
export type ModePreference = ThemeMode | "system";

/** Colors you can override at runtime, like Bootstrap's SCSS variables but live. */
export interface ColorOverrides {
  primary?: string;
  secondary?: string;
  accent?: string;
  success?: string;
  danger?: string;
  warning?: string;
  info?: string;
  bg?: string;
  ink?: string;
  muted?: string;
}

interface ThemeContextValue {
  /** Resolved mode after applying "system". */
  mode: ThemeMode;
  /** What the user asked for: "light" | "dark" | "system". */
  preference: ModePreference;
  setPreference: (p: ModePreference) => void;
  toggle: () => void;
  /** Active style preset — swaps the whole light+dark palette pair. */
  preset: PresetName;
  setPreset: (p: PresetName) => void;
  colors: ColorOverrides;
  setColors: (c: ColorOverrides) => void;
  resetColors: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "mcl-theme";

const TONES: Array<[keyof ColorOverrides, string, string]> = [
  ["primary", "primary", "p"],
  ["secondary", "secondary", "s"],
  ["accent", "accent", "a"],
  ["success", "success", "c"],
  ["danger", "danger", "d"],
  ["warning", "warning", "w"],
  ["info", "info", "i"],
];

function systemMode(): ThemeMode {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Derives every CSS variable needed from a single base color. */
function toneVars(base: string, dark: boolean): Record<string, string> {
  return {
    base: base,
    light: lighten(base, dark ? 0.24 : 0.16),
    deep: darken(base, 0.32),
    ink: readableInk(base),
    clay: `inset -5px -6px 10px ${alpha(darken(base, 0.68), dark ? 0.5 : 0.3)}, inset 5px 6px 10px ${alpha(
      lighten(base, 0.45),
      dark ? 0.38 : 0.5
    )}`,
  };
}

function colorVars(c: ColorOverrides, mode: ThemeMode): Record<string, string> {
  const vars: Record<string, string> = {};
  const dark = mode === "dark";

  for (const [key, name, short] of TONES) {
    const base = c[key];
    if (!base) continue;
    const t = toneVars(base, dark);
    vars[`--mcl-${name}`] = t.base;
    vars[`--mcl-${name}-2`] = t.light;
    vars[`--mcl-${name}-deep`] = t.deep;
    vars[`--mcl-${name}-ink`] = t.ink;
    vars[`--mcl-clay-${short}`] = t.clay;
    if (key === "primary") vars["--mcl-ring"] = alpha(base, dark ? 0.45 : 0.4);
  }

  if (c.bg) {
    vars["--mcl-bg"] = c.bg;
    vars["--mcl-sd"] = alpha(darken(c.bg, dark ? 0.78 : 0.4), dark ? 0.72 : 0.6);
    vars["--mcl-sl"] = alpha(lighten(c.bg, dark ? 0.3 : 0.9), dark ? 0.07 : 0.95);
    vars["--mcl-sheen"] = alpha(lighten(c.bg, 0.9), dark ? 0.08 : 0.5);
  }
  if (c.ink) vars["--mcl-ink"] = c.ink;
  if (c.muted) vars["--mcl-muted"] = c.muted;
  return vars;
}

/** Tip: import { themeInitScript } from "marclayui/theme-init" — it lives in its own
 *  Server-Component-safe module and the main bundle is marked "use client". */

export interface MarclayProviderProps {
  children: React.ReactNode;
  /** "system" follows the OS preference; persisted to localStorage. */
  defaultMode?: ModePreference;
  /** Style preset: "clay" (claymorphism) or "neo" (neumorphism). Persisted. */
  preset?: PresetName;
  /** Optional initial color overrides (react-bootstrap-style runtime theming). */
  colors?: ColorOverrides;
}

export function MarclayProvider({
  children,
  defaultMode = "system",
  preset: initialPreset = "clay",
  colors: initialColors,
}: MarclayProviderProps) {
  const [preference, setPreferenceState] = useState<ModePreference>(defaultMode);
  const [mode, setMode] = useState<ThemeMode>("light");
  const [preset, setPresetState] = useState<PresetName>(initialPreset);
  const [colors, setColorsState] = useState<ColorOverrides>(initialColors ?? {});
  const appliedKeys = useRef<Set<string>>(new Set());

  // Sync with the no-flash init script / stored preferences.
  useEffect(() => {
    let stored: ModePreference | null = null;
    let storedPreset: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY) as ModePreference | null;
      storedPreset = localStorage.getItem(PRESET_STORAGE_KEY);
    } catch {
      stored = null;
    }
    setPreferenceState(stored ?? defaultMode);
    if (storedPreset === "clay" || storedPreset === "neo") setPresetState(storedPreset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve preference -> concrete mode, and keep "system" live.
  useEffect(() => {
    const apply = () => {
      const m = preference === "system" ? systemMode() : preference;
      setMode(m);
      document.documentElement.setAttribute("data-theme", m);
    };
    apply();
    if (preference !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [preference]);

  // Apply the style preset (both palettes live in CSS under [data-preset]).
  useEffect(() => {
    if (preset === "clay") document.documentElement.removeAttribute("data-preset");
    else document.documentElement.setAttribute("data-preset", preset);
  }, [preset]);

  // Apply (and re-apply on mode change) the runtime color overrides.
  useEffect(() => {
    const root = document.documentElement;
    appliedKeys.current.forEach((k) => root.style.removeProperty(k));
    appliedKeys.current.clear();
    if (Object.keys(colors).length === 0) return;
    const vars = colorVars(colors, mode);
    for (const [k, v] of Object.entries(vars)) {
      root.style.setProperty(k, v);
      appliedKeys.current.add(k);
    }
  }, [colors, mode]);

  const setPreference = useCallback((p: ModePreference) => {
    setPreferenceState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      /* private mode — theme still applies for this session */
    }
  }, []);

  const toggle = useCallback(() => {
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);

  const setPreset = useCallback((p: PresetName) => {
    setPresetState(p);
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, p);
    } catch {
      /* private mode — preset still applies for this session */
    }
    // custom colors are tuned to the old preset; clear them so the new one shows cleanly
    setColorsState({});
  }, []);

  const setColors = useCallback((c: ColorOverrides) => {
    setColorsState((prev) => ({ ...prev, ...c }));
  }, []);

  const resetColors = useCallback(() => setColorsState({}), []);

  const value = useMemo(
    () => ({
      mode,
      preference,
      setPreference,
      toggle,
      preset,
      setPreset,
      colors,
      setColors,
      resetColors,
    }),
    [mode, preference, setPreference, toggle, preset, setPreset, colors, setColors, resetColors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <MarclayProvider>.");
  return ctx;
}

/** Backwards-friendly alias. */
export const ThemeProvider = MarclayProvider;
