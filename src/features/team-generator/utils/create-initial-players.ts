import type { Player } from "../types/player";

export function createInitialPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `player-${index + 1}`,
    name: "",
    position:
      index < 2
        ? "Goalkeeper"
        : index < 6
          ? "Defender"
          : index < 12
            ? "Midfielder"
            : "Attacker",
    skill: "Medium",
    isActive: true,
  }));
}
