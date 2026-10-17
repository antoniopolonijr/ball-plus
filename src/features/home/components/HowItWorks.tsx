import { ArrowRight, Dices, SlidersHorizontal, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Add your players",
    description:
      "Enter player names, positions, and skill levels. You can also paste a list of names to get started faster.",
    icon: Users,
  },
  {
    number: "02",
    title: "Set up your match",
    description:
      "Choose the number of teams and players per team, then review your match overview.",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Generate and share",
    description:
      "Create balanced teams and copy, download, or share the result with your group.",
    icon: Dices,
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="flex flex-col gap-8"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Simple by design
        </p>

        <h2
          id="how-it-works-title"
          className="text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          From players to balanced teams
        </h2>

        <p className="max-w-xl text-muted-foreground leading-7">
          Everything you need to organize your football match, without the
          hassle of balancing teams manually.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <Card key={step.number} className="relative h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                    {step.number}
                  </span>

                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                </div>

                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute right-1 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full border bg-background p-1 text-muted-foreground md:block"
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
