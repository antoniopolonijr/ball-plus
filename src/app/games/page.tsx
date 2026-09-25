import GamesList from "@/features/games/components/GamesList";
import GamesListNoUser from "@/features/games/components/GamesListNoUser";
import { getGames } from "@/features/games/data/getGames";
import { hexclaveServerApp } from "@/hexclave/server";

export default async function GamesPage() {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    return <GamesListNoUser />;
  }

  const games = await getGames();

  return <GamesList games={games} />;
}
