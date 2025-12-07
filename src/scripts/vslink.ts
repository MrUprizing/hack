import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

// Asumiendo que ya tienes un repoId
const repoId = "5318ff9e-1485-4db2-9d3a-58f1b568c3da";

const devServer = await freestyle.requestDevServer({ repoId });

const { codeServerUrl } = devServer;

console.log(`URL de VSCode Web Interface: ${codeServerUrl}`);
