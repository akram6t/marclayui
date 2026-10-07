import React from "react";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/** Small keyboard key cap — inset clay well with a pressed bottom edge. */
export function Kbd({ children, className = "", ...rest }: KbdProps) {
  return (
    <kbd className={`mcl-kbd ${className}`.trim()} {...rest}>
      {children}
    </kbd>
  );
}
