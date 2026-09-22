import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/features/auth/components/GetStartedButton";

export default function GamesListNoUser() {
  return (
    <section
      aria-labelledby="games-page-no-user-title"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-12 text-center"
    >
      <div className="max-w-xl space-y-3">
        <h1
          id="games-page-no-user-title"
          className="text-3xl font-bold tracking-tight"
        >
          Save your games
        </h1>

        <p className="text-muted-foreground">
          Create a free account to save your games, players, and match settings.
          Come back anytime and pick up where you left off.
        </p>
      </div>

      <GetStartedButton />

      <p className="text-sm text-muted-foreground">
        Want to generate teams without creating an account?
      </p>

      <Button asChild variant="outline">
        <Link href="/quick-game" aria-label="Quick Game">
          <Zap className="size-4" aria-hidden="true" />

          <span>Quick Game</span>
        </Link>
      </Button>
    </section>
  );
}
