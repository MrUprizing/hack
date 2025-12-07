"use server";

import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

export async function requestDevServer({ repoId }: { repoId: string }) {
  const { ephemeralUrl, devCommandRunning, installCommandRunning } =
    await freestyle.requestDevServer({ repoId });
  return { ephemeralUrl, devCommandRunning, installCommandRunning };
}
