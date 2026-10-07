import type { Metadata } from "next";
import { ThemePlayground } from "@/components/docs/theme-playground";
import { CodeBlock, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Theming",
  description: "Light/dark modes, CSS design tokens and runtime color control in MarclayUI.",
};

const TOGGLE_CODE = `import { ThemeToggle, ThemeMenu, useTheme } from "marclayui";

// Drop-in pill button:
<ThemeToggle />

// Navbar menu with mode, style preset and color swatches:
<ThemeMenu />

// Or build your own from the hook:
const { mode, preference, setPreference, toggle } = useTheme();
setPreference("dark");     // force dark
setPreference("system");   // follow the OS
toggle();                  // flip light/dark`;

const PRESET_CODE = `import { MarclayProvider, PRESETS } from "marclayui";

// Pick a preset — it swaps the ENTIRE light + dark palette pair:
<MarclayProvider preset="neo">…</MarclayProvider>   // neumorphism
<MarclayProvider preset="clay">…</MarclayProvider>  // claymorphism (default)

// Or switch at runtime (persisted to localStorage):
const { preset, setPreset } = useTheme();
setPreset("neo");

// Under the hood it's just an attribute — pure CSS theming works too:
// <html data-preset="neo" data-theme="dark">`;

const COLORS_CODE = `import { useTheme } from "marclayui";

const { setColors, resetColors } = useTheme();

// One call repaints gradients, clay glows, focus rings
// and readable text colors across every component:
setColors({ primary: "#7c5cff", bg: "#ece7f6" });

resetColors(); // back to the stylesheet defaults`;

const PROVIDER_CODE = `// Static colors for the whole app:
<MarclayProvider
  defaultMode="dark"
  colors={{ primary: "#4a90d9", secondary: "#7fb5c9" }}
>
  <App />
</MarclayProvider>`;

const CSS_CODE = `/* Or theme purely in CSS — override the tokens on :root */
:root {
  --mcl-primary: #7c5cff;
  --mcl-bg: #ece7f6;
}
[data-theme="dark"] {
  --mcl-primary: #9d85ff;
  --mcl-bg: #221e2e;
}`;

const VARS = [
  { name: "--mcl-bg", value: "App background — the surface every shadow is carved from" },
  { name: "--mcl-ink", value: "Primary text color" },
  { name: "--mcl-muted", value: "Secondary text color" },
  { name: "--mcl-primary / -2 / -ink", value: "Brand tone, its lighter gradient stop, and text on it" },
  { name: "--mcl-{tone}-deep", value: "Darkened tone for colored text on the page background (soft badges, stat values) — auto-derived at runtime too" },
  { name: "--mcl-secondary / -2 / -ink", value: "Supporting tone (sage by default)" },
  { name: "--mcl-accent / -2 / -ink", value: "Highlight tone (gold by default)" },
  { name: "--mcl-success | danger | warning | info", value: "Status tones, each with -2 and -ink variants" },
  { name: "--mcl-sd / --mcl-sl", value: "Dark & light shadow colors — the neumorphic light source" },
  { name: "--mcl-out / -sm / -xs", value: "Raised (extruded) shadow stack" },
  { name: "--mcl-in / -sm / -xs", value: "Pressed (inset well) shadow stack" },
  { name: "--mcl-clay-p … -i", value: "Colored inner-light shadows, one per tone" },
  { name: "--mcl-ring", value: "Focus ring color" },
  { name: "--mcl-radius / -sm / -lg", value: "Corner radii (presets ship different shapes)" },
  { name: "--mcl-avatar-radius / --mcl-navbar-radius", value: "Squircle vs circle avatars, pill vs rounded navbar" },
  { name: "--mcl-font / --mcl-mono", value: "Font stacks (clay: Quicksand · neo: Poppins/Manrope)" },
  { name: "Scrollbars", value: "Themed automatically: .mcl-root styles the page scrollbar, .mcl-scroll styles any scrollable container" },
];

export default function ThemingPage() {
  return (
    <>
      <DocHeader
        tag="Guide"
        title="Theming"
        lead="Two themes in one stylesheet, design tokens exposed as CSS variables, and react-bootstrap-style runtime color control through the provider."
      />

      <h2 className="docs-h2">Light &amp; dark</h2>
      <p className="docs-p">
        The whole system hangs off one attribute: <code>&lt;html data-theme=&quot;dark&quot;&gt;</code>.
        The provider sets it for you and remembers the choice in localStorage under{" "}
        <code>mcl-theme</code>. Use the built-in toggle or the hook:
      </p>
      <CodeBlock code={TOGGLE_CODE} />

      <h2 className="docs-h2">Style presets</h2>
      <p className="docs-p">
        A preset is a complete design language: it swaps the <b>light and dark palettes together</b>,
        plus shape and typography. <b>Claymorphism</b> (default) is warm terracotta clay with
        squircles and Quicksand; <b>Neumorphism</b> is soft grey-blue extrusion with a violet accent
        in light mode, a gold accent in dark mode, circles and Poppins/Manrope. Switching a preset
        also clears any custom runtime colors, so you always see the preset as designed.
      </p>
      <CodeBlock code={PRESET_CODE} />

      <h2 className="docs-h2">Runtime colors</h2>
      <p className="docs-p">
        Give <code>setColors</code> any subset of <code>primary, secondary, accent, success, danger,
        warning, info, bg, ink, muted</code>. MarclayUI derives everything else — lighter gradient
        stops, readable ink, clay inner glows, focus rings and even the shadow colors when you change
        the background.
      </p>
      <CodeBlock code={COLORS_CODE} />
      <CodeBlock code={PROVIDER_CODE} />

      <h2 className="docs-h2">Design tokens</h2>
      <p className="docs-p">
        Every color, shadow and radius is a CSS custom property, so pure-CSS theming works too —
        handy for marketing sites or white-label builds:
      </p>
      <CodeBlock code={CSS_CODE} />
      <div className="docs-table-wrap" style={{ marginTop: 18 }}>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {VARS.map((v) => (
              <tr key={v.name}>
                <td>
                  <code>{v.name}</code>
                </td>
                <td>{v.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="docs-h2">Live playground</h2>
      <p className="docs-p">
        Everything below is live: swap the style preset and mode, drag the color pickers, squeeze the
        corner radius and change the typeface — the whole page re-themes in real time. The generated
        JSX shows exactly what your app needs.
      </p>
      <ThemePlayground />

      <h2 className="docs-h2">Provider API</h2>
      <PropsTable
        rows={[
          { name: "preset", type: '"clay" | "neo"', default: '"clay"', description: "Style preset; swaps the light+dark palette pair, radii and fonts. Persisted to localStorage." },
          { name: "setPreset(p)", type: "(p: PresetName) => void", description: "Switch preset at runtime; clears custom color overrides so the preset shows cleanly." },
          { name: "defaultMode", type: '"light" | "dark" | "system"', default: '"system"', description: "Starting mode; persisted to localStorage after the first change." },
          { name: "colors", type: "ColorOverrides", description: "Initial runtime color overrides applied on mount." },
          { name: "useTheme().mode", type: '"light" | "dark"', description: "Resolved mode after 'system' is applied." },
          { name: "useTheme().preference", type: '"light" | "dark" | "system"', description: "What the user picked." },
          { name: "useTheme().setColors(colors)", type: "(c: ColorOverrides) => void", description: "Merge new overrides; derived shades update instantly." },
          { name: "useTheme().resetColors()", type: "() => void", description: "Remove all overrides, back to preset defaults." },
        ]}
      />
    </>
  );
}
