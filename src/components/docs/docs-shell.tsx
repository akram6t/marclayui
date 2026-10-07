"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kbd, ThemeMenu } from "marclayui";
import { DOCS_NAV } from "./nav";
import { GitHubMark } from "@/components/github-mark";
import { SearchDialog } from "./search-dialog";

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <>
      {DOCS_NAV.map((group) => (
        <div className="docs-side-group" key={group.title}>
          <p className="docs-side-title">{group.title}</p>
          <nav className="docs-side-links">
            {group.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`docs-side-link${pathname === l.href ? " on" : ""}`}
                onClick={onNavigate}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // global shortcuts: ⌘K / Ctrl+K toggles search, "/" opens it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // mobile drawer: Escape closes, page scroll locks while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <button
          type="button"
          className="docs-menu-btn"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
        <Link href="/" className="docs-brand">
          marclay<b>ui</b>
          <span className="docs-version">v0.4.0</span>
        </Link>
        <button type="button" className="docs-search-btn" title="Search (⌘K / Ctrl K)" onClick={() => setSearchOpen(true)}>
          <span aria-hidden="true">🔎</span>
          <span className="docs-search-btn-label">Search</span>
          <Kbd>⌘K</Kbd>
        </button>
        <div className="docs-topbar-right">
          <ThemeMenu />
          <a
            className="docs-github"
            href="https://github.com/akram6t"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubMark />
            <span>GitHub</span>
          </a>
        </div>
      </header>
      <div className="docs-body">
        <aside className={`docs-sidebar${open ? " docs-sidebar-open" : ""}`}>
          <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} />
        </aside>
        {open && <div className="docs-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
        <main className="docs-main">
          <div className="docs-content">{children}</div>
        </main>
      </div>
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
