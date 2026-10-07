import type { Metadata } from "next";
import { Badge, Stack } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Stack",
  description: "Flex layout helpers with clay-scaled gaps — rows, columns, alignment.",
};

const BASIC = `<Stack direction="row" gap="lg" align="center">
  <Badge variant="primary">xs</Badge>
  <Badge variant="secondary">sm</Badge>
  <Badge variant="accent">md</Badge>
</Stack>

<Stack gap="sm">
  <Badge>row item one</Badge>
  <Badge>row item two</Badge>
</Stack>`;

const JUSTIFY = `<Stack direction="row" justify="between" align="center">
  <Badge>start</Badge>
  <Badge variant="accent">end</Badge>
</Stack>`;

export default function StackPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Stack"
        lead="A tiny flex helper that keeps spacing consistent with the design system — no magic numbers, just named gaps."
        importCode={`import { Stack } from "marclayui";`}
      />

      <Demo title="Direction & gap" code={BASIC} layout="column">
        <Stack direction="row" gap="lg" align="center">
          <Badge variant="primary">one</Badge>
          <Badge variant="secondary">two</Badge>
          <Badge variant="accent">three</Badge>
        </Stack>
        <Stack gap="sm">
          <Badge>row item one</Badge>
          <Badge>row item two</Badge>
        </Stack>
      </Demo>

      <Demo title="Justify" code={JUSTIFY}>
        <Stack direction="row" justify="between" align="center" style={{ width: 320 }}>
          <Badge>start</Badge>
          <Badge variant="accent">end</Badge>
        </Stack>
      </Demo>

      <PropsTable
        rows={[
          { name: "direction", type: '"row" | "column"', default: '"column"', description: "Flex direction." },
          { name: "gap", type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Named spacing scale (6→44px)." },
          { name: "align / justify", type: '"start" | "center" | "end" | …', description: "Flex alignment helpers." },
          { name: "wrap", type: "boolean", default: "false", description: "Allow items to wrap." },
        ]}
      />
    </>
  );
}
