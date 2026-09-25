"use client";

import { UserPlus } from "lucide-react";
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
import { PastePlayersButton } from "./PastePlayersButton";
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
            Add, remove, and edit player names, positions, and skills. You can
            also paste a list of players.
          </CardDescription>

          <CardAction>
            <PastePlayersButton />
          </CardAction>
        </CardHeader>

        <CardContent>
          {players.length === 0 ? (
            <PlayersEmptyState />
          ) : (
            <PlayersTable players={players} />
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={addPlayer} aria-label="Add a new player">
            <UserPlus className="size-4" aria-hidden="true" />
            Add Player
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
