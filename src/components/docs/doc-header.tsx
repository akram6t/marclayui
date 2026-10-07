import React from "react";
import { CodeBlock } from "./code-block";

export interface DocHeaderProps {
  tag: string;
  title: string;
  lead: string;
  importCode?: string;
  importLang?: string;
}

export function DocHeader({ tag, title, lead, importCode, importLang = "tsx" }: DocHeaderProps) {
  return (
    <header className="docs-header">
      <span className="docs-tag">{tag}</span>
      <h1>{title}</h1>
      <p className="docs-lead">{lead}</p>
      {importCode && <CodeBlock code={importCode} language={importLang} />}
    </header>
  );
}
