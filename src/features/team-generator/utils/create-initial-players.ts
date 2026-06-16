import type { Player } from "../types/player";

export function createInitialPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `player-${index + 1}`,
    name: "",
    position: index < 2 ? "goalkeeper" : "any",
    skill: "medium",
    substituteOrder: null,
    isActive: true,
  }));
}
