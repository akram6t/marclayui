import type { Metadata } from "next";
import { Accordion } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Accordion",
  description: "Clay expandable panels with animated height and aria-expanded wiring.",
};

const BASIC = `<Accordion
  defaultOpen={0}
  items={[
    {
      title: "What is claymorphism?",
      content: "Soft extruded shapes with two opposing shadows and a colored inner glow.",
    },
    {
      title: "Is it responsive?",
      content: "Every component adapts from mobile to desktop without extra classes.",
    },
    {
      title: "Does it work without Tailwind?",
      content: "Yes — plain, hand-written CSS driven by design tokens.",
    },
  ]}
/>`;

const MULTI = `<Accordion exclusive={false} defaultOpen={0} items={[…]} />`;

export default function AccordionPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Accordion"
        lead="Raised clay cards that open like soft hinges — the chevron well presses in and the panel height animates to its measured size."
        importCode={`import { Accordion } from "marclayui";`}
      />

      <Demo title="Basic" code={BASIC} layout="column">
        <Accordion
          defaultOpen={0}
          items={[
            { title: "What is claymorphism?", content: "Soft extruded shapes with two opposing shadows and a colored inner glow." },
            { title: "Is it responsive?", content: "Every component adapts from mobile to desktop without extra classes." },
            { title: "Does it work without Tailwind?", content: "Yes — plain, hand-written CSS driven by design tokens." },
          ]}
        />
      </Demo>

      <Demo title="Multiple open" code={MULTI} layout="column">
        <Accordion
          exclusive={false}
          items={[
            { title: "Ship ESM & CJS", content: "Both formats are built with type definitions included." },
            { title: "Tree-shakeable", content: "Side effects are declared only for stylesheets." },
          ]}
        />
      </Demo>

      <PropsTable
        rows={[
          { name: "items", type: "AccordionEntry[]", description: "{ title, content } pairs." },
          { name: "defaultOpen", type: "number", default: "-1", description: "Index opened initially." },
          { name: "exclusive", type: "boolean", default: "true", description: "Only one panel open at a time." },
        ]}
      />
    </>
  );
}
