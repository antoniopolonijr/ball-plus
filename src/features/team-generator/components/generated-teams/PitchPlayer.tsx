import type { GeneratedPlayer } from "../../types/generated-team";
import { getContrastTextColor } from "../../utils/get-contrast-text-color";

interface PitchPlayerProps {
  player: GeneratedPlayer;
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
        className="flex size-8 items-center justify-center rounded-full border-2 border-black/70 text-sm font-bold shadow-md hover:scale-105 transition-transform duration-150 sm:size-10 md:text-base lg:size-12 lg:text-lg"
        style={{
          backgroundColor: teamColor,
          color: textColor,
        }}
      >
        {player.position === "Goalkeeper" ? "GK" : player.rotationOrder}
      </div>

      <span
        className="mt-1 block truncate w-full max-w-16 lg:max-w-24 text-center text-xs lg:text-sm font-semibold text-white bg-black/70 rounded py-1 px-1"
        title={player.name}
      >
        {player.name || `Player ${placeholderPlayerNumber}`}
      </span>
    </div>
  );
}
