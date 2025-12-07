"use server";

import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

export async function getDevServerMcpUrl(repoId: string) {
  const devServer = await freestyle.requestDevServer({ repoId });
  return devServer.mcpEphemeralUrl;
}
