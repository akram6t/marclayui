import type { Metadata } from "next";
import { Alert } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";
import { DismissibleAlertDemo } from "@/components/demos/interactive";

export const metadata: Metadata = {
  title: "Alert",
  description: "Clay alert panels in four tones with optional dismissal.",
};

const VARIANTS = `<Alert variant="success" title="Deployment complete">
  Your site is live on the edge network.
</Alert>

<Alert variant="danger" title="Build failed">
  TypeScript found 2 errors in ./src/app.tsx.
</Alert>

<Alert variant="warning" title="Heads up">
  This will invalidate your cached assets.
</Alert>

<Alert variant="info" title="Did you know">
  Alerts can render any React node as children.
</Alert>`;

const DISMISS = `const [open, setOpen] = useState(true);

{open && (
  <Alert variant="warning" title="Heads up" onClose={() => setOpen(false)}>
    Click the ✕ to dismiss.
  </Alert>
)}`;

export default function AlertPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Alert"
        lead="Raised clay panels for feedback messages, each with its own inset icon well. Four tones cover success, danger, warning and info."
        importCode={`import { Alert } from "marclayui";`}
      />

      <Demo title="Variants" code={VARIANTS} layout="column">
        <Alert variant="success" title="Deployment complete">
          Your site is live on the edge network.
        </Alert>
        <Alert variant="danger" title="Build failed">
          TypeScript found 2 errors in ./src/app.tsx.
        </Alert>
        <Alert variant="warning" title="Heads up">
          This will invalidate your cached assets.
        </Alert>
        <Alert variant="info" title="Did you know">
          Alerts can render any React node as children.
        </Alert>
      </Demo>

      <Demo title="Dismissible" code={DISMISS} layout="column">
        <DismissibleAlertDemo />
      </Demo>

      <PropsTable
        rows={[
          { name: "variant", type: '"success" | "danger" | "warning" | "info"', default: '"info"', description: "Icon glyph and accent color." },
          { name: "title", type: "React.ReactNode", description: "Bold lead line." },
          { name: "icon", type: "React.ReactNode", description: "Override the default glyph (✓ ✕ ! i)." },
          { name: "onClose", type: "() => void", description: "When provided, shows a ✕ button." },
          { name: "…rest", type: "HTMLAttributes<HTMLDivElement>", description: "Standard div props; role=alert is set for you." },
        ]}
      />
    </>
  );
}
