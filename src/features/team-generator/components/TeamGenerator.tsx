import { GeneratedTeamsCard } from "./generated-teams/GeneratedTeamsCard";
import { GeneratorActionsCard } from "./generator-actions/GeneratorCardActions";
import { GeneratorSettingsCard } from "./generator-settings/GeneratorSettingsCard";
import { MatchOverviewCard } from "./match-overview/MatchOverviewCard";
import { PlayersCard } from "./players/PlayersCard";
import { TeamsCard } from "./teams/TeamsCard";

type TeamGeneratorProps = {
  generatedTeamsTitle?: string;
};

export default function TeamGenerator({
  generatedTeamsTitle = "Balanced Teams",
}: TeamGeneratorProps) {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-2/3">
          <PlayersCard />
        </div>

        <div className="flex flex-col gap-6 md:w-1/3 md:justify-between">
          <TeamsCard />
          <GeneratorSettingsCard />
          <MatchOverviewCard />
          <GeneratorActionsCard />
        </div>
      </div>

      <GeneratedTeamsCard title={generatedTeamsTitle} />
    </>
  );
}
