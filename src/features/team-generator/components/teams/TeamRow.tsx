import { useTeamGeneratorStore } from "@features/team-generator/store/team-generator-store";
import type { Team } from "@features/team-generator/types/team";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

interface TeamRowProps {
  team: Team;
  index: number;
}

export function TeamRow({ team, index }: TeamRowProps) {
  const updateTeam = useTeamGeneratorStore((state) => state.updateTeam);

  const removeTeam = useTeamGeneratorStore((state) => state.removeTeam);

  return (
    <TableRow>
      <TableCell>
        <div className="relative group">
          <input
            type="color"
            value={team.color}
            onChange={(event) =>
              updateTeam(team.id, {
                color: event.target.value,
              })
            }
            className="size-8.5 rounded-full border-2 border-background shadow-sm cursor-pointer overflow-hidden p-0 bg-transparent"
            style={{ appearance: "none" }}
            aria-label="Team color"
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ backgroundColor: team.color }}
          />
        </div>
      </TableCell>

      <TableCell className="w-full">
        <Input
          className="truncate"
          id={`team-name-${team.id}`}
          name={`team-name-${team.id}`}
          value={team.name}
          placeholder={`Team ${index + 1}`}
          onChange={(event) =>
            updateTeam(team.id, {
              name: event.target.value,
            })
          }
          aria-label="Team name"
        />
      </TableCell>

      <TableCell className="px-1 sm:px-2 text-right">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeTeam(team.id)}
          aria-label="Remove team"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
