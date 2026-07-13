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

interface RotationGuideProps {
  generatedTeam: GeneratedTeam;
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function RotationGuide({
  generatedTeam,
  placeholderPlayerNumberMap,
  teamColor,
}: RotationGuideProps) {
  return (
    <section
      aria-labelledby="rotation-guide-heading"
      className="space-y-3 mt-4 text-center"
    >
      <h4 id="rotation-guide-heading" className="font-semibold text-lg">
        Rotation Guide
      </h4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Order</TableHead>
            <TableHead className="text-center font-bold">Name</TableHead>
            <TableHead className="text-center font-bold">Position</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {generatedTeam.players.map((player) => {
            const placeholderPlayerNumber = placeholderPlayerNumberMap.get(
              player.id,
            );

            return (
              <TableRow key={player.id}>
                <TableCell className="text-center">
                  <div
                    className="mx-auto flex size-7 items-center justify-center rounded-full border-2 border-foreground text-white font-bold"
                    style={{
                      backgroundColor: teamColor,
                    }}
                  >
                    {player.position === "Goalkeeper"
                      ? "GK"
                      : player.substitutionOrder}
                  </div>
                </TableCell>

                <TableCell className="max-w-28 text-center truncate">
                  {player.name || `Player ${placeholderPlayerNumber}`}
                </TableCell>

                <TableCell className="text-center">
                  <abbr
                    title={player.position}
                    className="sm:hidden no-underline"
                  >
                    {PLAYER_POSITION_ABBREVIATIONS[player.position]}
                  </abbr>

                  <span className="hidden sm:inline">{player.position}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
