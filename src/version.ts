/** Central place for Tabler version + CDN URLs used across tools. */

export const SERVER_NAME = "tabler-mcp-server";
export const SERVER_VERSION = "1.0.0";

/** Version of @tabler/core the snippets and CDN links target. */
export const TABLER_VERSION = "1.4.0";

export const CDN_BASE = `https://cdn.jsdelivr.net/npm/@tabler/core@${TABLER_VERSION}/dist`;

export const CDN = {
  css: `${CDN_BASE}/css/tabler.min.css`,
  js: `${CDN_BASE}/js/tabler.min.js`,
  themeJs: `${CDN_BASE}/js/tabler-theme.min.js`,
  flagsCss: `${CDN_BASE}/css/tabler-flags.min.css`,
  paymentsCss: `${CDN_BASE}/css/tabler-payments.min.css`,
  socialsCss: `${CDN_BASE}/css/tabler-socials.min.css`,
  vendorsCss: `${CDN_BASE}/css/tabler-vendors.min.css`,
  iconsWebfontCss:
    "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css",
};

export const DOCS_BASE = "https://docs.tabler.io";
export const PREVIEW_BASE = "https://preview.tabler.io";
