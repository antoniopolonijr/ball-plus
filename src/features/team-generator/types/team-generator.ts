import type { GenerationResult } from "./generation-result";
import type { Player } from "./player";
import type { Team } from "./team";

export interface TeamGeneratorState {
  players: Player[];
  teams: Team[];
  generationResults: GenerationResult[];
}
