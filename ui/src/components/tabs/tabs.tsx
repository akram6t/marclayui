"use client";

import React, { useId, useRef, useState } from "react";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active index. */
  value?: number;
  onChange?: (index: number) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className = "" }: TabsProps) {
  const uid = useId();
  const [inner, setInner] = useState(0);
  const active = value ?? inner;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number) => {
    if (items[i]?.disabled) return;
    setInner(i);
    onChange?.(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const focusable = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
    let next = -1;
    if (e.key === "ArrowRight") next = focusable[(focusable.indexOf(active) + 1) % focusable.length];
    if (e.key === "ArrowLeft") next = focusable[(focusable.indexOf(active) - 1 + focusable.length) % focusable.length];
    if (e.key === "Home") next = focusable[0];
    if (e.key === "End") next = focusable[focusable.length - 1];
    if (next >= 0 && next !== active) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  const current = items[active];

  return (
    <div className={`mcl-tabs ${className}`.trim()}>
      <div className="mcl-tablist" role="tablist" aria-label="Tabs" onKeyDown={onKeyDown}>
        {items.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`mcl-tab-${uid}-${it.key}`}
            aria-selected={i === active}
            aria-controls={`mcl-panel-${uid}-${it.key}`}
            tabIndex={i === active ? 0 : -1}
            className={`mcl-tab${i === active ? " mcl-tab-active" : ""}`}
            disabled={it.disabled}
            onClick={() => select(i)}
          >
            {it.label}
          </button>
        ))}
      </div>
      {current && (
        <div
          key={current.key}
          role="tabpanel"
          id={`mcl-panel-${uid}-${current.key}`}
          aria-labelledby={`mcl-tab-${uid}-${current.key}`}
          className="mcl-tabpanel"
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
