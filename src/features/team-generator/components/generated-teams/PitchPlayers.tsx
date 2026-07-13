import type { PitchPlayersType } from "../../types/pitch";
import type { Player } from "../../types/player";
import { PitchPlayer } from "./PitchPlayer";

interface PitchPlayersProps {
  readonly players: PitchPlayersType;
  readonly placeholderPlayerNumberMap: Map<string, number>;
  readonly teamColor: string;
}

export function PitchPlayers({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchPlayersProps) {
  return (
    <div className="absolute inset-0 grid grid-rows-[22%_20%_20%_20%] px-[6%]">
      <div aria-hidden="true" className="pointer-events-none" />

      <PitchLine
        players={players.attackers}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchLine
        players={players.midfielders}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchLine
        players={players.defenders}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchLine
        players={players.goalkeepers}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <div aria-hidden="true" className="pointer-events-none" />
    </div>
  );
}

interface PitchLineProps {
  players: Player[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

function PitchLine({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchLineProps) {
  if (players.length === 0) {
    return <div aria-hidden="true" />;
  }

  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))`,
      }}
    >
      {players.map((player) => (
        <PitchPlayer
          key={player.id}
          player={player}
          placeholderPlayerNumber={
            placeholderPlayerNumberMap.get(player.id) ?? 0
          }
          teamColor={teamColor}
        />
      ))}
    </div>
  );
}
