export type PlayerPosition =
  | "Any"
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Attacker";

export type PlayerSkill = "Low" | "Medium" | "High";

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  skill: PlayerSkill;
  substitutionOrder?: number;
  isActive: boolean;
}
