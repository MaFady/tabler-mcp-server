/**
 * tabler-mcp-server — MCP server exposing the Tabler.io ecosystem to AI assistants.
 *
 * Created by Mafady AI Studio — Supervised by Dr Maher.
 * https://github.com/MaFady/tabler-mcp-server
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { SERVER_NAME, SERVER_VERSION, TABLER_VERSION, CDN, DOCS_BASE } from "./version.js";
import {
  searchIcons,
  listCategories,
  renderIcon,
  getIconMeta,
  type IconStyle,
  type IconFormat,
} from "./icons.js";
import { components, findComponent, searchComponents } from "./data/components.js";
import { layouts, findLayout } from "./data/layouts.js";
import { palette, themeColors, grays, colorUsageNotes, darkModeNotes } from "./data/colors.js";
import { searchDocs, getDocsPage } from "./docs.js";
import { buildHtmlDocument } from "./template.js";

function text(s: string) {
  return { content: [{ type: "text" as const, text: s }] };
}

function errorText(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
}

export function createServer(): McpServer {
  const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION });

  // ------------------------------------------------------------------ icons

  server.registerTool(
    "search_icons",
    {
      title: "Search Tabler Icons",
      description:
        "Search 5,000+ free Tabler icons by keyword, tag or category. Returns icon names, categories, tags and available styles (outline/filled). Use get_icon to retrieve the actual SVG or framework code.",
      inputSchema: {
        query: z.string().describe("Search keywords, e.g. 'shopping cart', 'arrow left', 'user'"),
        category: z.string().optional().describe("Filter by category (see list_icon_categories)"),
        style: z.enum(["outline", "filled"]).optional().describe("Only icons available in this style"),
        limit: z.number().int().min(1).max(100).optional().describe("Max results (default 20)"),
      },
    },
    async ({ query, category, style, limit }) => {
      try {
        const results = searchIcons(query, { category, style: style as IconStyle, limit });
        if (results.length === 0) {
          return text(`No icons found for "${query}". Try broader keywords or check list_icon_categories.`);
        }
        const lines = results.map(
          (r) => `- ${r.name}  [${r.styles.join(", ")}]  (${r.category || "Uncategorized"}) — tags: ${r.tags.join(", ")}`
        );
        return text(`Found ${results.length} icon(s) for "${query}":\n\n${lines.join("\n")}\n\nUse get_icon with a name to retrieve SVG/React/Vue/webfont code.`);
      } catch (e) {
        return errorText(e);
      }
    }
  );

  server.registerTool(
    "get_icon",
    {
      title: "Get a Tabler icon",
      description:
        "Get a Tabler icon by exact name in the requested format: raw SVG (customizable size/stroke/color), React, Vue, Svelte, webfont class, or data URI.",
      inputSchema: {
        name: z.string().describe("Exact icon name, e.g. 'heart', 'shopping-cart' (find names with search_icons)"),
        style: z.enum(["outline", "filled"]).optional().describe("Icon style (default: outline)"),
        format: z
          .enum(["svg", "react", "vue", "svelte", "webfont", "data-uri"])
          .optional()
          .describe("Output format (default: svg)"),
        size: z.number().int().min(8).max(512).optional().describe("Size in px (default 24)"),
        strokeWidth: z.number().min(0.5).max(4).optional().describe("Stroke width for outline style (default 2)"),
        color: z.string().optional().describe("CSS color to replace currentColor, e.g. '#d63939' or 'var(--tblr-primary)'"),
      },
    },
    async ({ name, style, format, size, strokeWidth, color }) => {
      try {
        const st = (style ?? "outline") as IconStyle;
        const fmt = (format ?? "svg") as IconFormat;
        const meta = getIconMeta(name);
        const code = renderIcon(name, st, fmt, { size, strokeWidth, color });
        const header = meta
          ? `Icon: ${meta.name} (${st}) — category: ${meta.category || "Uncategorized"}\n\n`
          : "";
        return text(`${header}${code}`);
      } catch (e) {
        return errorText(e);
      }
    }
  );

  server.registerTool(
    "list_icon_categories",
    {
      title: "List icon categories",
      description: "List all Tabler icon categories with icon counts.",
      inputSchema: {},
    },
    async () => {
      try {
        const cats = listCategories();
        const lines = cats.map((c) => `- ${c.category}: ${c.count}`);
        return text(`Tabler icon categories (${cats.length}):\n\n${lines.join("\n")}`);
      } catch (e) {
        return errorText(e);
      }
    }
  );

  // ------------------------------------------------------------- components

  server.registerTool(
    "list_components",
    {
      title: "List Tabler UI components",
      description:
        "List the Tabler UI component catalogue (alerts, avatars, badges, buttons, cards, modals, tables, forms...). Optionally filter with a query. Use get_component for HTML snippets.",
      inputSchema: {
        query: z.string().optional().describe("Optional filter, e.g. 'form', 'card'"),
      },
    },
    async ({ query }) => {
      const found = searchComponents(query);
      if (found.length === 0) {
        return text(`No components match "${query}". Call list_components without a query for the full catalogue.`);
      }
      const lines = found.map((c) => `- ${c.slug} — ${c.name}: ${c.description}`);
      return text(`Tabler UI components (${found.length}):\n\n${lines.join("\n")}\n\nUse get_component with a slug to retrieve ready-to-paste HTML.`);
    }
  );

  server.registerTool(
    "get_component",
    {
      title: "Get a Tabler component",
      description:
        "Get ready-to-paste HTML snippets for a Tabler UI component (markup follows @tabler/core " +
        TABLER_VERSION +
        " conventions), plus requirements and documentation link.",
      inputSchema: {
        component: z.string().describe("Component slug or name, e.g. 'card', 'modal', 'forms' (see list_components)"),
      },
    },
    async ({ component }) => {
      const c = findComponent(component);
      if (!c) {
        const all = components.map((x) => x.slug).join(", ");
        return text(`Component "${component}" not found. Available: ${all}`);
      }
      const parts: string[] = [`# ${c.name}`, "", c.description, "", `Docs: ${c.docsUrl}`];
      if (c.requires?.length) {
        parts.push("", "Requires:", ...c.requires.map((r) => `- ${r}`));
      }
      if (c.notes?.length) {
        parts.push("", "Notes:", ...c.notes.map((n) => `- ${n}`));
      }
      for (const s of c.snippets) {
        parts.push("", `## ${s.title}`, "", "```html", s.html, "```");
      }
      return text(parts.join("\n"));
    }
  );

  // ---------------------------------------------------------------- layouts

  server.registerTool(
    "get_page_layout",
    {
      title: "Get a full page layout",
      description:
        "Get a complete, ready-to-run HTML page for a Tabler layout: horizontal (top navbar), vertical (sidebar), condensed, fluid, login, register, forgot-password, error-404, error-500, or blank.",
      inputSchema: {
        layout: z
          .enum(["horizontal", "vertical", "condensed", "fluid", "login", "register", "forgot-password", "error-404", "error-500", "blank"])
          .describe("Layout to generate"),
        title: z.string().optional().describe("App/brand title injected into the page (default: 'Tabler App')"),
        theme: z.enum(["light", "dark"]).optional().describe("Color scheme (default: light)"),
      },
    },
    async ({ layout, title, theme }) => {
      const l = findLayout(layout);
      if (!l) {
        return text(`Layout "${layout}" not found. Available: ${layouts.map((x) => x.slug).join(", ")}`);
      }
      const html = buildHtmlDocument(l.body, { title, theme });
      return text(`${l.name} — ${l.description}\n\n\`\`\`html\n${html}\`\`\``);
    }
  );

  server.registerTool(
    "get_starter_template",
    {
      title: "Get a starter HTML template",
      description:
        "Generate a minimal Tabler starter HTML document with CDN links (CSS+JS), optional dark theme, optional plugin stylesheets (flags, payments, socials, vendors) and optional Tabler Icons webfont.",
      inputSchema: {
        title: z.string().optional().describe("Page title (default: 'Tabler App')"),
        theme: z.enum(["light", "dark"]).optional().describe("Color scheme (default: light)"),
        plugins: z
          .array(z.enum(["flags", "payments", "socials", "vendors"]))
          .optional()
          .describe("Extra Tabler plugin stylesheets to include"),
        iconsWebfont: z.boolean().optional().describe("Include the Tabler Icons webfont stylesheet"),
      },
    },
    async ({ title, theme, plugins, iconsWebfont }) => {
      const blank = findLayout("blank")!;
      const html = buildHtmlDocument(blank.body, { title, theme, plugins, iconsWebfont });
      return text(`\`\`\`html\n${html}\`\`\``);
    }
  );

  // ------------------------------------------------------------------ theme

  server.registerTool(
    "get_colors",
    {
      title: "Get the Tabler color palette",
      description:
        "Get the official Tabler color palette (base colors, semantic theme colors, gray scale) with hex values, CSS variables and utility classes.",
      inputSchema: {},
    },
    async () => {
      const parts: string[] = ["# Tabler color palette (v" + TABLER_VERSION + ")", "", "## Base colors"];
      for (const c of palette) parts.push(`- ${c.name}: ${c.hex}  (${c.cssVar}) — classes: ${c.classes.join(", ")}`);
      parts.push("", "## Theme colors");
      for (const c of themeColors) parts.push(`- ${c.name}: ${c.hex}  (${c.cssVar})`);
      parts.push("", "## Gray scale");
      for (const c of grays) parts.push(`- ${c.name}: ${c.hex}  (${c.cssVar})`);
      parts.push("", "## Usage", ...colorUsageNotes.map((n) => `- ${n}`));
      return text(parts.join("\n"));
    }
  );

  server.registerTool(
    "get_theme_info",
    {
      title: "Get theming & dark mode info",
      description:
        "How to enable dark mode, persist theme choice, and customize Tabler via CSS variables.",
      inputSchema: {},
    },
    async () => {
      const parts = [
        "# Tabler theming",
        "",
        ...darkModeNotes.map((n) => `- ${n}`),
        "",
        "Theme persistence script (optional):",
        "```html",
        `<script src="${CDN.themeJs}"></script>`,
        "```",
        "",
        "Example — custom primary color:",
        "```css",
        ":root {",
        "  --tblr-primary: #ae3ec9;",
        "  --tblr-primary-rgb: 174, 62, 201;",
        "}",
        "```",
      ];
      return text(parts.join("\n"));
    }
  );

  // ------------------------------------------------------------------- docs

  server.registerTool(
    "search_docs",
    {
      title: "Search Tabler documentation",
      description:
        "Search docs.tabler.io pages (UI, icons, emails, illustrations) by keyword. Returns page URLs — use get_docs_page to read one. Requires network access.",
      inputSchema: {
        query: z.string().describe("Keywords, e.g. 'modal', 'installation', 'react icons'"),
        limit: z.number().int().min(1).max(30).optional().describe("Max results (default 10)"),
      },
    },
    async ({ query, limit }) => {
      try {
        const results = await searchDocs(query, limit);
        if (results.length === 0) return text(`No docs pages found for "${query}".`);
        const lines = results.map((r) => `- [${r.section}] ${r.title} — ${r.url}`);
        return text(`Docs pages matching "${query}":\n\n${lines.join("\n")}`);
      } catch (e) {
        return errorText(e);
      }
    }
  );

  server.registerTool(
    "get_docs_page",
    {
      title: "Read a Tabler docs page",
      description:
        "Fetch a docs.tabler.io page and return its readable text content (headings, text, code blocks). Requires network access.",
      inputSchema: {
        url: z.string().describe(`Full URL or path, e.g. '${DOCS_BASE}/ui/components/modals' or 'ui/components/modals'`),
      },
    },
    async ({ url }) => {
      try {
        const content = await getDocsPage(url);
        return text(content);
      } catch (e) {
        return errorText(e);
      }
    }
  );

  // ---------------------------------------------------------------- install

  server.registerTool(
    "get_installation",
    {
      title: "Get installation instructions",
      description:
        "Up-to-date installation options for Tabler UI and Tabler Icons: CDN links, npm packages, plugin stylesheets.",
      inputSchema: {
        product: z.enum(["ui", "icons"]).optional().describe("Which product (default: ui)"),
      },
    },
    async ({ product }) => {
      if (product === "icons") {
        return text(
          [
            "# Tabler Icons installation",
            "",
            "npm packages:",
            "- `@tabler/icons` — raw SVGs + metadata",
            "- `@tabler/icons-react`, `@tabler/icons-vue`, `@tabler/icons-svelte`, `@tabler/icons-preact`, `@tabler/icons-solidjs`",
            "- `@tabler/icons-webfont` — icon font (class `ti ti-<name>`)",
            "",
            "Webfont via CDN:",
            "```html",
            `<link rel="stylesheet" href="${CDN.iconsWebfontCss}" />`,
            "```",
            "",
            "Docs: https://docs.tabler.io/icons",
          ].join("\n")
        );
      }
      return text(
        [
          `# Tabler UI installation (v${TABLER_VERSION})`,
          "",
          "## CDN",
          "```html",
          `<link rel="stylesheet" href="${CDN.css}" />`,
          `<script src="${CDN.js}" defer></script>`,
          "```",
          "",
          "## npm",
          "```bash",
          "npm install @tabler/core",
          "```",
          "",
          "## Optional plugin stylesheets",
          "```html",
          `<link rel="stylesheet" href="${CDN.flagsCss}" />`,
          `<link rel="stylesheet" href="${CDN.paymentsCss}" />`,
          `<link rel="stylesheet" href="${CDN.socialsCss}" />`,
          `<link rel="stylesheet" href="${CDN.vendorsCss}" />`,
          "```",
          "",
          "Docs: https://docs.tabler.io/ui/getting-started/installation",
        ].join("\n")
      );
    }
  );

  return server;
}
