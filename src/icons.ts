/**
 * Icon search and rendering engine, backed by the @tabler/icons npm package
 * (5,000+ MIT-licensed icons with tags, categories and SVG sources — fully offline).
 */

import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

export type IconStyle = "outline" | "filled";

export interface IconMeta {
  name: string;
  category: string;
  tags: string[];
  styles: Record<string, { version: string; unicode: string }>;
}

export interface IconSearchResult {
  name: string;
  category: string;
  tags: string[];
  styles: string[];
  score: number;
}

let iconsDir: string | null = null;
let iconsIndex: IconMeta[] | null = null;

function getIconsDir(): string {
  if (!iconsDir) {
    // @tabler/icons only exports "./*" -> "./icons/*", so resolve a sentinel
    // icon file and walk up to the package root (works with npm, pnpm, npx).
    const sentinel = require.resolve("@tabler/icons/outline/heart.svg");
    iconsDir = join(dirname(sentinel), "..", "..");
  }
  return iconsDir;
}

export function loadIconsIndex(): IconMeta[] {
  if (!iconsIndex) {
    const raw = readFileSync(join(getIconsDir(), "icons.json"), "utf8");
    const parsed = JSON.parse(raw) as Record<string, IconMeta>;
    // Normalize: some tags are numbers in the source JSON, category may be missing.
    iconsIndex = Object.values(parsed).map((i) => ({
      ...i,
      category: String(i.category ?? ""),
      tags: (i.tags ?? []).map(String),
    }));
  }
  return iconsIndex;
}

/** Search icons by name, tags and category with simple relevance scoring. */
export function searchIcons(
  query: string,
  opts: { category?: string; style?: IconStyle; limit?: number } = {}
): IconSearchResult[] {
  const icons = loadIconsIndex();
  const q = query.trim().toLowerCase();
  const terms = q.split(/[\s,]+/).filter(Boolean);
  const limit = Math.min(Math.max(opts.limit ?? 20, 1), 100);

  const results: IconSearchResult[] = [];
  for (const icon of icons) {
    if (opts.category && icon.category.toLowerCase() !== opts.category.toLowerCase()) continue;
    if (opts.style && !icon.styles[opts.style]) continue;

    let score = 0;
    if (icon.name === q) score += 100;
    else if (icon.name.startsWith(q)) score += 60;
    else if (icon.name.includes(q)) score += 40;

    for (const term of terms) {
      if (icon.name.split("-").includes(term)) score += 25;
      if (icon.tags.some((t) => t === term)) score += 15;
      else if (icon.tags.some((t) => t.includes(term))) score += 5;
      if (icon.category.toLowerCase() === term) score += 10;
    }

    if (score > 0) {
      results.push({
        name: icon.name,
        category: icon.category,
        tags: icon.tags.slice(0, 8),
        styles: Object.keys(icon.styles),
        score,
      });
    }
  }

  results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return results.slice(0, limit);
}

export function listCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const icon of loadIconsIndex()) {
    const cat = icon.category || "Uncategorized";
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getIconMeta(name: string): IconMeta | undefined {
  return loadIconsIndex().find((i) => i.name === name.trim().toLowerCase());
}

export interface GetSvgOptions {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/** Read the raw SVG for an icon and apply size / stroke / color customizations. */
export function getIconSvg(name: string, style: IconStyle, opts: GetSvgOptions = {}): string {
  const file = join(getIconsDir(), "icons", style, `${name.trim().toLowerCase()}.svg`);
  if (!existsSync(file)) {
    throw new Error(
      `Icon "${name}" not found in style "${style}". Use search_icons to find valid names, or try the other style.`
    );
  }
  let svg = readFileSync(file, "utf8").trim();

  if (opts.size && opts.size > 0) {
    svg = svg
      .replace(/width="24"/, `width="${opts.size}"`)
      .replace(/height="24"/, `height="${opts.size}"`);
  }
  if (opts.strokeWidth && style === "outline") {
    svg = svg.replace(/stroke-width="2"/, `stroke-width="${opts.strokeWidth}"`);
  }
  if (opts.color) {
    svg = svg.replace(/currentColor/g, opts.color);
  }
  return svg;
}

/** "a-b-2" -> "IconAB2"; filled style appends "Filled" (matches @tabler/icons-react naming). */
export function toReactName(name: string, style: IconStyle): string {
  const pascal = name
    .split("-")
    .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
    .join("");
  return `Icon${pascal}${style === "filled" ? "Filled" : ""}`;
}

export type IconFormat = "svg" | "react" | "vue" | "svelte" | "webfont" | "data-uri";

/** Render an icon in the requested output format. */
export function renderIcon(
  name: string,
  style: IconStyle,
  format: IconFormat,
  opts: GetSvgOptions = {}
): string {
  const iconName = name.trim().toLowerCase();

  switch (format) {
    case "svg":
      return getIconSvg(iconName, style, opts);

    case "data-uri": {
      const svg = getIconSvg(iconName, style, opts);
      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    case "react": {
      const comp = toReactName(iconName, style);
      return [
        `// npm install @tabler/icons-react`,
        `import { ${comp} } from "@tabler/icons-react";`,
        ``,
        `<${comp} size={${opts.size ?? 24}}${style === "outline" ? ` stroke={${opts.strokeWidth ?? 2}}` : ""}${opts.color ? ` color="${opts.color}"` : ""} />`,
      ].join("\n");
    }

    case "vue": {
      const comp = toReactName(iconName, style);
      return [
        `<!-- npm install @tabler/icons-vue -->`,
        `<script setup>`,
        `import { ${comp} } from "@tabler/icons-vue";`,
        `</script>`,
        ``,
        `<template>`,
        `  <${comp} :size="${opts.size ?? 24}"${style === "outline" ? ` :stroke-width="${opts.strokeWidth ?? 2}"` : ""}${opts.color ? ` color="${opts.color}"` : ""} />`,
        `</template>`,
      ].join("\n");
    }

    case "svelte": {
      const comp = toReactName(iconName, style);
      return [
        `<!-- npm install @tabler/icons-svelte -->`,
        `<script>`,
        `  import { ${comp} } from "@tabler/icons-svelte";`,
        `</script>`,
        ``,
        `<${comp} size={${opts.size ?? 24}}${opts.color ? ` color="${opts.color}"` : ""} />`,
      ].join("\n");
    }

    case "webfont": {
      const meta = getIconMeta(iconName);
      const suffix = style === "filled" ? "-filled" : "";
      const unicode = meta?.styles[style]?.unicode;
      return [
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />`,
        `<i class="ti ti-${iconName}${suffix}"></i>`,
        unicode ? `<!-- CSS content escape: \\${unicode} -->` : "",
      ]
        .filter(Boolean)
        .join("\n");
    }

    default:
      throw new Error(`Unknown format "${format}".`);
  }
}
