import type { Metadata } from "next";
import { Input } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Input",
  description: "Inset clay text input with label, hint and validation states.",
};

const BASIC = `<Input label="Full name" placeholder="Jane Developer" hint="We never share it." />

{/* bare input, no chrome */}
<Input placeholder="Search…" aria-label="Search" />

{/* full width inside forms */}
<Input label="Email" type="email" block placeholder="jane@studio.io" />`;

const SIZES = `<Input size="sm" placeholder="Small" aria-label="Small" />
<Input size="md" placeholder="Medium" aria-label="Medium" />
<Input size="lg" placeholder="Large" aria-label="Large" />`;

const ERROR = `<Input
  label="Username"
  defaultValue="ak"
  error="Usernames need at least 4 characters."
  block
/>`;

export default function InputPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Input"
        lead="A pressed-into-the-clay text field: inset shadow well, warm focus ring, and optional label / hint / error chrome."
        importCode={`import { Input } from "marclayui";`}
      />

      <Demo title="Label, hint & block" code={BASIC} layout="column">
        <Input label="Full name" placeholder="Jane Developer" hint="We never share it." />
        <Input placeholder="Search…" aria-label="Search" style={{ width: 280 }} />
        <Input label="Email" type="email" block placeholder="jane@studio.io" />
      </Demo>

      <Demo title="Sizes" code={SIZES}>
        <Input size="sm" placeholder="Small" aria-label="Small input" />
        <Input placeholder="Medium" aria-label="Medium input" />
        <Input size="lg" placeholder="Large" aria-label="Large input" />
      </Demo>

      <Demo title="Validation" code={ERROR} layout="column">
        <Input label="Username" defaultValue="ak" error="Usernames need at least 4 characters." block />
      </Demo>

      <PropsTable
        rows={[
          { name: "label", type: "React.ReactNode", description: "Renders a linked <label> above the field." },
          { name: "hint", type: "React.ReactNode", description: "Helper text below the field." },
          { name: "error", type: "string", description: "Shows red text, a danger ring and aria-invalid." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and radius scale." },
          { name: "block", type: "boolean", default: "false", description: "Field and wrapper stretch to full width." },
          { name: "…rest", type: "InputHTMLAttributes", description: "All native input attributes are forwarded." },
        ]}
      />
    </>
  );
}
