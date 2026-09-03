import { DEFAULT_TEAM_COLORS } from "../constants/defaults";
import type { Team } from "../types/team";

export function createDefaultTeam(teams: Team[]): Team {
  const usedColors = new Set(teams.map((team) => team.color));

  const availableColors = DEFAULT_TEAM_COLORS.filter(
    (color) => !usedColors.has(color),
  );

  const colors = availableColors.length ? availableColors : DEFAULT_TEAM_COLORS;

  return {
    id: `team-${Math.random().toString(36).slice(2, 11)}`,
    name: "",
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}
