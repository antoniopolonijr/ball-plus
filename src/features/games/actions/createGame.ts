"use server";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

export async function createGame() {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const [createdGame] = await db
    .insert(games)
    .values({
      name: "New Game",
      ownerId: user.id,
    })
    .returning({ id: games.id });

  if (!createdGame) {
    throw new Error("Failed to create game");
  }

  return {
    success: true as const,
    id: createdGame.id,
    message: `Game ${createdGame.id} created successfully`,
  };
}
