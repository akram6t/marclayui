import React from "react";

export type StatTone = "primary" | "secondary" | "accent" | "danger" | "info";

export interface StatProps {
  value: React.ReactNode;
  label?: React.ReactNode;
  tone?: StatTone;
  className?: string;
}

export function Stat({ value, label, tone = "primary", className = "" }: StatProps) {
  return (
    <div className={`mcl-stat mcl-stat-${tone} ${className}`.trim()}>
      <b className="mcl-stat-value">{value}</b>
      {label && <span className="mcl-stat-label">{label}</span>}
    </div>
  );
}
