import type { GeneratedTeam } from "./generated-team";

export interface GenerationResult {
  id: string;
  generatedAt: Date;
  teams: GeneratedTeam[];
}
