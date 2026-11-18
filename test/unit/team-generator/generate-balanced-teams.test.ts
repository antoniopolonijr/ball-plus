import { afterEach, describe, expect, it, vi } from "vitest";

import type { Player } from "@/features/team-generator/types/player";
import type { Team } from "@/features/team-generator/types/team";
import { generateBalancedTeams } from "@/features/team-generator/utils/generate-balanced-teams";

const teams: Team[] = [
  { id: "team-a", name: "Blue", color: "#0000ff" },
  { id: "team-b", name: "Red", color: "#ff0000" },
];

function createPlayers(count: number): Player[] {
  const positions = [
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Attacker",
  ] as const;
  const skills = ["Low", "Medium", "High"] as const;

  return Array.from({ length: count }, (_, index) => ({
    id: `player-${index + 1}`,
    name: `Player ${index + 1}`,
    position: positions[index % positions.length],
    skill: skills[index % skills.length],
    isActive: true,
  }));
}

function createOutfieldPlayers(count: number): Player[] {
  const positions = ["Defender", "Midfielder", "Attacker"] as const;

  return Array.from({ length: count }, (_, index) => ({
    id: `outfield-${index + 1}`,
    name: `Outfield player ${index + 1}`,
    position: positions[index % positions.length],
    skill: "Medium",
    isActive: true,
  }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("generateBalancedTeams", () => {
  it("returns one result per configured team and preserves team metadata", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = generateBalancedTeams(createPlayers(12), teams, 6);

    expect(result).toHaveLength(teams.length);
    expect(result.map(({ team }) => team)).toEqual(teams);
  });

  it("assigns every input player exactly once", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.37);
    const players = createPlayers(17);

    const result = generateBalancedTeams(players, teams, 7);
    const generatedIds = result.flatMap(({ players: assigned }) =>
      assigned.map(({ id }) => id),
    );

    expect(generatedIds).toHaveLength(players.length);
    expect(new Set(generatedIds).size).toBe(players.length);
    expect([...generatedIds].sort()).toEqual(
      players.map(({ id }) => id).sort(),
    );
  });

  it("keeps team sizes within one player of each other", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.61);

    const result = generateBalancedTeams(createPlayers(19), teams, 8);
    const teamSizes = result.map(({ players }) => players.length);

    expect(Math.max(...teamSizes) - Math.min(...teamSizes)).toBeLessThanOrEqual(
      1,
    );
  });

  it("does not mutate the input players or teams", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.61);
    const players = createPlayers(12);
    const playersBefore = structuredClone(players);
    const teamsBefore = structuredClone(teams);

    generateBalancedTeams(players, teams, 6);

    expect(players).toEqual(playersBefore);
    expect(teams).toEqual(teamsBefore);
  });

  it("assigns sequential rotation orders independently to goalkeepers and outfield players", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.25);
    const result = generateBalancedTeams(createPlayers(16), teams, 7);

    for (const { players } of result) {
      const goalkeepers = players.filter(
        (player) => player.position === "Goalkeeper",
      );
      const outfield = players.filter(
        (player) => player.position !== "Goalkeeper",
      );

      expect(
        goalkeepers.map(({ rotationOrder }) => rotationOrder).sort(),
      ).toEqual(goalkeepers.map((_, index) => index + 1));
      expect(outfield.map(({ rotationOrder }) => rotationOrder).sort()).toEqual(
        outfield.map((_, index) => index + 1),
      );
    }
  });

  it("places goalkeepers before outfield players for display", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.42);
    const result = generateBalancedTeams(createPlayers(16), teams, 7);

    for (const { players } of result) {
      const firstOutfieldIndex = players.findIndex(
        (player) => player.position !== "Goalkeeper",
      );
      const lastGoalkeeperIndex = players.reduce(
        (lastIndex, player, index) =>
          player.position === "Goalkeeper" ? index : lastIndex,
        -1,
      );

      if (lastGoalkeeperIndex !== -1 && firstOutfieldIndex !== -1) {
        expect(lastGoalkeeperIndex).toBeLessThan(firstOutfieldIndex);
      }
    }
  });

  it("marks outfield players beyond the starting lineup as substitutes", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const result = generateBalancedTeams(createOutfieldPlayers(12), teams, 4);

    for (const { players } of result) {
      for (const player of players) {
        expect(player.startsOnBench).toBe(player.rotationOrder > 3);
      }
    }
  });

  it("starts only the first goalkeeper and places additional goalkeepers on the bench", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const goalkeepers = createPlayers(8).map((player) => ({
      ...player,
      position: "Goalkeeper" as const,
    }));
    const result = generateBalancedTeams(goalkeepers, teams, 4);

    for (const { players } of result) {
      for (const player of players) {
        expect(player.startsOnBench).toBe(player.rotationOrder > 1);
      }
    }
  });
});
