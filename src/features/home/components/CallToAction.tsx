import { ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section
      aria-labelledby="home-cta-title"
      className="relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex max-w-xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit gap-2">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Ready for your next match?
          </Badge>

          <h2
            id="home-cta-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Spend less time organizing.
            <span className="block text-chart-4">More time playing.</span>
          </h2>

          <p className="text-muted-foreground">
            Set up your players, generate balanced teams, and get your game
            started.
          </p>
        </div>

        <Button asChild size="lg" className="shrink-0">
          <Link href="/quick-game">
            <Zap aria-hidden="true" className="size-4" />
            Start a Quick Game
          </Link>
        </Button>
      </div>
    </section>
  );
}
