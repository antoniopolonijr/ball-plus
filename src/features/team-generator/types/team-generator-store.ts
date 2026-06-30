import type { GenerationResult } from "../types/generation-result";
import type { Player } from "../types/player";
import type { Team } from "../types/team";

export interface TeamGeneratorStore {
  players: Player[];
  teams: Team[];
  generationResult: GenerationResult | null;
  playerSortField: "name" | "position" | "skill" | null;
  playerSortDirection: "asc" | "desc";

  addPlayer(): void;
  removePlayer(id: string): void;
  updatePlayer(id: string, player: Partial<Player>): void;
  setPlayerCount(count: number): void;

  sortPlayersByName: () => void;
  sortPlayersByPosition: () => void;
  sortPlayersBySkill: () => void;

  addTeam(): void;
  removeTeam(id: string): void;
  updateTeam(id: string, team: Partial<Team>): void;
  setTeamCount(count: number): void;

  resetAll(): void;
  generateTeams: () => void;
}
