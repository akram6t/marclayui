import type { Metadata } from "next";
import { Spinner } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Spinner",
  description: "Circular clay loader in three sizes, respecting reduced-motion preferences.",
};

const BASIC = `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`;

export default function SpinnerPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Spinner"
        lead="A two-tone clay ring that rotates around its own shadow. Announced as 'Loading' to assistive tech."
        importCode={`import { Spinner } from "marclayui";`}
      />

      <Demo title="Sizes" code={BASIC}>
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </Demo>

      <PropsTable
        rows={[
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "18 / 28 / 42 pixels." },
          { name: "className", type: "string", description: "Extra classes for layout." },
        ]}
      />
    </>
  );
}
