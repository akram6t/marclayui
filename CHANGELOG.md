# Changelog

All notable changes to MarclayUI are documented here.

## 0.4.0 — unreleased

### Fixed
- Range `showValue` now works with uncontrolled `defaultValue`.
- Modal restores focus to the trigger on close and traps Tab inside the dialog.
- Dropdown and ThemeMenu flip above the trigger / clamp horizontally instead of
  overflowing the viewport; outside-click close returns focus to the trigger;
  the selected option scrolls into view on open.
- Toast auto-dismiss timers are cleared on manual dismiss and provider unmount.
- Badge solid shadows moved from inline styles to CSS classes (overridable).
- Accordion re-measures panel heights when opening (no stale clipping).
- Warning badge/alert now use their own `--mcl-warning` tokens instead of
  borrowing accent (accent flips to violet in the neo dark preset).

### Added
- `Button` accepts `href` and renders a styled anchor; new `ButtonGroup`
  segmented control; new `Kbd` key-cap component.
- Vitest + Testing Library test suite (23 tests) with `npm test`.
- `npm run check:props` drift guard between docs props tables and type defs.
- vendored Prism assets (`public/prism`) — no CDN dependency for code
  highlighting.
- docs search palette (⌘K / Ctrl+K), OG image via `next/og`, metadataBase.
- CI workflow (`.github/workflows/ci.yml`), `predev`/`prebuild` hooks,
  `prepublishOnly` guard.

## 0.3.0 — 2026-10-07

- `Dropdown` custom popup menu (single + multiple with checkboxes, keyboard nav).
- `Checkbox` `indeterminate` prop and `CheckboxGroup` with select-all.
- Themed scrollbars: `.mcl-root` page scrollbar, `.mcl-scroll` utility.

## 0.2.0 — 2026-10-07

- Style presets: `preset="clay" | "neo"` swaps the light+dark palette pair,
  radii and fonts; `data-preset` attribute; persisted; no-flash init script.
- Landing live theming lab with auto-cycling primary color.
- Navbar GitHub buttons, hero install pill, expanded theming playground.

## 0.1.0 — 2026-10-06

- Initial release: 24 claymorphism components, `MarclayProvider` with
  light/dark/system modes and runtime `setColors`, docs site.
