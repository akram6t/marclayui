<div align="center">
  <img src="src/app/icon.svg" width="120" alt="MarclayUI Logo" />
  <h1>MarclayUI</h1>
  <p><b>Claymorphism + neumorphism React component library</b></p>
  <p>
    <a href="https://www.npmjs.com/package/marclayui"><img src="https://img.shields.io/npm/v/marclayui.svg?style=flat-square&color=e0785a" alt="NPM Version" /></a>
    <img src="https://img.shields.io/npm/l/marclayui.svg?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square" alt="Zero Dependencies" />
    <img src="https://img.shields.io/badge/TypeScript-first-blue.svg?style=flat-square" alt="TypeScript" />
  </p>
</div>

---

**MarclayUI** brings elegant claymorphism and neumorphism to your React applications. It features robust light/dark theming and React-Bootstrap-style runtime color control. Built with pure CSS — zero runtime dependencies, strictly TypeScript-first, Next.js ready, and completely free of Tailwind CSS.

This repository is a **npm workspace** with two parts:

| Folder | What it is |
| --- | --- |
| `ui/` | The `marclayui` npm package — components, theming, styles (publishable) |
| `src/` | The documentation website (Next.js App Router) that consumes the package |

## Quick start

```bash
npm install          # links the ui workspace + installs everything
npm run build:ui     # build the marclayui package (dist/)
npm run dev          # docs site at http://localhost:3000
```

Production:

```bash
npm run build:all    # builds the package, then the Next.js app
npm start
```

## Using the library in your own app

```bash
npm install marclayui
```

```tsx
// app/layout.tsx
import { MarclayProvider, ToastProvider } from "marclayui";
import { themeInitScript } from "marclayui/theme-init";
import "marclayui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mcl-root">
        {/* applies the saved theme before first paint — no flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MarclayProvider defaultMode="system">
          <ToastProvider>{children}</ToastProvider>
        </MarclayProvider>
      </body>
    </html>
  );
}
```

```tsx
import { Button, useTheme } from "marclayui";

export function Actions() {
  const { toggle, setColors } = useTheme();
  return (
    <>
      <Button variant="primary" onClick={toggle}>Toggle dark mode</Button>
      <Button variant="secondary" onClick={() => setColors({ primary: "#7c5cff" })}>
        Repaint the UI
      </Button>
    </>
  );
}
```

### Theming controls

- **Modes**: `light` / `dark` / `system` — persisted in `localStorage` (`mcl-theme`), exposed as `data-theme` on `<html>`.
- **Runtime colors**: `setColors({ primary, secondary, accent, success, danger, warning, info, bg, ink, muted })` — derived shades, gradients, clay glows, focus rings and shadow colors update instantly.
- **Pure CSS**: every token is a CSS variable (`--mcl-primary`, `--mcl-bg`, `--mcl-out`, `--mcl-clay-p`, …) overridable under `:root` / `[data-theme="dark"]`.

## Components (24)

Accordion · Alert · Avatar/AvatarGroup · Badge · Button · Card · Checkbox · Divider · Input · Modal · Navbar · Progress · Radio · Range · Select · Skeleton · Spinner · Stack · Stat · Switch · Tabs · Textarea · Toast (provider + `useToast`) · Tooltip — plus `ThemeToggle`, `MarclayProvider`, `useTheme`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Docs site (Next dev) |
| `npm run build` / `start` | Docs site production |
| `npm run build:ui` | Build the `marclayui` package (ESM + CJS + d.ts) |
| `npm run watch:ui` | Rebuild the package on change |
| `npm run build:all` | Package + app |

## Publishing the package

See [`ui/README.md`](ui/README.md). Short version: bump `ui/package.json` version, `npm run build:ui`, then `npm publish ./ui`.

## License

MIT © Akram ([akram6t](https://github.com/akram6t))
