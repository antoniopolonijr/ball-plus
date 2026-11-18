import { describe, expect, it } from "vitest";

import type { Player } from "@/features/team-generator/types/player";
import type { Team } from "@/features/team-generator/types/team";
import { getMatchOverview } from "@/features/team-generator/utils/get-match-overview";

const teams: Team[] = [
  { id: "team-1", name: "Blue", color: "#0000ff" },
  { id: "team-2", name: "Red", color: "#ff0000" },
];

function player(id: string, position: Player["position"]): Player {
  return {
    id,
    name: id,
    position,
    skill: "Medium",
    isActive: true,
  };
}

describe("getMatchOverview", () => {
  it("summarizes team, player and position counts", () => {
    const players = [
      player("gk-1", "Goalkeeper"),
      player("gk-2", "Goalkeeper"),
      player("def-1", "Defender"),
      player("def-2", "Defender"),
      player("mid-1", "Midfielder"),
      player("att-1", "Attacker"),
      player("ua-1", "Unassigned"),
    ];

    expect(getMatchOverview(players, teams, 4)).toEqual({
      teams: 2,
      players: 7,
      playersPerTeam: 4,
      requiredPlayers: 8,
      extraPlayers: 0,
      goalkeepers: 2,
      defenders: 2,
      midfielders: 1,
      attackers: 1,
      unassigned: 1,
    });
  });

  it("counts extra players after accounting for goalkeeper and outfield slots", () => {
    const players = [
      player("gk-1", "Goalkeeper"),
      player("gk-2", "Goalkeeper"),
      player("gk-3", "Goalkeeper"),
      ...Array.from({ length: 7 }, (_, index) =>
        player(`field-${index + 1}`, "Defender"),
      ),
    ];

    const result = getMatchOverview(players, teams, 4);

    expect(result.requiredPlayers).toBe(8);
    expect(result.extraPlayers).toBe(2);
  });

  it("reports every player as extra when there are no teams", () => {
    const players = [player("p1", "Defender"), player("p2", "Attacker")];

    expect(getMatchOverview(players, [], 7).extraPlayers).toBe(2);
  });
});
