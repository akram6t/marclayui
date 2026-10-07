import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Solid = filled clay gradient; soft (default) = inset well with colored text. */
  solid?: boolean;
}

export function Badge({ variant = "neutral", solid = false, className = "", ...rest }: BadgeProps) {
  return (
    <span
      className={`mcl-badge mcl-badge-${variant}${solid ? " mcl-badge-solid" : ""} ${className}`.trim()}
      {...rest}
    />
  );
}
