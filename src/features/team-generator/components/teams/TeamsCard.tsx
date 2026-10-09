"use client";

import { ShieldPlus } from "lucide-react";
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
import { useTeamGeneratorStore } from "@/features/team-generator/store/use-team-generator-store";
import { TeamCountSelect } from "./TeamCountSelect";
import { TeamsEmptyState } from "./TeamsEmptyState";

export function TeamsCard() {
  const teams = useTeamGeneratorStore((state) => state.teams);

  const addTeam = useTeamGeneratorStore((state) => state.addTeam);

  return (
    <section aria-label="Teams List">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Teams
            <TeamCountSelect />
          </CardTitle>

          <CardDescription>
            Add, remove, and edit team names and colors.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {teams.length === 0 ? (
            <TeamsEmptyState />
          ) : (
            <TeamsTable teams={teams} />
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={addTeam} aria-label="Add a new team">
            <ShieldPlus className="size-4" aria-hidden="true" />
            Add Team
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
