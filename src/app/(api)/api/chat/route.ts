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
      description: "Lee un archivo del dev server",
      inputSchema: z.object({
        path: z.string().describe("Ruta del archivo a leer"),
      }),
      execute: async ({ path }) => {
        const content = await devServer.fs.readFile(path);
        return content;
      },
    }),

    writeFile: tool({
      description: "Escribe contenido en un archivo",
      inputSchema: z.object({
        path: z.string().describe("Ruta del archivo"),
        content: z.string().describe("Contenido a escribir"),
      }),
      execute: async ({ path, content }) => {
        await devServer.fs.writeFile(path, content);
        return `Archivo ${path} escrito correctamente`;
      },
    }),

    editFile: tool({
      description: "Busca y reemplaza contenido en un archivo",
      inputSchema: z.object({
        path: z.string().describe("Ruta del archivo"),
        search: z.string().describe("Texto a buscar"),
        replace: z.string().describe("Texto de reemplazo"),
      }),
      execute: async ({ path, search, replace }) => {
        const content = await devServer.fs.readFile(path);
        const updated = content.replace(search, replace);
        await devServer.fs.writeFile(path, updated);
        return `Cambios aplicados a ${path}`;
      },
    }),

    ls: tool({
      description: "Lista archivos en un directorio",
      inputSchema: z.object({
        path: z.string().describe("Ruta del directorio"),
      }),
      execute: async ({ path }) => {
        const files = await devServer.fs.ls(path);
        return files;
      },
    }),

    exec: tool({
      description: "Ejecuta un comando en el dev server",
      inputSchema: z.object({
        command: z.string().describe("Comando a ejecutar"),
      }),
      execute: async ({ command }) => {
        const result = await devServer.process.exec(command);
        return { stdout: result.stdout, stderr: result.stderr };
      },
    }),

    commitAndPush: tool({
      description: "Commit y push de cambios al repositorio",
      inputSchema: z.object({
        message: z.string().describe("Mensaje del commit"),
      }),
      execute: async ({ message }) => {
        await devServer.commitAndPush(message);
        return `Cambios pusheados con mensaje: ${message}`;
      },
    }),
  };

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    maxRetries: 2,
    system:
      "Eres un constructor de API con HonoJs + @hono/zod-openapi. Edita el API en /template según lo solicitado. Lee el readme primero. Solo haz cambios necesarios. " +
      "El servidor siempre corre en dev, no ejecutes comandos dev. " +
      "No uses bloques de código markdown en tus respuestas. " +
      "Nunca ejecutes comandos.",
    messages: convertToModelMessages(messages),
    tools,
    abortSignal: AbortSignal.timeout(120000),
    stopWhen: stepCountIs(100),
  });

  return result.toUIMessageStreamResponse();
}
