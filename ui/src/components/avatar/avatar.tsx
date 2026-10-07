import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Used to derive initials when no src is given. */
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  /** Filled clay gradient look. */
  gradient?: boolean;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  status,
  gradient = false,
  className = "",
  children,
  ...rest
}: AvatarProps) {
  const label = alt ?? (name ? `${name}'s avatar` : "avatar");
  return (
    <span
      className={`mcl-avatar mcl-avatar-${size}${gradient ? " mcl-avatar-gradient" : ""} ${className}`.trim()}
      role="img"
      aria-label={label}
      {...rest}
    >
      {src ? (
        <img src={src} alt="" className="mcl-avatar-img" loading="lazy" decoding="async" />
      ) : (
        (children ?? initialsOf(name ?? "??") ?? "")
      )}
      {status && <span className={`mcl-avatar-status mcl-avatar-status-${status}`} aria-hidden="true" />}
    </span>
  );
}

export type AvatarGroupProps = React.HTMLAttributes<HTMLSpanElement>;

export function AvatarGroup({ className = "", children, ...rest }: AvatarGroupProps) {
  return (
    <span className={`mcl-avatar-group ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}
