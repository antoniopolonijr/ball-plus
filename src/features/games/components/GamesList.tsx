import type { InferSelectModel } from "drizzle-orm";
import type { games } from "@/db/schema";
import { GameCard } from "@/features/games/components/GameCard";

type Game = InferSelectModel<typeof games>;

type GamesListProps = {
  games: Game[];
};

export default function GamesList({ games }: GamesListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
