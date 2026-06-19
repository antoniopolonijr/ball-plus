import { DEFAULT_TEAM_COLORS } from "../constants/defaults";
import type { Team } from "../types/team";

export function createInitialTeams(count: number): Team[] {
  return Array.from(
    { length: count },
    (_, index): Team => ({
      id: `team-${index + 1}`,
      name: "",
      color: DEFAULT_TEAM_COLORS[index % DEFAULT_TEAM_COLORS.length],
    }),
  );
}
