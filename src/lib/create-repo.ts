import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

const { repoId } = await freestyle.createGitRepository({
  name: "Back Hero repo",
  public: true, // Deshabilita en producción
  source: {
    url: "https://github.com/MrUprizing/back-hero-template", // Reemplaza con la URL de tu repo de GitHub
  },
  devServers: {
    preset: "nextJs",
  },
});

console.log(`Created repo with ID: ${repoId}`);
