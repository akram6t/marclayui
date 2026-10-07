import type { Metadata } from "next";
import { Stat } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Stat",
  description: "Inset number wells for dashboards — value, label and tone.",
};

const BASIC = `<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <Stat value="6+" label="Years" />
  <Stat value="24" label="Components" tone="accent" />
  <Stat value="2M+" label="Req / day" tone="info" />
  <Stat value="99.9%" label="Uptime" tone="secondary" />
</div>`;

export default function StatPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Stat"
        lead="Pressed number wells for the tops of dashboards — a bold tinted value over a quiet label."
        importCode={`import { Stat } from "marclayui";`}
      />

      <Demo title="Dashboard row" code={BASIC}>
        <Stat value="6+" label="Years" />
        <Stat value="24" label="Components" tone="accent" />
        <Stat value="2M+" label="Req / day" tone="info" />
        <Stat value="99.9%" label="Uptime" tone="secondary" />
      </Demo>

      <PropsTable
        rows={[
          { name: "value", type: "React.ReactNode", description: "The big number (or any node)." },
          { name: "label", type: "React.ReactNode", description: "Small caption under the value." },
          { name: "tone", type: '"primary" | "secondary" | "accent" | "danger" | "info"', default: '"primary"', description: "Value color." },
        ]}
      />
    </>
  );
}
