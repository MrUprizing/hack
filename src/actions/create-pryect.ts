"use server";

import { FreestyleSandboxes } from "freestyle-sandboxes";
import prisma from "@/lib/prisma";

export async function createProyectAction(name: string, userId: string) {
  try {
    const freestyle = new FreestyleSandboxes();

    const { repoId } = await freestyle.createGitRepository({
      name: name,
      public: true,
      source: {
        url: "https://github.com/MrUprizing/back-hero-template",
      },
    });

    const proyect = await prisma.proyect.create({
      data: {
        id: repoId,
        name: name,
        userId: userId,
      },
    });

    return { success: true, proyect };
  } catch (error) {
    console.error("Error creating proyect:", error);
    return { success: false, error: String(error) };
  }
}
