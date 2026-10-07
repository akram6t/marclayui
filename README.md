# MarclayUI

**Claymorphism + neumorphism React component library** with light/dark theming and react-bootstrap-style runtime color control. Zero runtime dependencies, TypeScript-first, Next.js ready — and no Tailwind anywhere.

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
