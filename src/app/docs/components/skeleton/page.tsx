import type { Metadata } from "next";
import { Skeleton } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Skeleton",
  description: "Shimmering clay placeholders for text, circles and rectangles.",
};

const TEXT = `<Skeleton variant="text" count={3} width={320} />`;

const CARD = `<div style={{ display: "flex", gap: 18, alignItems: "center" }}>
  <Skeleton variant="circle" width={56} height={56} />
  <div>
    <Skeleton variant="text" width={160} height={16} />
    <div style={{ height: 8 }} />
    <Skeleton variant="text" width={110} />
  </div>
</div>
<Skeleton variant="rect" width={320} height={96} />`;

export default function SkeletonPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Skeleton"
        lead="Inset wells with a soft sheen that sweeps across, hinting at content on the way. Multi-line text mode shortens the last line like real copy."
        importCode={`import { Skeleton } from "marclayui";`}
      />

      <Demo title="Text lines" code={TEXT}>
        <Skeleton variant="text" count={3} width={320} />
      </Demo>

      <Demo title="Composition" code={CARD} layout="column">
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Skeleton variant="circle" width={56} height={56} />
          <div>
            <Skeleton variant="text" width={160} height={16} />
            <div style={{ height: 8 }} />
            <Skeleton variant="text" width={110} />
          </div>
        </div>
        <Skeleton variant="rect" width={320} height={96} />
      </Demo>

      <PropsTable
        rows={[
          { name: "variant", type: '"text" | "circle" | "rect"', default: '"text"', description: "Shape of the placeholder." },
          { name: "width / height", type: "number | string", description: "Explicit dimensions." },
          { name: "count", type: "number", default: "1", description: "Text lines to render; the last is shortened." },
        ]}
      />
    </>
  );
}
