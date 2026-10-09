import type { InferSelectModel } from "drizzle-orm";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { games } from "@/db/schema";
import { DeleteGameDialog } from "./DeleteGameDialog";

type Game = InferSelectModel<typeof games>;

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>

        <CardDescription>
          Last updated{" "}
          {game.updatedAt.toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </CardDescription>
      </CardHeader>

      <CardFooter className="justify-end gap-4">
        <DeleteGameDialog gameId={game.id} gameName={game.name} />

        <Button asChild>
          <Link href={`/games/${game.id}`} aria-label={`Open ${game.name}`}>
            <ArrowUpRight aria-hidden="true" />
            Open
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
