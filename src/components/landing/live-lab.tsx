"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  COLOR_SWATCHES,
  Input,
  Progress,
  Range,
  Stat,
  Switch,
  Tabs,
  useTheme,
  PRESETS,
} from "marclayui";

const MODES = [
  { key: "light", label: "Light" },
  { key: "system", label: "System" },
  { key: "dark", label: "Dark" },
] as const;

const AUTO_CYCLE_MS = 5000;

/** Interactive proof of MarclayUI's control: presets, modes and primary color — live.
 *  On the landing page the primary color auto-cycles every 5s while the lab is
 *  in view; any manual pick hands control back to the visitor. */
export function LiveLab() {
  const { mode, preference, setPreference, preset, setPreset, setColors, resetColors } = useTheme();
  const [swatch, setSwatch] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const manualRef = useRef(false);
  const [autoIndex, setAutoIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const labRef = useRef<HTMLDivElement>(null);
  const [notify, setNotify] = useState(true);
  const [level, setLevel] = useState(64);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setLevel(78), 600);
    return () => window.clearTimeout(t);
  }, []);

  // cycle only while the lab is actually on screen
  useEffect(() => {
    const el = labRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (manual || !inView) return;
    const id = window.setInterval(() => {
      setAutoIndex((i) => (i + 1) % COLOR_SWATCHES.length);
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [manual, inView]);

  useEffect(() => {
    if (manual || !inView) return;
    setColors({ primary: COLOR_SWATCHES[autoIndex].color });
  }, [autoIndex, manual, inView, setColors]);

  // leaving the page: auto colors roll back to the preset, manual picks stay
  useEffect(
    () => () => {
      if (!manualRef.current) resetColors();
    },
    [resetColors]
  );

  const pick = (color: string | null) => {
    manualRef.current = true;
    setManual(true);
    setSwatch(color);
    if (color) setColors({ primary: color });
    else resetColors();
  };

  const activeColor = manual ? swatch : COLOR_SWATCHES[autoIndex].color;

  return (
    <div className="home-lab" ref={labRef}>
      <div className="home-lab-controls">
        <div style={{ display: "grid", gap: 10 }}>
          <div className="home-chip-row" role="group" aria-label="Style preset">
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
          <div className="home-chip-row" role="group" aria-label="Theme mode">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`home-chip${preference === m.key ? " on" : ""}`}
                onClick={() => setPreference(m.key)}
              >
                {m.label}
                {m.key === "system" && preference === "system" ? ` (${mode})` : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="home-swatches" role="group" aria-label="Primary color">
          {COLOR_SWATCHES.map((p) => (
            <button
              key={p.color}
              type="button"
              className={`home-swatch${activeColor === p.color ? " on" : ""}`}
              style={{ background: `linear-gradient(145deg, ${p.color}, ${p.color})` }}
              title={p.name}
              aria-label={`Primary ${p.name}`}
              aria-pressed={activeColor === p.color}
              onClick={() => pick(p.color)}
            />
          ))}
          <button type="button" className="home-swatch-reset" onClick={() => pick(null)}>
            Reset
          </button>
        </div>
      </div>

      <div className="home-lab-grid">
        <div style={{ display: "grid", gap: 22 }}>
          <div className="home-lab-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="home-lab-row">
            <Input placeholder="Email address" aria-label="Email address" />
            <Switch label="Notifications" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
          </div>
          <Range
            label="Volume"
            showValue
            min={0}
            max={100}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
          <Progress value={level} label="Storage used" showValue />
        </div>
        <div style={{ display: "grid", gap: 22 }}>
          <div className="home-lab-row">
            <Badge solid variant="primary">
              New
            </Badge>
            <Badge variant="success">Stable</Badge>
            <Badge solid variant="accent">
              v0.3.0
            </Badge>
          </div>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { key: "a", label: "Overview", content: "Soft shadows, warm gradients, real depth — no Tailwind, no runtime deps." },
              { key: "b", label: "Themes", content: "Light & dark ship in one stylesheet. Override any color at runtime." },
              { key: "c", label: "A11y", content: "Focus rings, ARIA roles and keyboard support come built in." },
            ]}
          />
          <div className="home-lab-row">
            <Stat value={`${level}%`} label="Complete" />
            <Stat value="26" label="Components" tone="accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
