import type { GeneratedPlayer } from "../../types/generated-team";
import { getPitchData } from "../../utils/get-pitch-data";
import { PitchBench } from "../pitch/PitchBench";
import { PitchField } from "../pitch/PitchField";
import { PitchStarters } from "../pitch/PitchStarters";

interface PitchProps {
  players: GeneratedPlayer[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function Pitch({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchProps) {
  const { formation, bench } = getPitchData(players);

  return (
    <section aria-label="Pitch" className="overflow-hidden rounded border">
      <div className="relative aspect-[3/4]">
        <PitchField />

        <PitchStarters
          players={formation}
          placeholderPlayerNumberMap={placeholderPlayerNumberMap}
          teamColor={teamColor}
        />
      </div>

      <PitchBench
        players={bench}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />
    </section>
  );
}
