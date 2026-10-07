import type { Metadata } from "next";
import { Progress } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Progress",
  description: "Inset clay track with a gradient fill and animated width transitions.",
};

const BASIC = `<Progress value={72} label="Uploading" showValue />
<Progress value={45} label="Bandwidth" />
<Progress value={90} tone="accent" size="sm" label="Compact" />
<Progress value={30} tone="danger" size="lg" label="Almost full" />`;

const INDETERMINATE = `<Progress indeterminate label="Connecting…" />`;

export default function ProgressPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Progress"
        lead="An inset clay well with a gradient bar that glides on a soft easing curve. Four tones, three sizes, plus an indeterminate mode."
        importCode={`import { Progress } from "marclayui";`}
      />

      <Demo title="Values, tones & sizes" code={BASIC} layout="column">
        <Progress value={72} label="Uploading" showValue />
        <Progress value={45} label="Bandwidth" />
        <Progress value={90} tone="accent" size="sm" label="Compact" />
        <Progress value={30} tone="danger" size="lg" label="Almost full" />
      </Demo>

      <Demo title="Indeterminate" code={INDETERMINATE}>
        <Progress indeterminate label="Connecting…" />
      </Demo>

      <PropsTable
        rows={[
          { name: "value / max", type: "number", default: "0 / 100", description: "Current and maximum values; clamped and aria-tracked." },
          { name: "tone", type: '"primary" | "secondary" | "accent" | "danger"', default: '"primary"', description: "Fill gradient." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track height." },
          { name: "label / showValue", type: "React.ReactNode / boolean", description: "Header row with name and percent." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Animated sliding chunk instead of a width." },
        ]}
      />
    </>
  );
}
