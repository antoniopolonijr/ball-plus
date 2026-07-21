// Position

export type PlayerPosition =
  | "Any"
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Attacker";

export const PLAYER_POSITIONS: PlayerPosition[] = [
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

/**
 * Display order used when sorting players by position.
 */
export const PLAYER_POSITION_SORT_ORDER = {
  Goalkeeper: 1,
  Defender: 2,
  Midfielder: 3,
  Attacker: 4,
  Any: 5,
} satisfies Record<PlayerPosition, number>;

// Skill

export type PlayerSkill = "Low" | "Medium" | "High";

export const PLAYER_SKILLS: PlayerSkill[] = ["Low", "Medium", "High"] as const;

export const PLAYER_SKILL_ABBREVIATIONS = {
  Low: "L",
  Medium: "M",
  High: "H",
} satisfies Record<PlayerSkill, string>;

/**
 * Display order used when sorting players by skill.
 */
export const PLAYER_SKILL_SORT_ORDER = {
  Low: 1,
  Medium: 2,
  High: 3,
} satisfies Record<PlayerSkill, number>;

// Entity
export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  skill: PlayerSkill;
  isActive: boolean;
}
