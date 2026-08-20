import type { PlayerPosition } from "../types/player";
import type { GeneratedPlayer } from "./generated-team";

export type PitchRow =
  | "attackers"
  | "midfielders"
  | "defenders"
  | "goalkeepers";

export type PitchPlayers = Record<PitchRow, GeneratedPlayer[]>;

export const PITCH_POSITIONS: Record<PlayerPosition, PitchRow> = {
  Attacker: "attackers",

  Midfielder: "midfielders",

  Unassigned: "midfielders",

  Defender: "defenders",

  Goalkeeper: "goalkeepers",
};
