"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/logo.svg";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function Footer() {
  const ref = useRevealOnScroll<HTMLElement>();
  return (
    <footer
      ref={ref}
      className="border-t border-border bg-card/30 opacity-0 translate-y-10 transition-all duration-700 ease-out"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary overflow-hidden">
                  {/* <Code2 className="h-5 w-5 text-primary-foreground" /> */}
                  <Image src={logo} alt="logo" />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  BackHero
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Generate complete backends with AI. From idea to code in
                seconds.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#home"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#howItWorks"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#trial"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Trial
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#docs"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#github"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cookies"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 BackHero. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
