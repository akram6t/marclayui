import React from "react";

export type ProgressTone = "primary" | "secondary" | "accent" | "danger";

export interface ProgressProps {
  value?: number;
  max?: number;
  /** "indeterminate" animates a sliding chunk. */
  tone?: ProgressTone;
  size?: "sm" | "md" | "lg";
  label?: React.ReactNode;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  tone = "primary",
  size = "md",
  label,
  showValue = false,
  indeterminate = false,
  className = "",
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={`mcl-progress mcl-progress-${size} ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : Math.round(pct)}
    >
      {(label || showValue) && (
        <div className="mcl-progress-head">
          {label && <span>{label}</span>}
          {showValue && <span className="mcl-progress-value">{indeterminate ? "…" : `${Math.round(pct)}%`}</span>}
        </div>
      )}
      <div className="mcl-progress-track">
        <span
          className={`mcl-progress-fill mcl-progress-fill-${tone}${indeterminate ? " mcl-progress-fill-indeterminate" : ""}`}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
