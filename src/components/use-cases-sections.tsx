"use client";
import { Network, Shield, Zap } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const useCases = [
  {
    icon: Zap,
    title: "CRUD APIs in minutes",
    description:
      "Automatically generate endpoints for users, products, or any entity.",
  },
  {
    icon: Shield,
    title: "Authentication and permissions",
    description: "Create complete login, registration, and role modules.",
  },
  {
    icon: Network,
    title: "Internal services and microservices",
    description: "Define business flows and get the generated architecture.",
  },
];

export function UseCasesSection() {
  const ref = useRevealOnScroll<HTMLElement>();
  return (
    <section
      ref={ref}
      id="useCases"
      className="py-24 bg-background opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-balance text-4xl font-bold lg:text-5xl">
              Use cases
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Specific solutions for your backend needs
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <V0>
                key={index}
                className="
                  rounded-3xl
                  bg-card
                  border border-border/60
                  p-8
                  hover:bg-card/50
                  transition-all
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                  mb-6 flex h-14 w-14 items-center justify-center
                  rounded-2xl bg-primary/10
                  text-primary
                "
                >
                  <useCase.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>

                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
