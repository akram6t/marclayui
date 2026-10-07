import type { Metadata } from "next";
import { Tabs } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Tabs",
  description: "Clay pill tabs with gradient active state and arrow-key navigation.",
};

const BASIC = `<Tabs
  items={[
    {
      key: "overview",
      label: "Overview",
      content: "Soft shadows, warm gradients, real depth.",
    },
    {
      key: "specs",
      label: "Specs",
      content: "Zero deps · ESM + CJS · React 18+.",
    },
    {
      key: "reviews",
      label: "Reviews",
      content: "“Feels like pottery for the DOM.”",
    },
  ]}
/>`;

const DISABLED = `<Tabs
  items={[
    { key: "a", label: "Draft", content: "Editable content lives here." },
    { key: "b", label: "Review", content: "Waiting for approvals.", disabled: true },
    { key: "c", label: "Published", content: "Live content lives here." },
  ]}
/>`;

export default function TabsPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Tabs"
        lead="Pill-shaped tabs on a quiet rail — the active one extrudes with the primary gradient and a clay glow. Arrow keys, Home and End all work."
        importCode={`import { Tabs } from "marclayui";`}
      />

      <Demo title="Basic" code={BASIC} layout="column">
        <Tabs
          items={[
            { key: "overview", label: "Overview", content: "Soft shadows, warm gradients, real depth — the MarclayUI view." },
            { key: "specs", label: "Specs", content: "Zero runtime dependencies · ESM + CJS · React 18+ · TypeScript definitions." },
            { key: "reviews", label: "Reviews", content: "“Feels like pottery for the DOM.” — a satisfied developer" },
          ]}
        />
      </Demo>

      <Demo title="Disabled tab" code={DISABLED} layout="column">
        <Tabs
          items={[
            { key: "a", label: "Draft", content: "Editable content lives here." },
            { key: "b", label: "Review", content: "Waiting for approvals.", disabled: true },
            { key: "c", label: "Published", content: "Live content lives here." },
          ]}
        />
      </Demo>

      <PropsTable
        rows={[
          { name: "items", type: "TabItem[]", description: "{ key, label, content, disabled? }" },
          { name: "value / onChange", type: "number / (i: number) => void", description: "Control the active index; uncontrolled by default." },
          { name: "…", type: "—", description: "Full WAI-ARIA tablist semantics: roles, aria-selected, roving tabindex." },
        ]}
      />
    </>
  );
}
