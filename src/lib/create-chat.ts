import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

export async function createChat() {
  const { repoId } = await freestyle.createGitRepository({
    name: "Test Repository 2",
    public: true,
    source: {
      url: "https://github.com/freestyle-sh/freestyle-next", // replace this with your own template repo
      // type: "git",
    },
    devServers: {
      preset: "nextJs",
    },
  });
  console.log("Created repo with ID:", repoId);
  const { ephemeralUrl } = await freestyle.requestDevServer({
    repoId: repoId,
  });

  return {
    repoId,
    ephemeralUrl,
  };
}
