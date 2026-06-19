import type { Player } from "./player";
import type { Team } from "./team";

export interface GeneratedTeam {
  team: Team;
  players: Player[];
}
