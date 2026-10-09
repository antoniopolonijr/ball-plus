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
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from "../../constants/defaults";

export function PlayerCountSelect() {
  const players = useTeamGeneratorStore((state) => state.players);

  const setPlayerCount = useTeamGeneratorStore((state) => state.setPlayerCount);

  return (
    <div>
      <Label htmlFor="player-count" className="sr-only">
        Number of players
      </Label>
      <Select
        value={players.length.toString()}
        onValueChange={(value) => setPlayerCount(Number(value))}
      >
        <SelectTrigger id="player-count" aria-label="Number of players">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Array.from(
            {
              length: MAX_PLAYER_COUNT - MIN_PLAYER_COUNT + 1,
            },
            (_, index) => {
              const count = MIN_PLAYER_COUNT + index;

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
