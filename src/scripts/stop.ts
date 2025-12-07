import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

// Asegúrate de reemplazar 'your_repo_id' con el ID real de tu repositorio
const repoId = "5318ff9e-1485-4db2-9d3a-58f1b568c3da";

console.log(`Intentando solicitar el dev server para el repoId: ${repoId}`);

try {
  const { shutdown } = await freestyle.requestDevServer({
    repoId: repoId,
  });

  console.log(
    `Dev server solicitado. Iniciando el proceso de apagado para el repoId: ${repoId}`,
  );
  shutdown();
  console.log(
    `Función shutdown() ejecutada para el dev server del repoId: ${repoId}`,
  );
} catch (error) {
  console.error(
    `Error al intentar apagar el dev server para el repoId: ${repoId}`,
    error,
  );
}
