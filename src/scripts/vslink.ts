import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

// Asumiendo que ya tienes un repoId
const repoId = "472956b7-2a21-4dde-9daa-08f4160cc537";

const devServer = await freestyle.requestDevServer({ repoId });

const { codeServerUrl } = devServer;

console.log(`URL de VSCode Web Interface: ${codeServerUrl}`);
