"use client";

import { useTheme } from "next-themes";
import { BsCircleHalf } from "react-icons/bs";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      variant="outline"
      onClick={handleToggleTheme}
      aria-label="Toggle Theme"
    >
      <BsCircleHalf className="size-4" aria-hidden="true" />

      <span className="hidden sm:inline">Theme</span>
    </Button>
  );
}
