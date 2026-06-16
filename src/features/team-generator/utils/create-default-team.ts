import type { Team } from "../types/team";

export function createDefaultTeam(): Team {
  return {
    id: `team-${Math.random().toString(36).slice(2, 11)}`,
    name: "",
  };
}
