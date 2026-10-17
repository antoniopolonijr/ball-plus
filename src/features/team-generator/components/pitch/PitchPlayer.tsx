import type { PitchPlayerData } from "../../types/pitch-formation";
import { getContrastTextColor } from "../../utils/get-contrast-text-color";

interface PitchPlayerProps {
  player: PitchPlayerData;
  placeholderPlayerNumber: number;
  teamColor: string;
}

export function PitchPlayer({
  player,
  placeholderPlayerNumber,
  teamColor,
}: PitchPlayerProps) {
  const textColor = getContrastTextColor(teamColor);

  return (
    <div className="flex min-w-0 flex-col items-center">
      <div
        className="flex size-8 items-center justify-center rounded-full border-2 border-black/70 text-sm font-bold shadow-md transition-transform duration-150 hover:scale-105 motion-reduce:transition-none sm:size-10 md:text-base"
        style={{
          backgroundColor: teamColor,
          color: textColor,
        }}
      >
        {player.position === "Goalkeeper" ? "GK" : player.rotationOrder}
      </div>

      <span
        className="mt-1 block w-full max-w-16 truncate rounded bg-black/70 px-1 py-1 text-center text-xs font-semibold text-white lg:max-w-24 lg:text-sm"
        title={player.name || `Player ${placeholderPlayerNumber}`}
      >
        {player.name || `Player ${placeholderPlayerNumber}`}
      </span>
    </div>
  );
}
