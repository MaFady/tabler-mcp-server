#!/usr/bin/env node
/**
 * tabler-mcp-server entry point (stdio transport).
 *
 * Created by Mafady AI Studio — Supervised by Dr Maher.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { SERVER_NAME, SERVER_VERSION } from "./version.js";

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout is reserved for the MCP protocol — log to stderr only.
  console.error(`${SERVER_NAME} v${SERVER_VERSION} running on stdio`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
