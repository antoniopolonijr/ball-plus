"use server";

import { del } from "@vercel/blob";
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
    .returning({
      id: games.id,
      coverImagePath: games.coverImagePath,
    });

  if (!deletedGame) {
    throw new Error(
      "Game not found or you do not have permission to delete it.",
    );
  }

  revalidatePath("/games");

  if (deletedGame.coverImagePath) {
    try {
      await del(deletedGame.coverImagePath);
    } catch (error) {
      console.error(
        `Failed to delete cover image for game ${deletedGame.id}:`,
        error,
      );
    }
  }

  return {
    success: true,
    message: `Game ${deletedGame.id} deleted successfully`,
  };
}
