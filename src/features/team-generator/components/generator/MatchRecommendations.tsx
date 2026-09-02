import {
  CircleX,
  Lightbulb,
  type LucideIcon,
  TriangleAlert,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { MatchRecommendation } from "../../types/match-recommendation";

interface MatchRecommendationsProps {
  recommendations: MatchRecommendation[];
}

export function MatchRecommendations({
  recommendations,
}: MatchRecommendationsProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recommendations-heading" className="space-y-3">
      <Separator />

      <h4 id="recommendations-heading" className="font-semibold">
        Recommendations
      </h4>

      <ul className="space-y-2">
        {recommendations.map((recommendation) => (
          <RecommendationItem
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </ul>
    </section>
  );
}

interface RecommendationItemProps {
  recommendation: MatchRecommendation;
}

const RECOMMENDATION_VARIANTS: Record<
  MatchRecommendation["severity"],
  {
    icon: LucideIcon;
    className: string;
  }
> = {
  error: {
    icon: CircleX,
    className: "border-destructive/40 bg-destructive/1 text-destructive",
  },

  warning: {
    icon: TriangleAlert,
    className:
      "border-yellow-500/40 bg-yellow-500/1 text-yellow-800 dark:text-yellow-400",
  },

  tip: {
    icon: Lightbulb,
    className:
      "border-blue-500/40 bg-blue-500/1 text-blue-800 dark:text-blue-400",
  },
};

export function RecommendationItem({
  recommendation,
}: RecommendationItemProps) {
  const { icon: Icon, className } =
    RECOMMENDATION_VARIANTS[recommendation.severity];

  return (
    <li>
      <div
        className={`flex items-center gap-3 rounded-lg border p-1.5 ${className}`}
      >
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />

        <p className="text-sm leading-relaxed">{recommendation.message}</p>
      </div>
    </li>
  );
}
