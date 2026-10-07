"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  Alert: () => Alert,
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup,
  Badge: () => Badge,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  COLOR_SWATCHES: () => COLOR_SWATCHES,
  Card: () => Card,
  CardBody: () => CardBody,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  Divider: () => Divider,
  Dropdown: () => Dropdown,
  Input: () => Input,
  Kbd: () => Kbd,
  MarclayProvider: () => MarclayProvider,
  Modal: () => Modal,
  Navbar: () => Navbar,
  PRESETS: () => PRESETS,
  Progress: () => Progress,
  Radio: () => Radio,
  Range: () => Range,
  Select: () => Select,
  Skeleton: () => Skeleton,
  Spinner: () => Spinner,
  Stack: () => Stack,
  Stat: () => Stat,
  Switch: () => Switch,
  Tabs: () => Tabs,
  Textarea: () => Textarea,
  ThemeMenu: () => ThemeMenu,
  ThemeProvider: () => ThemeProvider,
  ThemeToggle: () => ThemeToggle,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  useTheme: () => useTheme,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/theming/ThemeProvider.tsx
var import_react = require("react");

// src/utils/color.ts
var WHITE = { r: 255, g: 255, b: 255 };
var BLACK = { r: 0, g: 0, b: 0 };
function clamp(n, min = 0, max = 255) {
  return Math.min(max, Math.max(min, n));
}
function parseHex(hex) {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return { ...BLACK };
  const n = parseInt(h, 16);
  return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 };
}
function toHex(c) {
  const part = (v) => clamp(Math.round(v)).toString(16).padStart(2, "0");
  return `#${part(c.r)}${part(c.g)}${part(c.b)}`;
}
function rgba(c, a) {
  return `rgba(${clamp(Math.round(c.r))}, ${clamp(Math.round(c.g))}, ${clamp(Math.round(c.b))}, ${a})`;
}
function mix(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t
  };
}
function lighten(hex, t) {
  return toHex(mix(parseHex(hex), WHITE, t));
}
function darken(hex, t) {
  return toHex(mix(parseHex(hex), BLACK, t));
}
function alpha(hex, a) {
  return rgba(parseHex(hex), a);
}
function readableInk(base) {
  const { r, g, b } = mix(parseHex(base), WHITE, 0.12);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#3a2d20" : "#fff8f2";
}

// src/theming/presets.ts
var PRESETS = [
  {
    id: "clay",
    label: "Claymorphism",
    description: "Warm terracotta clay, squircles, Quicksand \u2014 the signature MarclayUI look."
  },
  {
    id: "neo",
    label: "Neumorphism",
    description: "Soft grey-blue extrusions, violet (light) / gold (dark) accent, circles, Poppins & Manrope."
  }
];
var PRESET_STORAGE_KEY = "mcl-preset";
var COLOR_SWATCHES = [
  { name: "Terra", color: "#e0785a" },
  { name: "Violet", color: "#7c5cff" },
  { name: "Ocean", color: "#4a90d9" },
  { name: "Forest", color: "#5a8a46" },
  { name: "Magenta", color: "#c74f9d" }
];

// src/theming/ThemeProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "mcl-theme";
var TONES = [
  ["primary", "primary", "p"],
  ["secondary", "secondary", "s"],
  ["accent", "accent", "a"],
  ["success", "success", "c"],
  ["danger", "danger", "d"],
  ["warning", "warning", "w"],
  ["info", "info", "i"]
];
function systemMode() {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function toneVars(base, dark) {
  return {
    base,
    light: lighten(base, dark ? 0.24 : 0.16),
    deep: darken(base, 0.32),
    ink: readableInk(base),
    clay: `inset -5px -6px 10px ${alpha(darken(base, 0.68), dark ? 0.5 : 0.3)}, inset 5px 6px 10px ${alpha(
      lighten(base, 0.45),
      dark ? 0.38 : 0.5
    )}`
  };
}
function colorVars(c, mode) {
  const vars = {};
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
function MarclayProvider({
  children,
  defaultMode = "system",
  preset: initialPreset = "clay",
  colors: initialColors
}) {
  const [preference, setPreferenceState] = (0, import_react.useState)(defaultMode);
  const [mode, setMode] = (0, import_react.useState)("light");
  const [preset, setPresetState] = (0, import_react.useState)(initialPreset);
  const [colors, setColorsState] = (0, import_react.useState)(initialColors ?? {});
  const appliedKeys = (0, import_react.useRef)(/* @__PURE__ */ new Set());
  (0, import_react.useEffect)(() => {
    let stored = null;
    let storedPreset = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
      storedPreset = localStorage.getItem(PRESET_STORAGE_KEY);
    } catch {
      stored = null;
    }
    setPreferenceState(stored ?? defaultMode);
    if (storedPreset === "clay" || storedPreset === "neo") setPresetState(storedPreset);
  }, []);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (preset === "clay") document.documentElement.removeAttribute("data-preset");
    else document.documentElement.setAttribute("data-preset", preset);
  }, [preset]);
  (0, import_react.useEffect)(() => {
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
  const setPreference = (0, import_react.useCallback)((p) => {
    setPreferenceState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
    }
  }, []);
  const toggle = (0, import_react.useCallback)(() => {
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);
  const setPreset = (0, import_react.useCallback)((p) => {
    setPresetState(p);
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, p);
    } catch {
    }
    setColorsState({});
  }, []);
  const setColors = (0, import_react.useCallback)((c) => {
    setColorsState((prev) => ({ ...prev, ...c }));
  }, []);
  const resetColors = (0, import_react.useCallback)(() => setColorsState({}), []);
  const value = (0, import_react.useMemo)(
    () => ({
      mode,
      preference,
      setPreference,
      toggle,
      preset,
      setPreset,
      colors,
      setColors,
      resetColors
    }),
    [mode, preference, setPreference, toggle, preset, setPreset, colors, setColors, resetColors]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = (0, import_react.useContext)(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <MarclayProvider>.");
  return ctx;
}
var ThemeProvider = MarclayProvider;

// src/theming/ThemeToggle.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function ThemeToggle({ className = "" }) {
  const { mode, toggle } = useTheme();
  const next = mode === "dark" ? "light" : "dark";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      type: "button",
      className: `mcl-theme-toggle ${className}`.trim(),
      onClick: toggle,
      "aria-label": `Switch to ${next} mode`,
      title: `Switch to ${next} mode`,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mcl-theme-toggle-icon", "aria-hidden": "true", children: mode === "dark" ? "\u2600\uFE0F" : "\u{1F319}" })
    }
  );
}

// src/theming/ThemeMenu.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var MODE_OPTIONS = [
  { key: "light", label: "Light", icon: "\u2600\uFE0F" },
  { key: "system", label: "System", icon: "\u{1F5A5}\uFE0F" },
  { key: "dark", label: "Dark", icon: "\u{1F319}" }
];
function ThemeMenu({ className = "" }) {
  const {
    mode,
    preference,
    setPreference,
    preset,
    setPreset,
    colors,
    setColors,
    resetColors
  } = useTheme();
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [flipUp, setFlipUp] = (0, import_react2.useState)(false);
  const shellRef = (0, import_react2.useRef)(null);
  const panelRef = (0, import_react2.useRef)(null);
  const triggerRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (!open) return;
    const onDown = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onKey = (e) => {
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
  (0, import_react2.useEffect)(() => {
    if (open) {
      panelRef.current?.focus();
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ref: shellRef, className: `mcl-theme-menu-shell ${className}`.trim(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        className: "mcl-theme-toggle",
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-label": "Customize theme",
        title: "Customize theme",
        onClick: () => setOpen((o) => !o),
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mcl-theme-toggle-icon", "aria-hidden": "true", children: preference === "system" ? "\u{1F5A5}\uFE0F" : mode === "dark" ? "\u{1F319}" : "\u2600\uFE0F" })
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        ref: panelRef,
        tabIndex: -1,
        role: "dialog",
        "aria-label": "Customize theme",
        className: `mcl-theme-menu${flipUp ? " mcl-theme-menu-up" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mcl-theme-menu-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "mcl-theme-menu-label", children: [
              "Mode \xB7 ",
              mode
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mcl-theme-menu-chips", children: MODE_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "button",
              {
                type: "button",
                className: `mcl-theme-menu-chip${preference === m.key ? " mcl-theme-menu-chip-on" : ""}`,
                "aria-pressed": preference === m.key,
                onClick: () => setPreference(m.key),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: m.icon }),
                  " ",
                  m.label
                ]
              },
              m.key
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mcl-theme-menu-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mcl-theme-menu-label", children: "Style preset" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mcl-theme-menu-chips", children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: `mcl-theme-menu-chip${preset === p.id ? " mcl-theme-menu-chip-on" : ""}`,
                "aria-pressed": preset === p.id,
                onClick: () => setPreset(p.id),
                children: p.label
              },
              p.id
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mcl-theme-menu-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mcl-theme-menu-label", children: "Primary color" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mcl-theme-menu-swatches", children: COLOR_SWATCHES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: `mcl-theme-menu-swatch${activeSwatch === s.color.toLowerCase() ? " mcl-theme-menu-swatch-on" : ""}`,
                style: { background: s.color },
                title: s.name,
                "aria-label": `Primary ${s.name}`,
                "aria-pressed": activeSwatch === s.color.toLowerCase(),
                onClick: () => setColors({ primary: s.color })
              },
              s.color
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "mcl-theme-menu-reset", onClick: resetColors, children: "Reset colors" })
          ] })
        ]
      }
    )
  ] });
}

// src/components/button/button.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var Button = import_react3.default.forwardRef(
  function Button2({
    variant = "soft",
    size = "md",
    loading = false,
    block = false,
    className = "",
    disabled,
    children,
    type = "button",
    href,
    ...rest
  }, ref) {
    const cls = [
      "mcl-btn",
      `mcl-btn-${variant}`,
      `mcl-btn-${size}`,
      block ? "mcl-btn-block" : "",
      loading ? "mcl-btn-loading" : "",
      className
    ].filter(Boolean).join(" ");
    if (href) {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "a",
        {
          ref,
          href,
          className: cls,
          "aria-disabled": disabled || void 0,
          ...rest,
          children: [
            loading && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mcl-btn-spinner", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mcl-btn-label", children })
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        ref,
        type,
        className: cls,
        disabled: disabled || loading,
        ...rest,
        children: [
          loading && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mcl-btn-spinner", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mcl-btn-label", children })
        ]
      }
    );
  }
);
function ButtonGroup({ children, className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `mcl-btn-group ${className}`.trim(), role: "group", ...rest, children });
}

// src/components/kbd/kbd.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function Kbd({ children, className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("kbd", { className: `mcl-kbd ${className}`.trim(), ...rest, children });
}

// src/components/card/card.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function Card({ hover = false, className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `mcl-card${hover ? " mcl-card-hover" : ""} ${className}`.trim(), ...rest });
}
function CardHeader({ className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `mcl-card-header ${className}`.trim(), ...rest });
}
function CardTitle({ className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: `mcl-card-title ${className}`.trim(), ...rest });
}
function CardBody({ className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `mcl-card-body ${className}`.trim(), ...rest });
}
function CardFooter({ className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `mcl-card-footer ${className}`.trim(), ...rest });
}

// src/components/input/input.tsx
var import_react4 = __toESM(require("react"));
var import_jsx_runtime7 = require("react/jsx-runtime");
function fieldClasses(base, size, invalid) {
  return [base, `${base}-${size}`, invalid ? `${base}-invalid` : ""].filter(Boolean).join(" ");
}
function Chrome({
  id,
  label,
  hint,
  error,
  block,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `mcl-field${block ? " mcl-field-block" : ""}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "mcl-label", htmlFor: id, children: label }),
    children,
    error ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mcl-hint mcl-hint-error", role: "alert", children: error }) : hint ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mcl-hint", children: hint }) : null
  ] });
}
function Input({ label, hint, error, size = "md", block = false, className = "", id, ...rest }) {
  const autoId = import_react4.default.useId();
  const inputId = id ?? autoId;
  const input = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "input",
    {
      id: inputId,
      className: `${fieldClasses("mcl-input", size, !!error)}${block ? " mcl-input-block" : ""} ${className}`.trim(),
      "aria-invalid": error ? true : void 0,
      ...rest
    }
  );
  if (!label && !hint && !error) return input;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Chrome, { id: inputId, label, hint, error, block, children: input });
}
function Textarea({ label, hint, error, size = "md", block = true, className = "", id, rows = 4, ...rest }) {
  const autoId = import_react4.default.useId();
  const inputId = id ?? autoId;
  const el = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "textarea",
    {
      id: inputId,
      rows,
      className: `${fieldClasses("mcl-textarea", size, !!error)} ${className}`.trim(),
      "aria-invalid": error ? true : void 0,
      ...rest
    }
  );
  if (!label && !hint && !error) return el;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Chrome, { id: inputId, label, hint, error, block: true, children: el });
}

// src/components/select/select.tsx
var import_react5 = __toESM(require("react"));
var import_jsx_runtime8 = require("react/jsx-runtime");
function Select({
  label,
  hint,
  error,
  size = "md",
  options,
  placeholder,
  className = "",
  id,
  children,
  ...rest
}) {
  const autoId = import_react5.default.useId();
  const selectId = id ?? autoId;
  const select = /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `mcl-select-shell ${className}`.trim(), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "select",
    {
      id: selectId,
      className: `mcl-select mcl-select-${size}${error ? " mcl-select-invalid" : ""}`,
      "aria-invalid": error ? true : void 0,
      ...rest,
      children: [
        placeholder && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "", disabled: true, children: placeholder }),
        options?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: o.value, children: o.label }, o.value)),
        children
      ]
    }
  ) });
  if (!label && !hint && !error) return select;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mcl-field", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "mcl-label", htmlFor: selectId, children: label }),
    select,
    error ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mcl-hint mcl-hint-error", role: "alert", children: error }) : hint ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mcl-hint", children: hint }) : null
  ] });
}

// src/components/checks/checks.tsx
var import_react6 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function withLabel(input, label) {
  if (label === void 0 || label === null) return input;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: "mcl-check", children: [
    input,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-label", children: label })
  ] });
}
function Checkbox({ label, indeterminate = false, className = "", ...rest }) {
  const inputRef = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return withLabel(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { ref: inputRef, type: "checkbox", className: `mcl-check-input ${className}`.trim(), ...rest }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-box", "aria-hidden": "true" })
    ] }),
    label
  );
}
function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onChange,
  selectAll = false,
  selectAllLabel = "Select all",
  label,
  disabled = false,
  className = ""
}) {
  const [inner, setInner] = (0, import_react6.useState)(defaultValue);
  const allRef = (0, import_react6.useRef)(null);
  const selected = value ?? inner;
  const enabled = options.filter((o) => !o.disabled).map((o) => o.value);
  const allOn = enabled.length > 0 && enabled.every((v) => selected.includes(v));
  const someOn = enabled.some((v) => selected.includes(v));
  (0, import_react6.useEffect)(() => {
    if (allRef.current) allRef.current.indeterminate = someOn && !allOn;
  }, [someOn, allOn]);
  const commit = (next) => {
    setInner(next);
    onChange?.(next);
  };
  const toggle = (v) => {
    commit(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  };
  const toggleAll = () => {
    commit(allOn ? selected.filter((v) => !enabled.includes(v)) : Array.from(/* @__PURE__ */ new Set([...selected, ...enabled])));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: `mcl-check-group ${className}`.trim(),
      role: "group",
      "aria-label": typeof label === "string" ? label : void 0,
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-label", children: label }),
        selectAll && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: `mcl-check mcl-check-group-all${disabled ? " mcl-check-disabled" : ""}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "input",
            {
              ref: allRef,
              type: "checkbox",
              className: "mcl-check-input",
              checked: allOn,
              disabled,
              onChange: toggleAll
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-box", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-label", children: selectAllLabel })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "mcl-check-group-items", children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: `mcl-check${o.disabled || disabled ? " mcl-check-disabled" : ""}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "input",
            {
              type: "checkbox",
              className: "mcl-check-input",
              checked: selected.includes(o.value),
              disabled: o.disabled || disabled,
              onChange: () => toggle(o.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-box", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-label", children: o.label })
        ] }, o.value)) })
      ]
    }
  );
}
function Radio({ label, className = "", ...rest }) {
  return withLabel(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "radio", className: `mcl-check-input ${className}`.trim(), ...rest }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-check-box mcl-radio-box", "aria-hidden": "true" })
    ] }),
    label
  );
}
function Switch({ label, className = "", ...rest }) {
  return withLabel(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "input",
        {
          type: "checkbox",
          role: "switch",
          className: `mcl-switch-input ${className}`.trim(),
          ...rest
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-switch-track", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mcl-switch-knob" }) })
    ] }),
    label
  );
}

// src/components/dropdown/dropdown.tsx
var import_react7 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function Dropdown({
  items,
  value,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = "Select\u2026",
  label,
  hint,
  size = "md",
  block = false,
  disabled = false,
  className = ""
}) {
  const [open, setOpen] = (0, import_react7.useState)(false);
  const [inner, setInner] = (0, import_react7.useState)(defaultValue);
  const [active, setActive] = (0, import_react7.useState)(0);
  const [flip, setFlip] = (0, import_react7.useState)({ up: false, left: false });
  const shellRef = (0, import_react7.useRef)(null);
  const menuRef = (0, import_react7.useRef)(null);
  const triggerRef = (0, import_react7.useRef)(null);
  const current = value ?? inner;
  const selectedValues = multiple ? Array.isArray(current) ? current : [] : [];
  const singleValue = !multiple && !Array.isArray(current) ? current : void 0;
  const labelFor = (v) => items.find((i) => i.value === v)?.label;
  let triggerText = placeholder;
  if (multiple) {
    if (selectedValues.length > 0) {
      const labels = items.filter((i) => selectedValues.includes(i.value)).map((i) => i.label);
      triggerText = labels.length <= 2 ? labels.join(", ") : `${labels.length} selected`;
    }
  } else if (singleValue !== void 0) {
    triggerText = labelFor(singleValue) ?? singleValue;
  }
  const hasSelection = multiple ? selectedValues.length > 0 : singleValue !== void 0 && singleValue !== "";
  (0, import_react7.useEffect)(() => {
    if (!open) return;
    const onDown = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  (0, import_react7.useEffect)(() => {
    if (!open) return;
    const firstSelected = multiple ? items.findIndex((i) => selectedValues.includes(i.value)) : items.findIndex((i) => i.value === singleValue);
    const firstEnabled = items.findIndex((i) => !i.disabled);
    const idx = firstSelected >= 0 ? firstSelected : Math.max(firstEnabled, 0);
    setActive(idx);
    menuRef.current?.focus();
    const t = window.setTimeout(() => {
      const el = menuRef.current?.children[idx];
      if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);
  (0, import_react7.useEffect)(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const trig = triggerRef.current;
      const menu = menuRef.current;
      if (!trig || !menu) return;
      const r = trig.getBoundingClientRect();
      const m = menu.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      const above = r.top;
      setFlip({
        up: below < m.height + 12 && above > below,
        left: r.left + Math.max(m.width, r.width) > window.innerWidth - 12
      });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };
  const commit = (v) => {
    if (multiple) {
      const next = selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v];
      setInner(next);
      onChange?.(next);
    } else {
      setInner(v);
      onChange?.(v);
      close();
    }
  };
  const move = (dir) => {
    const enabled = items.map((it, i) => it.disabled ? -1 : i).filter((i) => i >= 0);
    if (enabled.length === 0) return;
    const pos = enabled.indexOf(active);
    const next = enabled[(pos + dir + enabled.length) % enabled.length];
    setActive(next);
    const el = menuRef.current?.children[next];
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  };
  const onMenuKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      const first = items.findIndex((i) => !i.disabled);
      if (first >= 0) setActive(first);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = items.map((i, idx) => i.disabled ? -1 : idx).filter((i) => i >= 0).pop();
      if (last !== void 0) setActive(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const it = items[active];
      if (it && !it.disabled) commit(it.value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };
  const onTriggerKeyDown = (e) => {
    if (!open && e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: `mcl-field${block ? " mcl-field-block" : ""} ${className}`.trim(), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mcl-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      "div",
      {
        ref: shellRef,
        className: `mcl-dropdown-shell${block ? " mcl-dropdown-block" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
            "button",
            {
              ref: triggerRef,
              type: "button",
              className: `mcl-dropdown-trigger mcl-dropdown-${size}`,
              "aria-haspopup": "listbox",
              "aria-expanded": open,
              disabled,
              onClick: () => setOpen((o) => !o),
              onKeyDown: onTriggerKeyDown,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: `mcl-dropdown-value${hasSelection ? "" : " mcl-dropdown-placeholder"}`, children: triggerText }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mcl-dropdown-chevron", "aria-hidden": "true" })
              ]
            }
          ),
          open && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "div",
            {
              ref: menuRef,
              tabIndex: -1,
              role: "listbox",
              "aria-multiselectable": multiple || void 0,
              className: [
                "mcl-dropdown-menu",
                "mcl-scroll",
                `mcl-dropdown-${size}`,
                flip.up ? "mcl-dropdown-menu-up" : "",
                flip.left ? "mcl-dropdown-menu-left" : ""
              ].filter(Boolean).join(" "),
              onKeyDown: onMenuKeyDown,
              children: items.map((it, i) => {
                const selected = multiple ? selectedValues.includes(it.value) : singleValue === it.value;
                return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                  "div",
                  {
                    role: "option",
                    "aria-selected": selected,
                    "aria-disabled": it.disabled || void 0,
                    className: [
                      "mcl-dropdown-item",
                      i === active ? "mcl-dropdown-item-active" : "",
                      selected ? "mcl-dropdown-item-selected" : "",
                      it.disabled ? "mcl-dropdown-item-disabled" : ""
                    ].filter(Boolean).join(" "),
                    onMouseEnter: () => setActive(i),
                    onClick: () => {
                      if (!it.disabled) commit(it.value);
                    },
                    children: [
                      multiple && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mcl-dropdown-check", "aria-hidden": "true" }),
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mcl-dropdown-item-label", children: it.label }),
                      !multiple && selected && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "mcl-dropdown-tick", "aria-hidden": "true", children: "\u2713" })
                    ]
                  },
                  it.value
                );
              })
            }
          )
        ]
      }
    ),
    hint && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mcl-hint", children: hint })
  ] });
}

// src/components/range/range.tsx
var import_react8 = __toESM(require("react"));
var import_jsx_runtime11 = require("react/jsx-runtime");
function Range({
  label,
  hint,
  showValue = false,
  value,
  defaultValue,
  onChange,
  className = "",
  id,
  ...rest
}) {
  const autoId = import_react8.default.useId();
  const inputId = id ?? autoId;
  const isControlled = value !== void 0;
  const [inner, setInner] = (0, import_react8.useState)(
    () => value !== void 0 ? String(value) : defaultValue !== void 0 ? String(defaultValue) : "0"
  );
  const current = isControlled ? String(value) : inner;
  const input = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "input",
    {
      id: inputId,
      type: "range",
      className: `mcl-range ${className}`.trim(),
      value: isControlled ? value : inner,
      onChange: (e) => {
        if (!isControlled) setInner(e.target.value);
        onChange?.(e);
      },
      ...rest
    }
  );
  const field = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mcl-field", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "mcl-range-head", htmlFor: inputId, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mcl-label", children: label }),
      showValue && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mcl-range-value", children: current })
    ] }),
    input,
    hint && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "mcl-hint", children: hint })
  ] });
  if (!label && !hint) return input;
  return field;
}

// src/components/badge/badge.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function Badge({ variant = "neutral", solid = false, className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "span",
    {
      className: `mcl-badge mcl-badge-${variant}${solid ? " mcl-badge-solid" : ""} ${className}`.trim(),
      ...rest
    }
  );
}

// src/components/alert/alert.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var DEFAULT_ICONS = {
  success: "\u2713",
  danger: "\u2715",
  warning: "!",
  info: "i"
};
function Alert({
  variant = "info",
  title,
  icon,
  onClose,
  className = "",
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: `mcl-alert mcl-alert-${variant} ${className}`.trim(), role: "alert", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "mcl-alert-icon", "aria-hidden": "true", children: icon ?? DEFAULT_ICONS[variant] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mcl-alert-content", children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mcl-alert-title", children: title }),
      children
    ] }),
    onClose && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", className: "mcl-alert-close", onClick: onClose, "aria-label": "Dismiss", children: "\u2715" })
  ] });
}

// src/components/avatar/avatar.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function initialsOf(name) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function Avatar({
  src,
  alt,
  name,
  size = "md",
  status,
  gradient = false,
  className = "",
  children,
  ...rest
}) {
  const label = alt ?? (name ? `${name}'s avatar` : "avatar");
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "span",
    {
      className: `mcl-avatar mcl-avatar-${size}${gradient ? " mcl-avatar-gradient" : ""} ${className}`.trim(),
      role: "img",
      "aria-label": label,
      ...rest,
      children: [
        src ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("img", { src, alt: "", className: "mcl-avatar-img", loading: "lazy", decoding: "async" }) : children ?? initialsOf(name ?? "??") ?? "",
        status && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `mcl-avatar-status mcl-avatar-status-${status}`, "aria-hidden": "true" })
      ]
    }
  );
}
function AvatarGroup({ className = "", children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `mcl-avatar-group ${className}`.trim(), ...rest, children });
}

// src/components/progress/progress.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function Progress({
  value = 0,
  max = 100,
  tone = "primary",
  size = "md",
  label,
  showValue = false,
  indeterminate = false,
  className = ""
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    "div",
    {
      className: `mcl-progress mcl-progress-${size} ${className}`.trim(),
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": indeterminate ? void 0 : Math.round(pct),
      children: [
        (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mcl-progress-head", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: label }),
          showValue && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "mcl-progress-value", children: indeterminate ? "\u2026" : `${Math.round(pct)}%` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mcl-progress-track", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "span",
          {
            className: `mcl-progress-fill mcl-progress-fill-${tone}${indeterminate ? " mcl-progress-fill-indeterminate" : ""}`,
            style: indeterminate ? void 0 : { width: `${pct}%` }
          }
        ) })
      ]
    }
  );
}

// src/components/spinner/spinner.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function Spinner({ size = "md", className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: `mcl-spinner mcl-spinner-${size} ${className}`.trim(), role: "status", "aria-label": "Loading" });
}

// src/components/skeleton/skeleton.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function Skeleton({ variant = "text", width, height, count = 1, className = "" }) {
  const lines = variant === "text" ? Math.max(1, count) : 1;
  const style = (last) => ({
    width: width ?? (variant === "circle" ? 48 : "100%"),
    height: height ?? (variant === "text" ? 14 : variant === "circle" ? 48 : 96),
    ...variant === "text" && count > 1 && last ? { width: "62%" } : null
  });
  if (lines === 1) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "span",
      {
        className: `mcl-skeleton mcl-skeleton-${variant} ${className}`.trim(),
        style: style(true),
        "aria-hidden": "true"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: `mcl-skeleton-lines ${className}`.trim(), "aria-hidden": "true", children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "mcl-skeleton mcl-skeleton-text", style: style(i === lines - 1) }, i)) });
}

// src/components/modal/modal.tsx
var import_react9 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime18 = require("react/jsx-runtime");
var FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Modal({
  open,
  onClose,
  title,
  footer,
  size = "md",
  closeOnBackdrop = true,
  closeOnEsc = true,
  children,
  className = ""
}) {
  const [mounted, setMounted] = (0, import_react9.useState)(false);
  const panelRef = (0, import_react9.useRef)(null);
  const lastFocusedRef = (0, import_react9.useRef)(null);
  const titleId = (0, import_react9.useId)();
  (0, import_react9.useEffect)(() => setMounted(true), []);
  (0, import_react9.useEffect)(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape" && closeOnEsc) onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [open, onClose, closeOnEsc]);
  const trapFocus = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  if (!open || !mounted) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      "div",
      {
        className: "mcl-modal-overlay",
        onMouseDown: (e) => {
          if (e.target === e.currentTarget && closeOnBackdrop) onClose();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
          "div",
          {
            ref: panelRef,
            className: `mcl-modal mcl-modal-${size} ${className}`.trim(),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? titleId : void 0,
            tabIndex: -1,
            onKeyDown: trapFocus,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "mcl-modal-header", children: [
                title ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h3", { id: titleId, className: "mcl-modal-title", children: title }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", {}),
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("button", { type: "button", className: "mcl-modal-close", onClick: onClose, "aria-label": "Close dialog", children: "\u2715" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mcl-modal-body mcl-scroll", children }),
              footer && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mcl-modal-footer", children: footer })
            ]
          }
        )
      }
    ),
    document.body
  );
}

// src/components/tooltip/tooltip.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function Tooltip({ label, placement = "top", className = "", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: `mcl-tooltip mcl-tooltip-${placement} ${className}`.trim(), "data-mcl-tooltip": label, children });
}

// src/components/tabs/tabs.tsx
var import_react10 = require("react");
var import_jsx_runtime20 = require("react/jsx-runtime");
function Tabs({ items, value, onChange, className = "" }) {
  const uid = (0, import_react10.useId)();
  const [inner, setInner] = (0, import_react10.useState)(0);
  const active = value ?? inner;
  const tabRefs = (0, import_react10.useRef)([]);
  const select = (i) => {
    if (items[i]?.disabled) return;
    setInner(i);
    onChange?.(i);
  };
  const onKeyDown = (e) => {
    const focusable = items.map((it, i) => it.disabled ? -1 : i).filter((i) => i >= 0);
    let next = -1;
    if (e.key === "ArrowRight") next = focusable[(focusable.indexOf(active) + 1) % focusable.length];
    if (e.key === "ArrowLeft") next = focusable[(focusable.indexOf(active) - 1 + focusable.length) % focusable.length];
    if (e.key === "Home") next = focusable[0];
    if (e.key === "End") next = focusable[focusable.length - 1];
    if (next >= 0 && next !== active) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };
  const current = items[active];
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: `mcl-tabs ${className}`.trim(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "mcl-tablist", role: "tablist", "aria-label": "Tabs", onKeyDown, children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      "button",
      {
        ref: (el) => {
          tabRefs.current[i] = el;
        },
        type: "button",
        role: "tab",
        id: `mcl-tab-${uid}-${it.key}`,
        "aria-selected": i === active,
        "aria-controls": `mcl-panel-${uid}-${it.key}`,
        tabIndex: i === active ? 0 : -1,
        className: `mcl-tab${i === active ? " mcl-tab-active" : ""}`,
        disabled: it.disabled,
        onClick: () => select(i),
        children: it.label
      },
      it.key
    )) }),
    current && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      "div",
      {
        role: "tabpanel",
        id: `mcl-panel-${uid}-${current.key}`,
        "aria-labelledby": `mcl-tab-${uid}-${current.key}`,
        className: "mcl-tabpanel",
        children: current.content
      },
      current.key
    )
  ] });
}

// src/components/accordion/accordion.tsx
var import_react11 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
function Accordion({ items, defaultOpen = -1, exclusive = true, className = "" }) {
  const uid = (0, import_react11.useId)();
  const [openSet, setOpenSet] = (0, import_react11.useState)(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );
  const panelRefs = (0, import_react11.useRef)([]);
  const [heights, setHeights] = (0, import_react11.useState)([]);
  const measure = () => {
    setHeights(items.map((_, i) => panelRefs.current[i]?.scrollHeight ?? 0));
  };
  (0, import_react11.useEffect)(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, openSet]);
  const toggle = (i) => {
    if (!openSet.has(i)) {
      const h = panelRefs.current[i]?.scrollHeight ?? 0;
      setHeights((prev) => prev[i] === h ? prev : prev.map((x, j) => j === i ? h : x));
    }
    setOpenSet((prev) => {
      const next = new Set(exclusive ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: `mcl-accordion ${className}`.trim(), children: items.map((item, i) => {
    const open = openSet.has(i);
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: `mcl-accordion-item${open ? " mcl-accordion-item-open" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
        "button",
        {
          type: "button",
          className: "mcl-accordion-header",
          "aria-expanded": open,
          "aria-controls": `mcl-acc-${uid}-${i}`,
          onClick: () => toggle(i),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { children: item.title }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "mcl-accordion-chevron", "aria-hidden": "true", children: "\u25BE" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        "div",
        {
          id: `mcl-acc-${uid}-${i}`,
          ref: (el) => {
            panelRefs.current[i] = el;
          },
          className: "mcl-accordion-panel",
          style: { maxHeight: open ? heights[i] || 999 : 0 },
          role: "region",
          children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "mcl-accordion-panel-inner", children: item.content })
        }
      )
    ] }, i);
  }) });
}

// src/components/toast/toast.tsx
var import_react12 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var ToastContext = (0, import_react12.createContext)(null);
function ToastProvider({ children, placement = "bottom-right" }) {
  const [toasts, setToasts] = (0, import_react12.useState)([]);
  const idRef = (0, import_react12.useRef)(0);
  const timersRef = (0, import_react12.useRef)(/* @__PURE__ */ new Map());
  const dismiss = (0, import_react12.useCallback)((id) => {
    const timer = timersRef.current.get(id);
    if (timer !== void 0) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);
  const toast = (0, import_react12.useCallback)(
    (o) => {
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
  (0, import_react12.useEffect)(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    },
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(ToastContext.Provider, { value: { toast, dismiss }, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: `mcl-toasts mcl-toasts-${placement}`, "aria-live": "polite", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ToastCard, { item: t, onClose: () => dismiss(t.id) }, t.id)) })
  ] });
}
function ToastCard({ item, onClose }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: `mcl-toast mcl-toast-${item.variant ?? "info"}`, role: "status", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "mcl-toast-dot", "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "mcl-toast-content", children: [
      item.title && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "mcl-toast-title", children: item.title }),
      item.message && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "mcl-toast-message", children: item.message })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("button", { type: "button", className: "mcl-toast-close", onClick: onClose, "aria-label": "Dismiss notification", children: "\u2715" })
  ] });
}
function useToast() {
  const ctx = (0, import_react12.useContext)(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>.");
  return ctx;
}

// src/components/navbar/navbar.tsx
var import_react13 = require("react");
var import_jsx_runtime23 = require("react/jsx-runtime");
function Navbar({ brand, links = [], activeHref, right, sticky = true, className = "" }) {
  const [open, setOpen] = (0, import_react13.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("nav", { className: `mcl-navbar${sticky ? " mcl-navbar-sticky" : ""} ${className}`.trim(), children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mcl-navbar-inner", children: [
    brand && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("a", { className: "mcl-navbar-brand", href: "/", children: brand }),
    links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "button",
      {
        type: "button",
        className: "mcl-navbar-toggle",
        "aria-expanded": open,
        "aria-label": "Toggle menu",
        onClick: () => setOpen((o) => !o),
        children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "mcl-navbar-burger", "aria-hidden": "true" })
      }
    ),
    links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("ul", { className: `mcl-navbar-links${open ? " mcl-navbar-open" : ""}`, children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "a",
      {
        href: l.href,
        className: `mcl-navbar-link${activeHref === l.href ? " mcl-navbar-link-active" : ""}`,
        onClick: () => setOpen(false),
        "aria-current": activeHref === l.href ? "page" : void 0,
        children: l.label
      }
    ) }, l.href)) }),
    right && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mcl-navbar-right", children: right })
  ] }) });
}

// src/components/stat/stat.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function Stat({ value, label, tone = "primary", className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: `mcl-stat mcl-stat-${tone} ${className}`.trim(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("b", { className: "mcl-stat-value", children: value }),
    label && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "mcl-stat-label", children: label })
  ] });
}

// src/components/divider/divider.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function Divider({ orientation = "horizontal", label, className = "", ...rest }) {
  if (label !== void 0 && label !== null) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: `mcl-divider-label ${className}`.trim(), role: "separator", ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "mcl-divider-label-text", children: label }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "div",
    {
      className: `mcl-divider mcl-divider-${orientation} ${className}`.trim(),
      role: "separator",
      ...rest
    }
  );
}

// src/components/stack/stack.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function Stack({
  direction = "column",
  gap = "md",
  wrap = false,
  align,
  justify,
  className = "",
  ...rest
}) {
  const cls = [
    "mcl-stack",
    direction === "row" ? "mcl-stack-row" : "",
    `mcl-stack-gap-${gap}`,
    wrap ? "mcl-stack-wrap" : "",
    align ? `mcl-stack-align-${align}` : "",
    justify ? `mcl-stack-justify-${justify}` : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: cls, ...rest });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  COLOR_SWATCHES,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  Divider,
  Dropdown,
  Input,
  Kbd,
  MarclayProvider,
  Modal,
  Navbar,
  PRESETS,
  Progress,
  Radio,
  Range,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Stat,
  Switch,
  Tabs,
  Textarea,
  ThemeMenu,
  ThemeProvider,
  ThemeToggle,
  ToastProvider,
  Tooltip,
  useTheme,
  useToast
});
//# sourceMappingURL=index.cjs.map