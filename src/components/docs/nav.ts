export interface NavGroup {
  title: string;
  links: Array<{ href: string; label: string; desc?: string }>;
}

const COMPONENTS: Array<[string, string]> = [
  ["accordion", "Expandable clay panels with animated height"],
  ["alert", "Feedback panels in four tones"],
  ["avatar", "Squircle avatars with status dots"],
  ["badge", "Status pills, soft and solid"],
  ["button", "Six clay variants, sizes, loading, href"],
  ["card", "Raised surface with header, body and footer"],
  ["checkbox", "Tick boxes with an indeterminate state"],
  ["divider", "Inset hairlines, plain or labeled"],
  ["dropdown", "Custom popup menu — never the native list"],
  ["input", "Inset text field with label and error"],
  ["kbd", "Keyboard key caps"],
  ["modal", "Portaled dialog with a focus trap"],
  ["navbar", "Sticky clay pill navbar"],
  ["progress", "Animated clay progress wells"],
  ["radio", "Round selects grouped by name"],
  ["range", "Styled native slider"],
  ["skeleton", "Shimmering placeholders"],
  ["spinner", "Circular clay loader"],
  ["stack", "Flex layout helpers with named gaps"],
  ["stat", "Inset number wells for dashboards"],
  ["switch", "Toggle with a gliding knob"],
  ["tabs", "Pill tabs with arrow-key navigation"],
  ["textarea", "Multi-line clay input"],
  ["toast", "Provider-based notifications"],
  ["tooltip", "CSS tooltips in four placements"],
];

export const DOCS_NAV: NavGroup[] = [
  {
    title: "Guide",
    links: [
      { href: "/docs", label: "Getting started", desc: "Install, provider setup, first component" },
      { href: "/docs/theming", label: "Theming", desc: "Presets, modes, tokens, runtime colors" },
    ],
  },
  {
    title: "Components",
    links: COMPONENTS.map(([slug, desc]) => ({
      href: `/docs/components/${slug}`,
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      desc,
    })),
  },
];
