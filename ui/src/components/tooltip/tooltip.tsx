import React from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  label: string;
  placement?: TooltipPlacement;
  className?: string;
  children: React.ReactNode;
}

/** CSS-only tooltip: shows on hover and when the wrapped control has keyboard focus. */
export function Tooltip({ label, placement = "top", className = "", children }: TooltipProps) {
  return (
    <span className={`mcl-tooltip mcl-tooltip-${placement} ${className}`.trim()} data-mcl-tooltip={label}>
      {children}
    </span>
  );
}
