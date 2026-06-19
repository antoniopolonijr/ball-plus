"use client";

import { Dices } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTeamGeneratorStore } from "../../store/team-generator-store";

export function GenerateTeamsButton() {
  const playersCount = useTeamGeneratorStore((state) => state.players.length);

  const teamsCount = useTeamGeneratorStore((state) => state.teams.length);

  const canGenerate =
    playersCount >= 2 && teamsCount >= 2 && playersCount >= teamsCount;

  function handleGenerateTeams() {
    // TODO: Implement team generation algorithm
  }

  return (
    <Button
      size="lg"
      className="text-lg font-semibold py-6 w-full"
      onClick={handleGenerateTeams}
      disabled={!canGenerate}
      aria-label="Generate balanced teams"
    >
      <Dices className="size-6" aria-hidden="true" />
      Generate Teams
    </Button>
  );
}
