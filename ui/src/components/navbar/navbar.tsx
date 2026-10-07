"use client";

import React, { useState } from "react";

export interface NavLinkItem {
  href: string;
  label: React.ReactNode;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  links?: NavLinkItem[];
  /** Href to highlight as active (matches a link's href). */
  activeHref?: string;
  /** Right-side slot: theme toggle, actions, etc. */
  right?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

/** Clay pill navbar — framework-agnostic (plain <a> links, works everywhere). */
export function Navbar({ brand, links = [], activeHref, right, sticky = true, className = "" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`mcl-navbar${sticky ? " mcl-navbar-sticky" : ""} ${className}`.trim()}>
      <div className="mcl-navbar-inner">
        {brand && (
          <a className="mcl-navbar-brand" href="/">
            {brand}
          </a>
        )}
        {links.length > 0 && (
          <button
            type="button"
            className="mcl-navbar-toggle"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="mcl-navbar-burger" aria-hidden="true" />
          </button>
        )}
        {links.length > 0 && (
          <ul className={`mcl-navbar-links${open ? " mcl-navbar-open" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`mcl-navbar-link${activeHref === l.href ? " mcl-navbar-link-active" : ""}`}
                  onClick={() => setOpen(false)}
                  aria-current={activeHref === l.href ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        {right && <div className="mcl-navbar-right">{right}</div>}
      </div>
    </nav>
  );
}
