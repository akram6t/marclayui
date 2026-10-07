import type { Metadata } from "next";
import { Button, ButtonGroup, Kbd } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";
import { LoadingButtonDemo } from "@/components/demos/interactive";

export const metadata: Metadata = {
  title: "Button",
  description: "Clay buttons in six variants, three sizes, with loading and disabled states.",
};

const VARIANTS = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="soft">Soft</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`;

const SIZES = `<Button size="sm" variant="primary">Small</Button>
<Button size="md" variant="primary">Medium</Button>
<Button size="lg" variant="primary">Large</Button>

{/* stretch to the container width */}
<Button block variant="secondary">
  Block button
</Button>`;

const STATES = `const [loading, setLoading] = useState(false);

<Button
  variant="primary"
  loading={loading}
  onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
>
  {loading ? "Saving…" : "Save changes"}
</Button>

<Button disabled>Disabled</Button>`;

const LINKS = `{/* renders a real <a> with full button styling */}
<Button href="/docs" variant="primary">Get started</Button>
<Button href="/docs/components/badge" variant="secondary">
  Browse badges
</Button>

{/* works with Next <Link> styling too */}
<Link href="/docs" className="mcl-btn mcl-btn-ghost">Ghost link</Link>`;

const GROUP = `<ButtonGroup>
  <Button variant="primary">Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>

{/* a segmented control: the container is an inset well,
    variant styles the active segment */}`;

export default function ButtonPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Button"
        lead="Extruded clay buttons that press inward on click. Six variants mapped to the theme tones, three sizes, plus loading and disabled states."
        importCode={`import { Button } from "marclayui";`}
      />

      <Demo title="Variants" code={VARIANTS}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </Demo>

      <Demo title="Sizes & block" code={SIZES}>
        <Button size="sm" variant="primary">
          Small
        </Button>
        <Button variant="primary">Medium</Button>
        <Button size="lg" variant="primary">
          Large
        </Button>
        <Button block variant="secondary">
          Block button
        </Button>
      </Demo>

      <Demo title="Loading & disabled" code={STATES}>
        <LoadingButtonDemo />
        <Button disabled>Disabled</Button>
      </Demo>

      <Demo title="Links" code={LINKS}>
        <Button href="/docs" variant="primary">
          Get started
        </Button>
        <Button href="/docs/components/badge" variant="secondary">
          Browse badges
        </Button>
        <Button href="https://github.com/akram6t" variant="ghost">
          GitHub ↗
        </Button>
      </Demo>

      <Demo title="Segmented group" code={GROUP}>
        <ButtonGroup>
          <Button variant="primary">Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </Demo>

      <div className="docs-note">
        <span aria-hidden="true">💡</span>
        <span>
          <b>Keyboard tip:</b> buttons respond to <Kbd>Enter</Kbd> and <Kbd>Space</Kbd>; anchors
          styled as buttons respond to <Kbd>Enter</Kbd> only — native behavior, preserved.
        </span>
      </div>

      <PropsTable
        rows={[
          { name: "variant", type: '"primary" | "secondary" | "accent" | "soft" | "ghost" | "danger"', default: '"soft"', description: "Visual style. Tones follow the theme colors." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and radius scale." },
          { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and blocks interaction." },
          { name: "block", type: "boolean", default: "false", description: "Full-width button." },
          { name: "href", type: "string", description: "When set, renders a styled anchor instead of a button." },
          { name: "…rest", type: "ButtonHTMLAttributes | AnchorHTMLAttributes", description: "Native attributes are forwarded to the rendered element." },
        ]}
      />
    </>
  );
}
