import Games from "@/features/games/components/Games";
import { getGames } from "@/features/games/data/getGames";
import { hexclaveServerApp } from "@/hexclave/server";

export default async function GamesPage() {
  const user = await hexclaveServerApp.getUser();

  const games = user ? await getGames() : null;

  return <Games games={games} />;
}
