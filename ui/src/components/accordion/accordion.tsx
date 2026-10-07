"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export interface AccordionEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionEntry[];
  /** Index opened initially. */
  defaultOpen?: number;
  /** When false, several panels can stay open at once. */
  exclusive?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpen = -1, exclusive = true, className = "" }: AccordionProps) {
  const uid = useId();
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const measure = () => {
    setHeights(items.map((_, i) => panelRefs.current[i]?.scrollHeight ?? 0));
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, openSet]);

  const toggle = (i: number) => {
    // measure before opening so the panel animates to its true height
    if (!openSet.has(i)) {
      const h = panelRefs.current[i]?.scrollHeight ?? 0;
      setHeights((prev) => (prev[i] === h ? prev : prev.map((x, j) => (j === i ? h : x))));
    }
    setOpenSet((prev) => {
      const next = new Set(exclusive ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className={`mcl-accordion ${className}`.trim()}>
      {items.map((item, i) => {
        const open = openSet.has(i);
        return (
          <div key={i} className={`mcl-accordion-item${open ? " mcl-accordion-item-open" : ""}`}>
            <button
              type="button"
              className="mcl-accordion-header"
              aria-expanded={open}
              aria-controls={`mcl-acc-${uid}-${i}`}
              onClick={() => toggle(i)}
            >
              <span>{item.title}</span>
              <span className="mcl-accordion-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <div
              id={`mcl-acc-${uid}-${i}`}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="mcl-accordion-panel"
              style={{ maxHeight: open ? heights[i] || 999 : 0 }}
              role="region"
            >
              <div className="mcl-accordion-panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
