import { Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GeneratedPlayer } from "../../types/generated-team";
import { PLAYER_POSITION_ABBREVIATIONS } from "../../types/player";

interface RotationGuideProps {
  players: GeneratedPlayer[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function RotationGuide({
  players,
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
            <TableHead className="text-center font-bold px-1">Order</TableHead>
            <TableHead className="text-center font-bold px-1">Name</TableHead>
            <TableHead
              className="text-center font-bold px-1"
              aria-label="Position"
            >
              <span className="hidden lg:inline">Position</span>
              <span className="lg:hidden" title="Position">
                Pos
              </span>
            </TableHead>
            <TableHead className="text-center font-bold px-1">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player) => {
            const placeholderPlayerNumber = placeholderPlayerNumberMap.get(
              player.id,
            );

            return (
              <TableRow
                key={player.id}
                className={`${player.startsOnBench && "bg-muted/20"}`}
              >
                <TableCell className="text-center px-1">
                  <div
                    className="mx-auto flex size-7 items-center justify-center rounded-full border-2 border-foreground text-white font-bold"
                    style={{
                      backgroundColor: teamColor,
                    }}
                  >
                    {player.position === "Goalkeeper"
                      ? "GK"
                      : player.rotationOrder}
                  </div>
                </TableCell>

                <TableCell className="text-center font-semibold px-1">
                  <div
                    className="mx-auto w-26 lg:w-full truncate"
                    title={player.name}
                  >
                    {player.name || `Player ${placeholderPlayerNumber}`}
                  </div>
                </TableCell>

                <TableCell className="text-center font-semibold px-1">
                  <abbr
                    title={player.position}
                    aria-label={player.position}
                    className="lg:hidden no-underline"
                  >
                    <Badge variant="secondary">
                      {PLAYER_POSITION_ABBREVIATIONS[player.position]}
                    </Badge>
                  </abbr>

                  <Badge variant="secondary" className="hidden lg:inline">
                    {player.position}
                  </Badge>
                </TableCell>

                <TableCell className="px-1">
                  {player.startsOnBench ? (
                    <>
                      <Badge
                        title="Starts on bench"
                        aria-label="Starts on bench"
                        className="lg:hidden no-underline px-1"
                        variant="secondary"
                      >
                        <Clock />
                      </Badge>

                      <Badge variant="secondary" className="hidden lg:inline">
                        Bench
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge
                        title="Starts playing"
                        aria-label="Starts playing"
                        className="lg:hidden no-underline px-1"
                      >
                        <Play />
                      </Badge>

                      <Badge className="hidden lg:inline">Starter</Badge>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
