import type { Player } from "./player";

export type PitchLine =
  | "attackers"
  | "midfielders"
  | "defenders"
  | "goalkeepers";

export type PitchPlayersType = Record<PitchLine, Player[]>;
