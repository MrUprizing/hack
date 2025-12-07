"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/components/logo.svg";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary overflow-hidden">
            <Image src={logo} alt="logo" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            BackHero
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="relative" ref={menuRef}>
            {/** biome-ignore lint/a11y/useButtonType: <V0> */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Home
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-40 rounded-md border border-border bg-background shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#useCases"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Use cases
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#how-it-works"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      How it works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#comparation"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Comparation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#demo"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                    >
                      Demo
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer hidden md:inline-flex"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button size="sm" className="cursor-pointer hidden md:inline-flex">
              Start for Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
