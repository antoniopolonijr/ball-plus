import { Separator } from "@/components/ui/separator";
import type { MatchOverviewData } from "../../utils/get-match-overview";

interface MatchOverviewProps {
  overview: MatchOverviewData;
}

export function MatchOverview({ overview }: MatchOverviewProps) {
  const {
    teams,
    players,
    playersPerTeam,
    goalkeepers,
    defenders,
    midfielders,
    attackers,
    unassigned,
  } = overview;

  return (
    <div className="space-y-2">
      <dl className="space-y-1 text-sm">
        <OverviewItem label="Players per Team" value={playersPerTeam} />

        <OverviewItem label="Teams" value={teams} />

        <OverviewItem label="Players" value={players} />

        <Separator className="my-2" decorative />

        <OverviewItem label="Goalkeepers" value={goalkeepers} />

        <OverviewItem label="Defenders" value={defenders} />

        <OverviewItem label="Midfielders" value={midfielders} />

        <OverviewItem label="Attackers" value={attackers} />

        <OverviewItem label="Unassigned Position" value={unassigned} />
      </dl>
    </div>
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
