import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function initializeMCP(mcpUrl: string) {
  const devServerMcp = await createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(mcpUrl)),
  });

  const toolsResponse = await devServerMcp.tools();
  return toolsResponse.tools;
}
