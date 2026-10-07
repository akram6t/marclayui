import type { Metadata } from "next";
import { Demo, DocHeader, PropsTable } from "@/components/docs";
import { ModalDemo } from "@/components/demos/interactive";

export const metadata: Metadata = {
  title: "Modal",
  description: "Portaled clay dialog with backdrop blur, Escape handling and focus control.",
};

const BASIC = `const [open, setOpen] = useState(false);

<Button variant="primary" onClick={() => setOpen(true)}>
  Open modal
</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
>
  This action can't be undone.
</Modal>`;

const SIZES = `<Modal size="sm" …>…</Modal>   {/* 420px */}
<Modal size="md" …>…</Modal>   {/* 520px */}
<Modal size="lg" …>…</Modal>   {/* 680px */}`;

export default function ModalPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Modal"
        lead="A portaled dialog on a blurred backdrop. Focuses itself on open, closes on Escape or backdrop click, and locks page scroll while visible."
        importCode={`import { Modal } from "marclayui";`}
      />

      <Demo title="Dialog with footer" code={BASIC} layout="column">
        <ModalDemo />
      </Demo>

      <Demo title="Sizes" code={SIZES}>
        <span style={{ color: "var(--mcl-muted)", fontWeight: 500 }}>
          sm · md (default) · lg — all capped at 92vw on small screens.
        </span>
      </Demo>

      <PropsTable
        rows={[
          { name: "open", type: "boolean", description: "Controls visibility." },
          { name: "onClose", type: "() => void", description: "Called by Escape, the ✕ button, or the backdrop." },
          { name: "title", type: "React.ReactNode", description: "Header text; the panel is aria-labelledby it." },
          { name: "footer", type: "React.ReactNode", description: "Right-aligned action row." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Max width of the panel." },
          { name: "closeOnBackdrop / closeOnEsc", type: "boolean", default: "true", description: "Toggle the dismissal behaviors." },
        ]}
      />
    </>
  );
}
