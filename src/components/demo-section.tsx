"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function DemoSection() {
  const [inputValue, setInputValue] = useState(
    "Create an API for a blog with posts, comments, and users...",
  );

  const [touched, setTouched] = useState(false);
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      id="trial"
      className="py-24 bg-background opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-foreground lg:text-5xl">
              Try BackHero
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              See how we transform your ideas into code
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Input side */}
              <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-card-foreground">
                    Describe your backend
                  </h3>
                  <span className="text-xs text-muted-foreground">Example</span>
                </div>

                <textarea
                  className="h-64 w-full resize-none rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => {
                    if (!touched) {
                      setInputValue("");
                      setTouched(true);
                    }
                  }}
                />
                <Button className="cursor-pointer mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate backend
                </Button>
              </div>

              {/* Output side - Static Value Content */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  {/* Changed title to promise value */}
                  <h3 className="text-sm font-semibold text-card-foreground">
                    What you'll get instantly 🚀
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    REST API
                  </span>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#10b981]/10 px-2 py-0.5 text-xs font-semibold text-[#10b981]">
                      GET
                    </span>
                    <span className="text-foreground">Data reading routes</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#3b82f6]/10 px-2 py-0.5 text-xs font-semibold text-[#3b82f6]">
                      POST
                    </span>
                    <span className="text-foreground">
                      Creation and registration routes
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#10b981]/10 px-2 py-0.5 text-xs font-semibold text-[#10b981]">
                      GET
                    </span>
                    <span className="text-foreground">
                      Advanced filters and search
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#f59e0b]/10 px-2 py-0.5 text-xs font-semibold text-[#f59e0b]">
                      PUT
                    </span>
                    <span className="text-foreground">
                      Update routes (PUT/PATCH)
                    </span>
                  </div>

                  {/* Route 5: DELETE - Deletion */}
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#ef4444]/10 px-2 py-0.5 text-xs font-semibold text-[#ef4444]">
                      DELETE
                    </span>
                    <span className="text-foreground">
                      Resource deletion routes
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#10b981]/10 px-2 py-0.5 text-xs font-semibold text-[#10b981]">
                      GET
                    </span>
                    <span className="text-foreground">
                      Model relationships (e.g.: Posts/Comments)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <span className="rounded bg-[#3b82f6]/10 px-2 py-0.5 text-xs font-semibold text-[#3b82f6]">
                      POST
                    </span>
                    <span className="text-foreground">
                      Authentication system (Login)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
