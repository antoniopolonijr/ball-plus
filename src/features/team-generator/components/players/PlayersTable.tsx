import { useTeamGeneratorStore } from "@features/team-generator/store/team-generator-store";
import type { Player } from "@features/team-generator/types/player";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayerRow } from "./PlayerRow";

interface PlayersTableProps {
  players: Player[];
}

export function PlayersTable({ players }: PlayersTableProps) {
  const sortPlayersByName = useTeamGeneratorStore(
    (state) => state.sortPlayersByName,
  );

  const sortPlayersByPosition = useTeamGeneratorStore(
    (state) => state.sortPlayersByPosition,
  );

  const sortPlayersBySkill = useTeamGeneratorStore(
    (state) => state.sortPlayersBySkill,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-1 sm:px-2">
            <Button
              className="px-1 sm:px-2"
              variant="ghost"
              size="sm"
              onClick={sortPlayersByName}
              aria-label="Sort players by name"
            >
              Name
              <ArrowUpDown className="size-4" aria-hidden="true" />
            </Button>
          </TableHead>

          <TableHead className="px-1 sm:px-2">
            <Button
              className="px-1 sm:px-2"
              variant="ghost"
              size="sm"
              onClick={sortPlayersByPosition}
              aria-label="Sort players by position"
            >
              <abbr title="Position" className="sm:hidden no-underline">
                Pos
              </abbr>

              <span className="hidden sm:inline">Position</span>
              <ArrowUpDown className="size-4" aria-hidden="true" />
            </Button>
          </TableHead>

          <TableHead className="px-1 sm:px-2">
            <Button
              className="px-1 sm:px-2"
              variant="ghost"
              size="sm"
              onClick={sortPlayersBySkill}
              aria-label="Sort players by skill"
            >
              Skill
              <ArrowUpDown className="size-4" aria-hidden="true" />
            </Button>
          </TableHead>

          <TableHead className="px-1 sm:px-2 sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.map((player, index) => (
          <PlayerRow key={player.id} player={player} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}
