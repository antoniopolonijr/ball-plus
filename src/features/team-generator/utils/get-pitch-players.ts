import type { GeneratedPlayer } from "../types/generated-team";
import type { PitchPlayers } from "../types/pitch-formation";
import { PITCH_POSITIONS } from "../types/pitch-formation";

export function getPitchPlayers(players: GeneratedPlayer[]): PitchPlayers {
  const attackers = players.filter(
    (player) => PITCH_POSITIONS[player.position] === "attackers",
  );

  const midfielders = players.filter(
    (player) => PITCH_POSITIONS[player.position] === "midfielders",
  );

  const defenders = players.filter(
    (player) => PITCH_POSITIONS[player.position] === "defenders",
  );

  const goalkeepers = players.filter(
    (player) => PITCH_POSITIONS[player.position] === "goalkeepers",
  );

  return {
    attackers,
    midfielders,
    defenders,
    goalkeepers,
  };
}
