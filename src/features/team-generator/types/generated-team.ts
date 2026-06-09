import type { Player } from "./player";

export interface GeneratedTeam {
  id: string;
  name: string;
  players: Player[];
}
