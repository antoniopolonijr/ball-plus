"use client";

import { Separator } from "@/components/ui/separator";

import { useTeamGeneratorStore } from "../../store/team-generator-store";
import { getMatchOverview } from "../../utils/get-match-overview";

export function MatchOverview() {
  const players = useTeamGeneratorStore((state) => state.players);

  const teams = useTeamGeneratorStore((state) => state.teams);

  const overview = getMatchOverview(players, teams);

  return (
    <section aria-labelledby="match-overview-title" className="space-y-2">
      <h3 id="match-overview-title" className="font-semibold">
        Match Overview
      </h3>

      <dl className="space-y-1 text-sm">
        <OverviewItem label="Players" value={overview.players} />

        <OverviewItem label="Teams" value={overview.teams} />

        <Separator className="my-2" />

        <OverviewItem label="Goalkeepers" value={overview.goalkeepers} />

        <OverviewItem label="Defenders" value={overview.defenders} />

        <OverviewItem label="Midfielders" value={overview.midfielders} />

        <OverviewItem label="Attackers" value={overview.attackers} />

        <OverviewItem label="Any" value={overview.any} />
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
