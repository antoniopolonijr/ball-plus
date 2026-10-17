import type { GeneratedPlayer } from "./generated-team";
import type { PlayerPosition } from "./player";

export type PitchRow =
  | "attackers"
  | "midfielders"
  | "defenders"
  | "goalkeepers";

export type PitchPlayerData = Pick<
  GeneratedPlayer,
  "id" | "name" | "position" | "rotationOrder"
>;

export type PitchPlayers = Record<PitchRow, PitchPlayerData[]>;

export const PITCH_POSITIONS: Record<PlayerPosition, PitchRow> = {
  Attacker: "attackers",
  Midfielder: "midfielders",
  Unassigned: "midfielders",
  Defender: "defenders",
  Goalkeeper: "goalkeepers",
};
