import type { Metadata } from "next";
import { Select } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Select",
  description: "Native select styled as a clay well — accessible dropdowns on every engine.",
};

const BASIC = `<Select
  label="Role"
  options={[
    { value: "dev", label: "Developer" },
    { value: "des", label: "Designer" },
    { value: "pm",  label: "Product manager" },
  ]}
/>`;

const PLACEHOLDER = `<Select
  label="Workspace"
  placeholder="Choose one…"
  hint="You can change this later."
  options={[
    { value: "acme",  label: "Acme Inc." },
    { value: "north", label: "Northwind" },
    { value: "glob",  label: "Globex" },
  ]}
/>`;

const SIZES = `<Select size="sm" options={[{ value: "1", label: "Small" }]} aria-label="Small" />
<Select options={[{ value: "1", label: "Medium" }]} aria-label="Medium" />
<Select size="lg" options={[{ value: "1", label: "Large" }]} aria-label="Large" />`;

export default function SelectPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Select"
        lead="A native <select> wearing clay: full keyboard and mobile-native behavior, with an inset well and a drawn chevron."
        importCode={`import { Select } from "marclayui";`}
      />

      <Demo title="Options" code={BASIC}>
        <Select
          label="Role"
          options={[
            { value: "dev", label: "Developer" },
            { value: "des", label: "Designer" },
            { value: "pm", label: "Product manager" },
          ]}
        />
      </Demo>

      <Demo title="Placeholder & hint" code={PLACEHOLDER}>
        <Select
          label="Workspace"
          placeholder="Choose one…"
          hint="You can change this later."
          defaultValue=""
          options={[
            { value: "acme", label: "Acme Inc." },
            { value: "north", label: "Northwind" },
            { value: "glob", label: "Globex" },
          ]}
        />
      </Demo>

      <Demo title="Sizes" code={SIZES}>
        <Select size="sm" aria-label="Small select" defaultValue="1" options={[{ value: "1", label: "Small" }]} />
        <Select aria-label="Medium select" defaultValue="1" options={[{ value: "1", label: "Medium" }]} />
        <Select size="lg" aria-label="Large select" defaultValue="1" options={[{ value: "1", label: "Large" }]} />
      </Demo>

      <div className="docs-note">
        <span aria-hidden="true">💡</span>
        <span>
          <b>Want a styled popup?</b> The native <code>&lt;select&gt;</code> list is drawn by the
          browser and can&apos;t be themed. For a fully custom menu use the{" "}
          <a href="/docs/components/dropdown" style={{ color: "var(--mcl-primary)", fontWeight: 700 }}>
            Dropdown
          </a>{" "}
          component instead — same well styling, your own popup, keyboard support included.
        </span>
      </div>

      <PropsTable
        rows={[
          { name: "options", type: "SelectOption[]", description: "Convenience list of { value, label } — or pass <option> children." },
          { name: "placeholder", type: "string", description: "Disabled first option shown before a choice is made." },
          { name: "label / hint / error", type: "React.ReactNode / string", description: "Same chrome as Input." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and radius scale." },
          { name: "…rest", type: "SelectHTMLAttributes", description: "All native select attributes are forwarded." },
        ]}
      />
    </>
  );
}
