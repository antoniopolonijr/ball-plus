import type { Player } from "./player";
import type { Team } from "./team";
export interface GeneratedPlayer extends Player {
  startsOnBench?: boolean;
  rotationOrder?: number;
}
export interface GeneratedTeam {
  team: Team;
  players: GeneratedPlayer[];
}
