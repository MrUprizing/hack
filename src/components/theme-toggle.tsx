// Component are picked from
// https://github.com/legions-developer/evilcharts/ and adapted to this project

"use client";

import { useTheme } from "next-themes";
import IconLight from "@/components/icon-light";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <IconLight />
    </Button>
  );
}
