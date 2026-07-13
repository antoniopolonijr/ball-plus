import { PITCH_POSITIONS } from "../constants/pitch-positions";
import type { PitchPlayersType } from "../types/pitch";
import type { Player } from "../types/player";

export function getPitchPlayers(players: Player[]): PitchPlayersType {
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
