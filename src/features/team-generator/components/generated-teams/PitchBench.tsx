import type { GeneratedPlayer } from "../../types/generated-team";
import { PitchPlayer } from "./PitchPlayer";

interface PitchBenchProps {
  players: GeneratedPlayer[];
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
    <section aria-labelledby="pitch-bench-heading" className="p-1">
      <div className="flex flex-wrap gap-1 items-center justify-start">
        <h5
          id="pitch-bench-heading"
          className="rounded bg-black/90 px-2 py-1 text-sm font-semibold tracking-wide text-white max-w-15 text-center mr-1"
        >
          Starts on Bench
        </h5>
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
