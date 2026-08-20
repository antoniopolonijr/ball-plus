export type MatchRecommendationSeverity = "error" | "warning" | "tip";

export interface MatchRecommendation {
  id: string;
  severity: MatchRecommendationSeverity;
  message: string;
}
