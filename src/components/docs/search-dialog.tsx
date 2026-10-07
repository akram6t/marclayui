"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Kbd } from "marclayui";
import { DOCS_NAV } from "./nav";

interface SearchResult {
  href: string;
  label: string;
  desc?: string;
  group: string;
}

function useSearchResults(query: string): SearchResult[] {
  return useMemo(() => {
    const all: SearchResult[] = DOCS_NAV.flatMap((g) =>
      g.links.map((l) => ({ href: l.href, label: l.label, desc: l.desc, group: g.title }))
    );
    const q = query.trim().toLowerCase();
    if (!q) return all.slice(0, 9);
    return all
      .map((l) => {
        const label = l.label.toLowerCase();
        const desc = (l.desc ?? "").toLowerCase();
        let score = -1;
        if (label.startsWith(q)) score = 100;
        else if (label.includes(q)) score = 60;
        else if (desc.includes(q)) score = 30;
        return { ...l, score };
      })
      .filter((l) => l.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9);
  }, [query]);
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = useSearchResults(query);

  // fresh mount on every open (the parent renders us conditionally) —
  // focus the input once the dialog has settled
  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, []);

  // keep the highlighted result visible
  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) go(r.href);
    }
  };

  return (
    <div
      className="docs-search-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="docs-search" role="dialog" aria-label="Search documentation" onKeyDown={onKeyDown}>
        <div className="docs-search-bar">
          <span aria-hidden="true">🔎</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search components and guides…"
            aria-label="Search documentation"
            autoComplete="off"
            spellCheck={false}
          />
          <Kbd>Esc</Kbd>
        </div>
        <div className="docs-search-results mcl-scroll" ref={listRef}>
          {results.map((r, i) => (
            <button
              key={r.href}
              type="button"
              className={`docs-search-result${i === active ? " docs-search-result-on" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.href)}
            >
              <span className="docs-search-label">{r.label}</span>
              <span className="docs-search-group">{r.group}</span>
              {r.desc && <span className="docs-search-desc">{r.desc}</span>}
            </button>
          ))}
          {results.length === 0 && <div className="docs-search-empty">No matches for “{query}”.</div>}
        </div>
        <div className="docs-search-foot">
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
          </span>
          <span>
            <Kbd>↵</Kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}
