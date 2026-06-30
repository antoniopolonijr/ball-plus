import type { PlayerPosition } from "../types/player";

export const PLAYER_POSITIONS: readonly PlayerPosition[] = [
  "Any",
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Attacker",
] as const;

export const PLAYER_POSITION_ABBREVIATIONS = {
  Any: "Any",
  Goalkeeper: "GK",
  Defender: "DF",
  Midfielder: "MF",
  Attacker: "AT",
} satisfies Record<PlayerPosition, string>;

export const PLAYER_POSITION_ORDER = {
  Goalkeeper: 1,
  Defender: 2,
  Midfielder: 3,
  Attacker: 4,
  Any: 5,
} satisfies Record<PlayerPosition, number>;
