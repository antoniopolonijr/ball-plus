import { describe, expect, it } from "vitest";

import type { Player } from "@/features/team-generator/types/player";
import type { Team } from "@/features/team-generator/types/team";
import { canGenerateTeams } from "@/features/team-generator/utils/can-generate-teams";

const createPlayers = (count: number): Player[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `player-${index}`,
    name: `Player ${index}`,
    position: "Defender",
    skill: "Medium",
    isActive: true,
  }));

const createTeams = (count: number): Team[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `team-${index}`,
    name: `Team ${index}`,
    color: "#000000",
  }));

describe("canGenerateTeams", () => {
  it("rejects fewer than two teams", () => {
    expect(canGenerateTeams(createPlayers(10), createTeams(1))).toEqual({
      canGenerate: false,
      code: "not-enough-teams",
    });
  });

  it("rejects fewer players than teams", () => {
    expect(canGenerateTeams(createPlayers(1), createTeams(2))).toEqual({
      canGenerate: false,
      code: "not-enough-players",
    });
  });

  it("allows generation with two teams and one player per team", () => {
    expect(canGenerateTeams(createPlayers(2), createTeams(2))).toEqual({
      canGenerate: true,
    });
  });

  it("allows more than two teams when each team can receive a player", () => {
    expect(canGenerateTeams(createPlayers(5), createTeams(5)).canGenerate).toBe(
      true,
    );
  });
});
