import { GeneratedTeams } from "@/features/team-generator/components/generated-teams/GeneratedTeams";
import { GeneratorCard } from "@/features/team-generator/components/generator/GeneratorCard";
import { PlayersCard } from "@/features/team-generator/components/players/PlayersCard";
import { TeamsCard } from "@/features/team-generator/components/teams/TeamsCard";

export default function QuickGamePage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 py-4 md:py-6">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Quick Game
      </h1>

      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        <div className="md:w-2/3">
          <PlayersCard />
        </div>

        <div className="md:w-1/3 flex flex-col gap-4 md:gap-6 md:justify-between">
          <TeamsCard />
          <div className="hidden md:inline flex-1 bg-sidebar-primary-foreground">
            TODO
          </div>
          <GeneratorCard />
        </div>
      </div>

      <GeneratedTeams />
    </div>
  );
}
