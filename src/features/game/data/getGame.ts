import { db } from "@/db";
import { hexclaveServerApp } from "@/hexclave/server";

function isValidUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function getGame(gameId: string) {
  const user = await hexclaveServerApp.getUser({
    or: "redirect",
  });

  if (!isValidUUID(gameId)) {
    return undefined;
  }

  const game = await db.query.games.findFirst({
    where: {
      id: gameId,
      ownerId: user.id,
    },
  });

  if (!game) {
    return undefined;
  }

  return {
    ...game,
    generationResult: game.generationResult
      ? {
          ...game.generationResult,
          generatedAt: new Date(game.generationResult.generatedAt),
        }
      : null,
  };
}
