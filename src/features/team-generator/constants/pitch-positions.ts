import type { PitchLine } from "../types/pitch";
import type { PlayerPosition } from "../types/player";

export const PITCH_POSITIONS: Record<PlayerPosition, PitchLine> = {
  Attacker: "attackers",

  Midfielder: "midfielders",

  Any: "midfielders",

  Defender: "defenders",

  Goalkeeper: "goalkeepers",
};
