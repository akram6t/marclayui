import type { Metadata } from "next";
import { Demo, DocHeader, PropsTable } from "@/components/docs";
import { ToastDemo } from "@/components/demos/interactive";

export const metadata: Metadata = {
  title: "Toast",
  description: "Provider-based toast notifications with auto-dismiss and stacking.",
};

const SETUP = `// once, around your app:
import { ToastProvider } from "marclayui";

<ToastProvider placement="bottom-right">
  <App />
</ToastProvider>`;

const USAGE = `import { useToast } from "marclayui";

const { toast } = useToast();

toast({
  variant: "success",
  title: "Saved",
  message: "Your changes are live.",
});

// duration: 0 keeps it until dismissed manually
toast({ variant: "info", title: "Heads up", duration: 0 });`;

export default function ToastPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Toast"
        lead="Notifications from anywhere via useToast. They stack (max four), slide in softly, auto-dismiss after ~4s and live in an aria-live region."
        importCode={`import { ToastProvider, useToast } from "marclayui";`}
      />

      <Demo title="Setup" code={SETUP} layout="column">
        <p style={{ margin: 0, color: "var(--mcl-muted)", fontWeight: 500 }}>
          Wrap your app once — the toasts render in a fixed stack and this page already has the
          provider mounted, so try the buttons below.
        </p>
      </Demo>

      <Demo title="Variants" code={USAGE} layout="column">
        <ToastDemo />
      </Demo>

      <PropsTable
        rows={[
          { name: "placement", type: '"top-right" | "top-center" | "bottom-right" | "bottom-left"', default: '"bottom-right"', description: "Where the stack renders (fixed)." },
          { name: "toast(options)", type: "(o: ToastOptions) => void", description: "Push a toast; options are variant, title, message, duration." },
          { name: "duration", type: "number", default: "4200", description: "Auto-dismiss delay in ms; 0 sticks until closed." },
        ]}
      />
    </>
  );
}
