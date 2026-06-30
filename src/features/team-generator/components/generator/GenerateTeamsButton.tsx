"use client";

import { Dices, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeamGeneratorStore } from "../../store/team-generator-store";
import type { TeamGenerationValidationCode } from "../../utils/can-generate-teams";
import { canGenerateTeams } from "../../utils/can-generate-teams";

export function GenerateTeamsButton() {
  const players = useTeamGeneratorStore((state) => state.players);
  const teams = useTeamGeneratorStore((state) => state.teams);

  const validation = canGenerateTeams(players, teams);
  const validationMessages: Record<TeamGenerationValidationCode, string> = {
    "not-enough-teams": "Add at least 2 teams.",
    "not-enough-players": "Add more players.",
  };

  const generateTeams = useTeamGeneratorStore((state) => state.generateTeams);

  return (
    <div className="flex flex-col gap-1">
      <Button
        size="lg"
        className="text-lg font-semibold p-8 max-w-50 w-full"
        onClick={generateTeams}
        disabled={!validation.canGenerate}
        aria-label="Generate balanced teams"
      >
        <Dices className="size-6" aria-hidden="true" />
        Generate Teams
      </Button>
      {validation.code && (
        <span className="flex gap-1 items-center justify-center text-sm text-muted-foreground">
          <Info className="size-4" aria-hidden="true" />
          {validationMessages[validation.code]}
        </span>
      )}
    </div>
  );
}
