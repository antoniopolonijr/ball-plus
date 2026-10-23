ALTER TABLE "games" ADD COLUMN "players" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "teams" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "players_per_team" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "generation_result" jsonb;