import type { PlayerPosition } from "../types/player";

export const PLAYER_POSITIONS: readonly PlayerPosition[] = [
  "any",
  "goalkeeper",
  "defender",
  "midfielder",
  "attacker",
] as const;

export const PLAYER_POSITION_ABBREVIATIONS = {
  any: "Any",
  goalkeeper: "GK",
  defender: "DF",
  midfielder: "MF",
  attacker: "AT",
} satisfies Record<PlayerPosition, string>;

export const PLAYER_POSITION_ORDER = {
  goalkeeper: 1,
  defender: 2,
  midfielder: 3,
  attacker: 4,
  any: 5,
} satisfies Record<PlayerPosition, number>;
