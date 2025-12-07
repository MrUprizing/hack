import { headers } from "next/headers";
import Link from "next/link";
import { CreateProyectDialog } from "@/components/create-proyect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AppPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const proyects = session?.user?.id
    ? await prisma.proyect.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <div className="flex flex-col gap-6 p-6 bg-input/50 h-full overflow-auto border rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proyects</h1>
          <p className="text-gray-500 text-sm">
            Manage your proyects and repositories
          </p>
        </div>
        <CreateProyectDialog />
      </div>

      {proyects.length === 0 ? (
        <Card className="flex items-center justify-center h-64">
          <CardContent className="text-center">
            <p className="text-gray-500 mb-4">No proyects yet</p>
            <CreateProyectDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proyects.map((proyect) => (
            <Card
              key={proyect.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg">{proyect.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-500">
                  Created {new Date(proyect.createdAt).toLocaleDateString()}
                </p>
                <Button asChild className="w-full">
                  <Link href={`/app/${proyect.id}`}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
