"use client";

import { useHexclaveApp } from "@hexclave/next";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GetStartedButtonProps {
  responsive?: boolean;
}

export function GetStartedButton({
  responsive = false,
}: GetStartedButtonProps) {
  const app = useHexclaveApp();

  return (
    <Button
      type="button"
      onClick={() => app.redirectToSignIn()}
      aria-label="Get Started"
      className="w-full sm:w-auto"
    >
      <LogIn className="size-4" aria-hidden="true" />

      <span className={responsive ? "hidden md:inline" : undefined}>
        Get Started
      </span>
    </Button>
  );
}
