import type { Team } from "../types/team";

export function createDefaultTeam(): Team {
  return {
    id: crypto.randomUUID(),
    name: "",
  };
}
