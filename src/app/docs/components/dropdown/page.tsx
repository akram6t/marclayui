import type { Metadata } from "next";
import { Dropdown } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Dropdown",
  description: "Custom dropdown menu with its own styled popup — no native browser option list.",
};

const BASIC = `<Dropdown
  label="Assign to"
  placeholder="Choose a teammate…"
  defaultValue="sara"
  items={[
    { value: "akram", label: "Akram Khan" },
    { value: "sara",  label: "Sara Iqbal" },
    { value: "ravi",  label: "Ravi Menon" },
    { value: "nina",  label: "Nina Park" },
  ]}
/>`;

const MULTIPLE = `<Dropdown
  label="Skills" 
  multiple
  defaultValue={["react", "css"]}
  hint="Pick as many as you need."
  items={[
    { value: "react", label: "React" },
    { value: "css",   label: "CSS" },
    { value: "node",  label: "Node.js" },
    { value: "edge",  label: "Edge runtimes" },
  ]}
/>`;

const SIZES = `<Dropdown size="sm" placeholder="Small" items={[…]} />
<Dropdown placeholder="Medium" items={[…]} />
<Dropdown size="lg" block placeholder="Large, full width" items={[…]} />`;

const DISABLED_ITEMS = `<Dropdown
  placeholder="Plans"
  items={[
    { value: "hobby", label: "Hobby" },
    { value: "pro",   label: "Pro" },
    { value: "ent",   label: "Enterprise", disabled: true },
  ]}
/>`;

export default function DropdownPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Dropdown"
        lead="A fully custom dropdown menu: the popup is rendered by MarclayUI — styled, animated and keyboard-driven — never the browser's native option list. Use it when Select's native menu isn't enough."
        importCode={`import { Dropdown } from "marclayui";`}
      />

      <Demo title="Single select" code={BASIC}>
        <Dropdown
          label="Assign to"
          placeholder="Choose a teammate…"
          defaultValue="sara"
          items={[
            { value: "akram", label: "Akram Khan" },
            { value: "sara", label: "Sara Iqbal" },
            { value: "ravi", label: "Ravi Menon" },
            { value: "nina", label: "Nina Park" },
          ]}
        />
      </Demo>

      <Demo title="Multiple with checkboxes" code={MULTIPLE}>
        <Dropdown
          label="Skills"
          multiple
          defaultValue={["react", "css"]}
          hint="Pick as many as you need."
          items={[
            { value: "react", label: "React" },
            { value: "css", label: "CSS" },
            { value: "node", label: "Node.js" },
            { value: "edge", label: "Edge runtimes" },
          ]}
        />
      </Demo>

      <Demo title="Sizes & block" code={SIZES} layout="column">
        <div className="home-lab-row">
          <Dropdown
            size="sm"
            aria-label="Small dropdown"
            placeholder="Small"
            items={[
              { value: "1", label: "Option one" },
              { value: "2", label: "Option two" },
            ]}
          />
          <Dropdown
            aria-label="Medium dropdown"
            placeholder="Medium"
            items={[
              { value: "1", label: "Option one" },
              { value: "2", label: "Option two" },
            ]}
          />
        </div>
        <Dropdown
          size="lg"
          block
          aria-label="Large dropdown"
          placeholder="Large, full width"
          items={[
            { value: "1", label: "Option one" },
            { value: "2", label: "Option two" },
          ]}
        />
      </Demo>

      <Demo title="Disabled items" code={DISABLED_ITEMS}>
        <Dropdown
          placeholder="Plans"
          items={[
            { value: "hobby", label: "Hobby" },
            { value: "pro", label: "Pro" },
            { value: "ent", label: "Enterprise", disabled: true },
          ]}
        />
      </Demo>

      <div className="docs-note">
        <span aria-hidden="true">⌨️</span>
        <span>
          <b>Keyboard first:</b> open with <code>Enter</code>, <code>Space</code> or{" "}
          <code>ArrowDown</code>, navigate with the arrows, select with <code>Enter</code>, close
          with <code>Escape</code>. The menu closes on outside clicks and the highlight follows the
          mouse.
        </span>
      </div>

      <PropsTable
        rows={[
          { name: "items", type: "DropdownItem[]", description: "{ value, label, disabled? } — rendered in the custom popup." },
          { name: "multiple", type: "boolean", default: "false", description: "Multi-select; the menu shows checkbox marks and stays open." },
          { name: "value / defaultValue", type: "string | string[]", description: "Controlled selection, or uncontrolled initial value(s)." },
          { name: "onChange", type: "(value: string | string[]) => void", description: "Fires on every selection change." },
          { name: "placeholder", type: "string", default: '"Select…"', description: "Trigger text when nothing is selected." },
          { name: "label / hint", type: "React.ReactNode", description: "Field chrome above / below the trigger." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger and menu scale." },
          { name: "block", type: "boolean", default: "false", description: "Full-width trigger and menu." },
        ]}
      />
    </>
  );
}
