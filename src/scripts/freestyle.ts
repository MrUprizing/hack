import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

const { repoId } = await freestyle.createGitRepository({
  name: "Test Repository",
  public: true, // Considerar deshabilitar en producción
  source: {
    url: "https://github.com/freestyle-sh/freestyle-next",
    // type: "git",
  },
  devServers: {
    preset: "nextJs",
  },
});

console.log(`Created repo with ID: ${repoId}`);
