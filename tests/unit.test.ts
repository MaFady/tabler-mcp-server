import { describe, it, expect } from "vitest";

import { searchIcons, listCategories, renderIcon, toReactName, getIconSvg, getIconMeta } from "../src/icons.js";
import { components, findComponent, searchComponents } from "../src/data/components.js";
import { layouts, findLayout } from "../src/data/layouts.js";
import { palette, themeColors } from "../src/data/colors.js";
import { buildHtmlDocument } from "../src/template.js";
import { htmlToText } from "../src/docs.js";
import { createServer } from "../src/server.js";
import { CDN } from "../src/version.js";

describe("icons", () => {
  it("finds the heart icon by exact name", () => {
    const results = searchIcons("heart");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("heart");
    expect(results[0].styles).toContain("outline");
  });

  it("finds shopping cart icons via multi-word query", () => {
    const results = searchIcons("shopping cart", { limit: 10 });
    expect(results.some((r) => r.name.includes("shopping-cart"))).toBe(true);
  });

  it("filters by style", () => {
    const results = searchIcons("heart", { style: "filled" });
    expect(results.every((r) => r.styles.includes("filled"))).toBe(true);
  });

  it("respects the limit", () => {
    expect(searchIcons("arrow", { limit: 5 }).length).toBeLessThanOrEqual(5);
  });

  it("lists categories with counts", () => {
    const cats = listCategories();
    expect(cats.length).toBeGreaterThan(10);
    expect(cats[0].count).toBeGreaterThan(0);
  });

  it("returns raw SVG with customizations", () => {
    const svg = getIconSvg("heart", "outline", { size: 32, strokeWidth: 1.5, color: "#d63939" });
    expect(svg).toContain("<svg");
    expect(svg).toContain('width="32"');
    expect(svg).toContain('stroke-width="1.5"');
    expect(svg).toContain("#d63939");
    expect(svg).not.toContain("currentColor");
  });

  it("throws a helpful error for unknown icons", () => {
    expect(() => getIconSvg("definitely-not-an-icon", "outline")).toThrow(/not found/);
  });

  it("generates correct React component names", () => {
    expect(toReactName("heart", "outline")).toBe("IconHeart");
    expect(toReactName("shopping-cart", "outline")).toBe("IconShoppingCart");
    expect(toReactName("heart", "filled")).toBe("IconHeartFilled");
    expect(toReactName("a-b-2", "outline")).toBe("IconAB2");
  });

  it("renders react / vue / webfont / data-uri formats", () => {
    expect(renderIcon("heart", "outline", "react")).toContain("@tabler/icons-react");
    expect(renderIcon("heart", "outline", "vue")).toContain("@tabler/icons-vue");
    expect(renderIcon("heart", "outline", "webfont")).toContain("ti ti-heart");
    expect(renderIcon("heart", "filled", "webfont")).toContain("ti ti-heart-filled");
    expect(renderIcon("heart", "outline", "data-uri")).toMatch(/^data:image\/svg\+xml,/);
  });

  it("has metadata for known icons", () => {
    const meta = getIconMeta("heart");
    expect(meta?.tags).toContain("love");
  });
});

describe("components", () => {
  it("has a substantial catalogue", () => {
    expect(components.length).toBeGreaterThanOrEqual(35);
  });

  it("every component has slug, docs URL and at least one snippet", () => {
    for (const c of components) {
      expect(c.slug, c.name).toBeTruthy();
      expect(c.docsUrl).toMatch(/^https:\/\/docs\.tabler\.io/);
      expect(c.snippets.length, c.slug).toBeGreaterThan(0);
      for (const s of c.snippets) expect(s.html.trim(), `${c.slug}/${s.title}`).toBeTruthy();
    }
  });

  it("slugs are unique", () => {
    const slugs = components.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds components by slug, name and fuzzy match", () => {
    expect(findComponent("card")?.name).toBe("Cards");
    expect(findComponent("Buttons")?.slug).toBe("button");
    expect(findComponent("modals")?.slug).toBe("modal");
  });

  it("searches components by keyword", () => {
    const forms = searchComponents("form");
    expect(forms.length).toBeGreaterThanOrEqual(3);
  });
});

describe("layouts & templates", () => {
  it("has the expected layouts", () => {
    for (const slug of ["horizontal", "vertical", "login", "register", "error-404", "blank"]) {
      expect(findLayout(slug), slug).toBeDefined();
    }
    expect(layouts.length).toBeGreaterThanOrEqual(10);
  });

  it("builds a complete HTML document with CDN links and title", () => {
    const html = buildHtmlDocument(findLayout("login")!.body, { title: "Mafady App" });
    expect(html).toContain("<!doctype html>");
    expect(html).toContain(CDN.css);
    expect(html).toContain(CDN.js);
    expect(html).toContain("<title>Mafady App</title>");
    expect(html).not.toContain("{{TITLE}}");
  });

  it("applies dark theme and plugin stylesheets", () => {
    const html = buildHtmlDocument("<div></div>", { theme: "dark", plugins: ["flags"], iconsWebfont: true });
    expect(html).toContain('data-bs-theme="dark"');
    expect(html).toContain("tabler-flags.min.css");
    expect(html).toContain("tabler-icons.min.css");
  });

  it("escapes HTML in titles", () => {
    const html = buildHtmlDocument("<div>{{TITLE}}</div>", { title: '<script>alert("x")</script>' });
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("colors", () => {
  it("has the official palette", () => {
    expect(palette.find((c) => c.name === "blue")?.hex).toBe("#066fd1");
    expect(themeColors.find((c) => c.name === "danger")?.hex).toBe("#d63939");
  });
});

describe("docs html-to-text", () => {
  it("converts headings, code and strips tags", () => {
    const out = htmlToText(
      "<main><h1>Title</h1><p>Hello <b>world</b></p><pre><code>&lt;div&gt;</code></pre><script>bad()</script></main>"
    );
    expect(out).toContain("# Title");
    expect(out).toContain("Hello world");
    expect(out).toContain("<div>");
    expect(out).not.toContain("bad()");
  });
});

describe("server", () => {
  it("creates an MCP server instance", () => {
    const server = createServer();
    expect(server).toBeDefined();
  });
});
