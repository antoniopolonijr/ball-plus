import type { Team } from "../types/team";

export function createInitialTeams(count: number): Team[] {
  return Array.from(
    { length: count },
    (_, index): Team => ({
      id: `team-${index + 1}`,
      name: `Team ${index + 1}`,
      color: "",
    }),
  );
}
