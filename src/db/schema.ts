import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import type { PersistedGenerationResult } from "@/features/game/types/persisted-game";
import type { Player } from "@/features/team-generator/types/player";
import type { Team } from "@/features/team-generator/types/team";

export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  ownerId: text("owner_id").notNull(),

  players: jsonb("players").$type<Player[]>().notNull(),

  teams: jsonb("teams").$type<Team[]>().notNull(),

  playersPerTeam: integer("players_per_team").notNull(),

  generationResult: jsonb(
    "generation_result",
  ).$type<PersistedGenerationResult | null>(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Game = typeof games.$inferSelect;

export type NewGame = typeof games.$inferInsert;
