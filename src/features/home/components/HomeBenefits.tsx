import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Balance teams by skill and position",
  "Save your games and player lists",
  "Share or download generated teams",
];

export default function CallToAction() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3 pt-1">
      {benefits.map((benefit) => (
        <div
          key={benefit}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <CheckCircle2
            aria-hidden="true"
            className="size-4 shrink-0 text-primary"
          />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
  );
}
