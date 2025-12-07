import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { getDevServer } from "@/actions/dev-server";

export type ChatMessage = UIMessage;

export async function POST(req: Request) {
  const body = await req.json();
  const repoId = body.repoId;
  const messages: ChatMessage[] = body.messages;

  console.log(`RepoId: ${repoId}`);

  const devServer = await getDevServer(repoId);

  const tools = {
    readFile: tool({
      description: "Read a file from the dev server",
      inputSchema: z.object({
        path: z.string().describe("Path of the file to read"),
      }),
      execute: async ({ path }) => {
        const content = await devServer.fs.readFile(path);
        return content;
      },
    }),

    writeFile: tool({
      description: "Write content to a file",
      inputSchema: z.object({
        path: z.string().describe("File path"),
        content: z.string().describe("Content to write"),
      }),
      execute: async ({ path, content }) => {
        await devServer.fs.writeFile(path, content);
        return `File ${path} written successfully`;
      },
    }),

    editFile: tool({
      description: "Search and replace content in a file",
      inputSchema: z.object({
        path: z.string().describe("File path"),
        search: z.string().describe("Text to search"),
        replace: z.string().describe("Replacement text"),
      }),
      execute: async ({ path, search, replace }) => {
        const content = await devServer.fs.readFile(path);
        const updated = content.replace(search, replace);
        await devServer.fs.writeFile(path, updated);
        return `Changes applied to ${path}`;
      },
    }),

    ls: tool({
      description: "List files in a directory",
      inputSchema: z.object({
        path: z.string().describe("Directory path"),
      }),
      execute: async ({ path }) => {
        const files = await devServer.fs.ls(path);
        return files;
      },
    }),

    exec: tool({
      description: "Execute a command on the dev server",
      inputSchema: z.object({
        command: z.string().describe("Command to execute"),
      }),
      execute: async ({ command }) => {
        const result = await devServer.process.exec(command);
        return { stdout: result.stdout, stderr: result.stderr };
      },
    }),

    lint: tool({
      description: "Run npm run lint to validate the code",
      inputSchema: z.object({
        path: z
          .string()
          .optional()
          .describe("Optional path to run lint in a specific directory"),
      }),
      execute: async ({ path }) => {
        const command = path ? `npm run lint -- ${path}` : "npm run lint";
        const result = await devServer.process.exec(command);
        return {
          success: result.stderr ? false : true,
          stdout: result.stdout,
          stderr: result.stderr,
        };
      },
    }),

    commitAndPush: tool({
      description: "Commit and push changes to the repository",
      inputSchema: z.object({
        message: z.string().describe("Commit message"),
      }),
      execute: async ({ message }) => {
        await devServer.commitAndPush(message);
        return `Changes pushed with message: ${message}`;
      },
    }),
  };

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    maxRetries: 2,
    system:
      "You are an API builder with HonoJs + @hono/zod-openapi. Edit the API in /template as requested. Read the readme first. Only make necessary changes. " +
      "The server always runs in dev, do not execute dev commands. " +
      "Do not use markdown code blocks in your responses. " +
      "IMPORTANT: After writing or editing any code file, ALWAYS run the 'lint' tool to validate that the code is correct.",
    messages: convertToModelMessages(messages),
    tools,
    abortSignal: AbortSignal.timeout(120000),
    stopWhen: stepCountIs(100),
  });

  return result.toUIMessageStreamResponse();
}
