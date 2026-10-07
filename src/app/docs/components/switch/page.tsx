import type { Metadata } from "next";
import { Switch } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Switch",
  description: "Clay toggle switch with a raised knob and gradient track, built on role=switch.",
};

const BASIC = `<Switch label="Notifications" defaultChecked />
<Switch label="Quiet hours" />
<Switch label="Managed for you" disabled checked />`;

const STACKED = `<div>
  <Switch label="Auto-save" defaultChecked />
  <Switch label="Sync over cellular" />
</div>`;

export default function SwitchPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Switch"
        lead="A pressed track with a raised knob that glides on a soft easing curve. Exposes role=switch and animates to the primary gradient when on."
        importCode={`import { Switch } from "marclayui";`}
      />

      <Demo title="States" code={BASIC} layout="column">
        <div style={{ display: "grid", gap: 14 }}>
          <Switch label="Notifications" defaultChecked />
          <Switch label="Quiet hours" />
          <Switch label="Managed for you" disabled checked />
        </div>
      </Demo>

      <Demo title="Settings list" code={STACKED} layout="column">
        <div style={{ display: "grid", gap: 14 }}>
          <Switch label="Auto-save" defaultChecked />
          <Switch label="Sync over cellular" />
          <Switch label="Usage analytics" />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { name: "label", type: "React.ReactNode", description: "Clickable label for the switch." },
          { name: "checked / onChange", type: "—", description: "Control it like any native checkbox." },
          { name: "…rest", type: "InputHTMLAttributes", description: "All native attributes are forwarded; role=switch is set for you." },
        ]}
      />
    </>
  );
}
