import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function HomeIntro() {
  return (
    <div className="flex flex-col items-start gap-5">
      <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1">
        <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
        Built for your next match
      </Badge>

      <h1
        id="home-title"
        className="max-w-xl text-4xl font-bold tracking-tight text-balance sm:text-5xl"
      >
        Fair teams
        <span className="block text-chart-4">Better games</span>
      </h1>

      <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        Create balanced football teams based on player skill and position.
        Organize your game in minutes and spend more time on the pitch.
      </p>
    </div>
  );
}
