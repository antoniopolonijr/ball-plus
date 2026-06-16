import type { Player } from "@features/team-generator/types/player";
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
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Position</TableHead>

            <TableHead>Skill</TableHead>

            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player, index) => (
            <PlayerRow key={player.id} player={player} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
