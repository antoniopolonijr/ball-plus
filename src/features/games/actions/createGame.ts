"use server";

import { db } from "@/db";
import { games } from "@/db/schema";
import {
  DEFAULT_PLAYER_COUNT,
  DEFAULT_PLAYERS_PER_TEAM,
  DEFAULT_TEAM_COUNT,
} from "@/features/team-generator/constants/defaults";
import { createInitialPlayers } from "@/features/team-generator/utils/create-initial-players";
import { createInitialTeams } from "@/features/team-generator/utils/create-initial-teams";
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
      players: createInitialPlayers(DEFAULT_PLAYER_COUNT),
      teams: createInitialTeams(DEFAULT_TEAM_COUNT),
      playersPerTeam: DEFAULT_PLAYERS_PER_TEAM,
      generationResult: null,
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
