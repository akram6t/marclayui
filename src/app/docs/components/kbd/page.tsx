import type { Metadata } from "next";
import { Kbd, Button } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Kbd",
  description: "Keyboard key caps — inset clay wells with a pressed bottom edge.",
};

const BASIC = `Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search,
or <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> on Windows.`;

const COMBOS = `<span>
  <Kbd>Enter</Kbd> select · <Kbd>Esc</Kbd> close ·
  <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
</span>`;

export default function KbdPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Kbd"
        lead="A key cap for keyboard shortcuts: an inset clay well with a pressed bottom edge and monospaced glyph — the docs use it for every shortcut hint."
        importCode={`import { Kbd } from "marclayui";`}
      />

      <Demo title="Basic" code={BASIC}>
        <span style={{ color: "var(--mcl-muted)", fontWeight: 600 }}>
          Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search, or <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> on Windows.
        </span>
      </Demo>

      <Demo title="Shortcut combos" code={COMBOS}>
        <span style={{ color: "var(--mcl-muted)", fontWeight: 600, display: "inline-flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Kbd>Enter</Kbd> select · <Kbd>Esc</Kbd> close · <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
        </span>
      </Demo>

      <Demo title="Inside buttons" code={`<Button size="sm">
  Save <Kbd>⌘S</Kbd>
</Button>`}>
        <Button size="sm" variant="primary">
          Save <Kbd>⌘S</Kbd>
        </Button>
      </Demo>

      <PropsTable
        rows={[
          { name: "children", type: "React.ReactNode", description: "The key label — glyph, word or combo." },
          { name: "…rest", type: "HTMLAttributes<HTMLElement>", description: "Standard kbd element props." },
        ]}
      />
    </>
  );
}
