import type { GeneratedPlayer } from "../types/generated-team";
import type { PitchPlayers } from "../types/pitch-formation";
import { PITCH_POSITIONS } from "../types/pitch-formation";

export interface PitchData {
  formation: PitchPlayers;
  bench: GeneratedPlayer[];
}
export function getPitchData(players: GeneratedPlayer[]): PitchData {
  const formation: PitchPlayers = {
    attackers: [],
    midfielders: [],
    defenders: [],
    goalkeepers: [],
  };

  const bench: GeneratedPlayer[] = [];

  for (const player of players) {
    if (player.startsOnBench) {
      bench.push(player);
      continue;
    }

    formation[PITCH_POSITIONS[player.position]].push(player);
  }

  return {
    formation,
    bench,
  };
}
