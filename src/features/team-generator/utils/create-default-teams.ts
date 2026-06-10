import type { Team } from "../types/team";

import { createDefaultTeam } from "./create-default-team";

export function createDefaultTeams(count: number): Team[] {
  return Array.from({ length: count }, () => createDefaultTeam());
}
