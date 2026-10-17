import type { PitchPlayerData } from "../../types/pitch-formation";
import { PitchPlayer } from "./PitchPlayer";

interface PitchBenchProps {
  players: PitchPlayerData[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function PitchBench({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchBenchProps) {
  if (players.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Players starting on the bench"
      className="bg-chart-4 p-1"
    >
      <div className="flex flex-wrap items-center justify-start gap-1">
        <span className="mr-1 max-w-15 rounded bg-black/90 px-2 py-1 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
          Starts on Bench
        </span>

        {players.map((player) => (
          <PitchPlayer
            key={player.id}
            player={player}
            placeholderPlayerNumber={
              placeholderPlayerNumberMap.get(player.id) ?? 0
            }
            teamColor={teamColor}
          />
        ))}
      </div>
    </section>
  );
}
