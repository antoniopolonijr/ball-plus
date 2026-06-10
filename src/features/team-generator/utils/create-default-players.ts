import type { Player } from "../types/player";

import { createDefaultPlayer } from "./create-default-player";

export function createDefaultPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    ...createDefaultPlayer(),
    position: index < 2 ? "goalkeeper" : "any",
  }));
}
