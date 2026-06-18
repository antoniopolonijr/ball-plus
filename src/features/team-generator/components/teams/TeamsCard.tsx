"use client";

import { ListRestart, ShieldPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamsTable } from "@/features/team-generator/components/teams/TeamsTable";
import { useTeamGeneratorStore } from "@/features/team-generator/store/team-generator-store";
import { TeamCountSelect } from "./TeamCountSelect";
import { TeamsEmptyState } from "./TeamsEmptyState";

export function TeamsCard() {
  const teams = useTeamGeneratorStore((state) => state.teams);

  const addTeam = useTeamGeneratorStore((state) => state.addTeam);
  const resetTeams = useTeamGeneratorStore((state) => state.resetTeams);

  return (
    <section aria-labelledby="teams-heading">
      <Card>
        <CardHeader>
          <CardTitle id="teams-heading" className="flex items-center gap-2">
            Teams
            <TeamCountSelect />
          </CardTitle>

          <CardDescription>Customize team names and colors.</CardDescription>
        </CardHeader>

        <CardContent>
          {teams.length === 0 ? (
            <TeamsEmptyState />
          ) : (
            <TeamsTable teams={teams} />
          )}
        </CardContent>
        <CardFooter className="justify-between gap-2">
          <Button
            onClick={resetTeams}
            variant="destructive"
            aria-label="Reset teams"
          >
            <ListRestart className="size-4" aria-hidden="true" />
            Reset
            <span className="hidden sm:inline"> Teams</span>
          </Button>

          <Button onClick={addTeam} aria-label="Add team">
            <ShieldPlus className="size-4" aria-hidden="true" />
            Add
            <span className="hidden sm:inline">Team</span>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
