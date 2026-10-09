"use client";

import React, { useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Progress,
  Radio,
  Dropdown,
  Skeleton,
  Spinner,
  Switch,
  Tooltip,
  useToast,
} from "marclayui";

function ButtonsCard() {
  const [loading, setLoading] = useState(false);
  return (
    <Card className="home-show-card">
      <h3>Buttons</h3>
      <p className="home-show-desc">Six variants, three sizes, loading and disabled states.</p>
      <div className="home-lab-row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="home-lab-row" style={{ marginTop: 14 }}>
        <Button size="sm" variant="primary">
          Small
        </Button>
        <Button
          variant="primary"
          loading={loading}
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => setLoading(false), 1800);
          }}
        >
          {loading ? "Uploading…" : "Click me"}
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </Card>
  );
}

function FormsCard() {
  return (
    <Card className="home-show-card">
      <h3>Forms</h3>
      <p className="home-show-desc">Inset clay wells with labels, hints and validation states.</p>
      <div style={{ display: "grid", gap: 16 }}>
        <Input label="Full name" placeholder="Jane Developer" hint="We never share it." />
        <Dropdown
          label="Role"
          placeholder="Choose one…"
          items={[
            { value: "dev", label: "Developer" },
            { value: "des", label: "Designer" },
            { value: "pm", label: "Product manager" },
          ]}
        />
      </div>
    </Card>
  );
}

function SelectionCard() {
  const [on, setOn] = useState(true);
  return (
    <Card className="home-show-card">
      <h3>Selection controls</h3>
      <p className="home-show-desc">Checkbox, radio and switch — native inputs under the hood.</p>
      <div style={{ display: "grid", gap: 14 }}>
        <Checkbox label="Email me release notes" defaultChecked />
        <div className="home-lab-row">
          <Radio name="plan-card" label="Hobby" defaultChecked />
          <Radio name="plan-card" label="Pro" />
        </div>
        <Switch label="Dark mode auto-follows system" checked={on} onChange={(e) => setOn(e.target.checked)} />
      </div>
    </Card>
  );
}

function FeedbackCard() {
  const [open, setOpen] = useState(true);
  return (
    <Card className="home-show-card">
      <h3>Feedback</h3>
      <p className="home-show-desc">Alerts, badges, avatars and spinners in every tone.</p>
      <div style={{ display: "grid", gap: 16 }}>
        {open && (
          <Alert
            variant="success"
            title="Deployment complete"
            onClose={() => setOpen(false)}
          >
            Your site is live on the edge network.
          </Alert>
        )}
        <div className="home-lab-row">
          <Avatar name="Akram Khan" gradient status="online" />
          <Avatar name="Sara Iqbal" />
          <AvatarGroup>
            <Avatar name="Ravi Menon" size="sm" />
            <Avatar name="Nina Park" size="sm" gradient />
            <Avatar name="Omar Ali" size="sm" />
          </AvatarGroup>
          <Spinner size="sm" />
          <Badge solid variant="secondary">
            v0.1.0
          </Badge>
        </div>
      </div>
    </Card>
  );
}

function OverlaysCard() {
  const [modal, setModal] = useState(false);
  const { toast } = useToast();
  return (
    <Card className="home-show-card">
      <h3>Overlays</h3>
      <p className="home-show-desc">Modals, toasts and tooltips with focus handling built in.</p>
      <div className="home-lab-row">
        <Button variant="primary" onClick={() => setModal(true)}>
          Open modal
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast({ variant: "success", title: "Saved", message: "Your changes are live." })}
        >
          Show toast
        </Button>
        <Tooltip label="Clay-soft tooltips">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
      </div>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Delete project?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setModal(false)}>
              Delete
            </Button>
          </>
        }
      >
        This action can&apos;t be undone. The project and all of its deployments will be removed
        permanently.
      </Modal>
    </Card>
  );
}

function DataCard() {
  return (
    <Card className="home-show-card">
      <h3>Data display</h3>
      <p className="home-show-desc">Progress wells, stats and shimmering skeletons.</p>
      <div style={{ display: "grid", gap: 16 }}>
        <Progress value={72} label="Uploading" showValue />
        <div className="home-lab-row">
          <div>
            <Skeleton variant="text" count={2} width={220} />
            <div className="home-lab-row" style={{ marginTop: 10 }}>
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" width={120} height={40} />
            </div>
          </div>
          <Accordion
            items={[
              {
                title: "What is claymorphism?",
                content: "Soft extruded shapes with two opposing shadows and a colored inner glow.",
              },
              {
                title: "Is it responsive?",
                content: "Every component adapts from mobile to desktop without extra classes.",
              },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}

export function ShowcaseGrid() {
  return (
    <div className="home-show-grid">
      <ButtonsCard />
      <FormsCard />
      <SelectionCard />
      <FeedbackCard />
      <OverlaysCard />
      <DataCard />
    </div>
  );
}
