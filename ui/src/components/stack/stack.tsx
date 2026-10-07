import React from "react";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: StackGap;
  wrap?: boolean;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
}

export function Stack({
  direction = "column",
  gap = "md",
  wrap = false,
  align,
  justify,
  className = "",
  ...rest
}: StackProps) {
  const cls = [
    "mcl-stack",
    direction === "row" ? "mcl-stack-row" : "",
    `mcl-stack-gap-${gap}`,
    wrap ? "mcl-stack-wrap" : "",
    align ? `mcl-stack-align-${align}` : "",
    justify ? `mcl-stack-justify-${justify}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cls} {...rest} />;
}
