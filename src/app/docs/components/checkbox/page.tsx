import type { Metadata } from "next";
import { Checkbox, CheckboxGroup } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Checkbox",
  description: "Custom clay checkbox with indeterminate state and a group with select-all.",
};

const BASIC = `<Checkbox label="Email me release notes" defaultChecked />
<Checkbox label="Include beta builds" />
<Checkbox label="Already picked" disabled checked />
<Checkbox label="Locked out" disabled />`;

const GROUP = `<CheckboxGroup
  selectAll
  defaultValue={["updates", "security"]}
  options={[
    { value: "updates",  label: "Product updates" },
    { value: "security", label: "Security alerts" },
    { value: "digest",   label: "Weekly digest" },
    { value: "events",   label: "Event invites", disabled: true },
  ]}
/>`;

const INDETERMINATE = `const [prefs, setPrefs] = useState(["a", "b"]);
const allOn = prefs.length === 3;

<Checkbox
  label="All notifications"
  indeterminate={!allOn && prefs.length > 0}
  checked={allOn}
  onChange={() => setPrefs(allOn ? [] : ["a", "b", "c"])}
/>`;

export default function CheckboxPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Checkbox"
        lead="An inset well that fills with a primary gradient and a clay tick when checked — plus an indeterminate dash for tree states. The native input stays in the DOM, so keyboard, forms and screen readers all work."
        importCode={`import { Checkbox, CheckboxGroup } from "marclayui";`}
      />

      <Demo title="States" code={BASIC} layout="column">
        <div style={{ display: "grid", gap: 12 }}>
          <Checkbox label="Email me release notes" defaultChecked />
          <Checkbox label="Include beta builds" />
          <Checkbox label="Already picked" disabled checked />
          <Checkbox label="Locked out" disabled />
        </div>
      </Demo>

      <Demo title="Indeterminate" code={INDETERMINATE} layout="column">
        <div style={{ display: "grid", gap: 12 }}>
          <Checkbox label="All notifications" indeterminate defaultChecked={false} />
          <Checkbox label="Partially selected parent" indeterminate />
        </div>
      </Demo>

      <Demo title="Group with select-all" code={GROUP} layout="column">
        <CheckboxGroup
          selectAll
          defaultValue={["updates", "security"]}
          options={[
            { value: "updates", label: "Product updates" },
            { value: "security", label: "Security alerts" },
            { value: "digest", label: "Weekly digest" },
            { value: "events", label: "Event invites", disabled: true },
          ]}
        />
      </Demo>

      <PropsTable
        rows={[
          { name: "label", type: "React.ReactNode", description: "Clickable label rendered next to the box." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Dash state — set on the native input via ref." },
          { name: "…rest", type: "InputHTMLAttributes", description: "All native checkbox attributes (checked, onChange, disabled…)." },
          { name: "CheckboxGroup · options", type: "CheckboxGroupOption[]", description: "{ value, label, disabled? } list." },
          { name: "CheckboxGroup · value / defaultValue", type: "string[]", description: "Controlled or uncontrolled selected values." },
          { name: "CheckboxGroup · selectAll", type: "boolean", default: "false", description: "Parent checkbox that toggles every enabled option, with indeterminate when partial." },
        ]}
      />
    </>
  );
}
