import { describe, expect, it } from "vitest";

import type { GeneratedTeam } from "@/features/team-generator/types/generated-team";
import { getTeamsFileName } from "@/features/team-generator/utils/get-generated-teams-file-name";
import { getGeneratedTeamsText } from "@/features/team-generator/utils/get-generated-teams-text";

const generatedAt = new Date(2026, 0, 5, 9, 7, 3);

const generatedTeams: GeneratedTeam[] = [
  {
    team: { id: "team-1", name: "Blue", color: "#0000ff" },
    players: [
      {
        id: "p1",
        name: "Alex",
        position: "Goalkeeper",
        skill: "High",
        isActive: true,
        rotationOrder: 1,
        startsOnBench: false,
      },
      {
        id: "p2",
        name: "",
        position: "Defender",
        skill: "Medium",
        isActive: true,
        rotationOrder: 2,
        startsOnBench: true,
      },
    ],
  },
];

describe("generated team export utilities", () => {
  it("creates a zero-padded PNG filename from the local date and time", () => {
    expect(getTeamsFileName(generatedAt)).toBe(
      "ball-plus-teams-2026-01-05-0907.png",
    );
  });

  it("formats team names, goalkeeper labels and substitute players", () => {
    const text = getGeneratedTeamsText(
      generatedTeams,
      generatedAt,
      new Map([["p2", 8]]),
    );

    expect(text).toContain("⚽ Ball+");
    expect(text).toContain("🛡️ Blue");
    expect(text).toContain("GK Alex");
    expect(text).toContain("2. Player 8 (bench)");
  });

  it("uses a numbered fallback when a team has no name", () => {
    const unnamedTeams = [
      {
        ...generatedTeams[0],
        team: { ...generatedTeams[0].team, name: "" },
      },
    ];

    expect(
      getGeneratedTeamsText(unnamedTeams, generatedAt, new Map()),
    ).toContain("🛡️ Team 1");
  });
});
