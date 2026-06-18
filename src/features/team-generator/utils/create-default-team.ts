import { DEFAULT_TEAM_COLORS } from "../constants/defaults";
import type { Team } from "../types/team";

export function createDefaultTeam(): Team {
  return {
    id: `team-${Math.random().toString(36).slice(2, 11)}`,
    name: "",
    color:
      DEFAULT_TEAM_COLORS[
        Math.floor(Math.random() * DEFAULT_TEAM_COLORS.length)
      ],
  };
}
