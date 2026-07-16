# Tabler MCP Server

> **MCP server for [Tabler.io](https://tabler.io)** — bring 5,000+ Tabler icons, the full UI component catalogue, page layouts, themes and live documentation into Claude, Cursor, and any MCP-compatible AI assistant.

[![CI](https://github.com/MaFady/tabler-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/MaFady/tabler-mcp-server/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tabler](https://img.shields.io/badge/Tabler-1.4.0-066fd1.svg)](https://tabler.io)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-compatible-blueviolet.svg)](https://modelcontextprotocol.io)

Created by **Mafady AI Studio** — Supervised by **Dr Maher** · [Version française ci-dessous](#-version-française) 🇫🇷

---

## Why?

[Tabler](https://tabler.io) is one of the most popular open-source dashboard UI kits (41k+ ⭐, Bootstrap 5, MIT). This server teaches your AI assistant to use it *correctly*: exact icon names, canonical component markup, official color palette, real CDN links — instead of hallucinated class names.

Icon search and component snippets work **fully offline** (data ships with the package). Documentation search uses docs.tabler.io live.

## Tools

| Tool | Description |
|---|---|
| `search_icons` | Search 5,000+ Tabler icons by keyword, tag or category |
| `get_icon` | Get an icon as SVG (custom size/stroke/color), React, Vue, Svelte, webfont or data URI |
| `list_icon_categories` | All icon categories with counts |
| `list_components` | Catalogue of ~40 UI components (alerts, cards, modals, tables, forms…) |
| `get_component` | Ready-to-paste HTML snippets for a component, Tabler 1.4 markup |
| `get_page_layout` | Complete HTML page: horizontal / vertical / condensed / fluid layout, login, register, forgot-password, 404, 500, blank |
| `get_starter_template` | Minimal starter HTML with CDN links, dark mode, plugin stylesheets |
| `get_colors` | Official color palette with hex, CSS variables and utility classes |
| `get_theme_info` | Dark mode, theme persistence and CSS-variable customization |
| `search_docs` | Search docs.tabler.io pages (UI, icons, emails, illustrations) |
| `get_docs_page` | Read any docs.tabler.io page as clean text |
| `get_installation` | Up-to-date CDN links and npm packages for Tabler UI & Icons |

## Quick start

Requires **Node.js ≥ 18**.

### Claude Code

```bash
claude mcp add tabler -- npx -y tabler-mcp-server
```

### Claude Desktop

Add to `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "tabler": {
      "command": "npx",
      "args": ["-y", "tabler-mcp-server"]
    }
  }
}
```

### Cursor / Windsurf / VS Code (MCP)

```json
{
  "mcpServers": {
    "tabler": {
      "command": "npx",
      "args": ["-y", "tabler-mcp-server"]
    }
  }
}
```

### ChatGPT and other remote-only clients

ChatGPT connectors require a remote server. Expose this stdio server over HTTP with a gateway, e.g.:

```bash
npx -y supergateway --stdio "npx -y tabler-mcp-server" --port 8000
```

### From source

```bash
git clone https://github.com/MaFady/tabler-mcp-server.git
cd tabler-mcp-server
npm install && npm run build
node dist/index.js   # stdio MCP server
```

Then point your client at `node /path/to/tabler-mcp-server/dist/index.js`.

## Example prompts

- *"Build me a Tabler login page in dark mode for 'Acme Cloud'"*
- *"Find a Tabler icon for invoices and give me the React component"*
- *"Create a dashboard card with a ribbon and a progress bar using Tabler"*
- *"What's the exact hex of Tabler's danger color?"*
- *"Show me the Tabler docs about form validation"*

## Development

```bash
npm install
npm run dev        # run from TypeScript (tsx)
npm test           # vitest
npm run build      # compile to dist/
```

Project layout:

```
src/
  index.ts          # stdio entry point
  server.ts         # MCP server + 12 tool registrations
  icons.ts          # offline icon search/render engine (@tabler/icons data)
  docs.ts           # live docs.tabler.io search & page reader
  template.ts       # HTML document builder
  data/
    components.ts   # curated component snippets (Tabler 1.4 markup)
    layouts.ts      # full-page layout skeletons
    colors.ts       # official palette (extracted from tabler.min.css)
```

## Security note

Generated templates reference the official jsDelivr CDN. For production apps, pin versions and consider adding [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) attributes to CDN tags.

## Credits & license

- Server code: [MIT](LICENSE) © 2026 **Mafady AI Studio** — Supervised by **Dr Maher**
- [Tabler](https://tabler.io), [Tabler Icons](https://tabler.io/icons) © [Paweł Kuna](https://github.com/codecalm) and contributors (MIT)
- This is an independent community project, not affiliated with or endorsed by Tabler

---

## 🇫🇷 Version française

**Serveur MCP pour [Tabler.io](https://tabler.io)** — apportez plus de 5 000 icônes Tabler, le catalogue complet de composants UI, les layouts de pages, les thèmes et la documentation en direct dans Claude, Cursor et tout assistant IA compatible MCP.

### Pourquoi ?

Tabler est l'un des kits UI de dashboard open source les plus populaires (41k+ ⭐, Bootstrap 5, MIT). Ce serveur apprend à votre assistant IA à l'utiliser *correctement* : noms d'icônes exacts, markup canonique des composants, palette officielle, vrais liens CDN — au lieu de classes CSS hallucinées.

La recherche d'icônes et les snippets fonctionnent **entièrement hors-ligne** ; la recherche documentaire interroge docs.tabler.io en direct.

### Démarrage rapide (Claude Desktop)

```json
{
  "mcpServers": {
    "tabler": {
      "command": "npx",
      "args": ["-y", "tabler-mcp-server"]
    }
  }
}
```

### Exemples de prompts

- *« Crée-moi une page de connexion Tabler en mode sombre pour "Acme Cloud" »*
- *« Trouve une icône Tabler pour les factures et donne-moi le composant React »*
- *« Quel est le hex exact de la couleur danger de Tabler ? »*

### Crédits

Créé par le **studio IA Mafady** — Supervisé par **Dr Maher** · Licence [MIT](LICENSE) · Projet communautaire indépendant, non affilié à Tabler.
