import type { Metadata } from "next";
import { Textarea } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Textarea",
  description: "Multi-line clay input with the same label, hint and error chrome as Input.",
};

const BASIC = `<Textarea label="Message" placeholder="Tell us what you're building…" rows={4} hint="Markdown is supported." />`;

const SIZES = `<Textarea size="sm" rows={2} placeholder="Small" aria-label="Small textarea" />
<Textarea rows={3} placeholder="Medium" aria-label="Medium textarea" />
<Textarea size="lg" rows={4} placeholder="Large" aria-label="Large textarea" />`;

const DISABLED = `<Textarea label="Locked" defaultValue="Read-only content." disabled />`;

export default function TextareaPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Textarea"
        lead="The multi-line sibling of Input — same inset well, resizable vertically by the user."
        importCode={`import { Textarea } from "marclayui";`}
      />

      <Demo title="Basic" code={BASIC}>
        <Textarea label="Message" placeholder="Tell us what you're building…" rows={4} hint="Markdown is supported." />
      </Demo>

      <Demo title="Sizes" code={SIZES} layout="column">
        <Textarea size="sm" rows={2} placeholder="Small" aria-label="Small textarea" />
        <Textarea rows={3} placeholder="Medium" aria-label="Medium textarea" />
        <Textarea size="lg" rows={4} placeholder="Large" aria-label="Large textarea" />
      </Demo>

      <Demo title="Disabled" code={DISABLED}>
        <Textarea label="Locked" defaultValue="Read-only content." disabled style={{ maxWidth: 360 }} />
      </Demo>

      <PropsTable
        rows={[
          { name: "label / hint / error", type: "React.ReactNode / string", description: "Same chrome as Input." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and radius scale." },
          { name: "rows", type: "number", default: "4", description: "Visible line count." },
          { name: "…rest", type: "TextareaHTMLAttributes", description: "All native textarea attributes are forwarded." },
        ]}
      />
    </>
  );
}
