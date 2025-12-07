"use client";

import { useChat } from "@ai-sdk/react";
import { FreestyleDevServer } from "freestyle-sandboxes/react/dev-server";
import { requestDevServer } from "@/actions/dev-server";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Tool } from "@/components/ui/tool";

export default function Chat() {
  const params = useParams();
  const repoId = params.repoId as string;
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat();

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="flex flex-col w-full h-full max-w-md py-24 mx-auto stretch">
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === "user" ? "User: " : "AI: "}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;

                // Renderizar herramientas dinámicamente
                case "dynamic-tool":
                case "tool-fileSearch":
                case "tool-apiCall":
                case "tool-databaseQuery":
                case "tool-emailSend":
                  return (
                    <Tool
                      key={`${message.id}-${i}`}
                      toolPart={{
                        type: part.type.replace("tool-", ""),
                        state: part.state as
                          | "input-streaming"
                          | "input-available"
                          | "output-available"
                          | "output-error",
                        input:
                          (part.input as Record<string, unknown>) || undefined,
                        output:
                          (part.output as Record<string, unknown>) || undefined,
                        errorText: part.errorText as string | undefined,
                        toolCallId: part.toolCallId as string | undefined,
                      }}
                      className="w-full mt-2"
                    />
                  );

                default:
                  return (
                    <div key={`${message.id}-${i}`}>{JSON.stringify(part)}</div>
                  );
              }
            })}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input, metadata: { repoId } });
            setInput("");
          }}
        >
          <input
            className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Build"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
      <div className="col-span-3">
        <FreestyleDevServer actions={{ requestDevServer }} repoId={repoId} />
      </div>
    </div>
  );
}
