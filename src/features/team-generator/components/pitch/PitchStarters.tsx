import type {
  PitchPlayerData,
  PitchPlayers,
} from "../../types/pitch-formation";
import { PitchPlayer } from "./PitchPlayer";

interface PitchStartersProps {
  players: PitchPlayers;
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function PitchStarters({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchStartersProps) {
  return (
    <div className="absolute inset-0 grid grid-rows-[22%_20%_20%_20%] px-[6%]">
      <div aria-hidden="true" className="pointer-events-none" />

      <PitchRow
        players={players.attackers}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchRow
        players={players.midfielders}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchRow
        players={players.defenders}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <PitchRow
        players={players.goalkeepers}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={teamColor}
      />

      <div aria-hidden="true" className="pointer-events-none" />
    </div>
  );
}

interface PitchRowProps {
  players: PitchPlayerData[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

function PitchRow({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchRowProps) {
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
