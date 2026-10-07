import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
  /** Renders an inset line — text — inset line. */
  label?: React.ReactNode;
}

export function Divider({ orientation = "horizontal", label, className = "", ...rest }: DividerProps) {
  if (label !== undefined && label !== null) {
    return (
      <div className={`mcl-divider-label ${className}`.trim()} role="separator" {...rest}>
        <span className="mcl-divider-label-text">{label}</span>
      </div>
    );
  }
  return (
    <div
      className={`mcl-divider mcl-divider-${orientation} ${className}`.trim()}
      role="separator"
      {...rest}
    />
  );
}
