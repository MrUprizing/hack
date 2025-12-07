"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@/components/ai-elements/web-preview";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  Maximize2Icon,
  MousePointerClickIcon,
  RefreshCcwIcon,
  CodeIcon,
} from "lucide-react";
import { requestDevServer } from "@/actions/dev-server";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Tool } from "@/components/ui/tool";
import type { ChatMessage } from "@/app/(api)/api/chat/route";

export default function Chat() {
  const params = useParams();
  const repoId = params.repoId as string;
  const [ephemeralUrl, setEphemeralUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [devCommandRunning, setDevCommandRunning] = useState(false);
  const [installCommandRunning, setInstallCommandRunning] = useState(false);
  const [codeServerUrl, setCodeServerUrl] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [input, setInput] = useState("");
  const intervalRef = useRef<NodeJS.Timeout>();

  const { messages, sendMessage } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  useEffect(() => {
    const fetchDevServer = async () => {
      const result = await requestDevServer({ repoId });
      setEphemeralUrl(result.ephemeralUrl);
      setCurrentUrl(result.ephemeralUrl);
      setDevCommandRunning(result.devCommandRunning);
      setInstallCommandRunning(result.installCommandRunning);
      setCodeServerUrl(result.codeServerUrl);
    };

    fetchDevServer();

    intervalRef.current = setInterval(fetchDevServer, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [repoId]);

  const handleGoBack = () => {
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.history.back();
    }
  };

  const handleGoForward = () => {
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.history.forward();
    }
  };

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  const handleUrlChange = (newUrl: string) => {
    setCurrentUrl(newUrl);
  };

  const handleOpenExternal = () => {
    if (currentUrl) {
      window.open(currentUrl, "_blank");
    }
  };

  const handleOpenCodeServer = () => {
    if (codeServerUrl) {
      window.open(codeServerUrl, "_blank");
    }
  };

  return (
    <div className="flex h-full gap-2">
      <div className="w-[35%] bg-card flex border rounded-md flex-col py-6 px-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="whitespace-pre-wrap mb-4 text-sm">
              {message.role === "user" ? "User: " : "AI: "}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;

                  case "tool-use":
                    return (
                      <Tool
                        key={`${message.id}-${i}`}
                        toolPart={{
                          type: (part as any).toolName,
                          state: "input-available",
                          input: (part as any).input,
                          toolCallId: (part as any).toolCallId,
                        }}
                      />
                    );

                  case "tool-result":
                    return (
                      <Tool
                        key={`${message.id}-${i}`}
                        toolPart={{
                          type: (part as any).toolName || "Result",
                          state: "output-available",
                          output: (part as any).result,
                        }}
                      />
                    );

                  default:
                    return (
                      <div key={`${message.id}-${i}`} className="text-gray-500">
                        [{part.type}]
                      </div>
                    );
                }
              })}
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({
              text: input,
            });
            setInput("");
          }}
          className="w-full"
        >
          <input
            className="w-full p-2 border border-zinc-300 dark:border-zinc-800 rounded bg-white dark:bg-zinc-900 text-sm"
            value={input}
            placeholder="Build"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>

      <div className="w-[65%]">
        <WebPreview
          defaultUrl={ephemeralUrl}
          onUrlChange={handleUrlChange}
          style={{ height: "100%" }}
        >
          <WebPreviewNavigation>
            <WebPreviewNavigationButton
              onClick={handleGoBack}
              tooltip="Go back"
            >
              <ArrowLeftIcon className="size-4" />
            </WebPreviewNavigationButton>
            <WebPreviewNavigationButton
              onClick={handleGoForward}
              tooltip="Go forward"
            >
              <ArrowRightIcon className="size-4" />
            </WebPreviewNavigationButton>
            <WebPreviewNavigationButton onClick={handleReload} tooltip="Reload">
              <RefreshCcwIcon className="size-4" />
            </WebPreviewNavigationButton>
            <WebPreviewUrl />
            <WebPreviewNavigationButton
              onClick={handleOpenExternal}
              tooltip="Open in new tab"
            >
              <ExternalLinkIcon className="size-4" />
            </WebPreviewNavigationButton>
            <WebPreviewNavigationButton
              onClick={handleOpenCodeServer}
              tooltip="Open VS Code"
              disabled={!codeServerUrl}
            >
              <CodeIcon className="size-4" />
            </WebPreviewNavigationButton>
          </WebPreviewNavigation>

          <WebPreviewBody key={reloadKey} src={currentUrl} />

          <WebPreviewConsole
            logs={[
              {
                level: "log" as const,
                message: `Dev command: ${devCommandRunning ? "running" : "stopped"}`,
                timestamp: new Date(),
              },
              {
                level: "log" as const,
                message: `Install: ${installCommandRunning ? "running" : "completed"}`,
                timestamp: new Date(),
              },
            ]}
          />
        </WebPreview>
      </div>
    </div>
  );
}
