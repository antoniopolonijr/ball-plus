import GamesList from "@/features/games/components/GamesList";
import GamesListNoUser from "@/features/games/components/GamesListNoUser";
import { hexclaveServerApp } from "@/hexclave/server";

export default async function GamesPage() {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    return <GamesListNoUser />;
  }

  return <GamesList />;
}
