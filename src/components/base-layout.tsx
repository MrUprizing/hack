import type React from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">{children}</main>

      <Footer />
    </div>
  );
}
