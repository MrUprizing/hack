"use client";
import { Cpu, Download, Edit3 } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const steps = [
  {
    number: "01",
    icon: Edit3,
    title: "Describe your requirements",
    description:
      "Write in natural language what functionalities your backend needs.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "BackHero generates your API",
    description:
      "Our application analyzes your needs and generates the complete architecture.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download and deploy",
    description:
      "Get the source code ready to use and deploy it wherever you prefer.",
  },
];

export function HowItWorksSection() {
  const ref = useRevealOnScroll<HTMLElement>();
  return (
    <section
      ref={ref}
      id="howItWorks"
      className="py-24 bg-card/30 opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-4xl font-bold text-card-foreground lg:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Three simple steps to your perfect backend
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <V0>
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-border md:block" />
                )}

                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>

                <div className="mb-2 text-sm font-mono text-primary">
                  {step.number}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="text-pretty text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
