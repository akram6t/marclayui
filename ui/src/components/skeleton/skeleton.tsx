import React from "react";

export interface SkeletonProps {
  variant?: "text" | "circle" | "rect";
  width?: number | string;
  height?: number | string;
  /** Render several text lines; the last one is shorter, like real copy. */
  count?: number;
  className?: string;
}

export function Skeleton({ variant = "text", width, height, count = 1, className = "" }: SkeletonProps) {
  const lines = variant === "text" ? Math.max(1, count) : 1;
  const style = (last: boolean): React.CSSProperties => ({
    width: width ?? (variant === "circle" ? 48 : "100%"),
    height: height ?? (variant === "text" ? 14 : variant === "circle" ? 48 : 96),
    ...(variant === "text" && count > 1 && last ? { width: "62%" } : null),
  });
  if (lines === 1) {
    return (
      <span
        className={`mcl-skeleton mcl-skeleton-${variant} ${className}`.trim()}
        style={style(true)}
        aria-hidden="true"
      />
    );
  }
  return (
    <span className={`mcl-skeleton-lines ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="mcl-skeleton mcl-skeleton-text" style={style(i === lines - 1)} />
      ))}
    </span>
  );
}
