"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

export async function deleteGame(gameId: string) {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const [deletedGame] = await db
    .delete(games)
    .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)))
    .returning({ id: games.id });

  if (!deletedGame) {
    throw new Error(
      "Game not found or you do not have permission to delete it.",
    );
  }

  revalidatePath("/games");

  return {
    success: true,
    message: `Game ${deletedGame.id} deleted successfully`,
  };
}
