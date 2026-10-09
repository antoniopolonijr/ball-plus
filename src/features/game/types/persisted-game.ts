import type { GenerationResult } from "@/features/team-generator/types/generation-result";

export type PersistedGenerationResult = Omit<
  GenerationResult,
  "generatedAt"
> & {
  generatedAt: string;
};
