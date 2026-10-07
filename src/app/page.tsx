import dynamic from "next/dynamic";
import Link from "next/link";
import { Badge, Button, Navbar, ThemeMenu } from "marclayui";
import { CodeBlock } from "@/components/docs/code-block";
import { GitHubMark } from "@/components/github-mark";
import { InstallCommand } from "@/components/landing/install-command";
import { Reveal } from "@/components/landing/reveal";

// Below-the-fold interactive islands are lazy-loaded with a spinner as fallback.
const LiveLab = dynamic(() => import("@/components/landing/live-lab").then((m) => m.LiveLab), {
  loading: () => (
    <div className="home-demo-loading" style={{ minHeight: 320 }}>
      <span className="mcl-spinner" />
    </div>
  ),
});
const ShowcaseGrid = dynamic(
  () => import("@/components/landing/showcase-grid").then((m) => m.ShowcaseGrid),
  {
    loading: () => (
      <div className="home-demo-loading" style={{ minHeight: 420 }}>
        <span className="mcl-spinner" />
      </div>
    ),
  }
);

const FEATURES = [
  { icon: "🧱", title: "Claymorphism first", text: "Soft extruded shapes, dual shadows and colored inner light — straight out of the kiln." },
  { icon: "🌗", title: "Light & dark", text: "One data-theme attribute flips the whole system. Persists across visits, follows the OS." },
  { icon: "🎛️", title: "Runtime theming", text: "Override primary, secondary, accent, background and more with a single prop or hook." },
  { icon: "📦", title: "Zero runtime deps", text: "Only React as a peer. No Tailwind, no CSS-in-JS, no utility runtime to ship." },
  { icon: "🧩", title: "26 components", text: "Buttons to modals — the everyday set, each with a responsive, cross-browser build." },
  { icon: "🛡️", title: "TypeScript first", text: "Full type definitions and strict props for every component, generated for ESM + CJS." },
  { icon: "⚡", title: "Next.js ready", text: "RSC-friendly with 'use client' boundaries where they matter. Tree-shakeable imports." },
  { icon: "♿", title: "Accessible", text: "ARIA roles, keyboard navigation, focus rings and reduced-motion support included." },
];

const INSTALL_CODE = `npm install marclayui`;

const SETUP_CODE = `// app/layout.tsx
import { MarclayProvider } from "marclayui";
import "marclayui/styles.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MarclayProvider>{children}</MarclayProvider>
      </body>
    </html>
  );
}`;

const USAGE_CODE = `import { Button, useTheme } from "marclayui";

export function Actions() {
  const { setColors, toggle } = useTheme();

  return (
    <>
      <Button variant="primary" onClick={toggle}>
        Toggle dark mode
      </Button>
      <Button variant="secondary" onClick={() => setColors({ primary: "#7c5cff" })}>
        Repaint the UI
      </Button>
    </>
  );
}`;

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components/button", label: "Components" },
  { href: "/docs/theming", label: "Theming" },
];

export default function HomePage() {
  return (
    <>
      <Navbar
        brand={
          <>
            marclay<b style={{ color: "var(--mcl-primary)" }}>ui</b>
          </>
        }
        links={NAV_LINKS}
        activeHref="/"
        right={
          <>
            <ThemeMenu />
            <a
              className="docs-github"
              href="https://github.com/akram6t"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MarclayUI on GitHub"
            >
              <GitHubMark />
              <span>GitHub</span>
            </a>
            <Button href="/docs" size="sm" variant="primary">
              Get started
            </Button>
          </>
        }
      />

      <header className="home-hero">
        <div className="wrap">
          <div className="home-badge">
            <Badge variant="primary">● v0.3.0 — two style presets, one library</Badge>
          </div>
          <div className="home-stage">
            <div className="home-orb home-orb-c1" aria-hidden="true">
              🎨
            </div>
            <div className="home-orb home-orb-c2" aria-hidden="true">
              🧩
            </div>
            <div className="home-orb home-orb-c3" aria-hidden="true">
              ⚡
            </div>
            <div className="home-avatar" aria-hidden="true">
              🧱
            </div>
          </div>
          <h1 className="home-title">
            Soft, warm components
            <br />
            <span>fired in real clay.</span>
          </h1>
          <p className="home-lead">
            MarclayUI is a React component library with a neumorphic heart and a claymorphic shell —
            light &amp; dark themes, runtime color control, and zero runtime dependencies.
          </p>
          <div className="home-actions">
            <Button href="/docs" variant="primary" size="lg">
              Get started
            </Button>
            <Button href="/docs/components/button" variant="secondary" size="lg">
              Browse components
            </Button>
          </div>
          <div className="home-try">
            <InstallCommand />
            <div className="home-hero-badges">
              <Badge solid variant="secondary">
                26 components
              </Badge>
              <Badge variant="success">0 runtime deps</Badge>
              <Badge solid variant="accent">
                2 style presets
              </Badge>
              <Badge variant="info">TypeScript</Badge>
              <Badge>MIT licensed</Badge>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="home-sec" id="playground">
          <div className="wrap">
            <div className="home-sec-head">
              <span className="home-tag">Live theming</span>
              <h2 className="home-h2">You hold the glaze</h2>
              <p className="home-sub">
                Swap style presets, flip modes and repaint the primary color — every control below is
                real MarclayUI, re-theming instantly like react-bootstrap, but at runtime.
              </p>
            </div>
            <Reveal>
              <LiveLab />
            </Reveal>
          </div>
        </section>

        <section className="home-sec" id="components">
          <div className="wrap">
            <div className="home-sec-head">
              <span className="home-tag">Components</span>
              <h2 className="home-h2">Everyday parts, potted well</h2>
              <p className="home-sub">
                The daily-use set — forms, overlays, feedback and data display. Lazy-loaded below,
                because a fast site is part of the design.
              </p>
            </div>
            <Reveal>
              <ShowcaseGrid />
            </Reveal>
            <p className="home-install-note">
              …plus Card, Divider, Navbar, Range, Select, Skeleton, Stack, Stat, Tabs, Textarea,
              Kbd, Toast and Tooltip in the{" "}
              <Link href="/docs/components/button" style={{ color: "var(--mcl-primary)" }}>
                docs
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="home-sec" id="features">
          <div className="wrap">
            <div className="home-sec-head">
              <span className="home-tag">Why MarclayUI</span>
              <h2 className="home-h2">Handmade, kiln-fired engineering</h2>
            </div>
            <Reveal>
              <div className="home-features">
                {FEATURES.map((f) => (
                  <div className="home-feature" key={f.title}>
                    <span className="home-feature-icon" aria-hidden="true">
                      {f.icon}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="home-sec" id="install">
          <div className="wrap">
            <div className="home-sec-head">
              <span className="home-tag">Get started</span>
              <h2 className="home-h2">Two imports and you&apos;re firing</h2>
            </div>
            <Reveal>
              <div className="home-install">
                <CodeBlock code={INSTALL_CODE} language="bash" />
                <CodeBlock code={SETUP_CODE} />
                <CodeBlock code={USAGE_CODE} />
                <p className="home-install-note">
                  Full guide in the{" "}
                  <Link href="/docs" style={{ color: "var(--mcl-primary)" }}>
                    getting-started docs
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="wrap">
          <div className="home-footer-inner">
            <span>© 2026 MarclayUI</span>
            <span aria-hidden="true">·</span>
            <span>handmade clay components</span>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/akram6t" target="_blank" rel="noopener noreferrer">
              github/akram6t
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
