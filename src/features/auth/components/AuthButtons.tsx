import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button asChild variant="outline">
        <Link href="/sign-in" aria-label="Sign in">
          <LogIn className="size-4" />

          <span className="hidden md:inline">Sign in</span>
        </Link>
      </Button>

      <Button asChild>
        <Link href="/sign-up" aria-label="Sign up">
          <UserPlus className="size-4" />

          <span className="hidden md:inline">Sign up</span>
        </Link>
      </Button>
    </div>
  );
}
