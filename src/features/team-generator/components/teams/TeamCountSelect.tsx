"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamGeneratorStore } from "@/features/team-generator/store/use-team-generator-store";
import { MAX_TEAM_COUNT, MIN_TEAM_COUNT } from "../../constants/defaults";

export function TeamCountSelect() {
  const teams = useTeamGeneratorStore((state) => state.teams);

  const setTeamCount = useTeamGeneratorStore((state) => state.setTeamCount);

  return (
    <div>
      <Label htmlFor="team-count" className="sr-only">
        Number of teams
      </Label>
      <Select
        value={teams.length.toString()}
        onValueChange={(value) => setTeamCount(Number(value))}
      >
        <SelectTrigger id="team-count" aria-label="Number of teams">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Array.from(
            {
              length: MAX_TEAM_COUNT - MIN_TEAM_COUNT + 1,
            },
            (_, index) => {
              const count = MIN_TEAM_COUNT + index;

              return (
                <SelectItem key={count} value={count.toString()}>
                  {count}
                </SelectItem>
              );
            },
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
