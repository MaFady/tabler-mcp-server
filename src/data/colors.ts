/**
 * Official Tabler color palette, extracted from @tabler/core 1.4.0 tabler.min.css
 * (:root CSS custom properties).
 */

export interface TablerColor {
  name: string;
  hex: string;
  cssVar: string;
  classes: string[];
}

const c = (name: string, hex: string): TablerColor => ({
  name,
  hex,
  cssVar: `--tblr-${name}`,
  classes: [`bg-${name}`, `bg-${name}-lt`, `text-${name}`, `text-${name}-fg`, `border-${name}`],
});

/** Base named palette. */
export const palette: TablerColor[] = [
  c("blue", "#066fd1"),
  c("azure", "#4299e1"),
  c("indigo", "#4263eb"),
  c("purple", "#ae3ec9"),
  c("pink", "#d6336c"),
  c("red", "#d63939"),
  c("orange", "#f76707"),
  c("yellow", "#f59f00"),
  c("lime", "#74b816"),
  c("green", "#2fb344"),
  c("teal", "#0ca678"),
  c("cyan", "#17a2b8"),
];

/** Semantic theme colors. */
export const themeColors: TablerColor[] = [
  { name: "primary", hex: "#066fd1", cssVar: "--tblr-primary", classes: ["bg-primary", "text-primary", "btn-primary"] },
  { name: "secondary", hex: "#6b7280", cssVar: "--tblr-secondary", classes: ["bg-secondary", "text-secondary", "btn-secondary"] },
  { name: "success", hex: "#2fb344", cssVar: "--tblr-success", classes: ["bg-success", "text-success", "btn-success"] },
  { name: "info", hex: "#4299e1", cssVar: "--tblr-info", classes: ["bg-info", "text-info", "btn-info"] },
  { name: "warning", hex: "#f59f00", cssVar: "--tblr-warning", classes: ["bg-warning", "text-warning", "btn-warning"] },
  { name: "danger", hex: "#d63939", cssVar: "--tblr-danger", classes: ["bg-danger", "text-danger", "btn-danger"] },
  { name: "light", hex: "#f9fafb", cssVar: "--tblr-light", classes: ["bg-light", "text-light"] },
  { name: "dark", hex: "#1f2937", cssVar: "--tblr-dark", classes: ["bg-dark", "text-dark"] },
  { name: "muted", hex: "#6b7280", cssVar: "--tblr-muted", classes: ["text-muted"] },
];

/** Gray scale. */
export const grays: TablerColor[] = [
  { name: "gray-50", hex: "#f9fafb", cssVar: "--tblr-gray-50", classes: [] },
  { name: "gray-100", hex: "#f3f4f6", cssVar: "--tblr-gray-100", classes: [] },
  { name: "gray-200", hex: "#e5e7eb", cssVar: "--tblr-gray-200", classes: [] },
  { name: "gray-300", hex: "#d1d5db", cssVar: "--tblr-gray-300", classes: [] },
  { name: "gray-400", hex: "#9ca3af", cssVar: "--tblr-gray-400", classes: [] },
  { name: "gray-500", hex: "#6b7280", cssVar: "--tblr-gray-500", classes: [] },
  { name: "gray-600", hex: "#4b5563", cssVar: "--tblr-gray-600", classes: [] },
  { name: "gray-700", hex: "#374151", cssVar: "--tblr-gray-700", classes: [] },
  { name: "gray-800", hex: "#1f2937", cssVar: "--tblr-gray-800", classes: [] },
  { name: "gray-900", hex: "#111827", cssVar: "--tblr-gray-900", classes: [] },
];

export const colorUsageNotes = [
  "Pair solid backgrounds with matching foreground: <span class=\"badge bg-blue text-blue-fg\">.",
  "Light variants use the -lt suffix: bg-blue-lt (light background, colored text).",
  "All colors are exposed as CSS variables: var(--tblr-blue), var(--tblr-primary), etc.",
  "Body background: #f9fafb (light) — body color: #1f2937.",
];

export const darkModeNotes = [
  'Enable dark mode by adding data-bs-theme="dark" to <html> or <body> (or any container).',
  'Force a light region inside a dark page with data-bs-theme="light" on that element.',
  "Tabler ships tabler-theme.min.js which persists the user's theme choice (light/dark) automatically.",
  "Customize the primary color by overriding the CSS variable: :root { --tblr-primary: #ae3ec9; }",
];
