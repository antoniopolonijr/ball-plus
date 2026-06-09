export type PlayerPosition =
  | "any"
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "attacker";

export type PlayerSkill = "low" | "medium" | "high";

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  skill: PlayerSkill;
  substituteOrder: number | null;
  isActive: boolean;
}
