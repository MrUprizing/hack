/** biome-ignore-all lint/correctness/useHookAtTopLevel: <V0> */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function useTypewriter(
  text: string,
  speed = 40,
  startDelay = 0,
  isActive = true,
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplayed("");
      return;
    }

    let i = 0;

    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed((prevDisplayed) => {
          if (i > text.length) {
            clearInterval(interval);
            return prevDisplayed;
          }
          const newDisplayed = text.slice(0, i + 1);
          i++;
          return newDisplayed;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, isActive]);

  return displayed;
}

const ENDPOINTS_LIST = [
  "POST /api/auth/register",
  "POST /api/auth/login",
  "GET /api/users/:id",
  "PUT /api/users/:id",
  "DELETE /api/users/:id",
];

export function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);

  const requestMessage =
    '"> I need a REST API to manage users with JWT authentication"';

  const endpointTypingSpeed = 40;
  const pauseBetweenEndpoints = 500;
  const baseDelayForEndpoints = 3500;

  const typedRequest = useTypewriter(requestMessage, 28, 300, showDemo);

  const delays = ENDPOINTS_LIST.reduce((acc, _endpoint, i) => {
    if (i === 0) {
      acc.push(baseDelayForEndpoints);
    } else {
      const prevEndpoint = ENDPOINTS_LIST[i - 1];
      const prevDelay = acc[i - 1];

      const typingTime = prevEndpoint.length * endpointTypingSpeed;

      const newDelay = prevDelay + typingTime + pauseBetweenEndpoints;
      acc.push(newDelay);
    }
    return acc;
  }, [] as number[]);

  const typedEndpoints = ENDPOINTS_LIST.map((endpoint, i) =>
    useTypewriter(endpoint, endpointTypingSpeed, delays[i], showDemo),
  );

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            layout
            className={`
              gap-12 items-center
              ${showDemo ? "lg:grid lg:grid-cols-2 lg:gap-16" : "flex flex-col"}
            `}
          >
            <motion.div
              className={`
                flex flex-col gap-8
                text-center items-center
                ${showDemo ? "lg:text-left lg:items-start" : ""}
              `}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 17,
                mass: 0.6,
                delay: showDemo ? 0.05 : 0,
              }}
              layout
            >
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Generate backends in seconds
              </div>

              <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl xl:text-7xl">
                Generate a complete backend from your requirements.
              </h1>

              <p className="text-pretty text-lg text-muted-foreground leading-relaxed lg:text-xl">
                BackHero transforms your ideas into endpoints, models, and
                ready-to-use architecture. No configuration, no complications.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 text-base h-12 px-8"
                >
                  <Link href="/app">
                    Generate backend now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border cursor-pointer text-foreground hover:bg-card text-base h-12 px-8 bg-transparent"
                  onClick={() => setShowDemo((s) => !s)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  View demo
                </Button>
              </div>
            </motion.div>

            {showDemo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/60"></div>
                    <div className="h-3 w-3 rounded-full bg-[#fbbf24]/60"></div>
                    <div className="h-3 w-3 rounded-full bg-[#34d399]/60"></div>
                  </div>

                  <div className="space-y-6 font-mono text-sm">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-muted-foreground mb-2">
                        # Your requirements:
                      </p>

                      <p className="text-foreground flex">
                        {typedRequest}
                        {typedRequest.length < requestMessage.length && (
                          <span className="ml-1 inline-block w-2 h-5 bg-foreground animate-pulse"></span>
                        )}
                      </p>
                    </div>

                    {typedRequest.length === requestMessage.length && (
                      <div className="flex items-center gap-2 pl-2">
                        <div className="h-1 w-1 rounded-full bg-primary animate-pulse"></div>
                        <div className="h-1 w-1 rounded-full bg-primary animate-pulse [animation-delay:200ms]"></div>
                        <div className="h-1 w-1 rounded-full bg-primary animate-pulse [animation-delay:400ms]"></div>
                      </div>
                    )}

                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-primary mb-3">✓ Backend generated:</p>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        {typedEndpoints.map((typedEndpoint, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <V0>
                          <p key={i} className="text-foreground">
                            {typedEndpoint}
                            {i === typedEndpoints.length - 1 &&
                              typedEndpoint.length <
                                ENDPOINTS_LIST[i].length && (
                                <span className="ml-1 inline-block w-1.5 h-3 bg-foreground animate-pulse"></span>
                              )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
