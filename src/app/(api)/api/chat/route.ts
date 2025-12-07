import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { getDevServerMcpUrl } from "@/actions/mcp-url";
import { anthropic } from "@ai-sdk/anthropic";

export type ChatMessage = UIMessage;

export async function POST(req: Request) {
  const body = await req.json();
  const repoId = body.repoId;
  const messages: ChatMessage[] = body.messages;

  console.log(`RepoId: ${repoId}`);

  const mcpUrl = await getDevServerMcpUrl(repoId);
  const mcpClient = await createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(mcpUrl)),
  });

  const tools = await mcpClient.tools();

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    maxRetries: 2,
    system:
      "You are an AI APi Builder with HonoJs + @hono/zod-openapi. Edit the api in /template as requested. Read readme first. Only make necessary changes." +
      "First check Readme, this file contains contex about project" +
      "Avoid use a lot of tools per request. use contex" +
      "The server allways run un dev so dont run dev commands" +
      "Dont use markdown code block on your answers" +
      " Dont run comands never" +
      "No linter, no dependency installation only when user ask for it.",
    messages: convertToModelMessages(messages),
    tools,
    abortSignal: AbortSignal.timeout(120000), // 5 seconds
    stopWhen: stepCountIs(100),
    onFinish: async () => {
      await mcpClient.close();
    },
  });

  return result.toUIMessageStreamResponse();
}
