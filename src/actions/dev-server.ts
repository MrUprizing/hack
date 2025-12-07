"use server";

import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

export async function requestDevServer({ repoId }: { repoId: string }) {
  const {
    ephemeralUrl,
    codeServerUrl,
    devCommandRunning,
    installCommandRunning,
  } = await freestyle.requestDevServer({ repoId });
  console.log("ephemeralUrl", ephemeralUrl);
  return {
    ephemeralUrl,
    devCommandRunning,
    installCommandRunning,
    codeServerUrl,
  };
}

export async function getDevServer(repoId: string) {
  return await freestyle.requestDevServer({ repoId });
}
