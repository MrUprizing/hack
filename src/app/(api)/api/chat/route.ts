import { experimental_createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { getDevServerMcpUrl } from "@/actions/mcp-url";

export async function POST(req: Request) {
  const body = await req.json();
  const messages: UIMessage[] = body.messages;
  // const repoId = "5318ff9e-1485-4db2-9d3a-58f1b568c3da";
  const repoId = "1deeeac6-d2fd-45f6-bd44-d49dd5543d32";

  const mcpUrl = await getDevServerMcpUrl(repoId);
  const mcpClient = await experimental_createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(mcpUrl)),
  });
  const tools = await mcpClient.tools();

  const result = streamText({
    model: "anthropic/claude-haiku-4.5",
    system:
      "You are an AI App Builder. The existing app is in the /template directory. Please edit the app how the user wants and commit the changes incrementally." +
      "Read readme for repo structure an before only make changes when and where is necesary." +
      `estructura: hack-git/
      ├── src/
      │   ├── index.ts          # Punto de entrada de la aplicación
      │   ├── routes.ts         # Definición de rutas y handlers
      │   └── schemas.ts        # Esquemas de validación (Zod)
      ├── dist/                 # Archivos compilados (generados)
      ├── package.json          # Dependencias y scripts
      ├── tsconfig.json         # Configuración de TypeScript
      ├── bun.lock              # Lock file de dependencias
      └── README.md             # Este archivo` +
      "No hagas llamadas de mas con las tools",
    messages: convertToModelMessages(messages),
    toolChoice: "auto",
    tools,
    stopWhen: stepCountIs(30),
  });

  return result.toUIMessageStreamResponse();
}
