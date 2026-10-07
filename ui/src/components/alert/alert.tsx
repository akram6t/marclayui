import React from "react";

export type AlertVariant = "success" | "danger" | "warning" | "info";

const DEFAULT_ICONS: Record<AlertVariant, string> = {
  success: "✓",
  danger: "✕",
  warning: "!",
  info: "i",
};

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  /** Overrides the variant's default glyph. */
  icon?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  variant = "info",
  title,
  icon,
  onClose,
  className = "",
  children,
  ...rest
}: AlertProps) {
  return (
    <div className={`mcl-alert mcl-alert-${variant} ${className}`.trim()} role="alert" {...rest}>
      <span className="mcl-alert-icon" aria-hidden="true">
        {icon ?? DEFAULT_ICONS[variant]}
      </span>
      <div className="mcl-alert-content">
        {title && <p className="mcl-alert-title">{title}</p>}
        {children}
      </div>
      {onClose && (
        <button type="button" className="mcl-alert-close" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
}
