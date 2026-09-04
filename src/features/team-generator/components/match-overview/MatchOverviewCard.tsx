"use client";

import { useShallow } from "zustand/shallow";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeamGeneratorStore } from "../../store/team-generator-store";
import { getMatchOverview } from "../../utils/get-match-overview";
import { getMatchRecommendations } from "../../utils/get-match-recommendations";
import { MatchOverview } from "./MatchOverview";
import { MatchRecommendations } from "./MatchRecommendations";

export function MatchOverviewCard() {
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
    <section aria-labelledby="match-overview-card-title">
      <Card>
        <CardHeader>
          <CardTitle id="match-overview-card-title">Match Overview</CardTitle>

          <CardDescription>Review your match setup.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <MatchOverview overview={overview} />
        </CardContent>

        <MatchRecommendations recommendations={recommendations} />
      </Card>
    </section>
  );
}
