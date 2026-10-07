import type { Metadata } from "next";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Card",
  description: "Raised clay surface with header, body and footer slots.",
};

const BASIC = `<Card>
  <CardHeader>
    <CardTitle>Project files</CardTitle>
    <Badge variant="primary">3 new</Badge>
  </CardHeader>
  <CardBody>
    Everything you drop here sits on a raised clay panel
    with the full double shadow.
  </CardBody>
  <CardFooter>
    <Button size="sm" variant="primary">Open</Button>
    <Button size="sm" variant="ghost">Share</Button>
  </CardFooter>
</Card>`;

const HOVER = `<Card hover>
  <CardBody>
    hover adds a gentle lift — nice for clickable cards.
  </CardBody>
</Card>`;

export default function CardPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Card"
        lead="The workhorse surface: a raised clay panel with optional header and footer rails, separated by hairline shadows instead of borders."
        importCode={`import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "marclayui";`}
      />

      <Demo title="Full anatomy" code={BASIC} layout="column">
        <Card>
          <CardHeader>
            <CardTitle>Project files</CardTitle>
            <Badge variant="primary">3 new</Badge>
          </CardHeader>
          <CardBody>
            Everything you drop here sits on a raised clay panel with the full double shadow. The
            header and footer are optional slots.
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="primary">
              Open
            </Button>
            <Button size="sm" variant="ghost">
              Share
            </Button>
            <Badge variant="success">Synced</Badge>
          </CardFooter>
        </Card>
      </Demo>

      <Demo title="Hoverable" code={HOVER}>
        <Card hover style={{ maxWidth: 340 }}>
          <CardBody>
            <b style={{ color: "var(--mcl-ink)" }}>Hover me.</b> The card lifts a few pixels — good
            affordance for clickable surfaces.
          </CardBody>
        </Card>
      </Demo>

      <PropsTable
        rows={[
          { name: "hover", type: "boolean", default: "false", description: "Lifts the card on hover." },
          { name: "…rest", type: "HTMLAttributes<HTMLDivElement>", description: "Standard div props; use className for layout." },
        ]}
      />
    </>
  );
}
