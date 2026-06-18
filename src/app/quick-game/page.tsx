import { PlayersCard } from "@/features/team-generator/components/players/PlayersCard";
import { TeamsCard } from "@/features/team-generator/components/teams/TeamsCard";

export default function QuickGamePage() {
  return (
    <div className="py-4 md:py-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Quick Game</h1>

      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        <div className="w-full">
          <PlayersCard />
        </div>
        <div>
          <TeamsCard />
        </div>
      </div>
    </div>
  );
}
