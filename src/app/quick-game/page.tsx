import { GeneratorActions } from "@/features/team-generator/components/generator/GeneratorActionsCard";
import { PlayersCard } from "@/features/team-generator/components/players/PlayersCard";
import { TeamsCard } from "@/features/team-generator/components/teams/TeamsCard";

export default function QuickGamePage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 py-4 md:py-6">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Quick Game
      </h1>
      <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-start md:justify-center">
        <div>
          <PlayersCard />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <TeamsCard />
          <GeneratorActions />
        </div>
      </div>
    </div>
  );
}
