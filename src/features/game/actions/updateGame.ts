"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { games } from "@/db/schema";
import type { GenerationResult } from "@/features/team-generator/types/generation-result";
import type { Player } from "@/features/team-generator/types/player";
import type { Team } from "@/features/team-generator/types/team";
import { hexclaveServerApp } from "@/hexclave/server";

type UpdateGameInput = {
  gameId: string;
  players: Player[];
  teams: Team[];
  playersPerTeam: number;
  generationResult: GenerationResult | null;
};

export async function updateGame({
  gameId,
  players,
  teams,
  playersPerTeam,
  generationResult,
}: UpdateGameInput) {
  const user = await hexclaveServerApp.getUser({
    or: "redirect",
  });

  const persistedGenerationResult = generationResult
    ? {
        ...generationResult,
        generatedAt: generationResult.generatedAt.toISOString(),
      }
    : null;

  const [updatedGame] = await db
    .update(games)
    .set({
      players,
      teams,
      playersPerTeam,
      generationResult: persistedGenerationResult,
      updatedAt: new Date(),
    })
    .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)))
    .returning({
      id: games.id,
      updatedAt: games.updatedAt,
    });

  if (!updatedGame) {
    throw new Error("Game not found");
  }

  return updatedGame;
}
