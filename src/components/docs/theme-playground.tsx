"use client";

import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  PRESETS,
  Progress,
  Range,
  Dropdown,
  useTheme,
  type ColorOverrides,
} from "marclayui";

const COLOR_SLOTS: Array<{ key: keyof ColorOverrides; label: string }> = [
  { key: "primary", label: "primary" },
  { key: "secondary", label: "secondary" },
  { key: "accent", label: "accent" },
  { key: "muted", label: "muted text" },
  { key: "bg", label: "background" },
  { key: "ink", label: "text" },
];

const DEFAULTS: Record<string, Record<string, string>> = {
  clay: {
    primary: "#e0785a",
    secondary: "#a8b894",
    accent: "#d9a854",
    muted: "#97897b",
    bg: "#ece4da",
    ink: "#4a3f35",
  },
  neo: {
    primary: "#6d5dfc",
    secondary: "#7f92b8",
    accent: "#d99e3f",
    muted: "#8a93a5",
    bg: "#e0e5ec",
    ink: "#3d4552",
  },
};

const PALETTES: Array<{ name: string; colors: Record<string, string> }> = [
  { name: "Terra", colors: { ...DEFAULTS.clay } },
  {
    name: "Violet",
    colors: { primary: "#7c5cff", secondary: "#9a8fb8", accent: "#c9a2e8", muted: "#8a83a5", bg: "#e9e4f2", ink: "#3a3350" },
  },
  {
    name: "Ocean",
    colors: { primary: "#4a90d9", secondary: "#7fb5c9", accent: "#63c3b1", muted: "#7e93a5", bg: "#e2eaf0", ink: "#2b3f52" },
  },
  {
    name: "Forest",
    colors: { primary: "#5a8a46", secondary: "#93a883", accent: "#c9a854", muted: "#8a9683", bg: "#e6eade", ink: "#33402a" },
  },
];

const MODES = [
  { key: "light", label: "Light" },
  { key: "system", label: "System" },
  { key: "dark", label: "Dark" },
] as const;

const FONT_OPTIONS = [
  { value: "default", label: "Preset default" },
  { value: "quicksand", label: "Quicksand" },
  { value: "poppins", label: "Poppins" },
  { value: "manrope", label: "Manrope" },
  { value: "system", label: "System UI" },
];

const FONT_STACKS: Record<string, string> = {
  quicksand: "'Quicksand', ui-sans-serif, system-ui, sans-serif",
  poppins: "var(--font-poppins, 'Poppins'), ui-sans-serif, system-ui, sans-serif",
  manrope: "var(--font-manrope, 'Manrope'), ui-sans-serif, system-ui, sans-serif",
  system: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
};

export function ThemePlayground() {
  const { mode, preference, setPreference, preset, setPreset, setColors, resetColors } = useTheme();
  const [current, setCurrent] = useState<Record<string, string>>({ ...DEFAULTS.clay });
  const [customized, setCustomized] = useState(false);
  const [radius, setRadius] = useState(22);
  const [font, setFont] = useState("default");
  const [prevPreset, setPrevPreset] = useState(preset);

  // pickers follow the active preset's defaults until the visitor customizes —
  // render-time adjustment, the sanctioned alternative to an effect
  if (prevPreset !== preset) {
    setPrevPreset(preset);
    if (!customized) setCurrent({ ...DEFAULTS[preset] });
  }

  const applyColors = (colors: Record<string, string>) => {
    setCustomized(true);
    setCurrent(colors);
    setColors(colors);
  };

  const applyRadius = (v: number) => {
    setRadius(v);
    const root = document.documentElement.style;
    root.setProperty("--mcl-radius", `${v}px`);
    root.setProperty("--mcl-radius-sm", `${Math.round(v * 0.68)}px`);
    root.setProperty("--mcl-radius-lg", `${Math.round(v * 1.45)}px`);
  };

  const applyFont = (v: string) => {
    setFont(v);
    const root = document.documentElement.style;
    if (v === "default") root.removeProperty("--mcl-font");
    else root.setProperty("--mcl-font", FONT_STACKS[v] ?? "");
  };

  const resetAll = () => {
    resetColors();
    setCustomized(false);
    setCurrent({ ...DEFAULTS[preset] });
    const root = document.documentElement.style;
    ["--mcl-radius", "--mcl-radius-sm", "--mcl-radius-lg", "--mcl-font"].forEach((k) => root.removeProperty(k));
    setRadius(22);
    setFont("default");
  };

  const snippet = `<MarclayProvider${preset !== "clay" ? ` preset="${preset}"` : ""}${
    Object.keys(current).some((k) => current[k] !== DEFAULTS[preset][k])
      ? `
  colors={{
${Object.entries(current)
  .map(([k, v]) => `    ${k}: "${v}",`)
  .join("\n")}
  }}`
      : ""
  }
/>`;

  return (
    <div className="docs-playground">
      <div className="docs-pg-panel">
        <div className="docs-pg-section">
          <span className="docs-pg-label">STYLE PRESET</span>
          <div className="home-chip-row">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`home-chip${preset === p.id ? " on" : ""}`}
                onClick={() => setPreset(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <span className="docs-pg-hint">
            {PRESETS.find((p) => p.id === preset)?.description}
          </span>
        </div>

        <div className="docs-pg-section">
          <span className="docs-pg-label">MODE · {mode.toUpperCase()}</span>
          <div className="home-chip-row">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`home-chip${preference === m.key ? " on" : ""}`}
                onClick={() => setPreference(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="docs-pg-section">
          <span className="docs-pg-label">COLORS</span>
          {COLOR_SLOTS.map((s) => (
            <div className="docs-pg-color" key={s.key}>
              <input
                type="color"
                value={current[s.key]}
                aria-label={`${s.label} color`}
                onChange={(e) => applyColors({ ...current, [s.key]: e.target.value })}
              />
              <div>
                <div className="docs-pg-label">{s.label}</div>
                <code>{current[s.key]}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="docs-pg-section">
          <span className="docs-pg-label">SHAPE &amp; TYPE</span>
          <Range label="Corner radius" showValue min={8} max={32} value={radius} onChange={(e) => applyRadius(Number(e.target.value))} />
          <Dropdown
            label="Typeface"
            size="sm"
            value={font}
            items={FONT_OPTIONS}
            onChange={(v) => applyFont(v as string)}
          />
        </div>

        <div className="docs-pg-section">
          <span className="docs-pg-label">PALETTES</span>
          <div className="docs-swatches-mini">
            {PALETTES.map((p) => (
              <Button key={p.name} size="sm" variant="soft" onClick={() => applyColors(p.colors)}>
                {p.name}
              </Button>
            ))}
          </div>
        </div>

        <Button variant="ghost" onClick={resetAll}>
          Reset customization
        </Button>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        <div className="docs-pg-stage">
          <div className="docs-pg-stage-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
          </div>
          <div className="docs-pg-stage-row">
            <Input placeholder="Type something…" aria-label="Playground input" />
            <Badge solid variant="primary">
              Live
            </Badge>
          </div>
          <Progress value={66} label="Playground" showValue />
          <Alert variant="success" title="Looking good">
            Presets swap both palettes; colors, radius and typeface layer on top — instantly.
          </Alert>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Equivalent JSX</CardTitle>
          </CardHeader>
          <CardBody>
            <pre
              style={{
                margin: 0,
                overflowX: "auto",
                fontFamily: "var(--mcl-mono)",
                fontSize: 12.5,
                lineHeight: 1.7,
                color: "var(--mcl-ink)",
              }}
            >
              {snippet}
            </pre>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
