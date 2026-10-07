import type { Metadata } from "next";
import { Badge } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Badge",
  description: "Small status pills — soft inset wells or solid clay gradients in every tone.",
};

const SOFT = `<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge>Neutral</Badge>`;

const SOLID = `<Badge solid variant="primary">New</Badge>
<Badge solid variant="secondary">v0.1.0</Badge>
<Badge solid variant="accent">Pro</Badge>
<Badge solid variant="success">Live</Badge>
<Badge solid variant="danger">Beta</Badge>`;

export default function BadgePage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Badge"
        lead="Tiny status pills. Soft badges are inset wells with tinted text; solid badges are extruded gradient chips with a clay glow."
        importCode={`import { Badge } from "marclayui";`}
      />

      <Demo title="Soft" code={SOFT}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge>Neutral</Badge>
      </Demo>

      <Demo title="Solid" code={SOLID}>
        <Badge solid variant="primary">
          New
        </Badge>
        <Badge solid variant="secondary">
          v0.1.0
        </Badge>
        <Badge solid variant="accent">
          Pro
        </Badge>
        <Badge solid variant="success">
          Live
        </Badge>
        <Badge solid variant="danger">
          Beta
        </Badge>
      </Demo>

      <PropsTable
        rows={[
          { name: "variant", type: '"primary" | "secondary" | "accent" | "success" | "danger" | "warning" | "info" | "neutral"', default: '"neutral"', description: "Tone for text (soft) or the gradient (solid)." },
          { name: "solid", type: "boolean", default: "false", description: "Filled gradient chip with a clay glow." },
          { name: "…rest", type: "HTMLAttributes<HTMLSpanElement>", description: "Standard span props." },
        ]}
      />
    </>
  );
}
