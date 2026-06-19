"use client";

import { Dices } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { GeneratedTeam } from "@/features/team-generator/types/generated-team";

import { useTeamGeneratorStore } from "../../store/team-generator-store";

export function GenerateTeamsButton() {
  const players = useTeamGeneratorStore((state) => state.players);

  const teams = useTeamGeneratorStore((state) => state.teams);

  const playersCount = useTeamGeneratorStore((state) => state.players.length);

  const teamsCount = useTeamGeneratorStore((state) => state.teams.length);

  const canGenerate =
    playersCount >= 2 && teamsCount >= 2 && playersCount >= teamsCount;

  const setGenerationResult = useTeamGeneratorStore(
    (state) => state.setGenerationResult,
  );

  function handleGenerateTeams() {
    // TODO: Implement real team generation algorithm
    const generatedTeams: GeneratedTeam[] = teams.map((team) => ({
      team,
      players: [],
    }));

    players.forEach((player, index) => {
      const teamIndex = index % teams.length;

      generatedTeams[teamIndex].players.push(player);
    });

    setGenerationResult({
      id: `generated-teams-${Math.random().toString(36).slice(2, 11)}`,

      generatedAt: new Date(),

      teams: generatedTeams,
    });
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
