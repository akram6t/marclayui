"use client";

import React, { useState } from "react";
import { CodeBlock } from "./code-block";

export interface DemoProps {
  title: string;
  code: string;
  /** Default layout: flex-wrap row centered. Set column for stacked demos. */
  layout?: "row" | "column";
  children: React.ReactNode;
}

export function Demo({ title, code, layout = "row", children }: DemoProps) {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className="docs-demo">
      <div className="docs-demo-head">
        <h3>{title}</h3>
        <button
          type="button"
          className="docs-demo-toggle"
          aria-pressed={showCode}
          onClick={() => setShowCode((s) => !s)}
        >
          {showCode ? "Preview" : "Code"}
        </button>
      </div>
      <div className={`docs-demo-stage docs-demo-${layout}`}>
        {showCode ? <CodeBlock code={code} /> : children}
      </div>
    </section>
  );
}
