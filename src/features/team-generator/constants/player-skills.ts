import type { PlayerSkill } from "../types/player";

export const PLAYER_SKILLS: readonly PlayerSkill[] = [
  "low",
  "medium",
  "high",
] as const;

export const PLAYER_SKILL_ABBREVIATIONS = {
  low: "L",
  medium: "M",
  high: "H",
} satisfies Record<PlayerSkill, string>;

export const PLAYER_SKILL_ORDER = {
  low: 1,
  medium: 2,
  high: 3,
} satisfies Record<PlayerSkill, number>;
