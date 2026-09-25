import type { InferSelectModel } from "drizzle-orm";
import type { games } from "@/db/schema";
import { CreateGameButton } from "@/features/games/components/CreateGameButton";
import { EmptyGamesState } from "@/features/games/components/EmptyGamesState";
import { GameCard } from "@/features/games/components/GameCard";

type Game = InferSelectModel<typeof games>;

type GamesListProps = {
  games: Game[];
};

export default function GamesList({ games }: GamesListProps) {
  return (
    <section
      aria-labelledby="my-games-title"
      className="flex flex-col gap-6 py-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h1 id="my-games-title" className="text-3xl font-bold tracking-tight">
          My Games
        </h1>

        <CreateGameButton />
      </div>

      {games.length === 0 ? (
        <EmptyGamesState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}
