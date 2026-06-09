import type { Player } from "../types/player";

export function createDefaultPlayer(): Player {
  return {
    id: crypto.randomUUID(),
    name: "",
    position: "any",
    skill: "medium",
    substituteOrder: null,
    isActive: true,
  };
}
