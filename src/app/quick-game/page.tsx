import { PlayersCard } from "@/features/team-generator/components/players/PlayersCard";

export default function QuickGamePage() {
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Quick Game</h1>

      <div className="space-y-6">
        <PlayersCard />
      </div>
    </div>
  );
}
