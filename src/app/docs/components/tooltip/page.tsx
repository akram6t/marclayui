import type { Metadata } from "next";
import { Button, Tooltip } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Tooltip",
  description: "CSS-only clay tooltips on hover and keyboard focus — four placements.",
};

const BASIC = `<Tooltip label="Clay-soft tooltips">
  <Button variant="soft">Top (default)</Button>
</Tooltip>`;

const PLACEMENTS = `<Tooltip label="Top" placement="top"><Button variant="soft">Top</Button></Tooltip>
<Tooltip label="Bottom" placement="bottom"><Button variant="soft">Bottom</Button></Tooltip>
<Tooltip label="Left" placement="left"><Button variant="soft">Left</Button></Tooltip>
<Tooltip label="Right" placement="right"><Button variant="soft">Right</Button></Tooltip>`;

export default function TooltipPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Tooltip"
        lead="Pure CSS — a dark clay bubble with a rotated-square arrow that appears on hover and when the wrapped control receives keyboard focus."
        importCode={`import { Tooltip } from "marclayui";`}
      />

      <Demo title="Basic" code={BASIC}>
        <Tooltip label="Clay-soft tooltips">
          <Button variant="soft">Hover or focus me</Button>
        </Tooltip>
      </Demo>

      <Demo title="Placements" code={PLACEMENTS}>
        <Tooltip label="Top" placement="top">
          <Button variant="soft">Top</Button>
        </Tooltip>
        <Tooltip label="Bottom" placement="bottom">
          <Button variant="soft">Bottom</Button>
        </Tooltip>
        <Tooltip label="Left" placement="left">
          <Button variant="soft">Left</Button>
        </Tooltip>
        <Tooltip label="Right" placement="right">
          <Button variant="soft">Right</Button>
        </Tooltip>
      </Demo>

      <PropsTable
        rows={[
          { name: "label", type: "string", description: "Tooltip text (kept to a short phrase)." },
          { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Where the bubble appears." },
          { name: "children", type: "React.ReactNode", description: "Wrap a focusable control; it must be able to receive focus." },
        ]}
      />
    </>
  );
}
