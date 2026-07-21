import { useTeamGeneratorStore } from "@features/team-generator/store/team-generator-store";
import type {
  Player,
  PlayerPosition,
  PlayerSkill,
} from "@features/team-generator/types/player";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  PLAYER_POSITION_ABBREVIATIONS,
  PLAYER_POSITIONS,
  PLAYER_SKILL_ABBREVIATIONS,
  PLAYER_SKILLS,
} from "../../types/player";

interface PlayerRowProps {
  player: Player;
  index: number;
}

export function PlayerRow({ player, index }: PlayerRowProps) {
  const updatePlayer = useTeamGeneratorStore((state) => state.updatePlayer);

  const removePlayer = useTeamGeneratorStore((state) => state.removePlayer);

  return (
    <TableRow>
      <TableCell className="w-full px-1 sm:px-2">
        <Input
          className="truncate"
          id={`player-name-${player.id}`}
          name={`player-name-${player.id}`}
          value={player.name}
          placeholder={`Player ${index + 1}`}
          onChange={(event) =>
            updatePlayer(player.id, {
              name: event.target.value,
            })
          }
          aria-label="Player name"
        />
      </TableCell>

      <TableCell className="px-1 sm:px-2">
        <Select
          value={player.position}
          onValueChange={(value) =>
            updatePlayer(player.id, {
              position: value as PlayerPosition,
            })
          }
        >
          <SelectTrigger
            id={`player-position-${player.id}`}
            className="w-full"
            aria-label="Player position"
          >
            <SelectValue>
              <abbr title={player.position} className="md:hidden no-underline">
                {PLAYER_POSITION_ABBREVIATIONS[player.position]}
              </abbr>

              <span className="hidden md:inline">{player.position}</span>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {PLAYER_POSITIONS.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="px-1 sm:px-2">
        <Select
          value={player.skill}
          onValueChange={(value) =>
            updatePlayer(player.id, {
              skill: value as PlayerSkill,
            })
          }
        >
          <SelectTrigger
            id={`player-skill-${player.id}`}
            className="w-full"
            aria-label="Player skill"
          >
            <SelectValue>
              <abbr title={player.skill} className="md:hidden no-underline">
                {PLAYER_SKILL_ABBREVIATIONS[player.skill]}
              </abbr>

              <span className="hidden md:inline">{player.skill}</span>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {PLAYER_SKILLS.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="px-1 sm:px-2 text-right">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removePlayer(player.id)}
          aria-label="Remove player"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
