import { describe, expect, it } from "vitest";

import { parsePlayerList } from "@/features/team-generator/utils/parse-player-list";

describe("parsePlayerList", () => {
  it("trims whitespace and removes empty lines", () => {
    expect(parsePlayerList("  Alex \n\n Maria  \n  João ")).toEqual([
      "Alex",
      "Maria",
      "João",
    ]);
  });

  it("preserves the original player order", () => {
    expect(parsePlayerList("Carlos\nAna\nBruno")).toEqual([
      "Carlos",
      "Ana",
      "Bruno",
    ]);
  });

  it("returns an empty array for empty or whitespace-only input", () => {
    expect(parsePlayerList(" \n  \n")).toEqual([]);
  });
});
