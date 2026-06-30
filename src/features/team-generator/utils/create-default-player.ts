import type { Player } from "../types/player";

export function createDefaultPlayer(): Player {
  return {
    id: `player-${Math.random().toString(36).slice(2, 11)}`,
    name: "",
    position: "Any",
    skill: "Medium",
    substitutionOrder: null,
    isActive: true,
  };
}
