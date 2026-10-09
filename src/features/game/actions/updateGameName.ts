"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

export async function updateGameName(gameId: string, name: string) {
  const user = await hexclaveServerApp.getUser({
    or: "redirect",
  });

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Game name cannot be empty");
  }

  const [updatedGame] = await db
    .update(games)
    .set({
      name: trimmedName,
      updatedAt: new Date(),
    })
    .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)))
    .returning({
      id: games.id,
      name: games.name,
    });

  if (!updatedGame) {
    throw new Error("Game not found");
  }

  return updatedGame;
}
