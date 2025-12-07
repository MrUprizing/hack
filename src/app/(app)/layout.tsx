// Sidebar from https://ui.shadcn.com/

import { GithubIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login", RedirectType.push);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg ">BackHero</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/MrUprizing/hack" target="_blank">
                Star on GitHub
                <GithubIcon size={10} />
              </Link>
            </Button>
          </div>
        </header>

        <div className="h-[calc(100vh-48px)] overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
