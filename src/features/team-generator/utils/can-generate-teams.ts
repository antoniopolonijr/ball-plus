import type { Player } from "../types/player";
import type { Team } from "../types/team";

export interface GenerationValidation {
  canGenerate: boolean;
  code?: TeamGenerationValidationCode;
}

export type TeamGenerationValidationCode =
  | "not-enough-teams"
  | "not-enough-players";

export function canGenerateTeams(
  players: Player[],
  teams: Team[],
): GenerationValidation {
  if (teams.length < 2) {
    return {
      canGenerate: false,
      code: "not-enough-teams",
    };
  }

  if (players.length < teams.length) {
    return {
      canGenerate: false,
      code: "not-enough-players",
    };
  }

  return {
    canGenerate: true,
  };
}
