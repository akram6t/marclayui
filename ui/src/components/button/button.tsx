import React from "react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "soft" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Renders an anchor with button styling — use with Next `<Link>` styling or plain routes. */
  href?: string;
}

export const Button = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "soft",
      size = "md",
      loading = false,
      block = false,
      className = "",
      disabled,
      children,
      type = "button",
      href,
      ...rest
    },
    ref
  ) {
    const cls = [
      "mcl-btn",
      `mcl-btn-${variant}`,
      `mcl-btn-${size}`,
      block ? "mcl-btn-block" : "",
      loading ? "mcl-btn-loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          aria-disabled={disabled || undefined}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {loading && <span className="mcl-btn-spinner" aria-hidden="true" />}
          <span className="mcl-btn-label">{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={cls}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <span className="mcl-btn-spinner" aria-hidden="true" />}
        <span className="mcl-btn-label">{children}</span>
      </button>
    );
  }
);

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Segmented control: renders children Buttons as flat segments inside an
 *  inset clay well — the active variant keeps its gradient. */
export function ButtonGroup({ children, className = "", ...rest }: ButtonGroupProps) {
  return (
    <div className={`mcl-btn-group ${className}`.trim()} role="group" {...rest}>
      {children}
    </div>
  );
}
