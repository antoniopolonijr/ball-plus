"use client";

import { ClipboardList, ListRestart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayersTable } from "@/features/team-generator/components/players/PlayersTable";
import { useTeamGeneratorStore } from "@/features/team-generator/store/team-generator-store";

export function PlayersCard() {
  const players = useTeamGeneratorStore((state) => state.players);

  const addPlayer = useTeamGeneratorStore((state) => state.addPlayer);
  const resetPlayers = useTeamGeneratorStore((state) => state.resetPlayers);

  return (
    <section aria-labelledby="players-heading">
      <Card>
        <CardHeader>
          <CardTitle id="players-heading" className="flex items-center gap-2">
            Players
            {/* TODO PlayersCountSelect */}
            <span className="text-muted-foreground">({players.length})</span>
          </CardTitle>

          <CardDescription>
            Manage players before generating teams.
          </CardDescription>

          <CardAction>
            <Button variant="secondary" aria-label="Paste a list of players">
              <ClipboardList className="size-4" aria-hidden="true" />
              Paste
              <span className="hidden sm:inline">Players</span>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <PlayersTable players={players} />
        </CardContent>
        <CardFooter className="justify-between gap-2">
          <Button
            onClick={resetPlayers}
            variant="destructive"
            aria-label="Reset players"
          >
            <ListRestart className="size-4" aria-hidden="true" />
            Reset
            <span className="hidden sm:inline"> Players</span>
          </Button>

          <Button onClick={addPlayer} aria-label="Add player">
            <UserPlus className="size-4" aria-hidden="true" />
            Add
            <span className="hidden sm:inline">Player</span>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
