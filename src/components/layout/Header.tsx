import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { soccerPitch } from "@lucide/lab";
import { Icon, Zap } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AuthControls } from "@/features/auth/components/AuthControls";

export function Header() {
  return (
    <header className="border-b bg-card">
      <PageContainer>
        <nav
          aria-label="Primary navigation"
          className="flex py-4 items-center justify-between gap-2 sm:gap-4"
        >
          <Link
            href="/"
            aria-label="Go to homepage"
            className="rounded-sm text-2xl font-bold tracking-tight outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ball+
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button asChild variant="default">
              <Link href="/games" aria-label="Games">
                <Icon
                  iconNode={soccerPitch}
                  aria-hidden="true"
                  className="size-4"
                />

                <span className="hidden md:inline">Games</span>
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/quick-game" aria-label="Quick Game">
                <Zap className="size-4" />

                <span className="hidden md:inline">Quick Game</span>
              </Link>
            </Button>

            <Separator orientation="vertical" />

            <ThemeToggle />

            <Separator orientation="vertical" />

            <Suspense fallback={null}>
              <AuthControls />
            </Suspense>
          </div>
        </nav>
      </PageContainer>
    </header>
  );
}
