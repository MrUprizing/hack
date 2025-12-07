import { headers } from "next/headers";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateProyectDialog } from "./create-proyect";
import { NavUser } from "./nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const proyects = session?.user?.id
    ? await prisma.proyect.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          name: true,
        },
      })
    : [];

  return (
    <Sidebar variant="inset" {...props}>
      <NavUser />
      <CreateProyectDialog />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Proyects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {proyects.map((proyect) => (
                <SidebarMenuItem key={proyect.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/app/${proyect.id}`}>{proyect.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
