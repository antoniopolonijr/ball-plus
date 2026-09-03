"use client";

import { Dices, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTeamGeneratorStore } from "../../store/team-generator-store";
import type { TeamGenerationValidationCode } from "../../utils/can-generate-teams";
import { canGenerateTeams } from "../../utils/can-generate-teams";

export function GenerateTeamsButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const players = useTeamGeneratorStore((state) => state.players);
  const teams = useTeamGeneratorStore((state) => state.teams);

  const validation = canGenerateTeams(players, teams);
  const validationMessages: Record<TeamGenerationValidationCode, string> = {
    "not-enough-teams": "Add at least 2 teams.",
    "not-enough-players": "Add more players.",
  };

  const generateTeams = useTeamGeneratorStore((state) => state.generateTeams);

  async function handleGenerateTeams() {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    generateTeams();

    setIsGenerating(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        size="lg"
        className="text-lg font-semibold p-8 max-w-50 w-full"
        onClick={handleGenerateTeams}
        disabled={!validation.canGenerate || isGenerating}
        aria-label="Generate balanced teams"
      >
        <Dices
          className={`size-6 ${isGenerating ? "animate-spin motion-reduce:animate-none" : ""}`}
          aria-hidden="true"
        />
        {isGenerating ? "Balancing..." : "Generate Teams"}
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
