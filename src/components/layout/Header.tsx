import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { UserButton } from "@hexclave/next";
import { FolderOpen, Zap } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  return (
    <header className="border-b bg-card py-3 px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary navigation"
        className="flex items-center justify-between gap-2 sm:gap-4"
      >
        <Link
          href="/"
          aria-label="Go to homepage"
          className="rounded-sm text-2xl font-bold tracking-tight outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Ball+
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button asChild variant="outline">
            <Link href="/games" aria-label="My Games">
              <FolderOpen aria-hidden="true" className="size-4" />

              <span className="hidden sm:inline">My Games</span>
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/quick-game" aria-label="Quick Game">
              <Zap className="size-4" />

              <span className="hidden sm:inline">Quick Game</span>
            </Link>
          </Button>

          <Separator orientation="vertical" />

          <ThemeToggle />

          <Separator orientation="vertical" />

          <UserButton />
        </div>
      </nav>
    </header>
  );
}
