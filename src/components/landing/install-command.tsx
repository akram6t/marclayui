"use client";

import React, { useState } from "react";

const CMD = "npm install marclayui";

/** Hero install pill with copy — the fastest way to start. */
export function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CMD);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="home-install-pill">
      <span className="home-install-prompt" aria-hidden="true">
        $
      </span>
      <code>{CMD}</code>
      <button type="button" onClick={copy} aria-label="Copy install command">
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
