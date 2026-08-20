import { Separator } from "@/components/ui/separator";
import type { MatchOverviewData } from "../../utils/get-match-overview";

interface MatchOverviewProps {
  overview: MatchOverviewData;
}

export function MatchOverview({ overview }: MatchOverviewProps) {
  const {
    teams,
    players,
    playersNeeded,
    goalkeepers,
    defenders,
    midfielders,
    attackers,
    any,
  } = overview;

  return (
    <section aria-labelledby="match-overview-title" className="space-y-2">
      <h3 id="match-overview-title" className="font-semibold">
        Match Overview
      </h3>

      <dl className="space-y-1 text-sm">
        <OverviewItem label="Teams" value={teams} />

        <OverviewItem label="Players" value={players} />

        <OverviewItem label="Players Needed" value={playersNeeded} />

        <Separator className="my-2" />

        <OverviewItem label="Goalkeepers" value={goalkeepers} />

        <OverviewItem label="Defenders" value={defenders} />

        <OverviewItem label="Midfielders" value={midfielders} />

        <OverviewItem label="Attackers" value={attackers} />

        <OverviewItem label="Any Position" value={any} />
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
