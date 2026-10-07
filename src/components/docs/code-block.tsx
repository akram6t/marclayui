"use client";

import React, { useEffect, useRef, useState } from "react";

interface PrismLike {
  highlightElement: (el: Element) => void;
  plugins: { autoloader?: { languages_path?: string } };
}

function getPrism(): PrismLike | undefined {
  return (window as unknown as { Prism?: PrismLike }).Prism;
}

let prismPromise: Promise<boolean> | null = null;

const PRISM_BASE = "/prism";

/** Loads the vendored Prism (public/prism) once; resolves false if unavailable
 *  (code stays readable as plain text). No CDN involved. */
function loadPrism(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (getPrism()) return Promise.resolve(true);
  if (prismPromise) return prismPromise;
  prismPromise = new Promise<boolean>((resolve) => {
    let settled = false;
    const done = (ok: boolean) => {
      if (!settled) {
        settled = true;
        resolve(ok);
      }
    };
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${PRISM_BASE}/themes/prism-tomorrow.min.css`;
    document.head.appendChild(css);
    const core = document.createElement("script");
    core.src = `${PRISM_BASE}/prism.min.js`;
    core.onload = () => {
      const al = document.createElement("script");
      al.src = `${PRISM_BASE}/plugins/autoloader/prism-autoloader.min.js`;
      al.onload = () => {
        try {
          const p = getPrism();
          if (p) p.plugins.autoloader = { languages_path: `${PRISM_BASE}/components/` };
        } catch {
          /* autoloader config optional */
        }
        done(!!getPrism());
      };
      al.onerror = () => done(!!getPrism());
      document.head.appendChild(al);
    };
    core.onerror = () => done(false);
    document.head.appendChild(core);
    // never hang the UI if the assets are missing — code stays readable either way
    window.setTimeout(() => done(!!getPrism()), 4000);
  });
  return prismPromise;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPrism().then((ok) => {
      if (!cancelled && ok && codeRef.current) {
        try {
          getPrism()?.highlightElement(codeRef.current);
        } catch {
          /* leave code plain on highlight failure */
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span className="docs-code-lang">{language}</span>
        <button type="button" className="docs-code-copy" onClick={copy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
