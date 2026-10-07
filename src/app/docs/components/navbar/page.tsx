import type { Metadata } from "next";
import { Navbar, ThemeToggle } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Navbar",
  description: "Sticky clay pill navbar with responsive mobile menu.",
};

const BASIC = `<Navbar
  brand={<>marclay<b>ui</b></>}
  activeHref="/"
  links={[
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/pricing", label: "Pricing" },
  ]}
  right={<ThemeToggle />}
/>`;

export default function NavbarPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Navbar"
        lead="The floating clay pill from the landing page — sticky, rounded, and collapsible on mobile with an animated burger."
        importCode={`import { Navbar } from "marclayui";`}
      />

      <Demo title="Non-sticky preview" code={BASIC} layout="column">
        <Navbar
          sticky={false}
          brand={
            <>
              marclay<b style={{ color: "var(--mcl-primary)" }}>ui</b>
            </>
          }
          activeHref="/"
          links={[
            { href: "#", label: "Home" },
            { href: "#", label: "Docs" },
            { href: "#", label: "Pricing" },
          ]}
          right={<ThemeToggle />}
        />
      </Demo>

      <div className="docs-note">
        <span aria-hidden="true">💡</span>
        <span>
          <b>Framework-agnostic:</b> links render as plain <code>&lt;a&gt;</code>, so the same markup
          works in Next.js, Remix or Vite. Highlight the active route yourself via{" "}
          <code>activeHref</code>.
        </span>
      </div>

      <PropsTable
        rows={[
          { name: "brand", type: "React.ReactNode", description: "Brand slot, links to '/'." },
          { name: "links", type: "NavLinkItem[]", description: "{ href, label } items." },
          { name: "activeHref", type: "string", description: "Href to highlight with the gradient pill." },
          { name: "right", type: "React.ReactNode", description: "Right-side slot — theme toggle, CTAs, etc." },
          { name: "sticky", type: "boolean", default: "true", description: "Pins the bar 18px below the top while scrolling." },
        ]}
      />
    </>
  );
}
