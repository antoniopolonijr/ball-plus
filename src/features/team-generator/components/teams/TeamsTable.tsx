import type { Team } from "@features/team-generator/types/team";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamRow } from "./TeamRow";

interface TeamsTableProps {
  teams: Team[];
}

export function TeamsTable({ teams }: TeamsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Color</TableHead>

          <TableHead className="text-center">Name</TableHead>

          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teams.map((team, index) => (
          <TeamRow key={team.id} team={team} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}
