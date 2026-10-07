"use client";

import React, { useState } from "react";
import { Alert, Button, Modal, Stack, useToast, type ToastVariant } from "marclayui";

export function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="primary"
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 2000);
      }}
    >
      {loading ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function DismissibleAlertDemo() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <Button size="sm" variant="soft" onClick={() => setOpen(true)}>
        Bring the alert back
      </Button>
    );
  }
  return (
    <Alert variant="warning" title="Heads up" onClose={() => setOpen(false)}>
      Click the ✕ to dismiss — the state is yours to manage.
    </Alert>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete project?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This action can&apos;t be undone. The project and all of its deployments will be removed
        permanently.
      </Modal>
    </>
  );
}

export function ToastDemo() {
  const { toast } = useToast();
  const fire =
    (variant: ToastVariant, title: string, message: string) => () =>
      toast({ variant, title, message });
  return (
    <Stack direction="row" gap="sm" wrap>
      <Button variant="secondary" onClick={fire("info", "Did you know", "Toasts stack, up to four at a time.")}>
        Info toast
      </Button>
      <Button variant="primary" onClick={fire("success", "Saved", "Your changes are live.")}>
        Success toast
      </Button>
      <Button variant="danger" onClick={fire("danger", "Connection lost", "Retrying in 5 seconds…")}>
        Danger toast
      </Button>
      <Button variant="accent" onClick={fire("warning", "Storage almost full", "82% of your quota is used.")}>
        Warning toast
      </Button>
    </Stack>
  );
}
