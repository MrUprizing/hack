"use client";
import { Check, X } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function ComparisonSection() {
  const ref = useRevealOnScroll<HTMLElement>();
  const comparisons = [
    {
      feature: "Create CRUD API",
      manual: "Hours of code",
      BackHero: "Minutes",
    },
    {
      feature: "Define data models",
      manual: "Manual and repetitive",
      BackHero: "Automatic",
    },
    {
      feature: "Configure infrastructure",
      manual: "Complex and technical",
      BackHero: "Generated ready to deploy",
    },
    {
      feature: "Implement authentication",
      manual: "Days of development",
      BackHero: "Included by default",
    },
    {
      feature: "Scale project",
      manual: "Depends on developer",
      BackHero: "Prepared from the start",
    },
    {
      feature: "Total setup time",
      manual: "Several days",
      BackHero: "Less than 1 hour",
    },
  ];

  return (
    <section
      ref={ref}
      id="comparison"
      className="py-24 px-4 bg-linear-to-b from-background to-muted/20 opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Comparison
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Understand in seconds why BackHero accelerates your development
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Aspect
                  </th>
                  <th className="text-center py-6 px-8 text-base font-semibold text-muted-foreground">
                    Manual development
                  </th>
                  <th className="text-center py-6 px-8 text-base font-semibold bg-primary/5">
                    <span className="text-primary">BackHero</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr
                    // biome-ignore lint/suspicious/noArrayIndexKey: <V0>
                    key={index}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-6 px-8 font-medium text-foreground">
                      {item.feature}
                    </td>
                    <td className="py-6 px-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <X className="h-5 w-5 text-destructive/70" />
                        <span className="text-sm text-muted-foreground">
                          {item.manual}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-center bg-primary/5">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {item.BackHero}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Save{" "}
            <span className="text-primary font-semibold">+80% of the time</span>{" "}
            on backend development
          </p>
        </div>
      </div>
    </section>
  );
}
