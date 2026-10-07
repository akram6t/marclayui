import type { Metadata } from "next";
import { Radio } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Radio",
  description: "Round clay radio buttons grouped by native name semantics.",
};

const BASIC = `<Radio name="plan" label="Hobby" defaultChecked />
<Radio name="plan" label="Pro" />
<Radio name="plan" label="Team" />`;

const DISABLED = `<Radio name="tier" label="Available tier" defaultChecked />
<Radio name="tier" label="Sold out" disabled />`;

export default function RadioPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Radio"
        lead="Same clay mechanics as the checkbox, round — a dot of primary ink in a gradient dish. Group them with a shared name like native radios."
        importCode={`import { Radio } from "marclayui";`}
      />

      <Demo title="Group" code={BASIC} layout="column">
        <div style={{ display: "grid", gap: 12 }}>
          <Radio name="plan-doc" label="Hobby" defaultChecked />
          <Radio name="plan-doc" label="Pro" />
          <Radio name="plan-doc" label="Team" />
        </div>
      </Demo>

      <Demo title="Disabled" code={DISABLED} layout="column">
        <div style={{ display: "grid", gap: 12 }}>
          <Radio name="tier-doc" label="Available tier" defaultChecked />
          <Radio name="tier-doc" label="Sold out" disabled />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { name: "name", type: "string", description: "Groups radios natively — one selection per group." },
          { name: "label", type: "React.ReactNode", description: "Clickable label rendered next to the dot." },
          { name: "…rest", type: "InputHTMLAttributes", description: "All native radio attributes are forwarded." },
        ]}
      />
    </>
  );
}
