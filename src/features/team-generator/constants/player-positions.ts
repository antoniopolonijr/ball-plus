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
