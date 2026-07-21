import type { GenerationResult } from "../types/generation-result";
import type { Player } from "../types/player";
import type { Team } from "../types/team";

export interface TeamGeneratorStore {
  players: Player[];
  playerSortField: "name" | "position" | "skill" | null;
  playerSortDirection: "asc" | "desc";

  teams: Team[];

  playersPerTeam: number;
  generationResult: GenerationResult | null;

  addPlayer(): void;
  removePlayer(id: string): void;
  updatePlayer(id: string, player: Partial<Player>): void;
  setPlayerCount(count: number): void;
  pastePlayers: (names: string[]) => void;
  sortPlayersByName: () => void;
  sortPlayersByPosition: () => void;
  sortPlayersBySkill: () => void;

  addTeam(): void;
  removeTeam(id: string): void;
  updateTeam(id: string, team: Partial<Team>): void;
  setTeamCount(count: number): void;

  setPlayersPerTeam: (playersPerTeam: number) => void;
  resetAll(): void;
  generateTeams: () => void;
}
