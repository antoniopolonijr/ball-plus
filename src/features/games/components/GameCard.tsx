import type { InferSelectModel } from "drizzle-orm";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import type { games } from "@/db/schema";
import { DeleteGameDialog } from "./DeleteGameDialog";
import { GameCover } from "./GameCover";

type Game = InferSelectModel<typeof games>;

type GameCardProps = {
  game: Game;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="py-0">
      <GameCover
        gameId={game.id}
        gameName={game.name}
        hasCover={Boolean(game.coverImagePath)}
      />

      <CardHeader>
        <h2 className="line-clamp-2 break-words text-lg font-semibold leading-snug tracking-tight">
          {game.name}
        </h2>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0 pb-0.5" aria-hidden="true" />
          <span>Updated {dateFormatter.format(game.updatedAt)}</span>
        </p>
      </CardHeader>

      <CardFooter className="justify-between">
        <DeleteGameDialog gameId={game.id} gameName={game.name} />

        <Button asChild className="gap-1">
          <Link href={`/games/${game.id}`} aria-label={`Open ${game.name}`}>
            Open Game
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
