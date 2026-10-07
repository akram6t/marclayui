import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Divider } from "marclayui";
import { CodeBlock, DocHeader } from "@/components/docs";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Install MarclayUI, set up the provider and ship your first clay component.",
};

const INSTALL = `npm install marclayui`;

const SETUP = `// app/layout.tsx
import { MarclayProvider, ToastProvider } from "marclayui";
import { themeInitScript } from "marclayui/theme-init";
import "marclayui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mcl-root">
        {/* themeInitScript applies the saved theme before first paint (no flash) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MarclayProvider defaultMode="system">
          <ToastProvider>{children}</ToastProvider>
        </MarclayProvider>
      </body>
    </html>
  );
}`;

const IMPORT_SCRIPT = `import { themeInitScript } from "marclayui";

<html suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  </head>
  …
</html>`;

const FIRST_COMPONENT = `"use client";
import { Button, useTheme } from "marclayui";

export function ThemeActions() {
  const { toggle, setColors, setPreset } = useTheme();

  return (
    <>
      <Button variant="primary" onClick={toggle}>
        Toggle theme
      </Button>
      <Button variant="secondary" onClick={() => setPreset("neo")}>
        Neumorphism preset
      </Button>
      <Button variant="accent" onClick={() => setColors({ primary: "#7c5cff" })}>
        Violet primary
      </Button>
    </>
  );
}`;

const LINKS = [
  { href: "/docs/theming", title: "Theming", text: "CSS variables, dark mode and the live color playground." },
  { href: "/docs/components/button", title: "Button", text: "Six clay variants, three sizes, loading states." },
  { href: "/docs/components/modal", title: "Modal", text: "Portaled dialogs with focus handling and Escape." },
  { href: "/docs/components/toast", title: "Toast", text: "Provider-based notifications in four tones." },
];

export default function GettingStartedPage() {
  return (
    <>
      <DocHeader
        tag="Guide"
        title="Getting started"
        lead="MarclayUI is a claymorphism + neumorphism component library for React and Next.js — with light/dark theming and runtime color control, and no Tailwind or runtime dependencies."
        importCode={INSTALL}
        importLang="bash"
      />

      <h2 className="docs-h2">1 · Install</h2>
      <p className="docs-p">
        MarclayUI ships as ESM and CJS with full TypeScript definitions. React 18+ is the only peer
        dependency.
      </p>
      <CodeBlock code={INSTALL} language="bash" />

      <h2 className="docs-h2">2 · Set up the provider</h2>
      <p className="docs-p">
        Wrap your app once in <code>MarclayProvider</code> and import the stylesheet. The provider
        owns the style preset (claymorphism or neumorphism), the current mode (light / dark /
        system) and any runtime color overrides.
      </p>
      <CodeBlock code={SETUP} />

      <div className="docs-note">
        <span aria-hidden="true">💡</span>
        <span>
          <b>No flash of the wrong theme:</b> render <code>themeInitScript</code> in your{" "}
          <code>&lt;head&gt;</code> and add <code>suppressHydrationWarning</code> to{" "}
          <code>&lt;html&gt;</code>. It reads localStorage and sets <code>data-theme</code> before
          first paint.
        </span>
      </div>
      <CodeBlock code={IMPORT_SCRIPT} />

      <h2 className="docs-h2">3 · Use components</h2>
      <p className="docs-p">
        Every component is importable from the package root. Interactive ones carry their own{" "}
        <code>&quot;use client&quot;</code> boundary, so they work in Server Components out of the box.
      </p>
      <CodeBlock code={FIRST_COMPONENT} />

      <h2 className="docs-h2">Where to next</h2>
      <Divider />
      <div className="docs-grid-2">
        {LINKS.map((l) => (
          <Card key={l.href} hover>
            <CardHeader>
              <CardTitle>{l.title}</CardTitle>
            </CardHeader>
            <CardBody>{l.text}</CardBody>
            <CardFooter>
              <Link href={l.href}>
                <Button size="sm" variant="primary">
                  Open
                </Button>
              </Link>
              <Badge variant="neutral">Guide</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
