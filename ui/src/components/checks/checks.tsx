"use client";

import React, { useEffect, useRef, useState } from "react";

function withLabel(input: React.ReactNode, label: React.ReactNode | undefined) {
  if (label === undefined || label === null) return input;
  return (
    <label className="mcl-check">
      {input}
      <span className="mcl-check-label">{label}</span>
    </label>
  );
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** Shows a dash instead of a tick — the classic "some children selected" state. */
  indeterminate?: boolean;
}

export function Checkbox({ label, indeterminate = false, className = "", ...rest }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return withLabel(
    <>
      <input ref={inputRef} type="checkbox" className={`mcl-check-input ${className}`.trim()} {...rest} />
      <span className="mcl-check-box" aria-hidden="true" />
    </>,
    label
  );
}

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  /** Controlled selected values. */
  value?: string[];
  /** Uncontrolled initial selection. */
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  /** Renders a parent "select all" checkbox with an indeterminate state. */
  selectAll?: boolean;
  selectAllLabel?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onChange,
  selectAll = false,
  selectAllLabel = "Select all",
  label,
  disabled = false,
  className = "",
}: CheckboxGroupProps) {
  const [inner, setInner] = useState<string[]>(defaultValue);
  const allRef = useRef<HTMLInputElement>(null);
  const selected = value ?? inner;

  const enabled = options.filter((o) => !o.disabled).map((o) => o.value);
  const allOn = enabled.length > 0 && enabled.every((v) => selected.includes(v));
  const someOn = enabled.some((v) => selected.includes(v));

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someOn && !allOn;
  }, [someOn, allOn]);

  const commit = (next: string[]) => {
    setInner(next);
    onChange?.(next);
  };

  const toggle = (v: string) => {
    commit(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  };

  const toggleAll = () => {
    commit(allOn ? selected.filter((v) => !enabled.includes(v)) : Array.from(new Set([...selected, ...enabled])));
  };

  return (
    <div
      className={`mcl-check-group ${className}`.trim()}
      role="group"
      aria-label={typeof label === "string" ? label : undefined}
    >
      {label && <span className="mcl-label">{label}</span>}
      {selectAll && (
        <label className={`mcl-check mcl-check-group-all${disabled ? " mcl-check-disabled" : ""}`}>
          <input
            ref={allRef}
            type="checkbox"
            className="mcl-check-input"
            checked={allOn}
            disabled={disabled}
            onChange={toggleAll}
          />
          <span className="mcl-check-box" aria-hidden="true" />
          <span className="mcl-check-label">{selectAllLabel}</span>
        </label>
      )}
      <div className="mcl-check-group-items">
        {options.map((o) => (
          <label key={o.value} className={`mcl-check${o.disabled || disabled ? " mcl-check-disabled" : ""}`}>
            <input
              type="checkbox"
              className="mcl-check-input"
              checked={selected.includes(o.value)}
              disabled={o.disabled || disabled}
              onChange={() => toggle(o.value)}
            />
            <span className="mcl-check-box" aria-hidden="true" />
            <span className="mcl-check-label">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export function Radio({ label, className = "", ...rest }: RadioProps) {
  return withLabel(
    <>
      <input type="radio" className={`mcl-check-input ${className}`.trim()} {...rest} />
      <span className="mcl-check-box mcl-radio-box" aria-hidden="true" />
    </>,
    label
  );
}

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export function Switch({ label, className = "", ...rest }: SwitchProps) {
  return withLabel(
    <>
      <input
        type="checkbox"
        role="switch"
        className={`mcl-switch-input ${className}`.trim()}
        {...rest}
      />
      <span className="mcl-switch-track" aria-hidden="true">
        <span className="mcl-switch-knob" />
      </span>
    </>,
    label
  );
}
