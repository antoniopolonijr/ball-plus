import { notFound } from "next/navigation";

import { getGame } from "@/features/games/data/getGame";

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  const game = await getGame(gameId);

  if (!game) {
    notFound();
  }

  return (
    <section
      aria-labelledby="game-page-title"
      className="flex flex-col gap-6 py-6"
    >
      <header>
        <h1 id="game-page-title" className="text-3xl font-bold tracking-tight">
          {game.name}
        </h1>
      </header>
    </section>
  );
}
