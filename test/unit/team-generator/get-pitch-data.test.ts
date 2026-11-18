import { describe, expect, it } from "vitest";

import type { GeneratedPlayer } from "@/features/team-generator/types/generated-team";
import { getPitchData } from "@/features/team-generator/utils/get-pitch-data";

function generatedPlayer(
  id: string,
  position: GeneratedPlayer["position"],
  startsOnBench = false,
): GeneratedPlayer {
  return {
    id,
    name: id,
    position,
    skill: "Medium",
    isActive: true,
    rotationOrder: 1,
    startsOnBench,
  };
}

describe("getPitchData", () => {
  it("groups starters by position and maps unassigned players to midfield", () => {
    const players = [
      generatedPlayer("gk", "Goalkeeper"),
      generatedPlayer("def", "Defender"),
      generatedPlayer("mid", "Midfielder"),
      generatedPlayer("att", "Attacker"),
      generatedPlayer("unknown", "Unassigned"),
    ];

    const result = getPitchData(players);

    expect(result.formation.goalkeepers.map(({ id }) => id)).toEqual(["gk"]);
    expect(result.formation.defenders.map(({ id }) => id)).toEqual(["def"]);
    expect(result.formation.midfielders.map(({ id }) => id)).toEqual([
      "mid",
      "unknown",
    ]);
    expect(result.formation.attackers.map(({ id }) => id)).toEqual(["att"]);
    expect(result.bench).toEqual([]);
  });

  it("keeps substitutes out of the starting formation", () => {
    const substitute = generatedPlayer("bench-player", "Attacker", true);

    const result = getPitchData([
      generatedPlayer("starter", "Attacker"),
      substitute,
    ]);

    expect(result.formation.attackers.map(({ id }) => id)).toEqual([
      "starter",
    ]);
    expect(result.bench).toEqual([substitute]);
  });

  it("returns empty formation groups for an empty team", () => {
    expect(getPitchData([])).toEqual({
      formation: {
        attackers: [],
        midfielders: [],
        defenders: [],
        goalkeepers: [],
      },
      bench: [],
    });
  });
});
