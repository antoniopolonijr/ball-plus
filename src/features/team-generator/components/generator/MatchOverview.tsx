"use client";

import { useShallow } from "zustand/shallow";
import { Separator } from "@/components/ui/separator";

import { useTeamGeneratorStore } from "../../store/team-generator-store";
import { getMatchOverview } from "../../utils/get-match-overview";

export function MatchOverview() {
  const { players, teams, playersPerTeam } = useTeamGeneratorStore(
    useShallow((state) => ({
      players: state.players,
      teams: state.teams,
      playersPerTeam: state.playersPerTeam,
    })),
  );

  const overview = getMatchOverview(players, teams, playersPerTeam);

  return (
    <section aria-labelledby="match-overview-title" className="space-y-2">
      <h3 id="match-overview-title" className="font-semibold">
        Match Overview
      </h3>

      <dl className="space-y-1 text-sm">
        <OverviewItem label="Teams" value={overview.teams} />

        <Separator className="my-2" />

        <OverviewItem label="Players" value={overview.players} />

        <OverviewItem label="Starters" value={overview.starters} />

        <OverviewItem label="Bench" value={overview.bench} />

        <Separator className="my-2" />

        <OverviewItem label="Goalkeepers" value={overview.goalkeepers} />

        <OverviewItem label="Defenders" value={overview.defenders} />

        <OverviewItem label="Midfielders" value={overview.midfielders} />

        <OverviewItem label="Attackers" value={overview.attackers} />

        <OverviewItem label="Any Position" value={overview.any} />
      </dl>
    </section>
  );
}

interface OverviewItemProps {
  label: string;
  value: number;
}

function OverviewItem({ label, value }: OverviewItemProps) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>

      <dd className="font-medium">{value}</dd>
    </div>
  );
}
