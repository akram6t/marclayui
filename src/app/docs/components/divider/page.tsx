import type { Metadata } from "next";
import { Divider } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Divider",
  description: "Inset clay hairlines — plain, vertical, or with a centered label.",
};

const BASIC = `<p>Content above the line.</p>
<Divider />
<p>Content below the line.</p>`;

const LABEL = `<Divider label="section two" />`;

const VERTICAL = `<div style={{ display: "flex", alignItems: "center", height: 56 }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Middle</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`;

export default function DividerPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Divider"
        lead="Separators that look carved, not drawn: thin inset wells of light, optionally split around a label."
        importCode={`import { Divider } from "marclayui";`}
      />

      <Demo title="Horizontal" code={BASIC} layout="column">
        <p style={{ margin: 0, color: "var(--mcl-muted)", fontWeight: 500 }}>Content above the line.</p>
        <Divider />
        <p style={{ margin: 0, color: "var(--mcl-muted)", fontWeight: 500 }}>Content below the line.</p>
      </Demo>

      <Demo title="With label" code={LABEL}>
        <Divider label="section two" />
      </Demo>

      <Demo title="Vertical" code={VERTICAL}>
        <div style={{ display: "flex", alignItems: "center", height: 56, width: "100%" }}>
          <span style={{ color: "var(--mcl-muted)", fontWeight: 600 }}>Left</span>
          <Divider orientation="vertical" />
          <span style={{ color: "var(--mcl-muted)", fontWeight: 600 }}>Middle</span>
          <Divider orientation="vertical" />
          <span style={{ color: "var(--mcl-muted)", fontWeight: 600 }}>Right</span>
        </div>
      </Demo>

      <PropsTable
        rows={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the well." },
          { name: "label", type: "React.ReactNode", description: "Renders text centered between two inset lines." },
        ]}
      />
    </>
  );
}
