/** biome-ignore-all lint/suspicious/noArrayIndexKey: <V0> */
"use client";
import { Code, Database, Download, Layers, Wrench, Zap } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const features = [
  {
    icon: Code,
    title: "Build in Minutes What Used to Take Weeks",
    description:
      "Focus on the product, not on setting up foundations. The platform eliminates repetitive work, accelerates development, and takes you from idea to production in a fraction of the time.",
  },
  {
    icon: Database,
    title: "Critical Integrations in a Single Command",
    description:
      "Authentication, permissions, databases, message queues, and payments integrate automatically based on your prompt. Everything connected and working as if you configured it manually.",
  },
  {
    icon: Wrench,
    title: "Evolve Your Project with Intelligent Changes",
    description:
      "Each new instruction updates the complete project: migrations, models, routes, and logic adjust automatically without breaking system consistency.",
  },
  {
    icon: Zap,
    title: "Complete Architecture Generated from a Single Sentence",
    description:
      "Turn simple instructions into a professional backend: APIs (REST/GraphQL/RPC), models, validations, and tests ready for production, without the delay.",
  },
  {
    icon: Layers,
    title: "Edit to Your Liking in Real Time",
    description:
      "You'll be able to edit what our AI generates to your liking and see your changes in real time! All without leaving our platform.",
  },
  {
    icon: Download,
    title: "Test Your Endpoints Easily",
    description:
      "You'll be able to extract test code that you can run anywhere to test your endpoints and verify they work correctly.",
  },
];

export function FeaturesSection() {
  const ref = useRevealOnScroll<HTMLElement>();
  return (
    <section
      ref={ref}
      id="features"
      className="py-24 bg-background opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-4xl font-bold text-foreground lg:text-5xl">
              Everything you need for your backend
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              From idea to code in minutes, not days
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
