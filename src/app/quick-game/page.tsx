import { GeneratedTeamsCard } from "@/features/team-generator/components/generated-teams/GeneratedTeamsCard";
import { GeneratorActionsCard } from "@/features/team-generator/components/generator-actions/GeneratorCardActions";
import { ResetAllButton } from "@/features/team-generator/components/generator-actions/ResetAllButton";
import { GeneratorSettingsCard } from "@/features/team-generator/components/generator-settings/GeneratorSettingsCard";
import { MatchOverviewCard } from "@/features/team-generator/components/match-overview/MatchOverviewCard";
import { PlayersCard } from "@/features/team-generator/components/players/PlayersCard";
import { TeamsCard } from "@/features/team-generator/components/teams/TeamsCard";

export default function QuickGamePage() {
  return (
    <section
      aria-labelledby="quick-game-page-title"
      className="flex flex-col gap-6 py-6"
    >
      <div className="flex items-center justify-between gap-4 md:gap-6">
        <h1
          id="quick-game-page-title"
          className="text-3xl font-bold tracking-tight text-center"
        >
          Quick Game
        </h1>
        <ResetAllButton />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-2/3">
          <PlayersCard />
        </div>

        <div className="md:w-1/3 flex flex-col gap-6 md:justify-between">
          <TeamsCard />
          <GeneratorSettingsCard />
          <MatchOverviewCard />
          <GeneratorActionsCard />
        </div>
      </div>

      <GeneratedTeamsCard />
    </section>
  );
}
