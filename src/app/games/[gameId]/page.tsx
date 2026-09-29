import { notFound } from "next/navigation";

import Game from "@/features/game/components/Game";
import { getGame } from "@/features/game/data/getGame";

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

  return <Game game={game} />;
}
