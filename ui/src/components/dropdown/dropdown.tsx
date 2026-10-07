"use client";

import React, { useEffect, useRef, useState } from "react";

export interface DropdownItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  /** Controlled selected value (single) or values (multiple). */
  value?: string | string[];
  /** Uncontrolled initial selection. */
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  /** Allow several selections — the menu shows checkboxes. */
  multiple?: boolean;
  placeholder?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** Stretch trigger and menu to full width. */
  block?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Custom dropdown menu — renders its own popup listbox (no native browser
 *  option menu), with full keyboard support: open with Enter/Space/ArrowDown,
 *  navigate with the arrows, select with Enter/Space, close with Escape. */
export function Dropdown({
  items,
  value,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = "Select…",
  label,
  hint,
  size = "md",
  block = false,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState<string | string[] | undefined>(defaultValue);
  const [active, setActive] = useState(0);
  const [flip, setFlip] = useState<{ up: boolean; left: boolean }>({ up: false, left: false });
  const shellRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const current = value ?? inner;
  const selectedValues: string[] = multiple
    ? Array.isArray(current)
      ? current
      : []
    : [];
  const singleValue = !multiple && !Array.isArray(current) ? current : undefined;

  const labelFor = (v: string) => items.find((i) => i.value === v)?.label;

  let triggerText: React.ReactNode = placeholder;
  if (multiple) {
    if (selectedValues.length > 0) {
      const labels = items.filter((i) => selectedValues.includes(i.value)).map((i) => i.label);
      triggerText = labels.length <= 2 ? labels.join(", ") : `${labels.length} selected`;
    }
  } else if (singleValue !== undefined) {
    triggerText = labelFor(singleValue) ?? singleValue;
  }
  const hasSelection = multiple
    ? selectedValues.length > 0
    : singleValue !== undefined && singleValue !== "";

  // close on outside click (returns focus to the trigger)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // focus the menu when it opens, park the highlight on the selection
  useEffect(() => {
    if (!open) return;
    const firstSelected = multiple
      ? items.findIndex((i) => selectedValues.includes(i.value))
      : items.findIndex((i) => i.value === singleValue);
    const firstEnabled = items.findIndex((i) => !i.disabled);
    const idx = firstSelected >= 0 ? firstSelected : Math.max(firstEnabled, 0);
    setActive(idx);
    menuRef.current?.focus();
    // scroll the highlighted option into view once the menu has laid out
    const t = window.setTimeout(() => {
      const el = menuRef.current?.children[idx] as HTMLElement | undefined;
      if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
    }, 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // flip up / clamp horizontally when the menu would leave the viewport
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const trig = triggerRef.current;
      const menu = menuRef.current;
      if (!trig || !menu) return;
      const r = trig.getBoundingClientRect();
      const m = menu.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      const above = r.top;
      setFlip({
        up: below < m.height + 12 && above > below,
        left: r.left + Math.max(m.width, r.width) > window.innerWidth - 12,
      });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const commit = (v: string) => {
    if (multiple) {
      const next = selectedValues.includes(v)
        ? selectedValues.filter((x) => x !== v)
        : [...selectedValues, v];
      setInner(next);
      onChange?.(next);
    } else {
      setInner(v);
      onChange?.(v);
      close();
    }
  };

  const move = (dir: 1 | -1) => {
    const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
    if (enabled.length === 0) return;
    const pos = enabled.indexOf(active);
    const next = enabled[(pos + dir + enabled.length) % enabled.length];
    setActive(next);
    const el = menuRef.current?.children[next] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      const first = items.findIndex((i) => !i.disabled);
      if (first >= 0) setActive(first);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = items.map((i, idx) => (i.disabled ? -1 : idx)).filter((i) => i >= 0).pop();
      if (last !== undefined) setActive(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const it = items[active];
      if (it && !it.disabled) commit(it.value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (!open && e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div className={`mcl-field${block ? " mcl-field-block" : ""} ${className}`.trim()}>
      {label && <span className="mcl-label">{label}</span>}
      <div
        ref={shellRef}
        className={`mcl-dropdown-shell${block ? " mcl-dropdown-block" : ""}`}
      >
        <button
          ref={triggerRef}
          type="button"
          className={`mcl-dropdown-trigger mcl-dropdown-${size}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKeyDown}
        >
          <span className={`mcl-dropdown-value${hasSelection ? "" : " mcl-dropdown-placeholder"}`}>
            {triggerText}
          </span>
          <span className="mcl-dropdown-chevron" aria-hidden="true" />
        </button>
        {open && (
          <div
            ref={menuRef}
            tabIndex={-1}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className={[
              "mcl-dropdown-menu",
              "mcl-scroll",
              `mcl-dropdown-${size}`,
              flip.up ? "mcl-dropdown-menu-up" : "",
              flip.left ? "mcl-dropdown-menu-left" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onKeyDown={onMenuKeyDown}
          >
            {items.map((it, i) => {
              const selected = multiple ? selectedValues.includes(it.value) : singleValue === it.value;
              return (
                <div
                  key={it.value}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={it.disabled || undefined}
                  className={[
                    "mcl-dropdown-item",
                    i === active ? "mcl-dropdown-item-active" : "",
                    selected ? "mcl-dropdown-item-selected" : "",
                    it.disabled ? "mcl-dropdown-item-disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    if (!it.disabled) commit(it.value);
                  }}
                >
                  {multiple && <span className="mcl-dropdown-check" aria-hidden="true" />}
                  <span className="mcl-dropdown-item-label">{it.label}</span>
                  {!multiple && selected && (
                    <span className="mcl-dropdown-tick" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {hint && <div className="mcl-hint">{hint}</div>}
    </div>
  );
}
