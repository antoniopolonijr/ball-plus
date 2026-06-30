import type { PlayerSkill } from "../types/player";

export const PLAYER_SKILLS: readonly PlayerSkill[] = [
  "Low",
  "Medium",
  "High",
] as const;

export const PLAYER_SKILL_ABBREVIATIONS = {
  Low: "L",
  Medium: "M",
  High: "H",
} satisfies Record<PlayerSkill, string>;

export const PLAYER_SKILL_ORDER = {
  Low: 1,
  Medium: 2,
  High: 3,
} satisfies Record<PlayerSkill, number>;
