"use client";

import { UserButton, useHexclaveApp, useUser } from "@hexclave/next";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AuthControls() {
  const user = useUser();
  const app = useHexclaveApp();

  if (!user) {
    return (
      <Button
        type="button"
        aria-label="Get Started"
        onClick={() => app.redirectToSignIn()}
      >
        <LogIn className="size-4" aria-hidden="true" />
        <span className="hidden md:inline">Get Started</span>
      </Button>
    );
  }

  return <UserButton />;
}
