import type { Player } from "./player";
import type { Team } from "./team";

export interface GeneratedTeamType {
  team: Team;
  players: Player[];
}
