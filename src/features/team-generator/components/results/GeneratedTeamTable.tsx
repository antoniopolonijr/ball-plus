import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PLAYER_POSITION_ABBREVIATIONS } from "../../constants/player-positions";
import type { GeneratedTeam } from "../../types/generated-team";

interface GeneratedTeamTableProps {
  generatedTeam: GeneratedTeam;
  index: number;
}

export function GeneratedTeamTable({
  generatedTeam,
  index,
}: GeneratedTeamTableProps) {
  let substitutionOrder = 1;

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 pb-3 justify-center">
        <div
          className="size-3 rounded-full border"
          style={{
            backgroundColor: generatedTeam.team.color,
          }}
          aria-hidden="true"
        />

        <h3 className="font-semibold text-lg">
          {generatedTeam.team.name || `Team ${index + 1}`}
        </h3>

        <span className="text-sm text-muted-foreground">
          ({generatedTeam.players.length} players)
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Position</TableHead>

            <TableHead className="text-center font-bold">Name</TableHead>

            <TableHead className="text-center font-bold">Sub</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {generatedTeam.players.map((player) => {
            const currentOrder =
              player.position === "goalkeeper" ? null : substitutionOrder++;

            return (
              <TableRow key={player.id}>
                <TableCell className="text-center">
                  <abbr
                    title={player.position}
                    className="sm:hidden no-underline"
                  >
                    {PLAYER_POSITION_ABBREVIATIONS[player.position]}
                  </abbr>

                  <span className="hidden sm:inline">{player.position}</span>
                </TableCell>

                <TableCell className="max-w-[100px] w-full text-center truncate">
                  {player.name}
                </TableCell>

                <TableCell className="text-center">
                  {currentOrder ?? "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
