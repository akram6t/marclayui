# marclayui

Claymorphism + neumorphism React components with light/dark theming and runtime color control. This folder is the **publishable npm package**; the docs site lives one level up.

## Install (for consumers)

```bash
npm install marclayui
```

```tsx
import { MarclayProvider, Button } from "marclayui";
import { themeInitScript } from "marclayui/theme-init";
import "marclayui/styles.css";
```

- `"marclayui"` — all components + `MarclayProvider` / `useTheme` / `ThemeToggle`. Ships as ESM + CJS with type definitions; the bundle is marked `"use client"` for Next.js App Router.
- `"marclayui/theme-init"` — tiny Server-Component-safe module with the no-flash theme script.
- `"marclayui/styles.css"` — the full stylesheet (tokens + all components).

## Peer dependencies

React ≥ 18 (works with React 19 / Next 15/16). Nothing else — zero runtime dependencies.

## Development

```bash
npm run build   # tsup → dist/ (ESM, CJS, d.ts) for both entries
npm run dev     # watch mode
```

Source layout:

```
src/
  index.ts            # public barrel
  theme-init.ts       # server-safe theme script (separate entry)
  styles/             # theme.css (tokens) + base.css + index.css (@imports)
  theming/            # MarclayProvider, useTheme, ThemeToggle
  components/         # one folder per component (tsx + css)
  utils/color.ts      # shade/glow derivation for runtime colors
```

## Publishing

1. Bump `version` in `package.json`.
2. `npm run build` (inside this folder) — or `npm run build:ui` at the repo root.
3. Dry run: `npm publish --dry-run` (check that `dist/` + `src/` + README + LICENSE are included).
4. `npm publish` (add `--access public` for a scoped release; `marclayui` is unscoped so not needed).

The `files` field ships `dist/` and `src/` — `src/` is included because `marclayui/styles.css` resolves directly to the source stylesheet. Bundle size for JS is ~31 KB ESM before gzip; the stylesheet is separate and tree-shakeable by simply not importing unused component CSS isn't supported yet (single stylesheet by design).
