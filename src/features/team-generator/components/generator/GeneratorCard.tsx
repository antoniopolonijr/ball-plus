"use client";

import { useShallow } from "zustand/shallow";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTeamGeneratorStore } from "../../store/team-generator-store";
import { getMatchOverview } from "../../utils/get-match-overview";
import { getMatchRecommendations } from "../../utils/get-match-recommendations";
import { GeneratorActions } from "./GeneratorActions";
import { GeneratorSettings } from "./GeneratorSettings";
import { MatchOverview } from "./MatchOverview";
import { MatchRecommendations } from "./MatchRecommendations";

export function GeneratorCard() {
  const { players, teams, playersPerTeam } = useTeamGeneratorStore(
    useShallow((state) => ({
      players: state.players,
      teams: state.teams,
      playersPerTeam: state.playersPerTeam,
    })),
  );

  const overview = getMatchOverview(players, teams, playersPerTeam);

  const recommendations = getMatchRecommendations(overview);

  return (
    <section aria-labelledby="generator-card-title">
      <Card>
        <CardHeader>
          <CardTitle id="generator-card-title">Match Generator</CardTitle>

          <CardDescription>
            Review the match setup before generating balanced teams.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <GeneratorSettings />

          <Separator />

          <MatchOverview overview={overview} />

          <Separator />

          <MatchRecommendations recommendations={recommendations} />
        </CardContent>

        <CardFooter className="justify-center items-center">
          <GeneratorActions />
        </CardFooter>
      </Card>
    </section>
  );
}
