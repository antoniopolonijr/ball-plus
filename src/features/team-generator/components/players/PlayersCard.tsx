"use client";

import { ClipboardList, UserPlus } from "lucide-react";
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
import { PlayerCountSelect } from "./PlayerCountSelect";
import { PlayersEmptyState } from "./PlayersEmptyState";

export function PlayersCard() {
  const players = useTeamGeneratorStore((state) => state.players);

  const addPlayer = useTeamGeneratorStore((state) => state.addPlayer);

  return (
    <section aria-label="Players List">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Players
            <PlayerCountSelect />
          </CardTitle>

          <CardDescription>
            Build your player list and generate balanced teams in seconds.
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
          {players.length === 0 ? (
            <PlayersEmptyState />
          ) : (
            <PlayersTable players={players} />
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={addPlayer} aria-label="Add a new player">
            <UserPlus className="size-4" aria-hidden="true" />
            Add Player
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
