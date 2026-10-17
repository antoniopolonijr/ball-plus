import { SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayersPerTeamSelect } from "./PlayersPerTeamSelect";

export function GeneratorSettingsCard() {
  return (
    <section aria-labelledby="generator-settings-title">
      <Card>
        <CardHeader>
          <CardTitle
            id="generator-settings-title"
            className="flex gap-2 items-center"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Generator Settings
          </CardTitle>
          <CardDescription>Customize your matches.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <PlayersPerTeamSelect />
        </CardContent>
      </Card>
    </section>
  );
}
