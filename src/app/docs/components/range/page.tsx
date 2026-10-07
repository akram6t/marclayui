import type { Metadata } from "next";
import { Range } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Range",
  description: "Styled native range slider — clay track, gradient thumb, WebKit and Firefox.",
};

const BASIC = `<Range label="Volume" min={0} max={100} defaultValue={64} />

{/* live value readout */}
<Range label="Opacity" showValue min={0} max={100} defaultValue={40} />`;

const STEPS = `<Range
  label="Budget"
  min={0}
  max={100}
  step={10}
  defaultValue={50}
  hint="Snaps in 10-unit steps."
/>`;

export default function RangePage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Range"
        lead="The native slider, glazed: an inset clay track with a gradient clay thumb. Styled for both WebKit and Gecko engines."
        importCode={`import { Range } from "marclayui";`}
      />

      <Demo title="Basic & readout" code={BASIC} layout="column">
        <Range label="Volume" min={0} max={100} defaultValue={64} />
        <Range label="Opacity" showValue min={0} max={100} defaultValue={40} />
      </Demo>

      <Demo title="Step & hint" code={STEPS}>
        <Range label="Budget" min={0} max={100} step={10} defaultValue={50} hint="Snaps in 10-unit steps." />
      </Demo>

      <PropsTable
        rows={[
          { name: "label", type: "React.ReactNode", description: "Label row above the slider." },
          { name: "showValue", type: "boolean", default: "false", description: "Shows the current value next to the label." },
          { name: "min / max / step", type: "number", description: "Native range semantics." },
          { name: "…rest", type: "InputHTMLAttributes", description: "All native attributes (onChange, disabled…) are forwarded." },
        ]}
      />
    </>
  );
}
