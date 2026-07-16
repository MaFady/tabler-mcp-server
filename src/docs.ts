/**
 * Live access to docs.tabler.io: sitemap-based search and page fetching.
 * Network failures degrade gracefully (offline tools keep working).
 */

import { DOCS_BASE } from "./version.js";

const SITEMAP_URL = `${DOCS_BASE}/sitemap.xml`;
const CACHE_TTL_MS = 15 * 60 * 1000;

let sitemapCache: { urls: string[]; fetchedAt: number } | null = null;

export async function getSitemapUrls(): Promise<string[]> {
  if (sitemapCache && Date.now() - sitemapCache.fetchedAt < CACHE_TTL_MS) {
    return sitemapCache.urls;
  }
  const res = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Failed to fetch sitemap (HTTP ${res.status}).`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  sitemapCache = { urls, fetchedAt: Date.now() };
  return urls;
}

export interface DocsSearchResult {
  url: string;
  section: string;
  title: string;
  score: number;
}

/** Search docs.tabler.io pages by URL slug matching. */
export async function searchDocs(query: string, limit = 10): Promise<DocsSearchResult[]> {
  const urls = await getSitemapUrls();
  const terms = query.trim().toLowerCase().split(/[\s,/-]+/).filter(Boolean);

  const results: DocsSearchResult[] = [];
  for (const url of urls) {
    const path = url.replace(DOCS_BASE, "").replace(/\/+$/, "");
    if (!path) continue;
    const segments = path.split("/").filter(Boolean);
    const slug = segments[segments.length - 1] ?? "";
    const slugWords = slug.split("-");

    let score = 0;
    for (const term of terms) {
      if (slug === term) score += 50;
      if (slugWords.includes(term)) score += 30;
      else if (slug.includes(term)) score += 15;
      else if (path.includes(term)) score += 5;
    }
    if (score > 0) {
      results.push({
        url,
        section: segments[0] ?? "",
        title: slugWords.map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(" "),
        score,
      });
    }
  }
  results.sort((a, b) => b.score - a.score || a.url.localeCompare(b.url));
  return results.slice(0, Math.min(Math.max(limit, 1), 30));
}

/** Fetch a docs.tabler.io page and reduce it to readable text with code blocks. */
export async function getDocsPage(urlOrPath: string): Promise<string> {
  let url = urlOrPath.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `${DOCS_BASE}/${url.replace(/^\/+/, "")}`;
  }
  const parsed = new URL(url);
  if (parsed.hostname !== "docs.tabler.io" && parsed.hostname !== "tabler.io") {
    throw new Error("Only tabler.io / docs.tabler.io pages can be fetched by this tool.");
  }

  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`Failed to fetch ${url} (HTTP ${res.status}).`);
  const html = await res.text();
  return htmlToText(html);
}

/** Minimal HTML → text conversion preserving headings and code blocks. */
export function htmlToText(html: string): string {
  let s = html;

  // Focus on main content when possible.
  const main = s.match(/<main[\s\S]*?<\/main>/i) ?? s.match(/<article[\s\S]*?<\/article>/i);
  if (main) s = main[0];

  s = s
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Extract code first and protect it behind placeholders, so decoded
  // entities inside code (e.g. &lt;div&gt;) don't get stripped as tags later.
  const codeBlocks: string[] = [];
  s = s.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, code: string) => {
    codeBlocks.push(decodeEntities(code.replace(/<[^>]+>/g, "")).trim());
    return `\n@@CODEBLOCK${codeBlocks.length - 1}@@\n`;
  });
  const inlineCodes: string[] = [];
  s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_m, code: string) => {
    inlineCodes.push(decodeEntities(code.replace(/<[^>]+>/g, "")));
    return `@@CODEINLINE${inlineCodes.length - 1}@@`;
  });

  // Headings -> markdown.
  for (let i = 1; i <= 6; i++) {
    const re = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)</h${i}>`, "gi");
    s = s.replace(re, (_m, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
      return `\n\n${"#".repeat(i)} ${text}\n\n`;
    });
  }

  s = s
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|section|tr|ul|ol|table)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  s = decodeEntities(s);
  s = s
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trimEnd())
    .filter((line) => !/^\s*-\s*$/.test(line)) // drop empty list bullets (nav noise)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Docs pages: skip leftover nav noise before the first real heading.
  const firstHeading = s.search(/^# .+$/m);
  if (firstHeading > 0) {
    const head = s.slice(0, firstHeading).trimEnd();
    const title = head.split("\n")[0] ?? "";
    s = (title ? title + "\n\n" : "") + s.slice(firstHeading);
  }

  // Restore protected code after whitespace collapsing.
  s = s.replace(/@@CODEBLOCK(\d+)@@/g, (_m, i: string) => "```\n" + codeBlocks[Number(i)] + "\n```");
  s = s.replace(/@@CODEINLINE(\d+)@@/g, (_m, i: string) => "`" + inlineCodes[Number(i)] + "`");

  const MAX = 20_000;
  if (s.length > MAX) s = s.slice(0, MAX) + "\n\n[... truncated]";
  return s;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}
