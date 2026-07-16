import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GeneratorActions } from "./GeneratorActions";
import { GeneratorSettings } from "./GeneratorSettings";
import { MatchOverview } from "./MatchOverview";

export function GeneratorCard() {
  return (
    <section aria-labelledby="generator-card-title">
      <Card>
        <CardHeader>
          <CardTitle id="generator-card-title">Match Generator</CardTitle>

          <CardDescription>
            Review the match setup before generating balanced teams.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <GeneratorSettings />

          <Separator />

          <MatchOverview />
        </CardContent>

        <CardFooter className="justify-center items-center">
          <GeneratorActions />
        </CardFooter>
      </Card>
    </section>
  );
}
