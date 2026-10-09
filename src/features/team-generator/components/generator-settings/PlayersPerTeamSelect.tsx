"use client";

import { useShallow } from "zustand/shallow";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamGeneratorStore } from "@/features/team-generator/store/use-team-generator-store";
import { TEAM_SIZES } from "../../constants/defaults";

export function PlayersPerTeamSelect() {
  const { playersPerTeam, setPlayersPerTeam } = useTeamGeneratorStore(
    useShallow((state) => ({
      playersPerTeam: state.playersPerTeam,
      setPlayersPerTeam: state.setPlayersPerTeam,
    })),
  );
  return (
    <div className="flex justify-between">
      <Label htmlFor="players-per-team">Players per Team</Label>

      <Select
        value={playersPerTeam.toString()}
        onValueChange={(value) => setPlayersPerTeam(Number(value))}
      >
        <SelectTrigger id="players-per-team">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {TEAM_SIZES.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size} vs {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
